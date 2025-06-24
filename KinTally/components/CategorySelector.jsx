import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useCategories } from '../hooks/useCategories';
import { useTheme } from '../hooks/useTheme';

const CategorySelector = ({ selected, setSelected }) => {
  const { categories, addCategory } = useCategories();
  const { theme } = useTheme();
  const [newCat, setNewCat] = useState('');

  const handleAdd = () => {
    if (newCat.trim()) {
      addCategory(newCat.trim());
      setSelected(newCat.trim());
      setNewCat('');
    }
  };

  return (
    <View>
      <View style={styles(theme).list}>
        {categories.map((cat) => (
          <TouchableOpacity key={cat.id} onPress={() => setSelected(cat.name)} style={styles(theme).chip}>
            <Text
              style={{
                color: cat.name === selected ? '#fff' : theme.text,
                backgroundColor: cat.name === selected ? cat.color : '#E2E8F0',
                paddingHorizontal: 8,
                borderRadius: 10,
              }}
            >
              {cat.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles(theme).inputRow}>
        <TextInput
          value={newCat}
          onChangeText={setNewCat}
          placeholder="New category"
          placeholderTextColor={theme.subtext}
          style={styles(theme).input}
        />
        <TouchableOpacity onPress={handleAdd} style={styles(theme).addBtn}>
          <Text style={styles(theme).addText}>Add</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CategorySelector;

const styles = (theme) =>
  StyleSheet.create({
    list: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginBottom: 8,
    },
    chip: {
      marginRight: 8,
      marginBottom: 8,
    },
    inputRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    input: {
      flex: 1,
      borderBottomWidth: 1,
      borderColor: theme.subtext,
      color: theme.text,
      paddingVertical: 4,
    },
    addBtn: {
      paddingHorizontal: 10,
    },
    addText: {
      color: theme.primaryColor,
      fontWeight: 'bold',
    },
  });
