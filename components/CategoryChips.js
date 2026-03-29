import React from 'react';
import { ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native';

const CategoryChips = ({ categories, selectedCategory, onSelect }) => {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipsContainer}>
      {categories.map((cat, index) => (
        <TouchableOpacity 
          key={index} 
          style={[styles.chip, selectedCategory === cat && styles.chipActive]}
          onPress={() => onSelect(cat)}
        >
          <Text style={[styles.chipText, selectedCategory === cat && styles.chipTextActive]}>{cat}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  chipsContainer: { flexDirection: 'row', marginTop: 12 },
  chip: { backgroundColor: '#F0F0F0', paddingVertical: 8, paddingHorizontal: 16, borderRadius: 20, marginRight: 8 },
  chipActive: { backgroundColor: '#000' },
  chipText: { fontSize: 13, color: '#555', fontWeight: '600' },
  chipTextActive: { color: '#FFF' },
});

export default CategoryChips;
