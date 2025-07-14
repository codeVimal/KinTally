import React, { useState, useEffect } from 'react';
import {
  View, Text, FlatList, TouchableOpacity, Modal,
  TextInput, Alert, StyleSheet, Platform
} from 'react-native';
import { AntDesign, Feather, Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { CATEGORY_META } from '../../constants/dummyData';
import { auth, db } from '../../firebaseConfig';
import { signOut } from 'firebase/auth';
import {
  collection, query, where, onSnapshot,
  addDoc, doc, updateDoc, deleteDoc
} from 'firebase/firestore';
import AuthCheck from '../auth-check';

const DEFAULT_CATEGORIES = Object.entries(CATEGORY_META).map(([id, meta]) => ({
  id,
  name: meta.label,
  color: meta.color,
}));

export default function Home() {
  const uid = auth.currentUser?.uid;
  const email = auth.currentUser?.email;

  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState(DEFAULT_CATEGORIES);
  const [selectedMonth, setSelectedMonth] = useState(new Date());

  const [visible, setVisible] = useState(false);
  const [editId, setEditId] = useState(null);
  const [amount, setAmount] = useState('');
  const [description, setDesc] = useState('');
  const [selectedCat, setCat] = useState('food');
  const [txDate, setTxDate] = useState(new Date());
  const [showDP, setShowDP] = useState(false);

  // 🔄 Fetch transactions from Firestore
  useEffect(() => {
    if (!uid) return;
    const q = query(collection(db, 'transactions'), where('userId', '==', uid));
    const unsub = onSnapshot(q, (snapshot) => {
      const txs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        time: doc.data().time.toDate(),
      }));
      setTransactions(txs);
    });
    return unsub;
  }, [uid]);

  const shiftMonth = (d) => {
    const n = new Date(selectedMonth);
    n.setMonth(n.getMonth() + d);
    setSelectedMonth(n);
  };

  const monthLabel = selectedMonth.toLocaleString('default', {
    month: 'long',
    year: 'numeric',
  });

  const txForMonth = transactions.filter(
    (t) =>
      t.time.getFullYear() === selectedMonth.getFullYear() &&
      t.time.getMonth() === selectedMonth.getMonth()
  );

  const reset = () => {
    setAmount('');
    setDesc('');
    setCat(categories[0].id);
    setTxDate(new Date());
    setEditId(null);
  };

  const close = () => {
    reset();
    setVisible(false);
  };

  const saveTx = async () => {
    if (!amount) return Alert.alert('Enter amount');
    const amt = parseFloat(amount);
    if (Number.isNaN(amt)) return Alert.alert('Amount must be a number');

    try {
      if (editId) {
        const ref = doc(db, 'transactions', editId);
        await updateDoc(ref, {
          amount: amt,
          description,
          category: selectedCat,
          time: txDate,
        });
      } else {
        await addDoc(collection(db, 'transactions'), {
          userId: uid,
          amount: amt,
          description,
          category: selectedCat,
          time: txDate,
        });
      }
      close();
    } catch (err) {
      Alert.alert('Error saving transaction', err.message);
    }
  };

  const deleteTx = async (id) => {
    try {
      await deleteDoc(doc(db, 'transactions', id));
    } catch (err) {
      Alert.alert('Error deleting transaction', err.message);
    }
  };

  const addCategory = () =>
    Alert.prompt('New category name', '', (name) => {
      if (!name) return;
      const id = name.toLowerCase().replace(/\s+/g, '-');
      setCategories((c) => [...c, { id, name, color: '#888' }]);
      setCat(id);
    });

  const renderTx = ({ item }) => {
    const cat =
      categories.find((c) => c.id === item.category) || {
        name: item.category,
        color: '#888',
      };

    return (
      <View style={styles.txRow}>
        <View style={styles.txInfo}>
          <Text style={styles.txAmt}>₹{item.amount.toFixed(2)}</Text>
          <Text style={[styles.txCat, { color: cat.color }]}>{cat.name}</Text>
          {!!item.description && (
            <Text style={styles.txDesc}>{item.description}</Text>
          )}
          <Text style={styles.txDate}>
            {item.time.toLocaleDateString('en-IN')}
          </Text>
        </View>
        <View style={styles.txActions}>
          <TouchableOpacity
            onPress={() => {
              setEditId(item.id);
              setAmount(String(item.amount));
              setDesc(item.description);
              setCat(item.category);
              setTxDate(new Date(item.time));
              setVisible(true);
            }}
          >
            <Feather name="edit" size={18} color="#3a86ff" />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ marginLeft: 12 }}
            onPress={() =>
              Alert.alert('Delete?', '', [
                { text: 'Cancel' },
                {
                  text: 'Delete',
                  style: 'destructive',
                  onPress: () => deleteTx(item.id),
                },
              ])
            }
          >
            <Feather name="trash-2" size={18} color="#e71d36" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <AuthCheck>
      <View style={styles.container}>
        {/* 🔐 Email + Logout */}
        <View style={styles.authHeader}>
          <Text style={styles.email}>Email: {email}</Text>
          <TouchableOpacity onPress={() => signOut(auth)}>
            <Text style={styles.logout}>Logout</Text>
          </TouchableOpacity>
        </View>

        {/* 📅 Month Navigation */}
        <View style={styles.header}>
          <View style={styles.monthNav}>
            <TouchableOpacity onPress={() => shiftMonth(-1)}>
              <Ionicons name="chevron-back" size={24} color="#3a86ff" />
            </TouchableOpacity>
            <Text style={styles.monthLbl}>{monthLabel}</Text>
            <TouchableOpacity onPress={() => shiftMonth(1)}>
              <Ionicons name="chevron-forward" size={24} color="#3a86ff" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => setVisible(true)}>
            <AntDesign name="pluscircle" size={28} color="#3a86ff" />
          </TouchableOpacity>
        </View>

        <FlatList
          data={txForMonth}
          keyExtractor={(i) => i.id}
          renderItem={renderTx}
          contentContainerStyle={{ paddingBottom: 120 }}
          ListEmptyComponent={
            <Text style={styles.empty}>No transactions this month</Text>
          }
        />

        {/* ➕ Add/Edit Modal */}
        <Modal visible={visible} animationType="slide" transparent onRequestClose={close}>
          <View style={styles.backdrop}>
            <View style={styles.card}>
              <Text style={styles.title}>{editId ? 'Edit' : 'Add'} Transaction</Text>

              <TextInput
                placeholder="Amount (₹)"
                value={amount}
                onChangeText={setAmount}
                keyboardType="numeric"
                style={styles.input}
              />
              <TextInput
                placeholder="Description"
                value={description}
                onChangeText={setDesc}
                style={styles.input}
              />

              <Text style={styles.label}>Date</Text>
              {Platform.OS === 'web' ? (
                <DatePicker
                  selected={txDate}
                  onChange={(d) => setTxDate(d)}
                  dateFormat="dd/MM/yyyy"
                  className="react-datepicker__input"
                />
              ) : (
                <>
                  <TouchableOpacity onPress={() => setShowDP(true)} style={styles.dateBtn}>
                    <Text style={styles.dateTxt}>
                      Date: {txDate.toLocaleDateString()}
                    </Text>
                  </TouchableOpacity>
                  {showDP && (
                    <DateTimePicker
                      value={txDate}
                      mode="date"
                      display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                      onChange={(event, selDate) => {
                        if (Platform.OS === 'android') setShowDP(false);
                        if (event.type !== 'dismissed') {
                          setTxDate(selDate || txDate);
                        }
                      }}
                    />
                  )}
                </>
              )}

              <Text style={styles.label}>Category</Text>
              <View style={styles.catRow}>
                {categories.map((c) => (
                  <TouchableOpacity
                    key={c.id}
                    onPress={() => setCat(c.id)}
                    style={[
                      styles.catChip,
                      { backgroundColor: selectedCat === c.id ? c.color : '#f0f0f0' },
                    ]}
                  >
                    <Text style={{ color: selectedCat === c.id ? '#fff' : c.color }}>{c.name}</Text>
                  </TouchableOpacity>
                ))}
                <TouchableOpacity style={styles.addCat} onPress={addCategory}>
                  <AntDesign name="plus" size={16} color="#555" />
                </TouchableOpacity>
              </View>

              <View style={styles.btnRow}>
                <TouchableOpacity style={styles.btn} onPress={close}>
                  <Text>Close</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.btn, styles.save]} onPress={saveTx}>
                  <Text style={{ color: '#fff' }}>Save</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </AuthCheck>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  authHeader: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: 8
  },
  email: { fontSize: 14, color: '#333' },
  logout: { fontSize: 14, fontWeight: 'bold', color: '#e74c3c' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  monthNav: { flexDirection: 'row', alignItems: 'center' },
  monthLbl: { fontSize: 20, fontWeight: '600', marginHorizontal: 6 },
  txRow: { flexDirection: 'row', padding: 12, borderRadius: 12, backgroundColor: '#fafafa', marginBottom: 8 },
  txInfo: { flex: 1 },
  txAmt: { fontSize: 18, fontWeight: '600' },
  txCat: { marginTop: 2 },
  txDesc: { color: '#444', fontStyle: 'italic' },
  txDate: { fontSize: 12, color: '#888', marginTop: 4 },
  txActions: { flexDirection: 'row', alignItems: 'center' },
  empty: { textAlign: 'center', marginTop: 60, color: '#888', fontStyle: 'italic' },
  backdrop: { flex: 1, backgroundColor: '#0006', justifyContent: 'center', padding: 20 },
  card: { backgroundColor: '#fff', borderRadius: 16, padding: 20 },
  title: { fontSize: 20, fontWeight: '600', marginBottom: 12 },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 10, padding: 10, marginBottom: 12 },
  dateBtn: { marginBottom: 12 },
  dateTxt: { color: '#3a86ff', fontWeight: '500' },
  label: { fontWeight: '600', marginTop: 8, marginBottom: 6 },
  catRow: { flexDirection: 'row', flexWrap: 'wrap' },
  catChip: { borderRadius: 16, paddingHorizontal: 12, paddingVertical: 6, margin: 4 },
  addCat: {
    width: 32, height: 32, borderRadius: 16, borderWidth: 1,
    borderColor: '#aaa', alignItems: 'center', justifyContent: 'center', margin: 4
  },
  btnRow: { flexDirection: 'row', justifyContent: 'flex-end', marginTop: 18 },
  btn: { paddingVertical: 10, paddingHorizontal: 18, borderRadius: 10, marginLeft: 10, backgroundColor: '#eee' },
  save: { backgroundColor: '#3a86ff' },
});
