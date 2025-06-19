import { View, Text, StyleSheet, Dimensions } from 'react-native';
import React from 'react';
import { PieChart } from 'react-native-chart-kit';
import { theme } from '../constants/theme';

const screenWidth = Dimensions.get('window').width;

const data = [
  {
    name: 'Food',
    amount: 4500,
    color: '#EF4444',
    legendFontColor: theme.colors.text,
    legendFontSize: 14,
  },
  {
    name: 'Transport',
    amount: 2000,
    color: '#F59E0B',
    legendFontColor: theme.colors.text,
    legendFontSize: 14,
  },
  {
    name: 'Shopping',
    amount: 3000,
    color: '#8B5CF6',
    legendFontColor: theme.colors.text,
    legendFontSize: 14,
  },
  {
    name: 'Bills',
    amount: 1200,
    color: '#10B981',
    legendFontColor: theme.colors.text,
    legendFontSize: 14,
  },
];

const Statistics = () => {
  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.title, { color: theme.colors.text }]}>Spending Breakdown</Text>
      <PieChart
        data={data}
        width={screenWidth - 32}
        height={220}
        accessor="amount"
        backgroundColor="transparent"
        paddingLeft="15"
        chartConfig={{
          color: () => theme.colors.text,
        }}
        absolute
      />
    </View>
  );
};

export default Statistics;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
