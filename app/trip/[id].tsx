import { Colors } from '@/constants/Colors';
import { useTrips } from '@/contexts/TripContext';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function TripDetail() {
  const { id } = useLocalSearchParams();
  const { getTripById } = useTrips();
  const router = useRouter();

  const trip = getTripById(id as string);

  if (!trip) {
    return (
      <View style={styles.container}>
        <Text style={{ color: 'white' }}>Trip not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{trip.title}</Text>

      <View style={styles.row}>
        <Ionicons name="location-outline" color="#aaa" size={16} />
        <Text style={styles.text}>{trip.destination}</Text>
      </View>

      <View style={styles.row}>
        <Ionicons name="calendar-outline" color="#aaa" size={16} />
        <Text style={styles.text}>{trip.date}</Text>
      </View>

      <Pressable
        style={styles.button}
        onPress={() => router.back()}
      >
        <Text style={{ color: 'white', fontWeight: 'bold' }}>
          Back to list
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  text: {
    color: '#aaa',
    marginLeft: 8,
  },
  button: {
    marginTop: 30,
    backgroundColor: Colors.primary,
    padding: 12,
    borderRadius: 8,
  },
});