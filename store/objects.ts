import { create } from 'zustand';

export interface SpaceObject {
  id: string;
  name: string;
  type: 'Asteroid' | 'Station' | 'Ship';
  status: 'Neutral' | 'Ally' | 'Threat';
  coordinates: string;
}

interface ObjectsState {
  objects: SpaceObject[];
  addObject: (obj: Omit<SpaceObject, 'id'>) => void;
  updateObject: (id: string, updatedItem: Partial<SpaceObject>) => void;
  deleteObject: (id: string) => void;
}

export const useObjectsStore = create<ObjectsState>((set) => ({
  objects: [
    { id: 'OBJ-1024', name: 'AX-741', type: 'Asteroid', status: 'Neutral', coordinates: '0.42.11' },
    { id: 'STA-9901', name: 'Vesta-Prime', type: 'Station', status: 'Ally', coordinates: '1.09.88' },
    { id: 'SHP-0422', name: 'Kz-Interceptor', type: 'Ship', status: 'Threat', coordinates: '5.12.01' },
  ],
  addObject: (obj) => set((state) => ({
    objects: [
      ...state.objects,
      {
        ...obj,
        id: `${obj.type === 'Asteroid' ? 'OBJ' : obj.type === 'Station' ? 'STA' : 'SHP'}-${Math.floor(1000 + Math.random() * 9000)}`
      }
    ]
  })),
  updateObject: (id, updatedItem) => set((state) => ({
    objects: state.objects.map((obj) => 
      obj.id === id ? { ...obj, ...updatedItem } : obj
    )
  })),
  deleteObject: (id) => set((state) => ({
    objects: state.objects.filter((obj) => obj.id !== id)
  }))
}));