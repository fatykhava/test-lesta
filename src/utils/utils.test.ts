import convertIntegerToRoman from './convertIntegerToRoman';
import imageLoader from './imageLoader';
import normalizeString from './normalizeString';

describe('normalizeString', () => {
  it('should remove diacritical marks from a string', () => {
    expect(normalizeString('Résumé')).toEqual('Resume');
    expect(normalizeString('Löwe')).toEqual('Lowe');
    expect(normalizeString('Montréal')).toEqual('Montreal');
  });

  it('should handle empty strings', () => {
    expect(normalizeString('')).toEqual('');
  });

  it('should handle strings with no diacritical marks', () => {
    expect(normalizeString('Hello')).toEqual('Hello');
  });
});

describe('imageLoader', () => {
  it('should return the correct image URL with default quality', () => {
    const props = {
      src: 'https://example.com/image.jpg',
      width: 400
    };
    const result = imageLoader(props);
    expect(result).toEqual('https://example.com/image.jpg?org_if_sml=1&w=400&q=90');
  });

  it('should return the correct image URL with custom quality', () => {
    const props = {
      src: 'https://example.com/image.jpg',
      width: 600,
      quality: 80
    };
    const result = imageLoader(props);
    expect(result).toEqual('https://example.com/image.jpg?org_if_sml=1&w=600&q=80');
  });

  it('should handle an empty source URL', () => {
    const props = {
      src: '',
      width: 300
    };
    const result = imageLoader(props);
    expect(result).toEqual('?org_if_sml=1&w=300&q=90');
  });

  it('should handle a source URL with query parameters', () => {
    const props = {
      src: 'https://example.com/image.jpg?foo=bar',
      width: 500,
      quality: 75
    };
    const result = imageLoader(props);
    expect(result).toEqual('https://example.com/image.jpg?foo=bar&org_if_sml=1&w=500&q=75');
  });
});

describe('convertIntegerToRoman', () => {
  it('should convert integers to Roman numerals', () => {
    expect(convertIntegerToRoman(1)).toEqual('I');
    expect(convertIntegerToRoman(4)).toEqual('IV');
    expect(convertIntegerToRoman(9)).toEqual('IX');
    expect(convertIntegerToRoman(14)).toEqual('XIV');
    expect(convertIntegerToRoman(40)).toEqual('XL');
    expect(convertIntegerToRoman(90)).toEqual('XC');
    expect(convertIntegerToRoman(99)).toEqual('XCIX');
    expect(convertIntegerToRoman(400)).toEqual('CD');
    expect(convertIntegerToRoman(500)).toEqual('D');
    expect(convertIntegerToRoman(900)).toEqual('CM');
    expect(convertIntegerToRoman(1000)).toEqual('M');
    expect(convertIntegerToRoman(1994)).toEqual('MCMXCIV');
    expect(convertIntegerToRoman(3999)).toEqual('MMMCMXCIX');
  });

  it('should return an empty string for 0', () => {
    expect(convertIntegerToRoman(0)).toEqual('');
  });

  it('should return undefined for negative numbers', () => {
    expect(convertIntegerToRoman(-1)).toBeUndefined();
  });

  it('should handle large numbers', () => {
    expect(convertIntegerToRoman(4000)).toEqual('MMMM');
    expect(convertIntegerToRoman(4999)).toEqual('MMMMCMXCIX');
  });
});
