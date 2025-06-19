import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { format } from 'date-fns';
import { Calendar } from 'react-native-calendars';

import MonthSelector from '../components/MonthSelector';
import TopTabs from '../components/TopTabs';
import { theme } from '../constants/theme';

const Index = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('Summary');
  const [selectedMonth, setSelectedMonth] = useState(new Date());

  const sampleTransactions = [
    { id: '1', name: 'Groceries', amount: 1200, date: '2025-06-01' },
    { id: '2', name: 'Bus Pass', amount: 300, date: '2025-06-03' },
  ];

  const renderDaily = () => (
    <FlatList
      data={sampleTransactions.filter(
        item => new Date(item.date).getMonth() === selectedMonth.getMonth()
      )}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <View style={styles.transactionItem}>
          <Text style={styles.transactionText}>{item.name}</Text>
          <Text style={styles.transactionAmount}>₹{item.amount}</Text>
        </View>
      )}
    />
  );

  const renderCalendar = () => (
    <Calendar
      style={styles.calendar}
      onDayPress={(day) => router.push(`/add-transaction?date=${day.dateString}`)}
      theme={{
        calendarBackground: theme.colors.card,
        dayTextColor: theme.colors.text,
        monthTextColor: theme.colors.text,
        arrowColor: theme.colors.text,
      }}
    />
  );

  const renderSummary = () => (
    <View style={styles.card}>
      <Text style={styles.summaryLabel}>Total Spent</Text>
      <Text style={styles.summaryValue}>₹2,400</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/add-transaction')}
      >
        <Text style={styles.buttonText}>Add Transaction</Text>
      </TouchableOpacity>
    </View>
  );

  const renderTabContent = () => {
    if (activeTab === 'Daily') return renderDaily();
    if (activeTab === 'Calendar') return renderCalendar();
    if (activeTab === 'Summary') return renderSummary();
    return null;
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <MonthSelector selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth} />
      <TopTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      {renderTabContent()}
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    backgroundColor: theme.colors.card,
    borderRadius: 12,
    padding: 20,
    elevation: 2,
  },
  summaryLabel: {
    color: theme.colors.subtext,
    fontSize: 16,
  },
  summaryValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginVertical: 10,
  },
  button: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomColor: '#E2E8F0',
    borderBottomWidth: 1,
  },
  transactionText: {
    fontSize: 16,
    color: theme.colors.text,
  },
  transactionAmount: {
    fontSize: 16,
    color: theme.colors.red,
    fontWeight: '600',
  },
  calendar: {
    borderRadius: 12,
  },
});
