"use client";

import React, { useState, useEffect } from 'react';
import { 
  DndContext, 
  closestCenter, 
  KeyboardSensor, 
  PointerSensor, 
  TouchSensor, 
  useSensor, 
  useSensors 
} from '@dnd-kit/core';
import { 
  arrayMove, 
  SortableContext, 
  sortableKeyboardCoordinates, 
  rectSortingStrategy, 
  useSortable 
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Activity, ShieldAlert, Cpu, HardDrive, Terminal } from 'lucide-react';

const DashboardCard = ({ id, title, icon: Icon, value, color, isDraggable }: any) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id, disabled: !isDraggable });
  const style = { transform: CSS.Transform.toString(transform), transition };

  return (
    <div ref={setNodeRef} style={style} className="relative group bg-slate-900/40 border border-slate-800 p-6 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] overflow-hidden transition-colors hover:border-blue-500/40">
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-slate-700" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-slate-700" />
      <div className="flex justify-between items-start mb-4">
        <div className={`p-2 bg-${color}-500/10 rounded-sm border border-${color}-500/20`}>
          <Icon size={20} className={`text-${color}-500`} />
        </div>
        <button {...attributes} {...listeners} className={`text-slate-700 hover:text-slate-400 p-1 touch-none ${isDraggable ? 'cursor-grab active:cursor-grabbing' : 'cursor-wait'}`}>
          <GripVertical size={18} />
        </button>
      </div>
      <p className="text-slate-500 text-[10px] uppercase font-mono tracking-[0.2em] mb-1">{title}</p>
      <div className="flex items-baseline gap-2">
        <p className="text-3xl font-mono font-black tracking-tighter text-slate-200">{value}</p>
      </div>
      <div className="absolute inset-x-0 top-0 h-[1px] bg-blue-500/20 shadow-[0_0_10px_rgba(59,130,246,0.5)] translate-y-[-100%] group-hover:animate-[scan_2s_linear_infinite]" />
    </div>
  );
};

export default function AdminDashboard() {
  const [isMounted, setIsMounted] = useState(false);
  const [mapAnomalies, setMapAnomalies] = useState<boolean[]>(new Array(100).fill(false));
  const [items, setItems] = useState([
    { id: '1', title: 'Objects Tracked', icon: Activity, value: '1,240', color: 'blue' },
    { id: '2', title: 'Threat Level', icon: ShieldAlert, value: 'LOW', color: 'green' },
    { id: '3', title: 'System Load', icon: Cpu, value: '24%', color: 'purple' },
    { id: '4', title: 'Storage Capacity', icon: HardDrive, value: '89.2 TB', color: 'cyan' },
  ]);

  useEffect(() => { 
    setIsMounted(true); 
    
    const generatedAnomalies = [...Array(100)].map(() => Math.random() > 0.95);
    setMapAnomalies(generatedAnomalies);
  }, []);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      setItems((prev) => {
        const oldIndex = prev.findIndex((i) => i.id === active.id);
        const newIndex = prev.findIndex((i) => i.id === over.id);
        return arrayMove(prev, oldIndex, newIndex);
      });
    }
  };

  return (
    <div className="p-8 font-sans">
      <header className="mb-12 flex justify-between items-end border-b border-slate-800 pb-6 relative">
        <div>
          <h2 className="text-3xl font-black uppercase tracking-[0.3em] text-slate-100 flex items-center gap-3">
            <span className="w-8 h-[2px] bg-blue-600 mb-1" />
            Command Center
          </h2>
          <p className="text-slate-500 text-[10px] font-mono mt-2">ACCESS_LEVEL: ALPHA-1 // TERMINAL_ID: 0x9921</p>
        </div>
        <div className="flex flex-col items-end gap-2 font-mono text-[10px]">
          <div className="flex items-center gap-3 text-green-500 bg-green-500/5 px-3 py-1 border border-green-500/20">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping" />
            UPLINK_ESTABLISHED
          </div>
          <span className="text-slate-600">STARDATE: 2026.05.14</span>
        </div>
      </header>
      
      <section className="mb-12">
        {isMounted ? (
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={items} strategy={rectSortingStrategy}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {items.map((item) => <DashboardCard key={item.id} {...item} isDraggable={isMounted} />)}
              </div>
            </SortableContext>
          </DndContext>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {items.map((item) => <DashboardCard key={item.id} {...item} isDraggable={false} />)}
          </div>
        )}
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 border border-slate-800 bg-slate-900/20 p-6 relative h-[400px]">
          <h3 className="text-[10px] font-mono text-blue-500 mb-4 tracking-widest uppercase">Sector_Visual_Map</h3>
          <div className="absolute inset-0 m-12 grid grid-cols-10 grid-rows-10 border border-blue-500/10">
            {[...Array(100)].map((_, i) => (
              <div key={i} className="border-[0.5px] border-blue-500/5 hover:bg-blue-500/10 transition-colors cursor-crosshair relative group">
                {mapAnomalies[i] && <div className="absolute inset-1 bg-red-500 animate-pulse shadow-[0_0_10px_red]" />}
              </div>
            ))}
          </div>
        </div>

        <div className="border border-slate-800 bg-black p-4 font-mono text-[10px] flex flex-col h-[400px]">
          <div className="flex items-center gap-2 text-slate-500 mb-4 border-b border-slate-800 pb-2">
            <Terminal size={12} />
            <span>SYSTEM_LOGS_STDOUT</span>
          </div>
          <div className="flex-1 overflow-y-auto space-y-2 text-slate-400">
            <p className="text-green-500">[OK] Kernel initialized...</p>
            <p>[INFO] Tracking 1240 satellites</p>
            <p className="text-yellow-500">[WARN] Anomaly in Sector 7-G</p>
            <p className="text-red-500">[ERR] Unauthorized access attempt 192.168.1.1</p>
            <p>[INFO] Deep space scan: 89%</p>
            <p className="animate-pulse">_</p>
          </div>
        </div>
      </div>
    </div>
  );
}