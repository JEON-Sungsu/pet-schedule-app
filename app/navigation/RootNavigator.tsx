import { router, Stack } from 'expo-router';
import React, { useEffect } from 'react';

export default function RootNavigator() {
  const tempFlag = false;

  useEffect(() => {
    setTimeout(() => {
      if (!tempFlag) {
        router.replace('/auth');
      }
    }, 1000);
  }, [tempFlag]);
  return (
    <Stack>
      <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
      <Stack.Screen name='auth' options={{ headerShown: false }} />
    </Stack>
  );
}
