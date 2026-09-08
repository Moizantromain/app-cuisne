import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, palette, ui } from '@/components/cuisine-ui';
import { KitchenNavigation } from '@/components/kitchen-navigation';
import { ingredientAmount, type Ingredient } from '@/data/recipes';
import { parseItem, type ShoppingItem } from '@/state/kitchen';
import { kitchen, useKitchen } from '@/state/use-kitchen';

function ItemForm({ item, onSave, onCancel, disabled }: { item?: ShoppingItem; onSave: (value: Ingredient) => Promise<boolean>; onCancel?: () => void; disabled: boolean }) {
  const [name, setName] = useState(item?.name ?? '');
  const [amount, setAmount] = useState(item?.quantity?.toString().replace('.', ',') ?? '');
  const [unit, setUnit] = useState(item?.unit ?? '');
  const [note, setNote] = useState(item?.note ?? '');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const blocked = disabled || submitting;
  async function submit() {
    if (blocked) return;
    const value = parseItem(name, amount, unit, note);
    if (!value) { setError('Indiquez un nom et, si renseignée, une quantité supérieure à zéro.'); return; }
    setError('');
    setSubmitting(true);
    try {
      if (await onSave(value) && !item) { setName(''); setAmount(''); setUnit(''); setNote(''); }
    } finally { setSubmitting(false); }
  }
  return <View style={styles.form}>
    <Text style={[ui.eyebrow, { marginBottom: 6 }]}>{item ? 'Modifier cet article' : 'Un petit oubli ?'}</Text>
    <Text style={styles.label}>Article</Text>
    <TextInput accessibilityLabel={item ? 'Modifier le nom de l’article' : 'Nom de l’article'} editable={!blocked} value={name} onChangeText={setName} placeholder="Ex. Pommes" placeholderTextColor={palette.muted} maxLength={120} style={styles.input} />
    <View style={[ui.row, { alignItems: 'flex-start' }]}>
      <View style={styles.field}><Text style={styles.label}>Quantité (facultative)</Text><TextInput accessibilityLabel="Quantité" editable={!blocked} value={amount} onChangeText={setAmount} placeholder="Ex. 4" placeholderTextColor={palette.muted} keyboardType="decimal-pad" maxLength={12} style={styles.input} /></View>
      <View style={styles.field}><Text style={styles.label}>Unité (facultative)</Text><TextInput accessibilityLabel="Unité" editable={!blocked} value={unit} onChangeText={setUnit} placeholder="Ex. g, ml, pièces" placeholderTextColor={palette.muted} maxLength={40} style={styles.input} /></View>
    </View>
    <Text style={styles.label}>Précision (facultative)</Text><TextInput accessibilityLabel="Précision" editable={!blocked} value={note} onChangeText={setNote} placeholder="Ex. Bien mûres" placeholderTextColor={palette.muted} maxLength={160} style={styles.input} />
    {!!error && <Text accessibilityRole="alert" style={{ color: palette.accent }}>{error}</Text>}
    <View style={ui.row}><Button disabled={blocked} onPress={() => { void submit(); }}>{item ? 'Enregistrer' : 'Ajouter à ma liste'}</Button>{onCancel && <Button secondary disabled={submitting} onPress={onCancel}>Annuler</Button>}</View>
  </View>;
}

