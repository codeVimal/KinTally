import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '../hooks/useTheme';
import MonthSelector from '../components/MonthSelector';
import TopTabs from '../components/TopTabs';
import TransactionItem from '../components/TransactionItem';
import FloatingButton from '../components/FloatingButton';
import EditTransaction from '../components/EditTransaction';
import { format, parseISO } from 'date-fns';
import { useCategories } from '../hooks/useCategories';

const Index = () => {
  const { theme } = useTheme();
  const { categories } = useCategories();
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [activeTab, setActiveTab] = useState('Daily');
  const [transactions, setTransactions] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  useEffect(() => {
    setTransactions([
      { id: '1', amount: '120', category: 'Food', description: 'Pizza', date: '2025-06-14' },
      { id: '2', amount: '300', category: 'Transport', description: 'Uber', date: '2025-06-13' },
      { id: '3', amount: '150', category: 'Bills', description: 'Electricity', date: '2025-06-13' },
      { id: '4', amount: '500', category: 'Shopping', description: 'Shoes', date: '2025-06-12' },
    ]);
  }, []);

  const filteredTransactions = transactions.filter(
    (tx) => new Date(tx.date).getMonth() === selectedMonth.getMonth()
  );

  const groupedByDate = filteredTransactions.reduce((acc, tx) => {
    const dateKey = format(parseISO(tx.date), 'yyyy-MM-dd');
    if (!acc[dateKey]) acc[dateKey] = [];
    acc[dateKey].push(tx);
    return acc;
  }, {});

  const updateTransaction = (updated) => {
    setTransactions((prev) =>
      prev.map((tx) => (tx.id === updated.id ? updated : tx))
    );
    setSelectedTransaction(null);
  };

  const addTransaction = (tx) => {
    setTransactions((prev) => [{ ...tx, id: Date.now().toString() }, ...prev]);
    setSelectedTransaction(null);
  };

  const totalSpend = filteredTransactions.reduce((sum, tx) => sum + parseFloat(tx.amount), 0);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <MonthSelector selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth} />
      <TopTabs activeTab={activeTab} setActiveTab={setActiveTab} tabs={['Daily', 'Summary']} />

      <ScrollView>
        {activeTab === 'Daily' ? (
          <>
            {Object.keys(groupedByDate)
              .sort((a, b) => new Date(b) - new Date(a))
              .map((date) => (
                <View key={date} style={styles.section}>
                  <Text style={[styles.date, { color: theme.primaryColor }]}>
                    {format(new Date(date), 'dd MMM yyyy')}
                  </Text>
                  {groupedByDate[date].map((tx) => (
                    <View key={tx.id}>
                      <TransactionItem transaction={tx} onEdit={() => setSelectedTransaction(tx)} />
                      {selectedTransaction?.id === tx.id && (
                        <EditTransaction
                          transaction={tx}
                          onSave={updateTransaction}
                          onCancel={() => setSelectedTransaction(null)}
                        />
                      )}
                    </View>
                  ))}
                </View>
              ))}
            {selectedTransaction && selectedTransaction.id === undefined && (
              <EditTransaction
                transaction={{
                  id: '',
                  amount: '',
                  category: '',
                  description: '',
                  date: new Date().toISOString(),
                }}
                onSave={addTransaction}
                onCancel={() => setSelectedTransaction(null)}
              />
            )}
          </>
        ) : (
          <View style={styles.summary}>
            <Text style={[styles.summaryTitle, { color: theme.text }]}>Total Spent</Text>
            <Text style={[styles.summaryAmount, { color: theme.primaryColor }]}>₹{totalSpend}</Text>
            <Text style={[styles.summaryTitle, { color: theme.subtext, marginTop: 20 }]}>By Category</Text>
            {categories.map((cat) => {
              const catSpend = filteredTransactions
                .filter((tx) => tx.category === cat.name)
                .reduce((sum, tx) => sum + parseFloat(tx.amount), 0);
              return (
                <View key={cat.name} style={styles.categoryRow}>
                  <Text style={[styles.categoryLabel, { color: theme.text }]}>{cat.name}</Text>
                  <Text style={[styles.categoryAmount, { color: theme.text }]}>₹{catSpend}</Text>
                </View>
              );
            })}
          </View>
        )}
      </ScrollView>

      <FloatingButton onPress={() => setSelectedTransaction({})} />
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  section: { marginBottom: 20 },
  date: { fontSize: 16, fontWeight: '600', marginBottom: 8 },
  summary: { marginTop: 20 },
  summaryTitle: { fontSize: 18, fontWeight: 'bold' },
  summaryAmount: { fontSize: 32, fontWeight: 'bold', marginTop: 8 },
  categoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  categoryLabel: { fontSize: 16 },
  categoryAmount: { fontSize: 16 },
});
