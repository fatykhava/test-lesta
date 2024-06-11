/**
 * Normalizes a string by removing diacritical marks and special characters.
 *
 * @param {string} str - The input string to be normalized.
 * @return {string} The normalized string without diacritical marks and special characters.
 */

function normalizeString(str: string) {
  return str.normalize('NFKD').replace(/[\u0300-\u036f]/g, '');
}

export default normalizeString;
