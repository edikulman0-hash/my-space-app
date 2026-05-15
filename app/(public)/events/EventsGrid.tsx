"use client";

import React from "react";
import { ShieldAlert, ShieldCheck, Shield, Radio, Search, RefreshCw, Orbit, Gauge, ChevronRight, GripVertical } from "lucide-react";
import { useSpaceEvents } from "./hooks/useSpaceEvents";
import { useAsteroidDrag } from "./hooks/useAsteroidDrag";

interface AsteroidEvent {
  id: string;
  name: string;
  absolute_magnitude_h: number;
  is_potentially_hazardous_asteroid: boolean;
  close_approach_data?: Array<{
    close_approach_date: string;
    miss_distance: { kilometers: string };
    relative_velocity: { kilometers_per_hour: string };
    orbiting_body: string;
  }>;
}

interface EventsGridProps {
  initialEvents: AsteroidEvent[];
}

export default function EventsGrid({ initialEvents }: EventsGridProps) {
  const {
    events,
    setEvents,
    filter,
    setFilter,
    searchQuery,
    setSearchQuery,
    isSyncing,
    handleRefresh,
    totalCount,
    filteredCount
  } = useSpaceEvents(initialEvents);

  const {
    draggedIndex,
    dragOverIndex,
    handleDragStart,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleDragEnd
  } = useAsteroidDrag(events, setEvents);

  return (
    <div className="container mx-auto px-4 py-12 font-sans relative">
      <header className="mb-12 flex flex-wrap items-end justify-between gap-6 border-b border-slate-900 pb-8">
        <div>
          <h1 className="text-4xl font-black uppercase tracking-tighter mb-2 text-slate-100">Мониторинг Орбит</h1>
          <p className="text-slate-500 font-mono text-sm uppercase tracking-widest flex items-center gap-2">
            <Radio size={16} className="text-red-500 animate-pulse" /> Сближения объектов глубокого космоса :: NEO Tracker
          </p>
        </div>
        <button 
          onClick={handleRefresh}
          disabled={isSyncing}
          className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 px-4 py-2 font-mono text-xs uppercase tracking-wider text-slate-300 transition-colors disabled:opacity-50"
        >
          <RefreshCw size={14} className={isSyncing ? "animate-spin text-red-500" : ""} />
          {isSyncing ? "SCANNING_ORBITS..." : "RE_SCAN_SYSTEM"}
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        <aside className="space-y-6 lg:sticky lg:top-6">
          <div className="bg-slate-950 border border-slate-900 p-4 font-mono">
            <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-3">Поиск по идентификатору</p>
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Имя объекта / ID..."
                className="w-full bg-slate-900 border border-slate-800 pl-9 pr-4 py-2 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-red-500/50 font-mono"
              />
            </div>
          </div>

          <div className="bg-slate-950 border border-slate-900 p-4 font-mono space-y-2">
            <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-3">Фильтр уровня угрозы</p>
            <button
              onClick={() => setFilter("all")}
              className={`w-full flex items-center justify-between px-3 py-2 text-xs uppercase tracking-wider transition-colors ${filter === "all" ? "bg-red-950/40 border border-red-950 text-red-400" : "bg-slate-900/50 border border-slate-900 text-slate-400 hover:bg-slate-900"}`}
            >
              <span className="flex items-center gap-2"><Shield size={14} /> Все секторы</span>
              <span className="text-[10px] bg-slate-950 px-1.5 py-0.5 border border-slate-800 text-slate-500">{totalCount}</span>
            </button>
            <button
              onClick={() => setFilter("hazardous")}
              className={`w-full flex items-center justify-between px-3 py-2 text-xs uppercase tracking-wider transition-colors ${filter === "hazardous" ? "bg-red-500/10 border border-red-500/30 text-red-500 font-bold" : "bg-slate-900/50 border border-slate-900 text-slate-400 hover:bg-slate-900"}`}
            >
              <span className="flex items-center gap-2"><ShieldAlert size={14} /> Крит. угроза</span>
              <span className="text-[10px] bg-slate-950 px-1.5 py-0.5 border border-slate-800 text-slate-500">
                {events.filter(e => e.is_potentially_hazardous_asteroid).length}
              </span>
            </button>
            <button
              onClick={() => setFilter("safe")}
              className={`w-full flex items-center justify-between px-3 py-2 text-xs uppercase tracking-wider transition-colors ${filter === "safe" ? "bg-green-500/10 border border-green-500/30 text-green-500" : "bg-slate-900/50 border border-slate-900 text-slate-400 hover:bg-slate-900"}`}
            >
              <span className="flex items-center gap-2"><ShieldCheck size={14} /> Стабильные</span>
              <span className="text-[10px] bg-slate-950 px-1.5 py-0.5 border border-slate-800 text-slate-500">
                {events.filter(e => !e.is_potentially_hazardous_asteroid).length}
              </span>
            </button>
          </div>

          <div className="border border-slate-900 bg-black/30 p-4 text-[10px] space-y-1.5 text-slate-500 font-mono">
            <p className="text-slate-400 mb-2 uppercase tracking-widest border-b border-slate-900 pb-1.5">Статус подсистемы</p>
            <p>Фильтрация вывела: {filteredCount} из {totalCount} сигнатур</p>
            <p>Ручная сортировка: Доступна (Перетаскивание)</p>
            <p>Базовый узел: Goldstone Radar</p>
          </div>
        </aside>

        <main className="lg:col-span-3">
          {events.length === 0 ? (
            <div className="bg-slate-950 border border-slate-900 border-dashed p-12 text-center rounded-none font-mono">
              <Shield size={24} className="mx-auto text-slate-700 mb-3" />
              <p className="text-xs uppercase text-slate-500 tracking-wider">Объекты по заданным критериям не обнаружены</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 select-none">
              {events.map((event, index) => {
                const date = event.close_approach_data?.[0]?.close_approach_date || "N/A";
                
                const speed = event.close_approach_data?.[0]?.relative_velocity?.kilometers_per_hour 
                  ? Math.round(parseFloat(event.close_approach_data[0].relative_velocity.kilometers_per_hour)).toLocaleString('ru-RU')
                  : "N/A";
                  
                const distance = event.close_approach_data?.[0]?.miss_distance?.kilometers
                  ? Math.round(parseFloat(event.close_approach_data[0].miss_distance.kilometers)).toLocaleString('ru-RU')
                  : "N/A";

                const isDragged = draggedIndex === index;
                const isDragOver = dragOverIndex === index;

                return (
                  <div 
                    key={event.id}
                    draggable
                    onDragStart={() => handleDragStart(index)}
                    onDragOver={(e) => handleDragOver(e, index)}
                    onDragLeave={handleDragLeave}
                    onDrop={() => handleDrop(index)}
                    onDragEnd={handleDragEnd}
                    className={`bg-slate-950 border transition-all duration-200 relative group p-5 transition-transform ${
                      event.is_potentially_hazardous_asteroid 
                        ? 'border-red-950 hover:border-red-500/30' 
                        : 'border-slate-900 hover:border-slate-800'
                    } ${isDragged ? 'opacity-30 scale-95 cursor-grabbing' : 'opacity-100 cursor-grab'} ${
                      isDragOver ? 'border-blue-500/80 bg-slate-900/40 scale-[1.02] border-dashed' : ''
                    }`}
                  >
                    <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-slate-700 group-hover:border-slate-400 transition-colors" />
                    <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-slate-700 group-hover:border-slate-400 transition-colors" />
                    
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <GripVertical size={14} className="text-slate-700 group-hover:text-slate-400 transition-colors shrink-0" />
                          <span className="text-[9px] bg-slate-900 border border-slate-800 text-slate-500 px-2 py-0.5 uppercase tracking-wider font-mono">
                            UID: {event.id}
                          </span>
                        </div>
                        <h3 className="text-base font-bold text-slate-200 uppercase tracking-tight mt-1.5 group-hover:text-white transition-colors">
                          {event.name}
                        </h3>
                      </div>
                      <div>
                        {event.is_potentially_hazardous_asteroid ? (
                          <span className="flex items-center gap-1 text-[10px] font-mono font-bold text-red-500 bg-red-500/5 border border-red-500/20 px-2 py-1 uppercase tracking-widest animate-pulse">
                            <ShieldAlert size={12} /> THREAT
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-[10px] font-mono text-green-500 bg-green-500/5 border border-green-500/20 px-2 py-1 uppercase tracking-widest">
                            <ShieldCheck size={12} /> SAFE
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2 border-t border-b border-slate-900 py-3 my-3 text-xs font-mono">
                      <div className="flex justify-between text-slate-400">
                        <span className="text-slate-600 flex items-center gap-1.5"><Orbit size={12}/> Точка сближения:</span>
                        <span className="text-slate-300 font-bold">{date}</span>
                      </div>
                      <div className="flex justify-between text-slate-400">
                        <span className="text-slate-600 flex items-center gap-1.5"><Gauge size={12}/> Скорость:</span>
                        <span className="text-slate-300">{speed} км/ч</span>
                      </div>
                      <div className="flex justify-between text-slate-400">
                        <span className="text-slate-600 flex items-center gap-1.5"><ChevronRight size={12}/> Дистанция пролёта:</span>
                        <span className="text-slate-300">{distance} км</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center text-[10px] text-slate-600 font-mono">
                      <span>Абс. величина: {event.absolute_magnitude_h} H</span>
                      <span>Target: {event.close_approach_data?.[0]?.orbiting_body || "Earth"}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}