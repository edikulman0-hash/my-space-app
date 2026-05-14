// stores/objects.ts
import { defineStore } from 'pinia';

export interface SpaceObject {
  id: string;
  name: string;
  type: 'Asteroid' | 'Station' | 'Ship';
  status: 'Active' | 'Neutral' | 'Threat';
  coordinates: string;
}

export const useObjectStore = defineStore('objects', {
  state: () => ({
    items: [
      { id: '1', name: 'AX-741', type: 'Asteroid', status: 'Neutral', coordinates: '0.42.11' },
      { id: '2', name: 'Vesta-Prime', type: 'Station', status: 'Active', coordinates: '1.09.88' },
    ] as SpaceObject[],
  }),
  actions: {
    addObject(item: Omit<SpaceObject, 'id'>) {
      const newObject = { ...item, id: Math.random().toString(36).substring(2, 9) };
      this.items.push(newObject);
    },
    updateObject(id: string, updatedItem: Partial<SpaceObject>) {
      const index = this.items.findIndex(i => i.id === id);
      if (index !== -1) this.items[index] = { ...this.items[index], ...updatedItem };
    },
    deleteObject(id: string) {
      this.items = this.items.filter(i => i.id !== id);
    }
  }
});