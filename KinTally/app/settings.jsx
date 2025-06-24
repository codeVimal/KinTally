import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Switch,
} from 'react-native';
import { useSettings } from '../hooks/useSettings';
import { useTheme } from '../hooks/useTheme';

const Settings = () => {
  const { settings, setDarkMode, setPrimaryColor, setFontSize } = useSettings();
  const { theme, isDark } = useTheme();

  const toggleDarkMode = () => {
    const next = settings.darkMode === 'dark' ? 'light' : 'dark';
    setDarkMode(next);
  };

  const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'];

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.row}>
        <Text style={[styles.label, { color: theme.text }]}>Dark Mode</Text>
        <Switch value={isDark} onValueChange={toggleDarkMode} />
      </View>

      <View style={styles.row}>
        <Text style={[styles.label, { color: theme.text }]}>Font Size</Text>
        <View style={styles.fontBtns}>
          {[14, 16, 18].map((size) => (
            <TouchableOpacity
              key={size}
              onPress={() => setFontSize(size)}
              style={styles.fontBtn}
            >
              <Text style={{ fontSize: size, color: theme.text }}>A</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <Text style={[styles.label, { color: theme.text, marginBottom: 8 }]}>
        Primary Color
      </Text>
      <View style={styles.colorRow}>
        {colors.map((c) => (
          <TouchableOpacity
            key={c}
            onPress={() => setPrimaryColor(c)}
            style={[
              styles.colorDot,
              {
                backgroundColor: c,
                borderWidth: c === settings.primaryColor ? 2 : 0,
                borderColor: '#000',
              },
            ]}
          />
        ))}
      </View>
    </ScrollView>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  label: {
    fontSize: 18,
  },
  fontBtns: {
    flexDirection: 'row',
  },
  fontBtn: {
    marginHorizontal: 4,
    padding: 6,
    borderRadius: 4,
    backgroundColor: '#E5E7EB',
  },
  colorRow: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 40,
  },
  colorDot: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 12,
  },
});
