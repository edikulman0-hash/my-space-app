// lib/nasa.ts
const API_KEY = 'nkYI9yPUuobJPiH0ldE0kAzonB7olrxpkfw5GtFp';
const BASE_URL = 'https://api.nasa.gov';

export const nasaApi = {
  getAstronomyPicture: async () => {
    const res = await fetch(`${BASE_URL}/planetary/apod?api_key=${API_KEY}`, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error('Failed to fetch APOD');
    return res.json();
  },
  
  getAsteroids: async () => {
    const res = await fetch(`${BASE_URL}/neo/rest/v1/feed?api_key=${API_KEY}`, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error('Failed to fetch Asteroids');
    const data = await res.json();
    return Object.values(data.near_earth_objects).flat();
  },

  // НОВОЕ: Снимки с марсохода для Галереи
  getMarsPhotos: async () => {
    // Берем снимки за конкретную дату для стабильности
    const res = await fetch(`${BASE_URL}/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${API_KEY}`, { next: { revalidate: 86400 } });
    if (!res.ok) throw new Error('Failed to fetch Mars photos');
    const data = await res.json();
    return data.photos.slice(0, 12); // Берем первые 12 для сетки
  }
};