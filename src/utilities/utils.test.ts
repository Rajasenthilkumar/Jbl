// utils.test.ts
import { describe, expect, test } from 'vitest';
import { removeNonDigits } from './utils';

describe('removeNonDigits', () => {
  test('should remove non-digit characters from the string', () => {
    const input = 'a1b2c3!@#';
    const expectedOutput = '123';
    expect(removeNonDigits(input)).toBe(expectedOutput);
  });

  test('should return only digits when input contains digits and other characters', () => {
    const input = '12abc34def56';
    const expectedOutput = '123456';
    expect(removeNonDigits(input)).toBe(expectedOutput);
  });

  test('should return empty string when input contains no digits', () => {
    const input = 'abcdef!@#';
    const expectedOutput = '';
    expect(removeNonDigits(input)).toBe(expectedOutput);
  });

  test('should return the same string when input contains only digits', () => {
    const input = '123456';
    const expectedOutput = '123456';
    expect(removeNonDigits(input)).toBe(expectedOutput);
  });

  test('should return empty string when input is an empty string', () => {
    const input = '';
    const expectedOutput = '';
    expect(removeNonDigits(input)).toBe(expectedOutput);
  });
});
