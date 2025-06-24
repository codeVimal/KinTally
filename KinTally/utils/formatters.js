export const formatCurrency = (value) => {
  return `₹${parseFloat(value).toLocaleString('en-IN')}`;
};
