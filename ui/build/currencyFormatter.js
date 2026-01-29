function formatCurrency(value, locale = 'en-US', options = {}) {
  const defaultOptions = {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    ...options
  };
  
  try {
    return new Intl.NumberFormat(locale, defaultOptions).format(value);
  } catch (error) {
    console.error('Currency formatting error:', error);
    return `$${value.toFixed(2)}`;
  }
}

function parseCurrency(formattedValue, locale = 'en-US') {
  const parts = new Intl.NumberFormat(locale).formatToParts(12345.6);
  const groupSeparator = parts.find(part => part.type === 'group')?.value || ',';
  const decimalSeparator = parts.find(part => part.type === 'decimal')?.value || '.';
  
  const regex = new RegExp(`[^0-9${decimalSeparator}]`, 'g');
  const numericString = formattedValue.replace(regex, '').replace(decimalSeparator, '.');
  
  return parseFloat(numericString) || 0;
}

export { formatCurrency, parseCurrency };