import React from "react";
// Корректный абсолютный импорт от корня папки приложения
import Navbar from "@/components/Navbar";

interface PublicLayoutProps {
  children: React.ReactNode;
}

export default function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-slate-100">
      {/* Навигация только для пользователей */}
      <Navbar />
      
      {/* Контент страниц (Home, Gallery, Events) */}
      <main className="flex-1 w-full">
        {children}
      </main>
      
      {/* Подвал Системы */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 font-mono text-[10px] text-slate-600 uppercase tracking-widest text-center">
        <div className="container mx-auto px-4">
          © 2026 Лаборатория Космической Телеметрии // Все права защищены терминалом управления
        </div>
      </footer>
    </div>
  );
}