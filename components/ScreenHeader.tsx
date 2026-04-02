import { StyleSheet, Text, View } from 'react-native';
import { Colors } from '../constants/Colors';

interface Props {
  tripCount: number;
}

export default function ScreenHeader({ tripCount }: Props) {
  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.title}>TravelSnap</Text>
        <Text style={styles.subtitle}>Your travel journal</Text>
      </View>

      <View style={styles.badge}>
        <Text style={styles.badgeText}>{tripCount}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
    paddingHorizontal: 16,
    paddingBottom: 12,
    backgroundColor: Colors.background,
  },

  title: {
    color: Colors.textPrimary,
    fontSize: 26,
    fontWeight: 'bold',
  },

  subtitle: {
    color: Colors.textSecondary,
  },

  badge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
  },

  badgeText: {
    color: 'white',
    fontWeight: 'bold',
  },
});