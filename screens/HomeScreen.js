import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, Platform, StatusBar, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TransactionContext } from '../context/TransactionContext';
import { ThemeContext } from '../context/ThemeContext'; 
import { useWallet } from '../hooks/useWallet';
import TransactionCard from '../components/TransactionCard';
import BalanceCard from '../components/BalanceCard';
import Filtering from '../components/Filtering';

const HomeScreen = () => {
  const { state, deleteTransaction, clearAllTransactions } = useContext(TransactionContext);
  const { isDark, toggleTheme, colors } = useContext(ThemeContext); 
  const { totalBalance, totalIncome, totalExpense } = useWallet();
  const [filter, setFilter] = useState('all');

  const filteredTransactions = state.transactions.filter((t) => {
    if (filter === 'all') return true;
    return t.type === filter;
  });

  const handleClearAll = () => {
    if (state.transactions.length === 0) {
      Alert.alert('Info', 'Belum ada data transaksi untuk dihapus.');
      return;
    }

    Alert.alert(
      'Hapus Semua Data?',
      'Data yang dihapus tidak dapat dikembalikan.',
      [
        { text: 'Batal', style: 'cancel' },
        { text: 'Ya, Hapus Semua', style: 'destructive', onPress: () => clearAllTransactions() },
      ]
    );
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <View style={styles.container}>
        
        <View style={styles.topHeader}>
          <View style={[styles.avatarMock, { backgroundColor: colors.card }]}>
            <Text style={{fontSize: 20}}>😎</Text>
          </View>
          
          <View style={styles.headerIcons}>
            <TouchableOpacity onPress={toggleTheme} style={[styles.themeBtn, { backgroundColor: colors.card }]}>
              <Ionicons name={isDark ? "sunny" : "moon"} size={22} color={isDark ? "#FFD700" : "#555"} />
            </TouchableOpacity>
          </View>
        </View>

        <Filtering filter={filter} setFilter={setFilter} />
        
        <BalanceCard 
          totalBalance={totalBalance} 
          totalIncome={totalIncome} 
          totalExpense={totalExpense} 
        />

        <View style={[styles.listContainer, { backgroundColor: colors.card }]}>
          <View style={styles.listHeader}>
            <Text style={[styles.listTitle, { color: colors.text }]}>Riwayat Transaksi</Text>
            
            <TouchableOpacity onPress={handleClearAll} style={styles.clearAllBtn}>
              <Ionicons name="trash-outline" size={16} color="#FF4D4D" />
              <Text style={styles.clearAllText}>Hapus Semua</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={filteredTransactions}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <TransactionCard transaction={item} onDelete={deleteTransaction} />}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 100 }}
            ListEmptyComponent={<Text style={[styles.emptyText, { color: colors.subtext }]}>Belum ada transaksi.</Text>}
          />
        </View>

      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 },
  container: { flex: 1, paddingHorizontal: 20 },
  topHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20, marginBottom: 25 },
  avatarMock: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center', elevation: 2 },
  headerIcons: { flexDirection: 'row', alignItems: 'center' },
  themeBtn: { width: 44, height: 44, borderRadius: 22, justifyContent: 'center', alignItems: 'center', elevation: 2, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 5 },
  listContainer: { flex: 1, borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24, marginHorizontal: -20 },
  listHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  listTitle: { fontSize: 18, fontWeight: '700' },
  emptyText: { textAlign: 'center', marginTop: 30, fontWeight: '500' },
  clearAllBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFEAEA', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 12 },
  clearAllText: { color: '#FF4D4D', fontSize: 12, fontWeight: '700', marginLeft: 4 }
});

export default HomeScreen;