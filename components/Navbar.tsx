"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useNavbar } from "@/app/hooks/useNavbar";
import { Menu, X, ShieldAlert, Radio, Orbit, Image, Home } from "lucide-react";

export default function Navbar() {
  const { isOpen, toggleMenu } = useNavbar();
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: "ГЛАВНАЯ", icon: <Home size={14} /> },
    { href: "/gallery", label: "ФОТОАРХИВ", icon: <Image size={14} /> },
    { href: "/events", label: "СОБЫТИЯ", icon: <Orbit size={14} /> },
  ];

  return (
    <nav className="bg-slate-950 border-b border-slate-900 sticky top-0 z-50 font-mono">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* Логотип */}
        <Link href="/" className="flex items-center gap-2 group">
          <Radio size={18} className="text-red-500 animate-pulse" />
          <span className="font-sans font-black text-lg tracking-tighter uppercase text-slate-100 group-hover:text-white transition-colors">
            Astro<span className="text-red-500">.</span>Control
          </span>
        </Link>

        {/* Десктопное меню навигации */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-2 px-4 py-2 text-xs uppercase tracking-wider transition-all border ${
                  isActive
                    ? "bg-red-500/5 border-red-500/20 text-red-400 font-bold"
                    : "border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/40"
                }`}
              >
                {React.cloneElement(link.icon, { 
                  className: isActive ? "text-red-500" : "text-slate-500" 
                })}
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Правая секция: Вход в админку */}
        <div className="hidden md:block">
          <Link
            href="/admin"
            className={`flex items-center gap-1.5 px-4 py-1.5 text-xs uppercase tracking-wider border font-bold transition-all ${
              pathname?.startsWith("/admin")
                ? "bg-red-500/10 border-red-500/40 text-red-400"
                : "border-slate-800 text-slate-400 hover:text-red-400 hover:border-red-950/80 hover:bg-red-950/10"
            }`}
          >
            <ShieldAlert size={14} />
            Терминал
          </Link>
        </div>

        {/* Мобильная кнопка бургера */}
        <button
          onClick={toggleMenu}
          className="md:hidden p-2 text-slate-400 hover:text-white border border-slate-900 bg-slate-950 transition-colors"
          aria-label="Переключить меню"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Мобильное выпадающее бургер-меню */}
      {isOpen && (
        <div className="md:hidden border-b border-slate-900 bg-slate-950 absolute top-16 left-0 w-full z-40 p-4 space-y-3 animate-none">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={toggleMenu}
                  className={`flex items-center gap-2 p-3 text-xs uppercase tracking-wider transition-colors ${
                    isActive 
                      ? "bg-red-500/10 border-l-2 border-red-500 text-red-400 font-bold" 
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
                  }`}
                >
                  {link.icon}
                  {link.label}
                </Link>
              );
            })}
          </div>
          <div className="border-t border-slate-900 pt-3">
            <Link
              href="/admin"
              onClick={toggleMenu}
              className="flex items-center justify-center gap-1.5 bg-red-950/40 border border-red-800 text-red-400 text-xs uppercase font-bold py-2.5 tracking-wider transition-colors w-full"
            >
              <ShieldAlert size={14} />
              Терминал оператора
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}