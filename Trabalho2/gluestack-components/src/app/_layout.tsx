import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import '@/src/global.css';
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <GluestackUIProvider mode="light">
      <Stack />
    </GluestackUIProvider>
  );
}