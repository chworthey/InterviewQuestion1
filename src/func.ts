// Copyright (c) 2020 Patrick S. Worthey

export function formatNumber(num: number): string {
  switch (num) {
    case Number.NaN:
      return 'Nan';
    case Number.POSITIVE_INFINITY:
      return 'Infinity';
    case Number.NEGATIVE_INFINITY:
      return '-Infinity';
    default:
      break;
  }

  const isNegative = num < 0;
  const expParts = num.toString().split('e');
  const hasExp = expParts.length === 2;
  const decParts = expParts[0].split('.');
  const hasDec = decParts.length === 2;
  let numStr = decParts[0];
  if (isNegative) {
    numStr = numStr.substr(1);
  }
  const groupings : string[] = [];

  let i = numStr.length - 3;
  for (; i >= 0; i -= 3) {
    groupings.push(numStr.substr(i, 3));
  }

  const lenMod3 = numStr.length % 3;
  if (lenMod3 !== 0) {
    groupings.push(numStr.substr(0, lenMod3));
  }

  const formattedPart = groupings.reduce((prev: string, current: string) => 
    `${current},${prev}`);

  let finalStr = formattedPart;
  if (isNegative) {
    finalStr = `-${finalStr}`;
  }
  if (hasDec) {
    finalStr += `.${decParts[1]}`;
  }
  if (hasExp) {
    finalStr += `e${expParts[1]}`;
  }

  return finalStr;
}