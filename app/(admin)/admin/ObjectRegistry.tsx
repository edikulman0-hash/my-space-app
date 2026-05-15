import React, { useState } from 'react';
import { useSpaceRegistry, SpaceObject } from './hooks/useSpaceRegistry';

export function ObjectRegistry() {
  const { objects, addObject, deleteObject } = useSpaceRegistry();
  const [isAdding, setIsAdding] = useState(false);
  const [form, setForm] = useState<Omit<SpaceObject, 'id'>>({
    name: '',
    type: 'Asteroid',
    status: 'Neutral',
    coordinates: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addObject(form);
    setIsAdding(false);
    setForm({ name: '', type: 'Asteroid', status: 'Neutral', coordinates: '' });
  };

  return (
    <section className="mt-12 border border-slate-800 bg-slate-900/20 p-6 font-mono">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-blue-500 text-sm tracking-[0.3em] uppercase flex items-center gap-2">
          <span className="w-4 h-[1px] bg-blue-500" />
          Registry_Management
        </h3>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="text-[10px] px-3 py-1 border border-slate-700 hover:border-blue-500 hover:text-blue-400 transition-all"
        >
          {isAdding ? '> ABORT_CMD' : '> NEW_ENTRY'}
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8 p-4 border border-blue-500/30 bg-blue-500/5">
          <input 
            className="bg-slate-950 border border-slate-800 p-2 text-[10px] text-white outline-none focus:border-blue-500"
            placeholder="ENTITY_NAME"
            value={form.name}
            onChange={e => setForm({...form, name: e.target.value})}
            required
          />
          <select 
            className="bg-slate-950 border border-slate-800 p-2 text-[10px] text-white outline-none cursor-pointer"
            value={form.type}
            onChange={e => setForm({...form, type: e.target.value as any})}
          >
            <option value="Asteroid">ASTEROID</option>
            <option value="Station">STATION</option>
            <option value="Ship">SHIP</option>
          </select>
          <input 
            className="bg-slate-950 border border-slate-800 p-2 text-[10px] text-white outline-none focus:border-blue-500"
            placeholder="COORD_DATA"
            value={form.coordinates}
            onChange={e => setForm({...form, coordinates: e.target.value})}
          />
          <button type="submit" className="bg-blue-600/20 border border-blue-600 text-blue-400 text-[10px] font-bold hover:bg-blue-600 hover:text-white transition-all">
            EXECUTE_COMMIT
          </button>
        </form>
      )}

      <div className="overflow-x-auto border border-slate-800">
        <table className="w-full text-left text-[10px] leading-tight border-collapse">
          <thead>
            <tr className="bg-slate-800/30 text-slate-500 uppercase">
              <th className="p-3 font-normal border-r border-slate-800/50">UID</th>
              <th className="p-3 font-normal border-r border-slate-800/50">Ident_Label</th>
              <th className="p-3 font-normal border-r border-slate-800/50">Class</th>
              <th className="p-3 font-normal border-r border-slate-800/50">Status</th>
              <th className="p-3 font-normal border-r border-slate-800/50">Vector</th>
              <th className="p-3 font-normal text-right">Auth</th>
            </tr>
          </thead>
          <tbody>
            {objects.map((obj) => (
              <tr key={obj.id} className="border-t border-slate-800/50 hover:bg-blue-500/5 transition-colors group">
                <td className="p-3 text-slate-600 border-r border-slate-800/50">{obj.id}</td>
                <td className="p-3 text-slate-200 border-r border-slate-800/50">{obj.name}</td>
                <td className="p-3 text-slate-400 border-r border-slate-800/50">{obj.type}</td>
                <td className="p-3 font-bold border-r border-slate-800/50">
                  <span className={obj.status === 'Threat' ? 'text-red-500' : 'text-green-500'}>
                    {obj.status}
                  </span>
                </td>
                <td className="p-3 text-slate-500 border-r border-slate-800/50">{obj.coordinates}</td>
                <td className="p-3 text-right">
                  <button 
                    onClick={() => deleteObject(obj.id)}
                    className="opacity-0 group-hover:opacity-100 text-red-900 hover:text-red-500 transition-all px-2"
                  >
                    [PURGE]
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}