import { Pressable, StyleSheet, Text, View } from 'react-native';

import RatingStars from './RatingStars';

import type { TripData } from '@/types/trip';

export interface TripCardProps extends TripData {
  onRemove?: () => void;
}

export default function TripCard({
  title,
  destination,
  date,
  rating,
  onRemove,
}: TripCardProps) {
  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <Text style={styles.tripTitle}>{title}</Text>

        {onRemove && (
          <Pressable onPress={onRemove} style={styles.removeBtn}>
            <Text style={styles.removeText}>✕</Text> 
          </Pressable>
        )}
      </View>

      <Text style={styles.subInfo}>
        {destination} | {date}
      </Text>

      <RatingStars rating={rating} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 28,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 7,
    elevation: 4,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tripTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1b1b30',
    flex: 1,
  },
  removeBtn: {
    padding: 5,
    marginLeft: 8,
  },
  removeText: {
    color: '#ff5555',
    fontWeight: 'bold',
    fontSize: 18,
  },
  subInfo: {
    fontSize: 14,
    color: '#777',
    marginTop: 4,
  },
});