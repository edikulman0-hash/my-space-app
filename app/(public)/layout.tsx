// app/(public)/layout.tsx
import { Navbar } from "@/components/Navbar";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Навигация только для пользователей */}
      <Navbar />
      
      {/* Контент страниц (Home, Gallery, Events) */}
      <main className="flex-1">
        {children}
      </main>
      
      {/* Футер в едином стиле */}
      <footer className="py-8 border-t border-slate-900 bg-slate-950 text-center text-xs text-slate-500 uppercase tracking-[0.2em]">
        &copy; 2026 AstroControl // Deep Space Monitor // Data via NASA API
      </footer>
    </div>
  );
}