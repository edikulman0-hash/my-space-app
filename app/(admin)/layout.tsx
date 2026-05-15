"use client";

import React, { useEffect, useState } from "react";
import Link from 'next/link';
import { useAdminAuth } from "@/app/hooks/useAdminAuth";
import { LayoutDashboard, Database, ShieldAlert, Terminal, Lock, User, Users } from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const {
    username,
    setUsername,
    password,
    setPassword,
    error,
    isLoading,
    isAuthenticated,
    handleLogin
  } = useAdminAuth();

  const [isChecking, setIsChecking] = useState(true);
  const [hasSession, setHasSession] = useState(false);

  useEffect(() => {
    const checkSession = () => {
      const session = localStorage.getItem("astro_admin_session");
      if (session === "active" || isAuthenticated) {
        setHasSession(true);
      } else {
        setHasSession(false);
      }
    };

    checkSession();
    setIsChecking(false);

    // Слушаем изменения в хранилище, чтобы мгновенно поймать logout из дочерних компонентов
    window.addEventListener("storage", checkSession);
    
    // Кастомное событие для синхронизации в рамках одной вкладки
    window.addEventListener("admin_logout", checkSession);

    return () => {
      window.removeEventListener("storage", checkSession);
      window.removeEventListener("admin_logout", checkSession);
    };
  }, [isAuthenticated]);

  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center font-mono bg-[#05070a] text-slate-500 text-xs uppercase tracking-widest animate-pulse">
        INITIALIZING_SECURITY_PROTOCOLS...
      </div>
    );
  }

  if (!hasSession) {
    return (
      <div className="min-h-screen bg-[#05070a] relative flex items-center justify-center font-mono p-4 selection:bg-red-500 selection:text-white">
        <div className="w-full max-w-md bg-[#05070a] border border-slate-900 p-8 relative z-20 shadow-2xl shadow-black">
          <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-slate-800" />
          <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-slate-800" />
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-slate-800" />
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-slate-800" />

          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-red-950/30 border border-red-900/50 text-red-500 mb-4">
              <ShieldAlert size={24} className="animate-pulse" />
            </div>
            <h1 className="text-sm font-black text-slate-200 uppercase tracking-widest">
              Критическая Точка Доступа
            </h1>
            <p className="text-[9px] text-slate-500 uppercase tracking-widest mt-1.5">
              Запрошен защищенный узел. Требуется верификация сигнатуры.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-[10px] text-slate-500 uppercase tracking-widest block">
                Идентификатор оператора
              </label>
              <div className="relative">
                <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600" />
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Логин..."
                  className="w-full bg-slate-900 border border-slate-800 pl-9 pr-4 py-2 text-xs text-slate-200 focus:outline-none focus:border-red-500/50 transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] text-slate-500 uppercase tracking-widest block">
                Криптографический ключ
              </label>
              <div className="relative">
                <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Пароль..."
                  className="w-full bg-slate-900 border border-slate-800 pl-9 pr-4 py-2 text-xs text-slate-200 focus:outline-none focus:border-red-500/50 transition-colors"
                />
              </div>
            </div>

            {error && (
              <div className="text-[10px] text-red-500 border border-red-950 bg-red-500/5 p-2.5 text-center leading-normal uppercase tracking-wider">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 disabled:opacity-40 font-mono text-xs uppercase tracking-widest py-2.5 transition-colors flex items-center justify-center gap-2"
            >
              <Terminal size={14} />
              {isLoading ? "Проверка спецификации..." : "Предоставить токен"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#05070a] w-full">
      <aside className="w-64 border-r border-slate-800 bg-slate-900/20 backdrop-blur-xl flex flex-col shrink-0 min-h-screen z-30">
        <div className="p-6 border-b border-slate-800">
          <div className="flex items-center gap-2 font-black tracking-tighter text-blue-500 font-mono text-sm">
            <Terminal size={20} />
            ASTRO_ADMIN
          </div>
        </div>
        
        <nav className="flex-1 p-4 space-y-2 font-mono">
          <Link href="/admin?tab=dashboard" className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-300 hover:bg-blue-500/10 hover:text-blue-400 rounded-lg transition-all group">
            <LayoutDashboard size={18} /> Панель управления
          </Link>
          <Link href="/admin?tab=users" className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-300 hover:bg-blue-500/10 hover:text-blue-400 rounded-lg transition-all group">
            <Users size={18} /> Управление персоналом
          </Link>
          <Link 
            href="/objects" 
            className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-300 hover:bg-blue-500/10 hover:text-blue-400 rounded-lg transition-all"
          >
            <Database size={18} /> Объекты (CRUD)
          </Link>
        </nav>

        <div className="p-4 border-t border-slate-800 font-mono">
          <Link href="/" className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-400 hover:bg-red-500/10 rounded-lg transition-all">
            Выйти на сайт
          </Link>
        </div>
      </aside>

      <main className="flex-1 overflow-auto bg-[#05070a] z-20 relative">
        {children}
      </main>
    </div>
  );
}