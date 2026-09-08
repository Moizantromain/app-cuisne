import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, palette, RecipePhoto, serif, ui } from '@/components/cuisine-ui';
import { FavoriteButton, KitchenNavigation } from '@/components/kitchen-navigation';
import { kitchen, useKitchen } from '@/state/use-kitchen';
import { recipeIngredients } from '@/state/kitchen';
import { duration, ingredientAmount, recipes, type Recipe } from '@/data/recipes';

export function generateStaticParams() { return recipes.map(recipe => ({ id: recipe.id })); }

export default function RecipeScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const recipe = recipes.find(item => item.id === id);
  if (!recipe) return <SafeAreaView style={ui.page}><View style={[ui.container, { gap: 24 }]}><Text style={ui.heading}>Cette recette est introuvable</Text><Button onPress={() => router.replace('/')}>Revenir aux recettes</Button></View></SafeAreaView>;
  return <RecipeDetail key={recipe.id} recipe={recipe} />;
}
function RecipeDetail({ recipe }: { recipe: Recipe }) {
  const { ready, saving } = useKitchen();
  const [added, setAdded] = useState(false);
  const [portions, setPortions] = useState(recipe.portions);
  const [checked, setChecked] = useState<number[]>([]);
  const wide = useWindowDimensions().width >= 760;
  return <SafeAreaView style={ui.page}>
    <ScrollView contentContainerStyle={ui.container}>
      <View style={[ui.row, { justifyContent: 'space-between', marginBottom: 24 }]}><Button secondary onPress={() => router.canGoBack() ? router.back() : router.replace('/')}>← Les recettes</Button><Text style={ui.brand}>cuisine.</Text></View>
      <KitchenNavigation />
      <View style={[styles.top, { flexDirection: wide ? 'row' : 'column' }]}>
        <RecipePhoto recipe={recipe} style={[styles.photo, wide && { flex: 1 }]} />
        <View style={[styles.intro, wide && { flex: 1 }]}>
          <Text style={ui.eyebrow}>{recipe.category} · {recipe.origin}</Text>
          <Text accessibilityRole="header" style={styles.title}>{recipe.title}</Text>
          <Text style={ui.body}>{recipe.description}</Text>
          <View style={ui.row}>{recipe.tags.map(tag => <Text key={tag} style={ui.tag}>{tag}</Text>)}</View>
          <FavoriteButton id={recipe.id} />
          <View style={styles.stats}><View><Text style={styles.statValue}>{duration(recipe.minutes)}</Text><Text style={ui.body}>Temps total</Text></View><View><Text style={styles.statValue}>{duration(recipe.prep)}</Text><Text style={ui.body}>Préparation</Text></View></View>
        </View>
      </View>
      <View style={[styles.columns, { flexDirection: wide ? 'row' : 'column' }]}>
        <View style={[styles.ingredients, wide && { flex: 0.9 }]}>
          <Text accessibilityRole="header" style={ui.heading}>Ingrédients</Text>
          <View style={[ui.row, { justifyContent: 'space-between', marginVertical: 20 }]}>
            <Text style={ui.body}>Pour</Text><View style={ui.row}><Button secondary label="Diminuer le nombre de personnes" disabled={portions <= 1} onPress={() => { setPortions(value => value - 1); setAdded(false); }}>−</Button><Text accessibilityLiveRegion="polite" style={{ color: palette.ink, fontWeight: '600' }}>{portions} pers.</Text><Button secondary label="Augmenter le nombre de personnes" disabled={portions >= 20} onPress={() => { setPortions(value => value + 1); setAdded(false); }}>+</Button></View>
          </View>
          <View style={{ gap: 12, marginBottom: 20 }}>
            <Button disabled={!ready || saving} onPress={async () => { const success = await kitchen.addIngredients(recipeIngredients(recipe, portions)); if (success) setAdded(true); }}>{added ? 'Ajouter à nouveau aux courses' : `Ajouter aux courses · ${portions} pers.`}</Button>
            {added && <Text accessibilityLiveRegion="polite" style={ui.body}>Les ingrédients ont été enregistrés dans votre liste.</Text>}
            {added && <Button secondary onPress={() => router.navigate('/courses')}>Voir ma liste de courses →</Button>}
          </View>
          <Text style={[ui.body, { fontSize: 12, marginBottom: 15 }]}>Les quantités s’ajustent automatiquement. Touchez un ingrédient pour le cocher.</Text>
          {recipe.ingredients.map((item, index) => {
            const done = checked.includes(index);
            return <Pressable accessibilityRole="checkbox" accessibilityState={{ checked: done }} accessibilityLabel={`${item.name}, ${ingredientAmount(item, portions, recipe.portions)}`} key={item.name} onPress={() => setChecked(current => done ? current.filter(value => value !== index) : [...current, index])} style={styles.ingredient}>
              <View style={[styles.check, done && { backgroundColor: palette.green }]}><Text style={{ color: 'white' }}>{done ? '✓' : ''}</Text></View>
              <Text style={[styles.ingredientName, done && { textDecorationLine: 'line-through', color: palette.muted }]}>{item.name}</Text><Text style={styles.amount}>{ingredientAmount(item, portions, recipe.portions)}</Text>
            </Pressable>;
          })}
        </View>
        <View style={[styles.preparation, wide && { flex: 1.25 }]}>
          <Text accessibilityRole="header" style={ui.heading}>En cuisine</Text>
          <Text style={[ui.body, { marginTop: 7, marginBottom: 25 }]}>Prenez votre temps, le bon goût suit.</Text>
          {recipe.steps.map((step, index) => <View key={step} style={styles.step}><View style={styles.number}><Text style={{ fontFamily: serif, fontSize: 23, color: palette.green }}>{String(index + 1).padStart(2, '0')}</Text></View><Text style={[ui.body, { flex: 1, color: palette.ink }]}>{step}</Text></View>)}
          <View style={styles.tip}><Text style={ui.eyebrow}>Le petit conseil</Text><Text style={ui.body}>{recipe.tip}</Text></View>
        </View>
      </View>
      <Text style={[ui.body, { fontSize: 12, textAlign: 'center', marginTop: 30 }]}>Recette de démonstration · Photo d’illustration Unsplash</Text>
    </ScrollView>
  </SafeAreaView>;
}
const styles = StyleSheet.create({
  top: { gap: 32 }, photo: { minHeight: 320, borderRadius: 22 },
  intro: { gap: 18, justifyContent: 'center', paddingVertical: 12 },
  title: { fontFamily: serif, fontSize: 40, lineHeight: 46, color: palette.ink },
  stats: { flexDirection: 'row', gap: 35, borderTopWidth: 1, borderColor: palette.border, paddingTop: 20 },
  statValue: { fontSize: 22, fontWeight: '600', color: palette.ink, marginBottom: 4 },
  columns: { marginTop: 40, gap: 36, alignItems: 'flex-start' },
  ingredients: { backgroundColor: palette.white, padding: 22, borderRadius: 20, borderWidth: 1, borderColor: palette.border, width: '100%' },
  ingredient: { flexDirection: 'row', gap: 10, alignItems: 'center', paddingVertical: 16, minHeight: 55, borderTopWidth: 1, borderColor: palette.border },
  check: { width: 23, height: 23, borderRadius: 7, borderWidth: 1, borderColor: palette.green, alignItems: 'center', justifyContent: 'center' },
  ingredientName: { flex: 1, fontSize: 15, lineHeight: 22, color: palette.ink },
  amount: { maxWidth: '36%', fontSize: 14, lineHeight: 21, color: palette.green, fontWeight: '600', textAlign: 'right' },
  preparation: { width: '100%' },
  step: { flexDirection: 'row', gap: 18, marginBottom: 25 },
  number: { backgroundColor: palette.soft, width: 43, height: 43, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  tip: { backgroundColor: '#EEEBDD', borderRadius: 18, padding: 23, gap: 10 },
});
