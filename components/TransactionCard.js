import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemeContext } from '../context/ThemeContext'; 

const TransactionCard = ({ transaction, onDelete }) => {
  const { colors } = useContext(ThemeContext); 
  const isIncome = transaction.type === 'income';

  return (
    <View style={[styles.card, { borderBottomColor: colors.border }]}>
      
      <View style={[styles.iconContainer, { borderColor: isIncome ? '#00B87C' : '#FF4D4D', backgroundColor: colors.background }]}>
        <Ionicons name={isIncome ? 'arrow-down' : 'arrow-up'} size={20} color={isIncome ? '#00B87C' : '#FF4D4D'} />
      </View>

      <View style={styles.infoContainer}>
        <Text style={[styles.title, { color: colors.text }]}>{transaction.title}</Text>
        <Text style={[styles.subtitle, { color: colors.subtext }]}>
          {transaction.category} • {transaction.date}
        </Text>
      </View>

      <View style={styles.amountContainer}>
        <Text style={[styles.amount, { color: isIncome ? colors.text : '#FF4D4D' }]}>
          {isIncome ? '' : '-'}Rp {transaction.amount.toLocaleString('id-ID')}
        </Text>
        <TouchableOpacity onPress={() => onDelete(transaction.id)}>
          <Text style={styles.deleteText}>Hapus</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: { paddingVertical: 16, borderBottomWidth: 1, flexDirection: 'row', alignItems: 'center' },
  iconContainer: { width: 48, height: 48, borderRadius: 24, borderWidth: 2, alignItems: 'center', justifyContent: 'center', marginRight: 16 },
  infoContainer: { flex: 1 },
  title: { fontSize: 16, fontWeight: '700', marginBottom: 4 },
  subtitle: { fontSize: 13, fontWeight: '500' },
  amountContainer: { alignItems: 'flex-end' },
  amount: { fontSize: 15, fontWeight: '700', marginBottom: 4 },
  deleteText: { color: '#888', fontSize: 12, fontWeight: '600' },
});

export default TransactionCard;
