"use client";

import React, { useState } from 'react';
import { useObjectsStore, SpaceObject } from '@/store/objects';
import { Search, Plus, Trash2, MoreHorizontal, X, Edit3, Check } from 'lucide-react';

export default function ObjectsCRUDPage() {
  const { objects, addObject, updateObject, deleteObject } = useObjectsStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const [newType, setNewType] = useState<'Asteroid' | 'Station' | 'Ship'>('Asteroid');
  const [newStatus, setNewStatus] = useState<'Neutral' | 'Ally' | 'Threat'>('Neutral');
  const [newCoordinates, setNewCoordinates] = useState('');
  const [error, setError] = useState('');

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editType, setEditType] = useState<'Asteroid' | 'Station' | 'Ship'>('Asteroid');
  const [editStatus, setEditStatus] = useState<'Neutral' | 'Ally' | 'Threat'>('Neutral');
  const [editCoordinates, setEditCoordinates] = useState('');

  const filteredObjects = objects.filter(obj => {
    const matchesSearch = obj.name.toLowerCase().includes(searchQuery.toLowerCase()) || obj.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'ALL' || obj.status.toUpperCase() === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!newName.trim()) {
      setError('IDENT_LABEL required');
      return;
    }
    if (!newCoordinates.trim()) {
      setError('COORDINATES required');
      return;
    }

    const coordRegex = /^\d+\.\d+\.\d+$/;
    if (!coordRegex.test(newCoordinates)) {
      setError('Format must be X.YY.ZZ (e.g. 1.04.88)');
      return;
    }

    addObject({
      name: newName,
      type: newType,
      status: newStatus,
      coordinates: newCoordinates
    });

    setNewName('');
    setNewCoordinates('');
    setIsModalOpen(false);
  };

  const startEditing = (obj: SpaceObject) => {
    setEditingId(obj.id);
    setEditName(obj.name);
    setEditType(obj.type);
    setEditStatus(obj.status);
    setEditCoordinates(obj.coordinates);
  };

  const saveEdit = (id: string) => {
    const coordRegex = /^\d+\.\d+\.\d+$/;
    if (!editName.trim() || !coordRegex.test(editCoordinates)) {
      return;
    }

    updateObject(id, {
      name: editName,
      type: editType,
      status: editStatus,
      coordinates: editCoordinates
    });
    setEditingId(null);
  };

  return (
    <div className="p-8 font-mono bg-slate-950 min-h-screen text-slate-100">
      <header className="mb-10">
        <h2 className="text-2xl font-black text-slate-100 tracking-tighter uppercase mb-2">Registry_Database</h2>
        <div className="h-1 w-20 bg-blue-600 mb-6" />
        
        <div className="flex flex-wrap gap-4 items-center justify-between bg-slate-900/40 p-4 border border-slate-800">
          <div className="flex gap-4 items-center flex-1 min-w-[300px]">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={14} />
              <input 
                className="w-full bg-slate-950 border border-slate-800 py-2 pl-10 pr-4 text-[11px] outline-none focus:border-blue-500 transition-colors text-slate-200 placeholder-slate-600"
                placeholder="SEARCH_BY_ID_OR_NAME..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2 border border-slate-800 p-1 bg-slate-950">
              <button 
                onClick={() => setFilterStatus('ALL')}
                className={`px-3 py-1 text-[10px] ${filterStatus === 'ALL' ? 'bg-blue-600 text-white' : 'text-slate-500 hover:text-slate-300'}`}
              >
                ALL
              </button>
              <button 
                onClick={() => setFilterStatus('THREAT')}
                className={`px-3 py-1 text-[10px] ${filterStatus === 'THREAT' ? 'bg-red-600 text-white' : 'text-slate-500 hover:text-slate-300'}`}
              >
                THREAT
              </button>
              <button 
                onClick={() => setFilterStatus('ALLY')}
                className={`px-3 py-1 text-[10px] ${filterStatus === 'ALLY' ? 'bg-green-600 text-white' : 'text-slate-500 hover:text-slate-300'}`}
              >
                ALLY
              </button>
            </div>
          </div>
          
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-blue-600 px-4 py-2 text-[10px] font-bold hover:bg-blue-500 transition-colors border border-blue-400/20 text-white"
          >
            <Plus size={14} /> ADD_NEW_OBJECT
          </button>
        </div>
      </header>

      <div className="border border-slate-800 bg-slate-900/10 overflow-hidden">
        <table className="w-full text-left text-[11px]">
          <thead className="bg-slate-900/80 text-slate-400 border-b border-slate-800">
            <tr>
              <th className="p-4 font-normal tracking-wider text-slate-500">UID</th>
              <th className="p-4 font-normal tracking-wider text-slate-500">IDENT_LABEL</th>
              <th className="p-4 font-normal tracking-wider text-slate-500">CLASS</th>
              <th className="p-4 font-normal tracking-wider text-slate-500">STATUS</th>
              <th className="p-4 font-normal tracking-wider text-slate-500">VECTOR</th>
              <th className="p-4 font-normal tracking-wider text-slate-500 text-right">OPERATIONS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/40">
            {filteredObjects.map((obj) => (
              <tr key={obj.id} className="hover:bg-blue-500/5 transition-colors group">
                <td className="p-4 text-blue-500/80 font-mono">{obj.id}</td>
                
                <td className="p-4 text-slate-200 font-bold">
                  {editingId === obj.id ? (
                    <input 
                      type="text" 
                      className="bg-slate-900 border border-slate-700 px-2 py-1 text-xs text-white rounded-none outline-none focus:border-blue-500" 
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                    />
                  ) : (
                    obj.name
                  )}
                </td>

                <td className="p-4 text-slate-400">
                  {editingId === obj.id ? (
                    <select 
                      className="bg-slate-900 border border-slate-700 px-2 py-1 text-xs text-white rounded-none outline-none focus:border-blue-500"
                      value={editType}
                      onChange={(e) => setEditType(e.target.value as any)}
                    >
                      <option value="Asteroid">Asteroid</option>
                      <option value="Station">Station</option>
                      <option value="Ship">Ship</option>
                    </select>
                  ) : (
                    obj.type
                  )}
                </td>

                <td className="p-4">
                  {editingId === obj.id ? (
                    <select 
                      className="bg-slate-900 border border-slate-700 px-2 py-1 text-xs text-white rounded-none outline-none focus:border-blue-500"
                      value={editStatus}
                      onChange={(e) => setEditStatus(e.target.value as any)}
                    >
                      <option value="Neutral">Neutral</option>
                      <option value="Ally">Ally</option>
                      <option value="Threat">Threat</option>
                    </select>
                  ) : (
                    <span className={`px-2 py-0.5 text-[10px] border ${
                      obj.status === 'Threat' ? 'border-red-500/30 text-red-400 bg-red-500/5' : 
                      obj.status === 'Ally' ? 'border-green-500/30 text-green-400 bg-green-500/5' : 
                      'border-slate-500/30 text-slate-400 bg-slate-500/5'
                    }`}>
                      {obj.status.toUpperCase()}
                    </span>
                  )}
                </td>

                <td className="p-4 text-slate-500 font-mono">
                  {editingId === obj.id ? (
                    <input 
                      type="text" 
                      className="bg-slate-900 border border-slate-700 px-2 py-1 text-xs text-white rounded-none outline-none focus:border-blue-500 font-mono" 
                      value={editCoordinates}
                      onChange={(e) => setEditCoordinates(e.target.value)}
                    />
                  ) : (
                    obj.coordinates
                  )}
                </td>

                <td className="p-4 text-right">
                  <div className="flex justify-end gap-1">
                    {editingId === obj.id ? (
                      <button 
                        onClick={() => saveEdit(obj.id)}
                        className="p-2 text-green-500 hover:text-green-400 transition-colors"
                      >
                        <Check size={14} />
                      </button>
                    ) : (
                      <button 
                        onClick={() => startEditing(obj)}
                        className="p-2 text-slate-600 hover:text-blue-400 transition-colors"
                      >
                        <Edit3 size={14} />
                      </button>
                    )}
                    <button 
                      onClick={() => deleteObject(obj.id)}
                      className="p-2 text-slate-600 hover:text-red-400 transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredObjects.length === 0 && (
          <div className="p-20 text-center text-slate-600 text-[10px] tracking-widest uppercase">
            No_matching_entities_found_in_database
          </div>
        )}
      </div>

      <div className="mt-6 flex justify-between items-center text-[10px] text-slate-500">
        <span>TOTAL_ENTRIES: {filteredObjects.length}</span>
        <div className="flex gap-2">
          <button className="px-3 py-1 border border-slate-800 hover:bg-slate-900 transition-colors">PREV</button>
          <button className="px-3 py-1 bg-slate-900 border border-slate-700 text-blue-400">1</button>
          <button className="px-3 py-1 border border-slate-800 hover:bg-slate-900 transition-colors">NEXT</button>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-950 border border-slate-800 w-full max-w-md relative p-6 shadow-2xl">
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-slate-500" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-slate-500" />
            
            <div className="flex justify-between items-center mb-6 border-b border-slate-800 pb-3">
              <h3 className="text-xs uppercase tracking-widest text-blue-500 font-bold">Initialize_New_Entity</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-500 hover:text-slate-300">
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-2 bg-red-500/10 border border-red-500/30 text-red-500 text-[10px] uppercase">
                  ERROR: {error}
                </div>
              )}

              <div>
                <label className="block text-[10px] uppercase text-slate-500 mb-1">Ident_Label</label>
                <input 
                  type="text"
                  className="w-full bg-slate-900 border border-slate-800 p-2 text-xs text-slate-200 outline-none focus:border-blue-500"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. Orion-Sub"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase text-slate-500 mb-1">Class</label>
                <select 
                  className="w-full bg-slate-900 border border-slate-800 p-2 text-xs text-slate-200 outline-none focus:border-blue-500"
                  value={newType}
                  onChange={(e) => setNewType(e.target.value as any)}
                >
                  <option value="Asteroid">Asteroid</option>
                  <option value="Station">Station</option>
                  <option value="Ship">Ship</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] uppercase text-slate-500 mb-1">Status</label>
                <select 
                  className="w-full bg-slate-900 border border-slate-800 p-2 text-xs text-slate-200 outline-none focus:border-blue-500"
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value as any)}
                >
                  <option value="Neutral">Neutral</option>
                  <option value="Ally">Ally</option>
                  <option value="Threat">Threat</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] uppercase text-slate-500 mb-1">Vector Coordinates</label>
                <input 
                  type="text"
                  className="w-full bg-slate-900 border border-slate-800 p-2 text-xs text-slate-200 outline-none focus:border-blue-500 font-mono"
                  value={newCoordinates}
                  onChange={(e) => setNewCoordinates(e.target.value)}
                  placeholder="Format: 0.00.00"
                />
              </div>

              <div className="pt-4 flex gap-3">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 border border-slate-800 py-2 text-[10px] hover:bg-slate-900 text-slate-400"
                >
                  CANCEL
                </button>
                <button 
                  type="submit"
                  className="flex-1 bg-blue-600 py-2 text-[10px] font-bold text-white hover:bg-blue-500"
                >
                  EXECUTE_WRITE
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}