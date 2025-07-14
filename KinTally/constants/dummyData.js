export const DUMMY_TX = [
  {
    id: 't3',
    amount: 1200,
    description: 'Grocery shopping',
    category: 'food',
    time: new Date('2025-07-12T18:45:00'),
  },
  {
    id: 't2',
    amount: 299,
    description: 'Electricity bill',
    category: 'bills',
    time: new Date('2025-07-11T10:15:00'),
  },
  {
    id: 't1',
    amount: 870,
    description: 'Cab to office',
    category: 'travel',
    time: new Date('2025-07-10T08:30:00'),
  },
];

export const CATEGORY_META = {
  food: { label: 'Food', color: '#ff9f1c' },
  travel: { label: 'Travel', color: '#2ec4b6' },
  bills: { label: 'Bills', color: '#e71d36' },
  shop: { label: 'Shopping', color: '#3a86ff' },
};
