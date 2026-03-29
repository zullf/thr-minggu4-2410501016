import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ThemeContext } from '../context/ThemeContext'; 

const Filtering = ({ filter, setFilter }) => {
  const { colors, isDark } = useContext(ThemeContext); 
  
  const options = [
    { key: 'all', label: 'Semua' },
    { key: 'income', label: 'Pemasukan' },
    { key: 'expense', label: 'Pengeluaran' }
  ];

  return (
    <View style={styles.pillsContainer}>
      {options.map((opt) => {
        const isActive = filter === opt.key;
        return (
          <TouchableOpacity 
            key={opt.key} 
            style={[styles.pill, { backgroundColor: isActive ? colors.primaryBg : colors.border }]}
            onPress={() => setFilter(opt.key)}
          >
            <Text style={[styles.pillText, { 
              color: isActive ? colors.primaryText : colors.subtext,
              fontWeight: isActive ? '700' : '600'
            }]}>
              {opt.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  pillsContainer: { flexDirection: 'row', marginBottom: 20 },
  pill: { paddingVertical: 10, paddingHorizontal: 20, borderRadius: 20, marginRight: 10 },
  pillText: { fontSize: 14 },
});

export default Filtering;
