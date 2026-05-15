import { useState } from 'react';

export interface SpaceObject {
  id: string;
  name: string;
  type: 'Asteroid' | 'Station' | 'Ship';
  status: 'Neutral' | 'Threat' | 'Ally';
  coordinates: string;
}

const initialObjects: SpaceObject[] = [
  { id: 'OBJ-1024', name: 'AX-741', type: 'Asteroid', status: 'Neutral', coordinates: '0.42.11' },
  { id: 'STA-9901', name: 'Vesta-Prime', type: 'Station', status: 'Ally', coordinates: '1.09.88' },
  { id: 'SHP-0422', name: 'Kz-Interceptor', type: 'Ship', status: 'Threat', coordinates: '5.12.01' },
];

export const useSpaceRegistry = () => {
  const [objects, setObjects] = useState<SpaceObject[]>(initialObjects);

  const generateId = (type: string) => {
    const prefix = type.substring(0, 3).toUpperCase();
    const random = Math.floor(1000 + Math.random() * 9000);
    return `${prefix}-${random}`;
  };

  const addObject = (obj: Omit<SpaceObject, 'id'>) => {
    const newObj: SpaceObject = { ...obj, id: generateId(obj.type) };
    setObjects((prev) => [...prev, newObj]);
  };

  const deleteObject = (id: string) => {
    setObjects((prev) => prev.filter((o) => o.id !== id));
  };

  return {
    objects,
    addObject,
    deleteObject,
  };
};