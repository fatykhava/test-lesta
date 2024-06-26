/**
 * Converts an integer to its corresponding Roman numeral representation.
 *
 * @param {number} num - The integer to be converted.
 * @return {string | undefined} The Roman numeral representation of the integer, or undefined if the input is zero.
 */

const convertIntegerToRoman = (num: number): string | undefined => {
  const romanNumerals = [
    { value: 1000, numeral: 'M' },
    { value: 900, numeral: 'CM' },
    { value: 500, numeral: 'D' },
    { value: 400, numeral: 'CD' },
    { value: 100, numeral: 'C' },
    { value: 90, numeral: 'XC' },
    { value: 50, numeral: 'L' },
    { value: 40, numeral: 'XL' },
    { value: 10, numeral: 'X' },
    { value: 9, numeral: 'IX' },
    { value: 5, numeral: 'V' },
    { value: 4, numeral: 'IV' },
    { value: 1, numeral: 'I' }
  ];

  if (num === 0) return '';

  for (let i = 0; i < romanNumerals.length; i++) {
    if (num >= romanNumerals[i].value) {
      return romanNumerals[i].numeral + convertIntegerToRoman(num - romanNumerals[i].value);
    }
  }
};

export default convertIntegerToRoman;
