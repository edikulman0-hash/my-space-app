// app/(public)/gallery/loading.tsx
export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="h-10 w-64 bg-slate-900 animate-pulse mb-12 rounded" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="aspect-square bg-slate-900 animate-pulse border border-slate-800" />
        ))}
      </div>
    </div>
  );
}