import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

import { Colors } from '@/constants/Colors';

export default function ExploreScreen() {
  return (
    <View style={styles.container}>
      <Ionicons
        name="compass"
        size={64}
        color={Colors.primary}
      />

      <Text style={styles.title}>
        Discover new places
      </Text>

      <Text style={styles.subtitle}>
        Coming soon...
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,

    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    marginTop: 16,
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.textPrimary,
  },

  subtitle: {
    marginTop: 8,
    color: Colors.textSecondary,
  },
});