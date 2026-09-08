import { Image } from 'expo-image';
import { useState, type ReactNode } from 'react';
import { Platform, Pressable, StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { photo, type Recipe } from '@/data/recipes';

export const palette = { background: '#F8F7F2', ink: '#253C2F', muted: '#647064', green: '#31573B', soft: '#E9EDDF', border: '#DFE3D6', white: '#FFFFFF', accent: '#B95A36' };
export const serif = Platform.select({ ios: 'Georgia', android: 'serif', default: 'Georgia' });
export function Button({ children, onPress, secondary = false, disabled = false, label }: { children: ReactNode; onPress: () => void; secondary?: boolean; disabled?: boolean; label?: string }) {
  return <Pressable accessibilityRole="button" accessibilityLabel={label} accessibilityState={{ disabled }} disabled={disabled} onPress={onPress} style={({ pressed }) => [ui.button, secondary && ui.secondary, (pressed || disabled) && { opacity: 0.5 }]}><Text style={[ui.buttonText, secondary && { color: palette.ink }]}>{children}</Text></Pressable>;
}
export function RecipePhoto({ recipe, style }: { recipe: Recipe; style?: StyleProp<ViewStyle> }) {
  const [failed, setFailed] = useState(false);
  return <View style={[{ backgroundColor: palette.soft, overflow: 'hidden', justifyContent: 'center', alignItems: 'center' }, style]}>{failed ? <Text style={{ color: palette.muted, padding: 20 }}>{recipe.title}</Text> : <Image source={{ uri: photo(recipe) }} accessibilityLabel={`Illustration : ${recipe.title}`} style={StyleSheet.absoluteFill} contentFit="cover" onError={() => setFailed(true)} />}</View>;
}
export const ui = StyleSheet.create({
  page: { flex: 1, backgroundColor: palette.background },
  container: { width: '100%', maxWidth: 1120, alignSelf: 'center', padding: 24, paddingBottom: 48 },
  brand: { fontFamily: serif, fontSize: 30, fontWeight: '700', color: palette.ink },
  eyebrow: { fontSize: 11, fontWeight: '700', letterSpacing: 2, color: palette.green, textTransform: 'uppercase' },
  heading: { fontFamily: serif, fontSize: 32, lineHeight: 39, color: palette.ink },
  body: { color: palette.muted, fontSize: 16, lineHeight: 25 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12, flexWrap: 'wrap' },
  button: { minHeight: 48, paddingHorizontal: 22, paddingVertical: 14, borderRadius: 14, backgroundColor: palette.green, justifyContent: 'center', alignItems: 'center' },
  secondary: { backgroundColor: palette.soft },
  buttonText: { color: palette.white, fontWeight: '600', fontSize: 15 },
  tag: { color: palette.green, backgroundColor: palette.soft, paddingHorizontal: 12, paddingVertical: 7, borderRadius: 20, fontSize: 12 },
});
