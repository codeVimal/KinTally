import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import { useTheme } from '../hooks/useTheme';
import { PieChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

const months = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];
const years = [2022, 2023, 2024, 2025];

const dummyData = [
  {
    amount: 1500,
    category: 'Groceries',
    month: 'May',
    year: 2025,
    color: '#f87171',
  },
  {
    amount: 2500,
    category: 'Bills',
    month: 'May',
    year: 2025,
    color: '#60a5fa',
  },
  {
    amount: 1000,
    category: 'Transport',
    month: 'Jun',
    year: 2025,
    color: '#34d399',
  },
  {
    amount: 500,
    category: 'Entertainment',
    month: 'Jun',
    year: 2024,
    color: '#fbbf24',
  },
];

const Statistics = () => {
  const { theme } = useTheme();
  const [viewBy, setViewBy] = useState('Month');
  const [selectedMonth, setSelectedMonth] = useState('May');
  const [selectedYear, setSelectedYear] = useState(2025);

  const filteredData = dummyData.filter((item) =>
    viewBy === 'Month'
      ? item.month === selectedMonth && item.year === selectedYear
      : item.year === selectedYear
  );

  const chartData = filteredData.map((item) => ({
    name: item.category,
    amount: item.amount,
    color: item.color,
    legendFontColor: theme.text,
    legendFontSize: 14,
  }));

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.header, { color: theme.text }]}>Statistics</Text>

      <View style={styles.viewByToggle}>
        {['Month', 'Year'].map((option) => (
          <TouchableOpacity
            key={option}
            onPress={() => setViewBy(option)}
            style={[
              styles.toggleButton,
              viewBy === option && { backgroundColor: theme.primaryColor },
            ]}
          >
            <Text
              style={{
                color: viewBy === option ? '#fff' : theme.text,
                fontWeight: '500',
              }}
            >
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {viewBy === 'Month' && (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.selector}>
          {months.map((m) => (
            <TouchableOpacity
              key={m}
              onPress={() => setSelectedMonth(m)}
              style={[
                styles.monthButton,
                selectedMonth === m && { backgroundColor: theme.primaryColor },
              ]}
            >
              <Text
                style={{
                  color: selectedMonth === m ? '#fff' : theme.text,
                  fontWeight: '500',
                }}
              >
                {m}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.selector}>
        {years.map((y) => (
          <TouchableOpacity
            key={y}
            onPress={() => setSelectedYear(y)}
            style={[
              styles.monthButton,
              selectedYear === y && { backgroundColor: theme.primaryColor },
            ]}
          >
            <Text
              style={{
                color: selectedYear === y ? '#fff' : theme.text,
                fontWeight: '500',
              }}
            >
              {y}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {chartData.length > 0 ? (
        <>
          <PieChart
            data={chartData}
            width={screenWidth}
            height={220}
            chartConfig={{
              color: () => theme.text,
              labelColor: () => theme.text,
              backgroundGradientFrom: theme.background,
              backgroundGradientTo: theme.background,
            }}
            accessor="amount"
            backgroundColor="transparent"
            paddingLeft="15"
            center={[10, 0]}
            absolute
          />
          <FlatList
            data={chartData}
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <View style={[styles.dot, { backgroundColor: item.color }]} />
                <Text style={[styles.itemText, { color: theme.text }]}>
                  {item.name}: ₹{item.amount}
                </Text>
              </View>
            )}
          />
        </>
      ) : (
        <Text style={[styles.noData, { color: theme.subtext }]}>No data available</Text>
      )}
    </ScrollView>
  );
};

export default Statistics;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 28,
    fontWeight: '600',
    marginBottom: 16,
  },
  viewByToggle: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  toggleButton: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    backgroundColor: '#e2e8f0',
    borderRadius: 8,
    marginRight: 10,
  },
  selector: {
    marginBottom: 20,
    flexDirection: 'row',
  },
  monthButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: '#e2e8f0',
    marginRight: 10,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 10,
  },
  itemText: {
    fontSize: 16,
  },
  noData: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 16,
  },
});
