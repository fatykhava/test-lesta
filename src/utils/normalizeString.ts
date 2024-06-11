function normalizeString(str: string) {
  return str.normalize('NFKD').replace(/[\u0300-\u036f]/g, '');
}

export default normalizeString;
