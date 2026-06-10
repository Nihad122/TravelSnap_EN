import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

import { Colors } from '@/constants/Colors';

export default function EmptyState() {
  return (
    <View style={styles.container}>
      <Ionicons
        name="airplane-outline"
        size={64}
        color={Colors.primary}
      />

      <Text style={styles.title}>No trips yet</Text>

      <Text style={styles.subtitle}>
        Add your first trip!
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 300,

    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    marginTop: 12,
    color: Colors.textPrimary,
    fontSize: 20,
    fontWeight: 'bold',
  },

  subtitle: {
    marginTop: 12,
    color: Colors.textSecondary,
    fontSize: 14,
  },
});