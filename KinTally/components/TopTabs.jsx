import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { theme } from '../constants/theme';

const tabs = ['Daily', 'Calendar', 'Summary'];

const TopTabs = ({ activeTab, setActiveTab }) => {
  return (
    <View style={styles.container}>
      {tabs.map(tab => (
        <TouchableOpacity
          key={tab}
          style={[styles.tab, activeTab === tab && styles.activeTab]}
          onPress={() => setActiveTab(tab)}
        >
          <Text style={[styles.tabText, activeTab === tab && styles.activeText]}>{tab}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default TopTabs;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 12,
    justifyContent: 'space-around',
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#E2E8F0',
  },
  activeTab: {
    backgroundColor: theme.colors.primary,
  },
  tabText: {
    color: theme.colors.text,
    fontSize: 14,
  },
  activeText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