export default function ShoppingScreen() {
  const { data, ready, saving } = useKitchen();
  const [editing, setEditing] = useState<string | null>(null);
  const [notice, setNotice] = useState('');
  const pending = data.items.filter(item => !item.checked);
  const purchased = data.items.filter(item => item.checked);
  const disabled = !ready || saving;
  function itemRow(item: ShoppingItem) {
    if (editing === item.id) return <ItemForm key={item.id} item={item} disabled={disabled} onCancel={() => setEditing(null)} onSave={async value => { const success = await kitchen.editItem(item.id, value); if (success) { setEditing(null); setNotice('Article modifié.'); } return success; }} />;
    return <View key={item.id} style={styles.item}>
      <Pressable accessibilityRole="checkbox" accessibilityState={{ checked: item.checked, disabled }} accessibilityLabel={`${item.name}, ${ingredientAmount(item, 1, 1)}`} disabled={disabled} onPress={() => { void kitchen.toggleItem(item.id); }} style={styles.itemMain}>
        <View style={[styles.checkbox, item.checked && { backgroundColor: palette.green }]}><Text style={{ color: palette.white }}>{item.checked ? '✓' : ''}</Text></View>
        <View style={{ flex: 1 }}><Text style={[styles.itemName, item.checked && { textDecorationLine: 'line-through', color: palette.muted }]}>{item.name}</Text><Text style={ui.body}>{item.quantity === undefined && !item.note ? (item.unit ?? 'Quantité libre') : ingredientAmount(item, 1, 1)}</Text>{item.quantity !== undefined && !!item.note && <Text style={ui.body}>{item.note}</Text>}</View>
      </Pressable>
      <View style={[ui.row, { gap: 8 }]}><Pressable accessibilityRole="button" accessibilityLabel={`Modifier ${item.name}`} disabled={disabled} onPress={() => setEditing(item.id)} style={styles.action}><Text style={{ color: palette.green }}>Modifier</Text></Pressable><Pressable accessibilityRole="button" accessibilityLabel={`Supprimer ${item.name}`} disabled={disabled} onPress={async () => { if (await kitchen.removeItem(item.id)) setNotice(`${item.name} supprimé de la liste.`); }} style={styles.action}><Text style={{ color: palette.accent }}>Supprimer</Text></Pressable></View>
    </View>;
  }
  return <SafeAreaView style={ui.page}><ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={[ui.container, { maxWidth: 860 }]}>
    <Text style={[ui.brand, { marginBottom: 24 }]}>cuisine.</Text>
    <KitchenNavigation />
    <Text style={ui.eyebrow}>Pour ne rien oublier</Text><Text accessibilityRole="header" style={[ui.heading, { marginVertical: 12 }]}>Ma liste de courses</Text>
    <Text style={[ui.body, { marginBottom: 24 }]}>Ajoutez vos ingrédients, cochez vos achats. Votre liste vous attendra à la prochaine ouverture.</Text>
    <ItemForm disabled={disabled} onSave={async value => { const success = await kitchen.addIngredients([value]); if (success) setNotice(`${value.name} ajouté à la liste.`); return success; }} />
    {!!notice && <Text accessibilityLiveRegion="polite" style={[ui.body, { marginVertical: 16 }]}>{notice}</Text>}
    {ready && !data.items.length && <View style={{ gap: 18, paddingVertical: 26, alignItems: 'flex-start' }}><Text style={ui.heading}>Tout commence par une bonne recette</Text><Text style={ui.body}>Ajoutez les ingrédients depuis une fiche recette, ou écrivez votre premier article ci-dessus.</Text><Button secondary onPress={() => router.navigate('/')}>Trouver une recette →</Button></View>}
    {pending.length > 0 && <View style={{ marginTop: 24 }}><Text accessibilityRole="header" style={[ui.heading, { fontSize: 25, marginBottom: 14 }]}>À acheter · {pending.length}</Text>{pending.map(itemRow)}</View>}
    {ready && !pending.length && purchased.length > 0 && <Text style={[ui.body, { marginVertical: 20 }]}>Tout est dans le panier. Place à la cuisine !</Text>}
    {purchased.length > 0 && <View style={{ marginTop: 24 }}><View style={[ui.row, { justifyContent: 'space-between', marginBottom: 14 }]}><Text accessibilityRole="header" style={[ui.heading, { fontSize: 25 }]}>Déjà acheté · {purchased.length}</Text><Button secondary disabled={disabled} onPress={async () => { if (await kitchen.clearPurchased()) { setEditing(null); setNotice('Les articles achetés ont été retirés.'); } }}>Retirer les articles achetés</Button></View>{purchased.map(itemRow)}</View>}
    <Text style={[ui.body, { fontSize: 12, marginTop: 30 }]}>Favoris et courses sont enregistrés sur cet appareil ou dans ce navigateur, sans compte ni synchronisation entre appareils.</Text>
  </ScrollView></SafeAreaView>;
}
const styles = StyleSheet.create({
  form: { backgroundColor: palette.soft, borderRadius: 18, padding: 20, gap: 10, marginBottom: 14 },
  label: { color: palette.ink, fontSize: 13, fontWeight: '600' },
  input: { backgroundColor: palette.white, borderRadius: 11, borderWidth: 1, borderColor: palette.border, minHeight: 48, padding: 13, fontSize: 16, color: palette.ink },
  field: { flex: 1, minWidth: 130, gap: 8 },
  item: { backgroundColor: palette.white, borderWidth: 1, borderColor: palette.border, borderRadius: 15, padding: 14, marginBottom: 10, flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: 10 },
  itemMain: { flexDirection: 'row', alignItems: 'center', gap: 14, minHeight: 48, flex: 1, minWidth: 180 },
  checkbox: { width: 26, height: 26, borderWidth: 1, borderColor: palette.green, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  itemName: { color: palette.ink, fontSize: 17, lineHeight: 24, fontWeight: '500' },
  action: { minHeight: 44, justifyContent: 'center', paddingHorizontal: 9 },
});
