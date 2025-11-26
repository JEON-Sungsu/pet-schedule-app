import { QueryClientProvider } from '@tanstack/react-query';
import 'react-native-reanimated';
import queryClient from './core/api/queryClient';
import RootNavigator from './navigation/RootNavigator';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <RootNavigator />
    </QueryClientProvider>
  );
}
