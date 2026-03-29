import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemeContext } from '../context/ThemeContext'; 

const InsightCard = ({ totalIncome, totalExpense }) => {
  const { colors, isDark } = useContext(ThemeContext); 

  return (
    <View style={[styles.insightCard, { backgroundColor: colors.card }]}>
      <View style={styles.insightRow}>
        
        <View style={styles.insightItem}>
          <View style={[styles.iconBox, { backgroundColor: isDark ? '#003322' : '#E0F8EF' }]}>
            <Ionicons name="arrow-down" size={20} color="#00B87C" />
          </View>
          <Text style={[styles.insightLabel, { color: colors.subtext }]}>Total Pemasukan</Text>
          <Text style={styles.insightAmountIncome}>Rp {totalIncome.toLocaleString('id-ID')}</Text>
        </View>
        <View style={[styles.divider, { backgroundColor: colors.border }]} />
        <View style={styles.insightItem}>
          <View style={[styles.iconBox, { backgroundColor: isDark ? '#330000' : '#FFEAEA' }]}>
            <Ionicons name="arrow-up" size={20} color="#FF4D4D" />
          </View>
          <Text style={[styles.insightLabel, { color: colors.subtext }]}>Total Pengeluaran</Text>
          <Text style={styles.insightAmountExpense}>Rp {totalExpense.toLocaleString('id-ID')}</Text>
        </View>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  insightCard: { 
    borderRadius: 24, padding: 24, marginBottom: 30, 
    shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 10, elevation: 2 
  },
  insightRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  insightItem: { flex: 1, alignItems: 'center' },
  divider: { width: 1, height: 50, marginHorizontal: 10 },
  iconBox: { width: 44, height: 44, borderRadius: 22, justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  insightLabel: { fontSize: 13, fontWeight: '600', marginBottom: 4 },
  insightAmountIncome: { fontSize: 18, fontWeight: '800', color: '#00B87C' }, 
  insightAmountExpense: { fontSize: 18, fontWeight: '800', color: '#FF4D4D' }, 
});

export default InsightCard;