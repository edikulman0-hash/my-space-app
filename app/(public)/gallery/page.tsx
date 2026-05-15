import { nasaApi } from "@/lib/nasa";
import GalleryGrid from "./GalleryGrid";

export default async function GalleryPage() {
  const initialPhotos = await nasaApi.getMarsPhotos();

  return (
    <div className="bg-slate-950 min-h-screen text-slate-100">
      <GalleryGrid initialPhotos={initialPhotos} />
    </div>
  );
}