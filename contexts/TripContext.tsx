import type { Trip, TripData } from '@/types/trip';
import { createContext, useContext, useState } from 'react';

interface TripContextType {
  trips: Trip[];
  addTrip: (data: TripData) => void;
  deleteTrip: (id: string) => void;
  getTripById: (id: string) => Trip | undefined;
}

const TripContext = createContext<TripContextType | null>(null);

export function TripProvider({ children }: { children: React.ReactNode }) {
  const [trips, setTrips] = useState<Trip[]>([]);

  const addTrip = (data: TripData) => {
    const newTrip: Trip = { id: Date.now().toString(), ...data };
    setTrips((prev) => [newTrip, ...prev]);
  };

  const deleteTrip = (id: string) => {
    setTrips((prev) => prev.filter((t) => t.id !== id));
  };

  const getTripById = (id: string) => {
    return trips.find((t) => t.id === id);
  };

  return (
    <TripContext.Provider
      value={{ trips, addTrip, deleteTrip, getTripById }}
    >
      {children}
    </TripContext.Provider>
  );
}

export function useTrips() {
  const ctx = useContext(TripContext);
  if (!ctx) throw new Error('useTrips must be used inside TripProvider');
  return ctx;
}