import { Ionicons } from '@expo/vector-icons';
import { Link, Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { ActivityIndicator, Image, Pressable, StyleSheet, Text, View } from 'react-native';

import RatingStars from '@/components/RatingStars';
import { Colors } from '@/constants/Colors';
import { useTrips } from '@/contexts/TripContext';
import { useFavorites } from '@/hooks/useFavorites';

export default function TripDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { trips } = useTrips();
  const router = useRouter();
  const { isLoading, isFavorite, toggleFavorite } = useFavorites();

  const trip = trips.find((t) => t.id === id);
  const favorited = isFavorite(id);

  if (!trip) {
    return (
      <>
        <Stack.Screen options={{ title: 'Trip not found' }} />
        <View style={styles.screen}>
          <Text style={styles.errorText}>Trip not found.</Text>
          <Pressable style={styles.backButton} onPress={() => router.back()}>
            <Text style={styles.backButtonText}>Back to list</Text>
          </Pressable>
        </View>
      </>
    );
  }

  const { title, destination, date, rating } = trip;

  return (
    <>
      <Stack.Screen
        options={{
          title,
          headerRight: () =>
            isLoading ? (
              <View style={styles.heartButton}>
                <ActivityIndicator size="small" color={Colors.textSecondary} />
              </View>
            ) : (
              <Pressable onPress={() => toggleFavorite(id)} style={styles.heartButton}>
                <Ionicons
                  name={favorited ? 'heart' : 'heart-outline'}
                  size={24}
                  color={favorited ? Colors.accent : Colors.textSecondary}
                />
              </Pressable>
            ),
        }}
      />
      {trip.imageUri ? (
        <Image
          source={{ uri: trip.imageUri }}
          style={styles.heroImage}
        />
      ) : (
        <View style={styles.placeholder}>
          <Ionicons
            name="image-outline"
            size={64}
            color="#4A6FA5"
        />
        <Text style={styles.placeholderText}>
          No photo
        </Text>
      </View>
    )}

      <View style={styles.screen}>
        <Text style={styles.tripTitle}>{title}</Text>

        <View style={styles.metaRow}>
          <Ionicons name="location" size={16} color={Colors.textSecondary} />
          <Text style={styles.metaText}>{destination}</Text>
        </View>

        <View style={styles.metaRow}>
          <Ionicons name="calendar" size={14} color={Colors.textSecondary} />
          <Text style={[styles.metaText, styles.dateText]}>{date}</Text>
        </View>

        <View style={styles.starsRow}>
          <RatingStars rating={rating} />
        </View>

        <Link
          href={`/trip/gallery/${trip.id}`}
          asChild
        >
          <Pressable style={styles.galleryButton}>
            <Ionicons
              name="images-outline"
              size={20}
              color={Colors.textPrimary}
            />

            <Text style={styles.galleryButtonText}>
              Gallery ({trip.galleryUris?.length ?? 0})
            </Text>
          </Pressable>
        </Link>

        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>Back to list</Text>
        </Pressable>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  heroImage: {
    width: '100%',
    height: 250,
    borderRadius: 12,
    marginBottom: 20,
  },
  placeholder: {
    height: 250,
    backgroundColor: '#1A2744',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  placeholderText: {
    color: Colors.textPrimary,
    marginTop: 12,
    fontSize: 16,
  },
  galleryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 24,
  },
  galleryButtonText: {
    color: Colors.textPrimary,
    fontSize: 16,
  },
  screen: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 24,
  },
  tripTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 16,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  metaText: {
    fontSize: 16,
    color: Colors.textSecondary,
  },
  dateText: {
    fontSize: 14,
  },
  starsRow: {
    marginTop: 16,
    marginBottom: 32,
  },
  backButton: {
    backgroundColor: Colors.primary,
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  backButtonText: {
    color: Colors.background,
    fontWeight: 'bold',
    fontSize: 16,
  },
  heartButton: {
    marginRight: 8,
    padding: 4,
  },
  errorText: {
    fontSize: 16,
    color: Colors.textSecondary,
    marginBottom: 24,
  },
});
