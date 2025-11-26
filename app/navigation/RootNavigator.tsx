import { Stack } from 'expo-router';

export default function RootNavigator() {
  return (
    <Stack>
      <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
    </Stack>
  );
}
