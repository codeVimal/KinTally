import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Dimensions } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { Ionicons } from '@expo/vector-icons';
import { auth, db } from '../../firebaseConfig';
import { collection, query, where, onSnapshot } from 'firebase/firestore';

const screenWidth = Dimensions.get('window').width;

export default function Statistics() {
  const [mode, setMode] = useState('monthly'); // 'monthly' | 'yearly'
  const [date, setDate] = useState(new Date());
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);

  const uid = auth.currentUser?.uid;

  useEffect(() => {
    if (!uid) return;

    const txQuery = query(collection(db, 'transactions'), where('userId', '==', uid));
    const unsubTx = onSnapshot(txQuery, (snapshot) => {
      const txs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        time: doc.data().time.toDate(),
      }));
      setTransactions(txs);
    });

    const catQuery = query(collection(db, 'categories'), where('userId', '==', uid));
    const unsubCat = onSnapshot(catQuery, (snapshot) => {
      const cats = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setCategories(cats);
    });

    return () => {
      unsubTx();
      unsubCat();
    };
  }, [uid]);

  const shift = (delta) => {
    const d = new Date(date);
    mode === 'monthly' ? d.setMonth(d.getMonth() + delta) : d.setFullYear(d.getFullYear() + delta);
    setDate(d);
  };

  const label =
    mode === 'monthly'
      ? date.toLocaleString('default', { month: 'long', year: 'numeric' })
      : date.getFullYear();

  const filtered = transactions.filter((t) => {
    const d = new Date(t.time);
    return mode === 'monthly'
      ? d.getFullYear() === date.getFullYear() && d.getMonth() === date.getMonth()
      : d.getFullYear() === date.getFullYear();
  });

  const totals = {};
  filtered.forEach((t) => (totals[t.category] = (totals[t.category] || 0) + t.amount));

  const chartData = Object.entries(totals).map(([catId, amt]) => {
    const cat = categories.find((c) => c.id === catId);
    return {
      name: cat?.name || catId,
      amount: amt,
      color: cat?.color || '#888',
      legendFontColor: '#000',
      legendFontSize: 14,
    };
  });

  const totalAmt = chartData.reduce((s, i) => s + i.amount, 0);

  return (
    
    <View style={styles.container}>
      {/* header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => shift(-1)}>
          <Ionicons name="chevron-back" size={24} color="#3a86ff" />
        </TouchableOpacity>
        <Text style={styles.headerTxt}>{label}</Text>
        <TouchableOpacity onPress={() => shift(1)}>
          <Ionicons name="chevron-forward" size={24} color="#3a86ff" />
        </TouchableOpacity>
      </View>

      {/* mode switch */}
      <TouchableOpacity
        style={styles.switch}
        onPress={() => setMode((m) => (m === 'monthly' ? 'yearly' : 'monthly'))}
      >
        <Text style={styles.switchTxt}>Switch to {mode === 'monthly' ? 'Yearly' : 'Monthly'}</Text>
      </TouchableOpacity>

      {chartData.length ? (
        <>
          <PieChart
            data={chartData.map((c) => ({
              name: c.name,
              population: c.amount,
              color: c.color,
              legendFontColor: c.legendFontColor,
              legendFontSize: c.legendFontSize,
            }))}
            width={screenWidth - 32}
            height={220}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="16"
            absolute
            chartConfig={{
              backgroundColor: '#fff',
              backgroundGradientFrom: '#fff',
              backgroundGradientTo: '#fff',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(0,0,0,${opacity})`,
              labelColor: () => '#000',
            }}
          />

          <FlatList
            data={chartData}
            keyExtractor={(i) => i.name}
            contentContainerStyle={{ padding: 16 }}
            renderItem={({ item }) => (
              <View style={styles.row}>
                <Text style={{ color: item.color, fontWeight: 'bold' }}>{item.name}</Text>
                <Text>₹{item.amount.toFixed(2)}</Text>
              </View>
            )}
            ListFooterComponent={
              <Text style={styles.total}>Total: ₹{totalAmt.toFixed(2)}</Text>
            }
          />
        </>
      ) : (
        <Text style={styles.empty}>No data for this period</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingTop: 16 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16 },
  headerTxt: { fontSize: 18, fontWeight: '600' },
  switch: { alignSelf: 'flex-end', marginRight: 16, marginVertical: 6 },
  switchTxt: { color: '#3a86ff', fontWeight: '600' },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ddd',
  },
  total: { fontWeight: 'bold', fontSize: 16, marginTop: 10, alignSelf: 'center' },
  empty: { textAlign: 'center', marginTop: 60, color: '#888', fontStyle: 'italic' },
});
