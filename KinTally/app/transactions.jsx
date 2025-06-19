import { StyleSheet, Text, View, FlatList } from 'react-native';
import React from 'react';

const dummyData = [
  { id: '1', description: 'Groceries', amount: -1200 },
  { id: '2', description: 'Salary', amount: 15000 },
  { id: '3', description: 'Movie', amount: -500 },
];

const Transactions = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Transactions</Text>

      <FlatList
        data={dummyData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.description}>{item.description}</Text>
            <Text style={[styles.amount, item.amount < 0 ? styles.expense : styles.income]}>
              ₹{item.amount}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

export default Transactions;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: '#E2E8F0',
    borderWidth: 1,
  },
  description: {
    fontSize: 16,
    color: '#334155',
  },
  amount: {
    fontSize: 16,
    fontWeight: '600',
  },
  income: {
    color: '#16A34A',
  },
  expense: {
    color: '#DC2626',
  },
});
