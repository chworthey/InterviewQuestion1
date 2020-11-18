// Copyright (c) 2020 Patrick S. Worthey
/**
 * This file contains generic utility functions that 
 * are consumable by the main program or tests.
 */

/** 
 * A function that formats a number with commas seperating each
 * 3 digits.
 * 
 * @remarks
 * This is similar to the 'en-US' variant of the Number.toLocaleString()
 * function, but with the implementation laid bare with the intention to answer
 * the interview question in the most straight-forward manner.
 * 
 * @example
 * // Prints "1,000"
 * console.log(formatNumber(1000));
 * 
 * @param num
 * The value of the number to format.
 * 
 * @returns
 * The number formatted.
*/
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

  /**
   * A number has up to 3 parts to it.
   * ==A== ==B== =C=
   * 1,000.12345e+21
   * 
   * A: This is the part we're modifying for the interview question.
   * B: This is supported, but we're leaving as is
   * C: This is supported, but we're leaving as is
   * So the first step is to split the number up into those parts.
   */

  const isNegative = num < 0;
  const expParts = num.toString().split('e');
  const hasExp = expParts.length === 2;
  const decParts = expParts[0].split('.');
  const hasDec = decParts.length === 2;
  let numStr = decParts[0];
  if (isNegative) { // Remove '-' for now
    numStr = numStr.substr(1);
  }

  // Start working on the integer part (A)
  const groupings : string[] = []; // Make groups of 3 digits each
  for (let i = numStr.length - 3; i >= 0; i -= 3) {
    groupings.push(numStr.substr(i, 3));
  }

  const lenMod3 = numStr.length % 3;
  if (lenMod3 !== 0) { // Add the 1 or 2 digits left over
    groupings.push(numStr.substr(0, lenMod3));
  }

  // Combine with commas
  const formattedPart = groupings.reduce((prev: string, current: string) => 
    `${current},${prev}`);

  // Add our parts back in
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