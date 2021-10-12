function convertCurrencyCode(code) {
  switch (code) {
    case 'USD':
      return '$';
    case 'EUR':
      return '€'
    case 'GBP':
      return '£';
    case 'CAD':
      return 'C$';
    case 'JPY':
      return '¥';
    case 'BRL':
      return 'R$';
    default:
      return '$';
  }
}

module.exports = {
  convertCurrencyCode,
}