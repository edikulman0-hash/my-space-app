// components/Navbar.tsx
import Link from 'next/link';

export const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="text-xl font-black tracking-tighter text-blue-500">
          ASTRO<span className="text-white text-sm ml-1 font-mono">v.0.1</span>
        </Link>
        
        <div className="flex gap-6 text-sm font-medium uppercase tracking-widest">
          <Link href="/events" className="hover:text-blue-400 transition-colors">События</Link>
          <Link href="/gallery" className="hover:text-blue-400 transition-colors">Галерея</Link>
          <Link href="/admin" className="text-slate-500 hover:text-white border-l border-slate-800 pl-6">Admin_Panel</Link>
        </div>
      </div>
    </nav>
  );
};