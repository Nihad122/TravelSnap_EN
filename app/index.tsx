import { useState } from 'react';
import { ScrollView, StatusBar, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import AddTripForm from '@/components/AddTripForm';
import EmptyState from '@/components/EmptyState';
import ScreenHeader from '@/components/ScreenHeader';
import TripCard from '@/components/TripCard';

import { Colors } from '@/constants/Colors';

import type { Trip, TripData } from '@/types/trip';

export default function HomeScreen() {
  const [tripList, setTripList] = useState<Trip[]>([]);

  const addTrip = (tripData: TripData) => {
    const newEntry: Trip = { id: Date.now().toString(), ...tripData };
    setTripList([newEntry, ...tripList]);
  };

  const removeTrip = (id: string) => {
    setTripList(tripList.filter((trip) => trip.id !== id));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.contentContainer}
      >
        <ScreenHeader tripCount={tripList.length} />

        <AddTripForm onAdd={addTrip} />

        {tripList.length === 0 ? (
          <EmptyState />
        ) : (
          tripList.map((trip) => (
            <TripCard
              key={trip.id}
              title={trip.title}
              destination={trip.destination}
              date={trip.date}
              rating={trip.rating}
              onRemove={() => removeTrip(trip.id)}
            />
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scroll: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
});