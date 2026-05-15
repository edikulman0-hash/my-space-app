import { useState } from 'react';
import { nasaApi } from '@/lib/nasa';

interface Photo {
  id: number;
  img_src: string;
  earth_date: string;
  camera: { full_name: string };
  rover: { name: string };
}

export function useMarsPhotos(initialPhotos: Photo[]) {
  const [photos, setPhotos] = useState<Photo[]>(initialPhotos);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const refreshPhotos = async () => {
    setLoading(true);
    setError(null);
    try {
      const updatedPhotos = await nasaApi.getMarsPhotos();
      setPhotos(updatedPhotos);
    } catch (err: any) {
      setError(err.message || 'Failed to sync with cosmic telemetry arrays');
    } finally {
      setLoading(false);
    }
  };

  return { photos, loading, error, refreshPhotos };
}