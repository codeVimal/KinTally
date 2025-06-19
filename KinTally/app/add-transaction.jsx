import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';

const AddTransaction = () => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Add Transaction</Text>

      <TextInput
        placeholder="Amount"
        keyboardType="numeric"
        style={styles.input}
        value={amount}
        onChangeText={setAmount}
      />

      <TextInput
        placeholder="Description"
        style={styles.input}
        value={description}
        onChangeText={setDescription}
      />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddTransaction;

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
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 14,
    marginBottom: 16,
    fontSize: 16,
    borderColor: '#E2E8F0',
    borderWidth: 1,
  },
  button: {
    backgroundColor: '#3B82F6',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
});
