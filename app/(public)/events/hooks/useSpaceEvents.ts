"use client";

import { useState, useTransition } from "react";

interface AsteroidEvent {
  id: string;
  name: string;
  absolute_magnitude_h: number;
  is_potentially_hazardous_asteroid: boolean;
  close_approach_data?: Array<{
    close_approach_date: string;
    miss_distance: { kilometers: string };
    relative_velocity: { kilometers_per_hour: string };
    orbiting_body: string;
  }>;
}

export function useSpaceEvents(initialEvents: AsteroidEvent[]) {
  const [events, setEvents] = useState<AsteroidEvent[]>(initialEvents);
  const [filter, setFilter] = useState<"all" | "hazardous" | "safe">("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isPending, startTransition] = useTransition();

  const handleRefresh = async () => {
    startTransition(async () => {
      try {
        const res = await fetch("https://api.nasa.gov/neo/rest/v1/feed?api_key=nkYI9yPUuobJPiH0ldE0kAzonB7olrxpkfw5GtFp");
        if (!res.ok) throw new Error("Failed to sync telemetry");
        const data = await res.json();
        const flattened: AsteroidEvent[] = Object.values(data.near_earth_objects).flat() as AsteroidEvent[];
        setEvents(flattened);
      } catch (error) {
        console.error("Telemetry sync failed, keeping current data stream:", error);
      }
    });
  };

  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.name.toLowerCase().includes(searchQuery.toLowerCase()) || event.id.includes(searchQuery);
    
    if (!matchesSearch) return false;
    if (filter === "hazardous") return event.is_potentially_hazardous_asteroid;
    if (filter === "safe") return !event.is_potentially_hazardous_asteroid;
    return true;
  });

  return {
    events: filteredEvents,
    setEvents, // Позволяет хуку drag-and-drop менять порядок элементов в сетке
    filter,
    setFilter,
    searchQuery,
    setSearchQuery,
    isSyncing: isPending,
    handleRefresh,
    totalCount: events.length,
    filteredCount: filteredEvents.length
  };
}