import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../hooks/useTheme';
import { MaterialIcons } from '@expo/vector-icons';

const TransactionItem = ({ transaction, onEdit }) => {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.card }]}>
      <View style={styles.row}>
        <View>
          <Text style={[styles.amount, { color: theme.primaryColor }]}>₹{transaction.amount}</Text>
          <Text style={[styles.description, { color: theme.text }]}>{transaction.description}</Text>
        </View>
        <Text style={[styles.category, { color: theme.subtext }]}>{transaction.category}</Text>
      </View>

      <TouchableOpacity onPress={onEdit} style={styles.editIcon}>
        <MaterialIcons name="edit" size={20} color={theme.text} />
      </TouchableOpacity>
    </View>
  );
};

export default TransactionItem;

const styles = StyleSheet.create({
  container: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    position: 'relative',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  amount: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    marginTop: 2,
  },
  category: {
    fontSize: 14,
    fontStyle: 'italic',
  },
  editIcon: {
    position: 'absolute',
    bottom: 8,
    right: 8,
  },
});
