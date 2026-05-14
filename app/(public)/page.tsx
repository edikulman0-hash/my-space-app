// app/(public)/page.tsx
import { nasaApi } from '@/lib/nasa';

export default async function HomePage() {
  const data = await nasaApi.getAstronomyPicture();

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Фоновое изображение от NASA с эффектом Glassmorphism поверх */}
      <div 
        className="absolute inset-0 z-0 opacity-40 blur-sm"
        style={{ backgroundImage: `url(${data.url})`, backgroundSize: 'cover' }}
      />
      
      <div className="relative z-10 container mx-auto px-6 py-24">
        <h1 className="text-6xl font-black uppercase tracking-tighter mb-4">
          Astro<span className="text-blue-500">Control</span>
        </h1>
        <p className="text-xl max-w-2xl text-slate-300 mb-8">
          Система мониторинга глубокого космоса. Данные в реальном времени с орбитальных станций NASA.
        </p>
        <div className="flex gap-4">
          <a href="/events" className="px-8 py-3 bg-blue-600 hover:bg-blue-700 transition-all font-bold uppercase">
            Начать мониторинг
          </a>
          <a href="/admin" className="px-8 py-3 border border-slate-700 hover:bg-slate-800 transition-all font-bold uppercase text-sm">
            Панель управления
          </a>
        </div>
      </div>
    </main>
  );
}