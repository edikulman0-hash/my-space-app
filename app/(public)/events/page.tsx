import { nasaApi } from "@/lib/nasa";
import EventsGrid from "./EventsGrid";

export const revalidate = 3600;

export default async function EventsPage() {
  const initialAsteroids = await nasaApi.getAsteroids();

  return (
    <div className="bg-slate-950 min-h-screen text-slate-100">
      <EventsGrid initialEvents={initialAsteroids} />
    </div>
  );
}