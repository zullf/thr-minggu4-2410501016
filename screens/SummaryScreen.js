import React, { useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TransactionContext } from '../context/TransactionContext';
import { ThemeContext } from '../context/ThemeContext'; 
import { useWallet } from '../hooks/useWallet';
import InsightCard from '../components/InsightCard';

const SimpleProgressBar = ({ percentage, color, trackColor, height = 6 }) => (
  <View style={{ width: '100%', height, backgroundColor: trackColor, borderRadius: height / 2, overflow: 'hidden' }}>
    <View style={{ width: `${percentage}%`, height: '100%', backgroundColor: color }} />
  </View>
);

const SummaryScreen = () => {
  const { state } = useContext(TransactionContext);
  const { colors } = useContext(ThemeContext);
  const { totalExpense, totalIncome } = useWallet();

  const expenses = state.transactions.filter(t => t.type === 'expense');
  const categoryTotals = expenses.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
    return acc;
  }, {});

  const categoryData = Object.keys(categoryTotals).map(key => ({
    name: key,
    amount: categoryTotals[key],
    percentage: totalExpense > 0 ? (categoryTotals[key] / totalExpense) * 100 : 0
  })).sort((a, b) => b.amount - a.amount);

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        
        <View style={styles.headerRow}>
          <Text style={[styles.pageTitle, { color: colors.text }]}>Statistik THR</Text>
        </View>

        <InsightCard totalIncome={totalIncome} totalExpense={totalExpense} />

        <View style={[styles.categorySection, { backgroundColor: colors.card }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Pengeluaran per Kategori</Text>
          
          {categoryData.length === 0 ? (
            <Text style={{ textAlign: 'center', color: colors.subtext }}>Belum ada data.</Text>
          ) : (
            categoryData.map((item, index) => (
              <View key={index} style={styles.categoryCard}>
                <View style={[styles.categoryIconRing, { borderColor: colors.border }]}>
                  <Ionicons name="grid" size={20} color={colors.text} />
                </View>

                <View style={styles.categoryInfo}>
                  <View style={styles.categoryTextRow}>
                    <Text style={[styles.categoryName, { color: colors.text }]}>{item.name}</Text>
                    <Text style={[styles.categoryAmount, { color: colors.text }]}>Rp {item.amount.toLocaleString('id-ID')}</Text>
                  </View>
                  <Text style={[styles.categoryPercentage, { color: colors.subtext }]}>{item.percentage.toFixed(1)}%</Text>
                  
                  <SimpleProgressBar percentage={item.percentage} height={6} color={colors.primaryBg} trackColor={colors.border} />
                </View>
              </View>
            ))
          )}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  container: { padding: 20, paddingBottom: 120 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, marginTop: 10 },
  pageTitle: { fontSize: 24, fontWeight: '800' },
  themeBtn: { width: 44, height: 44, borderRadius: 22, justifyContent: 'center', alignItems: 'center', elevation: 2 },
  categorySection: { borderRadius: 24, padding: 24 },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 20 },
  categoryCard: { flexDirection: 'row', alignItems: 'center', marginBottom: 24 },
  categoryIconRing: { width: 44, height: 44, borderRadius: 22, borderWidth: 2, alignItems: 'center', justifyContent: 'center', marginRight: 16 },
  categoryInfo: { flex: 1 },
  categoryTextRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  categoryName: { fontSize: 16, fontWeight: '700' },
  categoryAmount: { fontSize: 15, fontWeight: '700' },
  categoryPercentage: { fontSize: 12, marginBottom: 8 },
});

export default SummaryScreen;
