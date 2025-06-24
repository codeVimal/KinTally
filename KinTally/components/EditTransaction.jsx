import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Picker, Platform, Pressable, Text } from 'react-native';
import { useTheme } from '../hooks/useTheme';
import { useCategories } from '../hooks/useCategories';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';

const EditTransaction = ({ transaction, onSave, onCancel }) => {
  const { theme } = useTheme();
  const { categories } = useCategories();

  const [amount, setAmount] = useState(transaction.amount || '');
  const [description, setDescription] = useState(transaction.description || '');
  const [category, setCategory] = useState(transaction.category || categories[0]?.name);
  const [date, setDate] = useState(new Date(transaction.date || new Date()));
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSave = () => {
    if (!amount || !category) return;
    const updated = {
      ...transaction,
      amount,
      description,
      category,
      date: date.toISOString(),
    };
    onSave(updated);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.card }]}>
      <TextInput
        placeholder="Amount"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
        style={[styles.input, { color: theme.text, borderColor: theme.subtext }]}
        placeholderTextColor={theme.subtext}
      />
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        style={[styles.input, { color: theme.text, borderColor: theme.subtext }]}
        placeholderTextColor={theme.subtext}
      />
      <Text style={{ color: theme.text, marginBottom: 4 }}>Category</Text>
      <Picker
        selectedValue={category}
        onValueChange={(val) => setCategory(val)}
        style={{ color: theme.text }}
        dropdownIconColor={theme.text}
      >
        {categories.map((cat) => (
          <Picker.Item key={cat.name} label={cat.name} value={cat.name} />
        ))}
      </Picker>

      <Text style={{ color: theme.text, marginTop: 12 }}>Date</Text>
      {Platform.OS === 'android' ? (
        <>
          <Pressable
            style={styles.datePickerButton}
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={{ color: theme.text }}>
              {format(date, 'dd MMM yyyy')} ▼
            </Text>
          </Pressable>
          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display="calendar"
              onChange={(event, selectedDate) => {
                setShowDatePicker(false);
                if (selectedDate) setDate(selectedDate);
              }}
            />
          )}
        </>
      ) : (
        <DateTimePicker
          value={date}
          mode="date"
          display="calendar"
          onChange={(event, selectedDate) => {
            if (selectedDate) setDate(selectedDate);
          }}
        />
      )}

      <View style={styles.row}>
        <Button title="Save" onPress={handleSave} color={theme.primaryColor} />
        <Button title="Cancel" onPress={onCancel} />
      </View>
    </View>
  );
};

export default EditTransaction;

const styles = StyleSheet.create({
  container: {
    padding: 12,
    borderRadius: 10,
    marginBottom: 20,
    marginTop: 10,
  },
  input: {
    borderBottomWidth: 1,
    paddingVertical: 8,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  datePickerButton: {
    paddingVertical: 10,
    marginBottom: 10,
    backgroundColor: '#E2E8F0',
    borderRadius: 6,
    paddingHorizontal: 8,
  },
});
