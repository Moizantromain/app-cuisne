import { router, usePathname } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { kitchen, useKitchen } from '@/state/use-kitchen';
import { Button, palette, ui } from './cuisine-ui';

export function KitchenNavigation() {
  const pathname = usePathname();
  const { data, ready, saving, error } = useKitchen();
  const remaining = data.items.filter(item => !item.checked).length;
  const links = [
    { href: '/' as const, label: 'Recettes' },
    { href: '/favoris' as const, label: `Favoris${ready && data.favorites.length ? ` · ${data.favorites.length}` : ''}` },
    { href: '/courses' as const, label: `Courses${ready && remaining ? ` · ${remaining}` : ''}` },
  ];
  return <View style={{ marginBottom: 24, gap: 10 }}>
    <View style={styles.navigation}>{links.map(link => <Pressable key={link.href} accessibilityRole="button" accessibilityState={{ selected: pathname === link.href }} onPress={() => router.navigate(link.href)} style={[styles.link, pathname === link.href && { backgroundColor: palette.green }]}><Text style={{ color: pathname === link.href ? palette.white : palette.ink, fontWeight: '600' }}>{link.label}</Text></Pressable>)}</View>
    {(!ready || saving) && !error && <Text accessibilityLiveRegion="polite" style={styles.status}>{saving ? 'Enregistrement…' : 'Chargement de vos favoris et courses…'}</Text>}
    {!!error && <View style={styles.error}><Text accessibilityRole="alert" style={[ui.body, { color: palette.accent }]}>{error}</Text>{!ready && <Button secondary onPress={() => { void kitchen.hydrate(); }}>Réessayer</Button>}</View>}
  </View>;
}
export function FavoriteButton({ id }: { id: string }) {
  const { data, ready, saving } = useKitchen();
  const selected = data.favorites.includes(id);
  return <Pressable accessibilityRole="button" accessibilityLabel={selected ? 'Retirer des favoris' : 'Ajouter aux favoris'} accessibilityState={{ selected, disabled: !ready || saving }} disabled={!ready || saving} onPress={() => { void kitchen.toggleFavorite(id); }} style={[styles.favorite, (!ready || saving) && { opacity: 0.5 }]}><Text style={{ color: palette.green, fontSize: 15, fontWeight: '600' }}>{selected ? '♥ Dans mes favoris' : '♡ Ajouter aux favoris'}</Text></Pressable>;
}
const styles = StyleSheet.create({
  navigation: { flexDirection: 'row', gap: 6, flexWrap: 'wrap', backgroundColor: palette.soft, padding: 5, borderRadius: 17, alignSelf: 'flex-start' },
  link: { minHeight: 46, justifyContent: 'center', paddingHorizontal: 17, paddingVertical: 12, borderRadius: 12 },
  favorite: { backgroundColor: palette.soft, minHeight: 48, paddingHorizontal: 18, paddingVertical: 14, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  status: { color: palette.muted, fontSize: 12 },
  error: { backgroundColor: '#F8EBE3', padding: 15, borderRadius: 12, gap: 12 },
});
