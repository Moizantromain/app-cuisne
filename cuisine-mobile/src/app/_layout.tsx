import '@/global.css';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { kitchen } from '@/state/use-kitchen';

export default function RootLayout() {
  useEffect(() => { void kitchen.hydrate(); }, []);
  return <><StatusBar style="dark" /><Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: '#F8F7F2' } }} /></>;
}
