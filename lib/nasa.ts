const API_KEY = process.env.NEXT_PUBLIC_NASA_API_KEY || 'nkYI9yPUuobJPiH0ldE0kAzonB7olrxpkfw5GtFp';
const BASE_URL = 'https://api.nasa.gov';

export const nasaApi = {
  getAstronomyPicture: async () => {
    try {
      const res = await fetch(`${BASE_URL}/planetary/apod?api_key=${API_KEY}`, { next: { revalidate: 3600 } });
      if (!res.ok) throw new Error('Failed to fetch APOD');
      return await res.json();
    } catch (error) {
      console.warn("NASA APOD Error, returning default state:", error);
      return {
        url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1920&q=80",
        title: "Deep Space Visual Archive",
        explanation: "Telemetry stream disconnected. Displaying default deep space stellar core imagery.",
        date: "2026-05-15"
      };
    }
  },
  
  getAsteroids: async () => {
    try {
      const res = await fetch(`${BASE_URL}/neo/rest/v1/feed?api_key=${API_KEY}`, { next: { revalidate: 3600 } });
      if (!res.ok) throw new Error('Failed to fetch Asteroids');
      const data = await res.json();
      return Object.values(data.near_earth_objects).flat();
    } catch (error) {
      console.warn("NASA Asteroids Error, returning fallback telemetry:", error);
      return [
        { id: "NEO-42", name: "433 Eros", absolute_magnitude_h: 11.16, is_potentially_hazardous_asteroid: false },
        { id: "NEO-99", name: "99942 Apophis", absolute_magnitude_h: 19.2, is_potentially_hazardous_asteroid: true }
      ];
    }
  },

  getMarsPhotos: async () => {
    try {
      const res = await fetch(`${BASE_URL}/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${API_KEY}`, { next: { revalidate: 86400 } });
      if (!res.ok) throw new Error('Failed to fetch Mars photos from API');
      
      const data = await res.json();
      if (!data.photos || data.photos.length === 0) throw new Error('No photos returned from API');
      
      // Главное исправление: переводим все незащищенные HTTP ссылки от NASA на HTTPS протокол
      const safePhotos = data.photos.slice(0, 12).map((photo: any) => ({
        ...photo,
        img_src: photo.img_src.replace(/^http:\/\//i, 'https://')
      }));
      
      return safePhotos;
    } catch (error) {
      console.warn("NASA API Error, returning mock telemetry archive:", error);
      // Возвращаем реальные архивные фото марсианских миссий вместо картинок леса
      return [
        {
          id: 1024,
          img_src: "https://images-assets.nasa.gov/image/PIA14293/PIA14293~thumb.jpg",
          earth_date: "2015-05-30",
          camera: { full_name: "Front Hazard Avoidance Camera" },
          rover: { name: "Curiosity", status: "active", launch_date: "2011-11-26", landing_date: "2012-08-06" }
        },
        {
          id: 1025,
          img_src: "https://images-assets.nasa.gov/image/PIA16226/PIA16226~thumb.jpg",
          earth_date: "2015-05-30",
          camera: { full_name: "Navigation Camera" },
          rover: { name: "Curiosity", status: "active", launch_date: "2011-11-26", landing_date: "2012-08-06" }
        },
        {
          id: 1026,
          img_src: "https://images-assets.nasa.gov/image/PIA16239/PIA16239~thumb.jpg",
          earth_date: "2015-05-30",
          camera: { full_name: "Mast Camera" },
          rover: { name: "Curiosity", status: "active", launch_date: "2011-11-26", landing_date: "2012-08-06" }
        },
        {
          id: 1027,
          img_src: "https://images-assets.nasa.gov/image/PIA16453/PIA16453~thumb.jpg",
          earth_date: "2015-05-30",
          camera: { full_name: "Chemistry and Camera Complex" },
          rover: { name: "Curiosity", status: "active", launch_date: "2011-11-26", landing_date: "2012-08-06" }
        },
        {
          id: 1028,
          img_src: "https://images-assets.nasa.gov/image/PIA16101/PIA16101~thumb.jpg",
          earth_date: "2015-05-31",
          camera: { full_name: "Hazard Avoidance Camera" },
          rover: { name: "Curiosity", status: "active", launch_date: "2011-11-26", landing_date: "2012-08-06" }
        },
        {
          id: 1029,
          img_src: "https://images-assets.nasa.gov/image/PIA16099/PIA16099~thumb.jpg",
          earth_date: "2015-05-31",
          camera: { full_name: "Navigation Camera" },
          rover: { name: "Curiosity", status: "active", launch_date: "2011-11-26", landing_date: "2012-08-06" }
        },
        {
          id: 1030,
          img_src: "https://images-assets.nasa.gov/image/PIA16105/PIA16105~thumb.jpg",
          earth_date: "2015-06-01",
          camera: { full_name: "Mast Camera" },
          rover: { name: "Curiosity", status: "active", launch_date: "2011-11-26", landing_date: "2012-08-06" }
        },
        {
          id: 1031,
          img_src: "https://images-assets.nasa.gov/image/PIA16701/PIA16701~thumb.jpg",
          earth_date: "2015-06-01",
          camera: { full_name: "Chemistry and Camera Complex" },
          rover: { name: "Curiosity", status: "active", launch_date: "2011-11-26", landing_date: "2012-08-06" }
        }
      ];
    }
  }
};