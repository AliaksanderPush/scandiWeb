export const selectCurrensy = (prices, currency) => {
  const price = prices.find(
    (price) => price.currency.label === currency.currency
  );

  return {
    curr: price.amount,
    symb: price.currency.symbol,
  };
};

export const isCurrensy = (item, symbol) => {
  const copyItem = {...item};
  const elem = copyItem.prices.find(el => el.currency.symbol === symbol)
  const newPrice = elem.amount;
  copyItem.price = newPrice;
  copyItem.selCurr.curr = newPrice;
  copyItem.selCurr.symb = symbol
  return copyItem;
}