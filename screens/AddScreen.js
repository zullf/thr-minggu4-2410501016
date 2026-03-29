import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TransactionContext } from '../context/TransactionContext';
import { ThemeContext } from '../context/ThemeContext'; 
import CategoryChips from '../components/CategoryChips';

const AddScreen = ({ navigation }) => {
  const { addTransaction } = useContext(TransactionContext);
  const { colors } = useContext(ThemeContext); 
  const [type, setType] = useState('income');
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');

  const suggestedCategories = type === 'expense' 
    ? ['Belanja', 'Sedekah', 'Transport', 'Keluarga', 'Lainnya']
    : ['THR', 'Gaji', 'Bonus', 'Hadiah', 'Lainnya'];

  const handleSave = () => {
    if (!title || !amount) {
      Alert.alert('Oops!', 'Judul dan Nominal tidak boleh kosong ya.');
      return;
    }

    const newTransaction = {
      id: Date.now().toString(),
      type, title,
      amount: parseFloat(amount.replace(/[^0-9]/g, '')),
      category: category || (type === 'income' ? 'Lainnya' : 'Umum'),
      date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }),
    };

    addTransaction(newTransaction);
    setTitle(''); setAmount(''); setCategory('');
    navigation.navigate('Home');
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
          
          <View style={styles.header}>
            <Text style={[styles.headerTitle, { color: colors.text }]}>Catat Transaksi</Text>
          </View>

          <View style={[styles.typeSwitcher, { backgroundColor: colors.border }]}>
             <TouchableOpacity style={[styles.typeBtn, type === 'income' && styles.typeBtnActiveIncome]} onPress={() => setType('income')}>
              <Text style={[styles.typeBtnText, { color: type === 'income' ? '#FFF' : colors.subtext }]}>Pemasukan</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.typeBtn, type === 'expense' && styles.typeBtnActiveExpense]} onPress={() => setType('expense')}>
              <Text style={[styles.typeBtnText, { color: type === 'expense' ? '#FFF' : colors.subtext }]}>Pengeluaran</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.amountContainer}>
            <Text style={[styles.currencyLabel, { color: colors.text }]}>Rp</Text>
            <TextInput 
              style={[styles.amountInput, { color: colors.text }]} 
              placeholder="0" 
              placeholderTextColor={colors.subtext}
              keyboardType="numeric" value={amount} onChangeText={setAmount} maxLength={12}
            />
          </View>

          <View style={[styles.formCard, { backgroundColor: colors.card }]}>
            <View style={styles.inputGroup}>
              <Text style={[styles.inputLabel, { color: colors.subtext }]}>Judul Transaksi</Text>
              <TextInput 
                style={[styles.input, { backgroundColor: colors.background, color: colors.text }]} 
                placeholder="Cth: Beli Baju Lebaran" 
                placeholderTextColor={colors.subtext}
                value={title} onChangeText={setTitle} 
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={[styles.inputLabel, { color: colors.subtext }]}>Kategori</Text>
              <TextInput 
                style={[styles.input, { backgroundColor: colors.background, color: colors.text }]} 
                placeholder="Cth: Belanja" 
                placeholderTextColor={colors.subtext}
                value={category} onChangeText={setCategory} 
              />
              
              <CategoryChips categories={suggestedCategories} selectedCategory={category} onSelect={setCategory} />
            </View>
          </View>

          <TouchableOpacity style={[styles.saveBtn, { backgroundColor: colors.primaryBg }]} onPress={handleSave}>
            <Text style={[styles.saveBtnText, { color: colors.primaryText }]}>Simpan Transaksi</Text>
            <Ionicons name="checkmark-circle" size={24} color={colors.primaryText} style={{marginLeft: 8}} />
          </TouchableOpacity>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  container: { padding: 20, paddingBottom: 120 },
  header: { alignItems: 'center', marginBottom: 30, marginTop: 10 },
  headerTitle: { fontSize: 20, fontWeight: '700' },
  typeSwitcher: { flexDirection: 'row', borderRadius: 30, padding: 4, marginBottom: 40 },
  typeBtn: { flex: 1, paddingVertical: 12, alignItems: 'center', borderRadius: 26 },
  typeBtnActiveExpense: { backgroundColor: '#FF4D4D', elevation: 4 },
  typeBtnActiveIncome: { backgroundColor: '#00B87C', elevation: 4 },
  typeBtnText: { fontSize: 15, fontWeight: '600' },
  amountContainer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 40 },
  currencyLabel: { fontSize: 28, fontWeight: '700', marginRight: 8, alignSelf: 'center' },
  amountInput: { fontSize: 48, fontWeight: '800', minWidth: 100, textAlign: 'center' },
  formCard: { borderRadius: 24, padding: 20, marginBottom: 30 },
  inputGroup: { marginBottom: 20 },
  inputLabel: { fontSize: 13, fontWeight: '600', marginBottom: 8 },
  input: { borderRadius: 12, padding: 16, fontSize: 16, fontWeight: '500' },
  saveBtn: { flexDirection: 'row', paddingVertical: 18, borderRadius: 30, justifyContent: 'center', alignItems: 'center', elevation: 5 },
  saveBtnText: { fontSize: 16, fontWeight: '700' }
});

export default AddScreen;
