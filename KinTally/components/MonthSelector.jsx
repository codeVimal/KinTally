import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { format, subMonths, addMonths } from 'date-fns';
import { theme } from '../constants/theme';

const MonthSelector = ({ selectedMonth, setSelectedMonth }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setSelectedMonth(subMonths(selectedMonth, 1))}>
        <Text style={styles.arrow}>◀</Text>
      </TouchableOpacity>
      <Text style={styles.monthText}>{format(selectedMonth, 'MMMM yyyy')}</Text>
      <TouchableOpacity onPress={() => setSelectedMonth(addMonths(selectedMonth, 1))}>
        <Text style={styles.arrow}>▶</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MonthSelector;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
    paddingHorizontal: 12,
  },
  monthText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  arrow: {
    fontSize: 20,
    color: theme.colors.text,
  },
});
