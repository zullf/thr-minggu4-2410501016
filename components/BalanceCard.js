import React, { useContext } from 'react'; 
import { View, Text, StyleSheet } from 'react-native';
import { ThemeContext } from '../context/ThemeContext'; 

const BalanceCard = ({ totalBalance, totalIncome, totalExpense }) => {
  const { colors } = useContext(ThemeContext); 
  const spentPercentage = totalIncome > 0 ? (totalExpense / totalIncome) * 100 : 0;
  const barColor = spentPercentage > 80 ? '#FF4D4D' : '#00B87C';

  return (
    <View style={[styles.balanceCard, { backgroundColor: colors.card }]}>
      <Text style={[styles.cardLabel, { color: colors.text }]}>Sisa Saldo THR</Text>
      <Text style={[styles.balanceAmount, { color: colors.text }]}>
        Rp {totalBalance.toLocaleString('id-ID')}
      </Text>
      
      <View style={[styles.progressBarBg, { backgroundColor: colors.border }]}>
        <View style={[styles.progressBarFill, { width: `${Math.min(spentPercentage, 100)}%`, backgroundColor: barColor }]} />
      </View>
      
      <View style={styles.progressTextRow}>
        <Text style={[styles.progressTextDetail, { color: colors.subtext }]}>
          Rp {totalExpense.toLocaleString('id-ID')} terpakai
        </Text>
        <Text style={[styles.progressTextDetail, { color: colors.subtext }]}>
          Rp {totalIncome.toLocaleString('id-ID')} total
        </Text>
      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  balanceCard: { 
    borderRadius: 24, padding: 24, marginBottom: 24, 
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, 
    shadowOpacity: 0.05, shadowRadius: 10, elevation: 2 
  },
  cardLabel: { fontSize: 14, fontWeight: '600', marginBottom: 8 },
  balanceAmount: { fontSize: 36, fontWeight: '800', marginBottom: 24, letterSpacing: -1 },
  progressBarBg: { height: 10, borderRadius: 5, marginBottom: 12, overflow: 'hidden' },
  progressBarFill: { height: '100%', borderRadius: 5 },
  progressTextRow: { flexDirection: 'row', justifyContent: 'space-between' },
  progressTextDetail: { fontSize: 13, fontWeight: '500' },
});

export default BalanceCard;