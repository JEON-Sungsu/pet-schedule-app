import queryClient from '@/lib/queryClient';
import { QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import 'react-native-reanimated';
import RootNavigator from './navigation/RootNavigator';

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <RootNavigator />
    </QueryClientProvider>
  );
}
