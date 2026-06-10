import { TripProvider } from '@/contexts/TripContext';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <TripProvider>
      <Stack screenOptions={{ headerShown: false }} />
      <StatusBar style="light" />
    </TripProvider>
  );
}