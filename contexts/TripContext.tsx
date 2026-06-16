import type { ReactNode } from 'react';
import { createContext, useContext, useState } from 'react';

import type { Trip, TripData } from '@/types/trip';

interface TripContextValue {
  trips: Trip[];
  addTrip: (data: TripData) => void;
  deleteTrip: (id: string) => void;

  addGalleryImage: (
    tripId: string,
    uri: string
  ) => void;

  removeGalleryImage: (
    tripId: string,
    uri: string
  ) => void;

  setMainPhoto: (
    tripId: string,
    uri: string
  ) => void;
}

const TripContext = createContext<TripContextValue | null>(null);

interface TripProviderProps {
  children: ReactNode;
}

export function TripProvider({ children }: TripProviderProps) {
  const [trips, setTrips] = useState<Trip[]>([]);

  const addTrip = (data: TripData): void => {
    const newTrip: Trip = { id: Date.now().toString(), ...data };
    setTrips((current) => [newTrip, ...current]);
  };

  const deleteTrip = (id: string): void => {
    setTrips((current) => current.filter((trip) => trip.id !== id));
  };

  const addGalleryImage = (
    tripId: string,
    uri: string
  ): void => {
    setTrips((current) =>
      current.map((trip) =>
        trip.id === tripId
          ? {
              ...trip,
              galleryUris: [
                ...(trip.galleryUris ?? []),
                uri,
              ],
            }
          : trip
      )
    );
  };

  const removeGalleryImage = (
    tripId: string,
    uri: string
  ): void => {
    setTrips((current) =>
      current.map((trip) =>
        trip.id === tripId
          ? {
              ...trip,
              galleryUris:
                trip.galleryUris?.filter(
                  (img) => img !== uri
                ) ?? [],
            }
          : trip
      )
    );
  };

  const setMainPhoto = (
    tripId: string,
    uri: string
  ): void => {
    setTrips((current) =>
      current.map((trip) =>
        trip.id === tripId
          ? {
              ...trip,
              imageUri: uri,
            }
          : trip
      )
    );
  };

  return (
    <TripContext.Provider value={{ trips, addTrip, deleteTrip, addGalleryImage, removeGalleryImage, setMainPhoto }}>
      {children}
    </TripContext.Provider>
  );
}

export function useTrips(): TripContextValue {
  const context = useContext(TripContext);
  if (!context) {
    throw new Error('useTrips must be used within a TripProvider');
  }
  return context;
}
