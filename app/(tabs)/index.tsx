import AddTripForm from '@/components/AddTripForm';
import ScreenHeader from '@/components/ScreenHeader';
import TripCard from '@/components/TripCard';
import TripStats from '@/components/TripStats';
import EmptyState from '@/components/ui/EmptyState';
import { Colors } from '@/constants/Colors';
import { useTrips } from '@/contexts/TripContext';
import { Link } from 'expo-router';
import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const { trips, addTrip, deleteTrip } = useTrips();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScreenHeader tripCount={trips.length} />

      <ScrollView
        contentContainerStyle={styles.content}
        style={styles.container}
      >
        <TripStats trips={trips} />

        <AddTripForm onAdd={addTrip} />

        {trips.length === 0 ? (
          <EmptyState
            icon="airplane-outline"
            title="Brak podróży"
            subtitle="Dodaj swoją pierwszą podróż!"
          />
        ) : (
          trips.map((trip) => (
            <Link
              key={trip.id}
              href={{
                pathname: '/trip/[id]',
                params: { id: trip.id },
              }}
              asChild
            >
              <TripCard
                id={trip.id}
                title={trip.title}
                destination={trip.destination}
                date={trip.date}
                rating={trip.rating}
                onDelete={() => deleteTrip(trip.id)}
              />
            </Link>
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
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    padding: 16,
  },
});