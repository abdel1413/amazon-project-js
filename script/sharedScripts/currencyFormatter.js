export const currencyFormatter = (currency) => {
  return (Math.round(currency) / 100).toFixed(2);
};
