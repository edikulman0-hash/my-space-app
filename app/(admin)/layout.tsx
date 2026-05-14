// app/(admin)/layout.tsx
import Link from 'next/link';
import { LayoutDashboard, Database, LogOut, Terminal } from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#05070a]">
      {/* Сайдбар админки */}
      <aside className="w-64 border-r border-slate-800 bg-slate-900/20 backdrop-blur-xl flex flex-col">
        <div className="p-6 border-b border-slate-800">
          <div className="flex items-center gap-2 font-black tracking-tighter text-blue-500">
            <Terminal size={20} />
            ASTRO_ADMIN
          </div>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-300 hover:bg-blue-500/10 hover:text-blue-400 rounded-lg transition-all group">
            <LayoutDashboard size={18} /> Панель управления
          </Link>
          <Link href="/admin/objects" className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-300 hover:bg-blue-500/10 hover:text-blue-400 rounded-lg transition-all">
            <Database size={18} /> Объекты (CRUD)
          </Link>
        </nav>

        <div className="p-4 border-t border-slate-800">
          <Link href="/" className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-400 hover:bg-red-500/10 rounded-lg transition-all">
            <LogOut size={18} /> Выйти в систему
          </Link>
        </div>
      </aside>

      {/* Основная рабочая область админки */}
      <main className="flex-1 overflow-y-auto bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-900/5 via-transparent to-transparent">
        {children}
      </main>
    </div>
  );
}