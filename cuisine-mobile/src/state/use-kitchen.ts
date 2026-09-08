import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSyncExternalStore } from 'react';
import { createKitchenStore } from './kitchen';

export const kitchen = createKitchenStore(AsyncStorage);
export function useKitchen() {
  return useSyncExternalStore(kitchen.subscribe, kitchen.getSnapshot, kitchen.getServerSnapshot);
}
