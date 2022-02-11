export const selectCurrensy = (prices, currency) => {
  const price = prices.find(
    (price) => price.currency.label === currency.currency
  );

  return {
    curr: price.amount,
    symb: price.currency.symbol,
  };
};
