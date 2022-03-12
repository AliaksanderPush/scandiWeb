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
  const copyItem = { ...item };
  const elem = copyItem.prices.find((el) => el.currency.symbol === symbol);
  const newPrice = elem.amount;
  copyItem.price = newPrice;
  copyItem.selCurr.curr = newPrice;
  copyItem.selCurr.symb = symbol;
  return copyItem;
};

function deepCopyObj(obj) {
  const copyObj = {};
  for (const key in obj) {
    if (Array.isArray(obj[key])) {
      copyObj[key] = deepCopyArr(obj[key]);
    } else if (obj[key] instanceof Object) {
      copyObj[key] = deepCopyObj(obj[key]);
    } else {
      copyObj[key] = obj[key];
    }
  }
  return copyObj;
}

function deepCopyArr(arr) {
  const copyArr = [];
  if (!arr.length) return copyArr;
  for (const elem of arr) {
    if (Array.isArray(elem)) {
      copyArr.push(deepCopyArr(elem));
    } else if (elem instanceof Object) {
      copyArr.push(deepCopyObj(elem));
    } else {
      copyArr.push(elem);
    }
  }
  return copyArr;
}

export function deepCopy(obj) {
  if (Array.isArray(obj)) {
    return deepCopyArr(obj);
  } else if (obj instanceof Object) {
    return deepCopyObj(obj);
  } else {
    return obj;
  }
}

export function compareAttr(attrState, attrOuteside) {
  //if (!attrOuteside.length) return false;
  const result = attrState.every((item, index) => {
    return (
      item.value === attrOuteside[index].value &&
      item.name === attrOuteside[index].name
    );
  });
  return result;
}
