import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useTheme } from '../hooks/useTheme';

const FloatingButton = ({ onPress }) => {
  const { theme } = useTheme();

  return (
    <TouchableOpacity style={[styles.button, { backgroundColor: theme.primaryColor }]} onPress={onPress}>
      <Text style={styles.plus}>＋</Text>
    </TouchableOpacity>
  );
};

export default FloatingButton;

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  plus: {
    fontSize: 28,
    color: 'white',
    fontWeight: 'bold',
    marginTop: -2,
  },
});
