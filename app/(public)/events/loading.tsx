import React from "react";
import { Radio } from "lucide-react";

export default function EventsLoading() {
  return (
    <div className="bg-slate-950 min-h-screen text-slate-100 flex flex-col items-center justify-center font-mono">
      <div className="border border-slate-900 bg-black/40 p-8 max-w-sm w-full text-center relative space-y-4">
        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-slate-700 animate-pulse" />
        <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-slate-700 animate-pulse" />
        <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-slate-700 animate-pulse" />
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-slate-700 animate-pulse" />
        
        <Radio className="text-red-500 animate-spin mx-auto" size={32} />
        
        <div>
          <p className="text-xs uppercase font-bold tracking-widest text-slate-300">Downlink established</p>
          <p className="text-[10px] text-slate-600 uppercase tracking-wider mt-1">Декодирование орбитальных траекторий...</p>
        </div>
        
        <div className="w-full bg-slate-900 h-1 overflow-hidden relative">
          <div className="bg-red-500 h-full absolute left-0 top-0 animate-pulse w-2/3" />
        </div>
      </div>
    </div>
  );
}