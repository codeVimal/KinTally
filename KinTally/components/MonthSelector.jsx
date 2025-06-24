import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { format, addMonths, subMonths } from 'date-fns';
import { useTheme } from '../hooks/useTheme';

const MonthSelector = ({ selectedMonth, setSelectedMonth }) => {
  const { theme } = useTheme();

  const handlePrev = () => {
    setSelectedMonth((prev) => subMonths(prev, 1));
  };

  const handleNext = () => {
    setSelectedMonth((prev) => addMonths(prev, 1));
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePrev}>
        <AntDesign name="left" size={20} color={theme.text} />
      </TouchableOpacity>

      <Text style={[styles.monthText, { color: theme.text }]}>
        {format(selectedMonth, 'MMMM yyyy')}
      </Text>

      <TouchableOpacity onPress={handleNext}>
        <AntDesign name="right" size={20} color={theme.text} />
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
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  monthText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
