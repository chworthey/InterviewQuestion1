// Copyright (c) 2020 Patrick S. Worthey
/**
 * This file contains unit tests, integrated with Jest.
 */

import { formatNumber } from './func';

/**
 * Unit tests the formatNumber() function with a slew
 * of numbers that appear differently when converted to strings.
 */
test('Test comma delimited numbers.', () => {
  const tests: [number, string][] = [
    [1, '1'],
    [10, '10'],
    [100, '100'],
    [1000, '1,000'],
    [10000, '10,000'],
    [100000, '100,000'],
    [1000000, '1,000,000'],
    [1.0123456, '1.0123456'],
    [10.0123456, '10.0123456'],
    [100.0123456, '100.0123456'],
    [1000.0123456, '1,000.0123456'],
    [2e21, '2e+21'],
    [2123e21, '2.123e+24'],
    [2.1e21, '2.1e+21'],
    [2.123e21, '2.123e+21'],
    [-1, '-1'],
    [-10, '-10'],
    [-100, '-100'],
    [-1000, '-1,000'],
    [-10000, '-10,000'],
    [-100000, '-100,000'],
    [-1000000, '-1,000,000'],
    [-1.0123456, '-1.0123456'],
    [-10.0123456, '-10.0123456'],
    [-100.0123456, '-100.0123456'],
    [-1000.0123456, '-1,000.0123456'],
    [-2e21, '-2e+21'],
    [-2123e21, '-2.123e+24'],
    [-2.1e21, '-2.1e+21'],
    [-2.123e21, '-2.123e+21'],
    [2e-7, '2e-7'],
    [2123e-21, '2.123e-18'],
    [2.1e-21, '2.1e-21'],
    [2.123e-21, '2.123e-21'],
    [-2e-7, '-2e-7'],
    [-2123e-21, '-2.123e-18'],
    [-2.1e-21, '-2.1e-21'],
    [-2.123e-21, '-2.123e-21'],
    [Number.POSITIVE_INFINITY, 'Infinity'],
    [Number.NEGATIVE_INFINITY, '-Infinity'],
    [Number.NaN, 'NaN']
  ];

  tests.forEach(f => {
    expect(formatNumber(f[0])).toBe(f[1]);
  })
});