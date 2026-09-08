import { router } from 'expo-router';
import { ScrollView, Text, useWindowDimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, ui } from '@/components/cuisine-ui';
import { KitchenNavigation } from '@/components/kitchen-navigation';
import { RecipeCard } from '@/components/recipe-card';
import { recipes } from '@/data/recipes';
import { useKitchen } from '@/state/use-kitchen';

export default function FavoritesScreen() {
  const { data, ready } = useKitchen();
  const { width } = useWindowDimensions();
  const favorites = recipes.filter(recipe => data.favorites.includes(recipe.id));
  return <SafeAreaView style={ui.page}><ScrollView contentContainerStyle={ui.container}>
    <Text style={[ui.brand, { marginBottom: 24 }]}>cuisine.</Text>
    <KitchenNavigation />
    <Text style={ui.eyebrow}>À garder tout près</Text>
    <Text accessibilityRole="header" style={[ui.heading, { marginTop: 12, marginBottom: 10 }]}>Mes recettes favorites</Text>
    <Text style={[ui.body, { marginBottom: 28 }]}>Vos bonnes idées pour les prochains repas, réunies ici.</Text>
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: 22 }}>{favorites.map(recipe => <RecipeCard key={recipe.id} recipe={recipe} width={width >= 760 ? '31.8%' : width >= 520 ? '48%' : '100%'} />)}</View>
    {ready && !favorites.length && <View style={{ gap: 20, paddingVertical: 30, alignItems: 'flex-start' }}><Text style={ui.heading}>Votre prochain coup de cœur vous attend</Text><Text style={ui.body}>Touchez « Ajouter aux favoris » sur une recette pour la retrouver ici.</Text><Button onPress={() => router.navigate('/')}>Découvrir les recettes →</Button></View>}
  </ScrollView></SafeAreaView>;
}
