"use client";

import React, { useState } from 'react';
import Image from "next/image";
import { Camera, Box, AlertTriangle, RefreshCw, X, CalendarDays, Target, Wifi } from "lucide-react";
import { useMarsPhotos } from "../hooks/useMarsPhotos";

interface GalleryGridProps {
  initialPhotos: any[];
}

export default function GalleryGrid({ initialPhotos }: GalleryGridProps) {
  const { photos, loading, error, refreshPhotos } = useMarsPhotos(initialPhotos);
  const [selectedPhoto, setSelectedPhoto] = useState<any | null>(null);
  const [failedImages, setFailedImages] = useState<number[]>([]);

  const FALLBACK_IMAGE = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%230f172a'/%3E%3Cpath d='M200 150v100M150 200h100' stroke='%23334155' stroke-width='4'/%3E%3Ctext x='50%25' y='80%25' dominant-baseline='middle' text-anchor='middle' font-family='monospace' font-size='14' fill='%23334155'%3E[IMAGE_NOT_FOUND]%3C/text%3E%3C/svg%3E";

  const handleImageError = (photoId: number) => {
    if (!failedImages.includes(photoId)) {
      setFailedImages((prev) => [...prev, photoId]);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 font-sans relative">
      <header className="mb-12 flex flex-wrap items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black uppercase tracking-tighter mb-2 text-slate-100">Архив марсохода</h1>
          <p className="text-slate-500 font-mono text-sm uppercase tracking-widest flex items-center gap-2">
            <Camera size={16} className="text-blue-500" /> Mission: Curiosity | Sol: 1000
          </p>
        </div>
        <button 
          onClick={refreshPhotos}
          disabled={loading}
          className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 px-4 py-2 font-mono text-xs uppercase tracking-wider text-slate-300 transition-colors disabled:opacity-50"
        >
          <RefreshCw size={14} className={loading ? "animate-spin text-blue-500" : ""} />
          {loading ? "CONNECTING..." : "SYNC_TELEMETRY"}
        </button>
      </header>

      {error && (
        <div className="mb-8 p-4 bg-yellow-500/5 border border-yellow-500/20 flex items-start gap-3 rounded-none">
          <AlertTriangle className="text-yellow-500 shrink-0 mt-0.5" size={16} />
          <div className="font-mono text-xs">
            <p className="text-yellow-500 font-bold uppercase mb-1">STREAMS_DOWNLINK_WARNING</p>
            <p className="text-slate-400">{error}. Отображается локальный защищенный архив ядра.</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {photos.map((photo: any) => {
          const isFailed = failedImages.includes(photo.id);
          return (
            <div 
              key={photo.id} 
              onClick={() => setSelectedPhoto(photo)}
              className="group relative aspect-square bg-slate-900 border border-slate-800 overflow-hidden hover:border-blue-500/50 transition-all cursor-crosshair"
            >
              <div className="absolute inset-0 bg-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity z-10" />
              
              <Image
                src={isFailed ? FALLBACK_IMAGE : photo.img_src}
                alt={`Mars by ${photo.rover?.name || 'Curiosity'}`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500"
                priority={photo.id === photos[0]?.id}
                onError={() => handleImageError(photo.id)}
              />

              <div className="absolute bottom-0 left-0 right-0 p-4 bg-slate-950/80 backdrop-blur-md border-t border-white/5 z-20 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-[10px] font-mono text-blue-400 uppercase tracking-widest mb-1">
                  {photo.camera?.full_name || "SURFACE_VISUAL_CAMERA"}
                </p>
                <p className="text-xs font-bold truncate uppercase text-slate-200">{photo.earth_date}</p>
              </div>
              
              <Box className="absolute top-2 right-2 text-white/20 z-20 group-hover:text-blue-500/50 transition-colors" size={14} />
            </div>
          );
        })}
      </div>

      {selectedPhoto && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-lg flex items-center justify-center z-[100] p-4 transition-all animate-fadeIn" onClick={() => setSelectedPhoto(null)}>
          <div className="bg-slate-950 border border-slate-800 w-full max-w-4xl relative shadow-2xl p-6" onClick={(e) => e.stopPropagation()}>
            <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-slate-600" />
            <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-slate-600" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-slate-600" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-slate-600" />

            <div className="flex justify-between items-center mb-6 border-b border-slate-800 pb-3">
              <h3 className="text-sm font-mono uppercase tracking-[0.2em] text-blue-500 flex items-center gap-2">
                <Target size={14}/>
                Telemetry_Deep_Scan :: VID_{selectedPhoto.id}
              </h3>
              <button onClick={() => setSelectedPhoto(null)} className="text-slate-600 hover:text-slate-100 p-1">
                <X size={20} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              <div className="md:col-span-3 aspect-[4/3] bg-slate-900 border border-slate-800 relative overflow-hidden">
                <Image 
                  src={failedImages.includes(selectedPhoto.id) ? FALLBACK_IMAGE : selectedPhoto.img_src} 
                  alt="Telemetry visual" 
                  fill 
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover"
                  priority
                  onError={() => handleImageError(selectedPhoto.id)}
                />
              </div>

              <div className="md:col-span-2 space-y-6 font-mono">
                <div className="bg-slate-900 border border-slate-800 p-4">
                  <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Visual Instrument</p>
                  <p className="text-xs text-slate-100 font-bold uppercase">{selectedPhoto.camera?.full_name}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div className="flex items-center gap-3 bg-slate-900 border border-slate-800 p-3">
                    <CalendarDays className="text-blue-500" size={18} />
                    <div>
                      <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-0.5">Stardate</p>
                      <p className="text-slate-100">{selectedPhoto.earth_date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-slate-900 border border-slate-800 p-3">
                    <Target className="text-green-500" size={18} />
                    <div>
                      <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-0.5">Status</p>
                      <p className="text-slate-100 uppercase">{selectedPhoto.rover?.status || 'Active'}</p>
                    </div>
                  </div>
                </div>

                <div className="border border-slate-800 bg-black/30 p-4 text-[10px] space-y-1.5 text-slate-400">
                  <p className="text-blue-500 mb-2 uppercase tracking-widest border-b border-slate-800 pb-1.5">Asset_Core_Data</p>
                  <p><span className="text-slate-600">Rover_Model:</span> {selectedPhoto.rover?.name || 'Curiosity'}</p>
                  <p><span className="text-slate-600">Launch_Stardate:</span> {selectedPhoto.rover?.launch_date || '2011-11-26'}</p>
                  <p><span className="text-slate-600">Landing_Stardate:</span> {selectedPhoto.rover?.landing_date || '2012-08-06'}</p>
                  <p className="flex items-center gap-2 pt-2 text-green-500 animate-pulse">
                    <Wifi size={12}/> UPLINK_ACTIVE
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}