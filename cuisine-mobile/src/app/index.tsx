import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, useWindowDimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, palette, RecipePhoto, serif, ui } from '@/components/cuisine-ui';
import { KitchenNavigation } from '@/components/kitchen-navigation';
import { RecipeCard } from '@/components/recipe-card';
import { categories, recipes, searchRecipes } from '@/data/recipes';

export default function HomeScreen() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('Tout');
  const { width } = useWindowDimensions();
  const wide = width >= 760;
  const results = searchRecipes(query, category);
  const featured = recipes[0];
  const open = (id: string) => router.push({ pathname: '/recette/[id]', params: { id } });
  return <SafeAreaView style={ui.page}>
    <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={ui.container}>
      <View style={styles.header}><Text style={ui.brand}>cuisine<Text style={{ color: palette.accent }}>.</Text></Text><Text style={ui.eyebrow}>Le goût du quotidien</Text></View>
      <KitchenNavigation />
      <View style={[styles.hero, !wide && { flexDirection: 'column' }]}>
        <View style={[styles.heroCopy, !wide && { padding: 25 }]}>
          <Text style={ui.eyebrow}>De bonnes choses, simplement</Text>
          <Text accessibilityRole="header" style={[styles.title, !wide && { fontSize: 39, lineHeight: 45 }]}>Et si on cuisinait{wide ? '\n' : ' '}quelque chose de bon ?</Text>
          <Text style={ui.body}>Des idées faciles à aimer, des recettes à partager. Trouvez l’inspiration pour votre prochain repas.</Text>
          <View style={{ alignSelf: 'flex-start', marginTop: 8 }}><Button onPress={() => open(featured.id)}>La recette du jour  →</Button></View>
        </View>
        <View style={[styles.heroVisual, !wide && { minHeight: 240, flex: undefined }]}>
          <RecipePhoto recipe={featured} style={StyleSheet.absoluteFill} />
          <View style={styles.heroCaption}><Text style={ui.eyebrow}>Notre envie du jour</Text><Text style={styles.featureTitle}>{featured.title}</Text><Text style={ui.body}>15 min · Fraîche & pleine de couleurs</Text></View>
        </View>
      </View>
      <View style={styles.intro}><Text accessibilityRole="header" style={ui.heading}>À votre goût</Text><Text style={ui.body}>Une envie, un ingrédient… et on passe en cuisine.</Text></View>
      <View style={styles.search}>
        <Text style={{ fontSize: 24, color: palette.green }} accessibilityElementsHidden>⌕</Text>
        <TextInput accessibilityLabel="Rechercher une recette ou un ingrédient" placeholder="Une recette, un ingrédient…" placeholderTextColor={palette.muted} value={query} onChangeText={setQuery} style={styles.input} returnKeyType="search" autoCorrect={false} />
        {query.length > 0 && <Pressable accessibilityRole="button" accessibilityLabel="Effacer la recherche" onPress={() => setQuery('')} style={styles.clear}><Text style={{ color: palette.ink, fontSize: 21 }}>×</Text></Pressable>}
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categories}>
        {categories.map(item => <Pressable key={item} accessibilityRole="button" accessibilityState={{ selected: category === item }} onPress={() => setCategory(item)} style={[styles.chip, category === item && styles.selected]}><Text style={[styles.chipText, category === item && { color: palette.white }]}>{item}</Text></Pressable>)}
      </ScrollView>
      <View style={[ui.row, { justifyContent: 'space-between', marginBottom: 20 }]}><Text accessibilityRole="header" style={[ui.heading, { fontSize: 25 }]}>{query.trim() || category !== 'Tout' ? 'Vos envies, nos recettes' : 'Un peu d’inspiration'}</Text><Text accessibilityLiveRegion="polite" style={ui.body}>{results.length} recette{results.length > 1 ? 's' : ''}</Text></View>
      <View style={styles.grid}>
        {results.map(recipe => <RecipeCard key={recipe.id} recipe={recipe} width={wide ? '31.8%' : width >= 520 ? '48%' : '100%'} />)}
      </View>
      {results.length === 0 && <View style={styles.empty}><Text style={ui.heading}>Pas encore de recette pour cette envie</Text><Text style={ui.body}>Essayez un autre ingrédient ou élargissez la catégorie.</Text><Button secondary onPress={() => { setQuery(''); setCategory('Tout'); }}>Voir toutes les recettes</Button></View>}
      <View style={styles.footer}><Text style={ui.brand}>À table.</Text><Text style={[ui.body, { textAlign: 'center', fontSize: 12 }]}>Une première sélection de recettes de démonstration.{ '\n' }Photos d’illustration · Unsplash</Text></View>
    </ScrollView>
  </SafeAreaView>;
}
const styles = StyleSheet.create({
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10, paddingBottom: 27 },
  hero: { backgroundColor: '#E9EDDF', flexDirection: 'row', borderRadius: 25, overflow: 'hidden' },
  heroCopy: { flex: 1.1, padding: 38, gap: 19 },
  title: { fontFamily: serif, color: palette.ink, fontSize: 46, lineHeight: 52, letterSpacing: -1.5 },
  heroVisual: { flex: 1, minHeight: 385 },
  heroCaption: { backgroundColor: '#FFFFFFED', position: 'absolute', left: 20, right: 20, bottom: 20, padding: 18, borderRadius: 15, gap: 6 },
  featureTitle: { color: palette.ink, fontFamily: serif, fontSize: 23 },
  intro: { gap: 7, marginTop: 38, marginBottom: 21 },
  search: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: palette.white, borderWidth: 1, borderColor: palette.border, borderRadius: 14, paddingHorizontal: 18 },
  input: { flex: 1, minWidth: 0, color: palette.ink, fontSize: 16, paddingVertical: 18 },
  clear: { minWidth: 44, minHeight: 44, alignItems: 'center', justifyContent: 'center' },
  categories: { gap: 9, paddingVertical: 20, paddingBottom: 30 },
  chip: { borderWidth: 1, borderColor: palette.border, borderRadius: 30, paddingHorizontal: 20, minHeight: 46, justifyContent: 'center' },
  selected: { backgroundColor: palette.green, borderColor: palette.green },
  chipText: { fontSize: 14, color: palette.ink, fontWeight: '500' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: 22 },
  empty: { alignItems: 'center', gap: 20, paddingVertical: 35 },
  footer: { marginTop: 45, borderTopWidth: 1, borderColor: palette.border, paddingTop: 25, alignItems: 'center', gap: 12 },
});
