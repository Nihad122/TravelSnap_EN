import { Colors } from '@/constants/Colors';
import { StyleSheet, Text, View } from 'react-native';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        <Text style={styles.initials}>NN</Text>
      </View>

      <Text style={styles.name}>
        Your Name
      </Text>

      <Text style={styles.joined}>
        Joined 29.05.2026
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
    paddingTop: 60,
  },

  avatar: {
    width: 100,
    height: 100,
    borderRadius: 9999,
    backgroundColor: Colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
  },

  initials: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
  },

  name: {
    marginTop: 16,
    color: Colors.textPrimary,
    fontSize: 22,
    fontWeight: 'bold',
  },

  joined: {
    marginTop: 8,
    color: Colors.textSecondary,
  },
});