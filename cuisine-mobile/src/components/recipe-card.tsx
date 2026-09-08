import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View, type DimensionValue } from 'react-native';
import { duration, type Recipe } from '@/data/recipes';
import { palette, RecipePhoto, serif, ui } from './cuisine-ui';
import { FavoriteButton } from './kitchen-navigation';

export function RecipeCard({ recipe, width }: { recipe: Recipe; width: DimensionValue }) {
  return <View style={[styles.card, { width }]}>
    <Pressable accessibilityRole="button" accessibilityLabel={`Voir la recette : ${recipe.title}`} onPress={() => router.push({ pathname: '/recette/[id]', params: { id: recipe.id } })} style={({ pressed }) => ({ opacity: pressed ? 0.8 : 1 })}>
      <RecipePhoto recipe={recipe} style={{ height: 210 }} />
      <View style={styles.copy}><Text style={ui.eyebrow}>{recipe.category} · {recipe.origin}</Text><Text style={styles.title}>{recipe.title}</Text><View style={[ui.row, { justifyContent: 'space-between' }]}><Text style={ui.body}>{duration(recipe.minutes)} · {recipe.portions} pers.</Text><Text style={{ color: palette.green, fontSize: 23 }}>↗</Text></View></View>
    </Pressable>
    <View style={{ paddingHorizontal: 19, paddingBottom: 19 }}><FavoriteButton id={recipe.id} /></View>
  </View>;
}
const styles = StyleSheet.create({
  card: { backgroundColor: palette.white, borderRadius: 19, overflow: 'hidden', borderWidth: 1, borderColor: palette.border, justifyContent: 'space-between' },
  copy: { padding: 19, gap: 11 },
  title: { fontFamily: serif, fontSize: 23, lineHeight: 29, color: palette.ink },
});
