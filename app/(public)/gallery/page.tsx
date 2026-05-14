// app/(public)/gallery/page.tsx
import { nasaApi } from "@/lib/nasa";
import Image from "next/image";
import { Camera, Box } from "lucide-react";

export default async function GalleryPage() {
  const photos = await nasaApi.getMarsPhotos();

  return (
    <div className="container mx-auto px-4 py-12">
      <header className="mb-12">
        <h1 className="text-4xl font-black uppercase tracking-tighter mb-2">Архив марсохода</h1>
        <p className="text-slate-500 font-mono text-sm uppercase tracking-widest flex items-center gap-2">
          <Camera size={16} className="text-blue-500" /> Mission: Curiosity | Sol: 1000
        </p>
      </header>

      {/* Сетка фотографий */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {photos.map((photo: any) => (
          <div 
            key={photo.id} 
            className="group relative aspect-square bg-slate-900 border border-slate-800 overflow-hidden hover:border-blue-500/50 transition-all cursor-crosshair"
          >
            {/* Эффект при наведении */}
            <div className="absolute inset-0 bg-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity z-10" />
            
            <Image
              src={photo.img_src}
              alt={`Mars by ${photo.rover.name}`}
              fill
              className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500"
            />

            {/* Glassmorphism плашка с инфой */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-slate-950/60 backdrop-blur-md border-t border-white/5 z-20 translate-y-full group-hover:translate-y-0 transition-transform">
              <p className="text-[10px] font-mono text-blue-400 uppercase tracking-widest mb-1">
                {photo.camera.full_name}
              </p>
              <p className="text-xs font-bold truncate uppercase">{photo.earth_date}</p>
            </div>
            
            {/* Декоративный элемент угла */}
            <Box className="absolute top-2 right-2 text-white/20 z-20 group-hover:text-blue-500/50 transition-colors" size={14} />
          </div>
        ))}
      </div>
    </div>
  );
}