"use client";

import React from "react";
import Link from "next/link";
import { useHomeSlider } from "./hooks/useHomeSlider";
import { Shield, Target, Radio, Zap, Activity, Database, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

const SPACE_SLIDES = [
  {
    id: 1,
    title: "Мониторинг Орбит Deep Space",
    subtitle: "Телеметрия NEO объектов в реальном времени",
    description: "Прямой поток данных с Goldstone Radar и распределенных узлов NASA. Автоматический расчет вероятности столкновения и ведение протоколов планетарной защиты.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1920&q=80",
    sector: "SECTOR_01_NEO"
  },
  {
    id: 2,
    title: "Архивы Марсианских Миссий",
    subtitle: "Оригинальные кадры с поверхности Красной Планеты",
    description: "Визуальный анализ ландшафта, геодезическая сверка и логи камер марсохода Curiosity без сбоев протоколов и смешанного контента.",
    image: "https://images.unsplash.com/photo-1612892483236-411693e77527?auto=format&fit=crop&w=1920&q=80",
    sector: "SECTOR_02_MARS"
  },
  {
    id: 3,
    title: "Синхронизация Астрономических Событий",
    subtitle: "Глубокий анализ космических феноменов",
    description: "Каталогизация космических явлений, звездных вспышек и динамическое изменение приоритетов обработки данных оператором.",
    image: "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?auto=format&fit=crop&w=1920&q=80",
    sector: "SECTOR_03_APOD"
  }
];

const BENEFITS = [
  {
    icon: <Radio className="text-red-500" size={24} />,
    title: "Прямой Downlink с NASA API",
    description: "Никаких посредников. Вы получаете нативный поток данных о сближающихся астероидах и снимках исследовательских роверов без задержек."
  },
  {
    icon: <Shield className="text-red-500" size={24} />,
    title: "Криптографическая Защита Админки",
    description: "Управление конфигурацией системы и ручной контроль орбит доступны строго авторизованному персоналу через защищенный шлюз авторизации."
  },
  {
    icon: <Zap className="text-red-500" size={24} />,
    title: "Интерфейс Drag & Drop",
    description: "Свободная приоритизация угроз на лету. Перетаскивайте карточки событий в командном центре для формирования оперативного лога."
  },
  {
    icon: <Activity className="text-red-500" size={24} />,
    title: "Индикация Аномалий",
    description: "Автоматическая визуальная и звуковая система предупреждения при обнаружении объектов с критическим статусом потенциальной угрозы."
  },
  {
    icon: <Database className="text-red-500" size={24} />,
    title: "Локальное Кэширование данных",
    description: "Next.js ISR и SSR оптимизация сохраняют данные стабильными даже в моменты пиковых перегрузок или обрыва связи с центральным сервером."
  },
  {
    icon: <Target className="text-red-500" size={24} />,
    title: "Абсолютная Адаптивность",
    description: "Управляйте планетарной защитой как со стационарного монитора терминала, так и со смартфона через тактическое бургер-меню."
  }
];

export default function HomePage() {
  const { currentSlide, nextSlide, prevSlide, setSlide, activeSlide } = useHomeSlider(SPACE_SLIDES, 6000);

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen font-sans selection:bg-red-500 selection:text-white overflow-hidden">
      
      {/* СЕКЦИЯ 1: ФУТУРИСТИЧЕСКИЙ СЛАЙДЕР */}
      <section className="relative h-[85vh] w-full border-b border-slate-900 bg-black">
        {/* Изображение слайдера с эффектом наложения */}
        <div className="absolute inset-0 transition-all duration-1000 ease-in-out">
          <img 
            src={activeSlide.image} 
            alt={activeSlide.title} 
            className="w-full h-full object-cover opacity-35 filter grayscale contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-transparent to-slate-950/20" />
        </div>

        {/* Сетка индикаторов по углам */}
        <div className="absolute top-6 left-6 font-mono text-[10px] text-slate-600 uppercase tracking-widest hidden md:block">
          System Core: Active // Status: Nominal
        </div>
        <div className="absolute top-6 right-6 font-mono text-[10px] text-red-500/80 uppercase tracking-widest border border-red-500/20 px-2 py-0.5 bg-red-950/10 animate-pulse hidden md:block">
          Telemetry Link: {activeSlide.sector}
        </div>

        {/* Контент слайда */}
        <div className="container mx-auto h-full px-4 flex items-center relative z-10">
          <div className="max-w-2xl space-y-6">
            <div className="space-y-2">
              <span className="font-mono text-xs text-red-500 uppercase tracking-widest block font-bold">
                [ {activeSlide.subtitle} ]
              </span>
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-slate-100 leading-none">
                {activeSlide.title}
              </h2>
            </div>
            <p className="text-sm md:text-base text-slate-400 font-mono leading-relaxed border-l-2 border-red-900 pl-4 py-1">
              {activeSlide.description}
            </p>
            <div className="flex items-center gap-4 pt-2">
              <Link 
                href="/events" 
                className="bg-red-950/40 hover:bg-red-900/40 border border-red-700/50 text-red-400 font-mono text-xs uppercase tracking-wider px-6 py-3 transition-colors flex items-center gap-2 group"
              >
                Открыть Монитор <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                href="/gallery" 
                className="bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 font-mono text-xs uppercase tracking-wider px-6 py-3 transition-colors"
              >
                Фотоархив
              </Link>
            </div>
          </div>
        </div>

        {/* Стрелки управления слайдером */}
        <button 
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-slate-950/80 border border-slate-900 text-slate-400 hover:text-white hover:border-slate-700 transition-colors z-20"
        >
          <ChevronLeft size={20} />
        </button>
        <button 
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-slate-950/80 border border-slate-900 text-slate-400 hover:text-white hover:border-slate-700 transition-colors z-20"
        >
          <ChevronRight size={20} />
        </button>

        {/* Пагинация (точки) */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
          {SPACE_SLIDES.map((_, index) => (
            <button
              key={index}
              onClick={() => setSlide(index)}
              className={`h-1.5 transition-all ${currentSlide === index ? 'w-8 bg-red-500' : 'w-2 bg-slate-800 hover:bg-slate-600'}`}
            />
          ))}
        </div>
      </section>

      {/* СЕКЦИЯ 2: ПРЕИМУЩЕСТВА СИСТЕМЫ */}
      <section className="container mx-auto px-4 py-24 relative">
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-3">
          <div className="font-mono text-xs text-red-500 uppercase tracking-widest font-bold">
            // Почему выбирают AstroControl Terminal
          </div>
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter">
            Преимущества Нашей Тактической Платформы
          </h2>
          <div className="w-16 h-0.5 bg-red-900 mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BENEFITS.map((benefit, index) => (
            <div 
              key={index}
              className="bg-slate-950 border border-slate-900 p-6 relative group hover:border-slate-800 transition-all duration-300"
            >
              {/* Угловые декоративные элементы киберпанка */}
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-slate-800 group-hover:border-slate-500 transition-colors" />
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-slate-800 group-hover:border-slate-500 transition-colors" />
              
              <div className="bg-slate-900/50 w-12 h-12 flex items-center justify-center border border-slate-800 mb-6 group-hover:bg-red-950/20 group-hover:border-red-900/50 transition-all duration-300">
                {benefit.icon}
              </div>
              
              <h3 className="text-lg font-bold uppercase tracking-tight text-slate-200 mb-2 group-hover:text-white transition-colors">
                {benefit.title}
              </h3>
              
              <p className="text-xs text-slate-500 font-mono leading-relaxed group-hover:text-slate-400 transition-colors">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}