function formatCurrency(value, locale = 'en-US', options = {}) {
  const defaultOptions = {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    ...options
  };
  
  if (typeof value !== 'number' || isNaN(value)) {
    throw new TypeError('Value must be a valid number');
  }
  
  try {
    return new Intl.NumberFormat(locale, defaultOptions).format(value);
  } catch (error) {
    console.error('Currency formatting error:', error);
    return value.toString();
  }
}

function parseCurrency(formattedValue, locale = 'en-US') {
  const parts = new Intl.NumberFormat(locale).formatToParts(1234.56);
  const decimalSeparator = parts.find(part => part.type === 'decimal')?.value || '.';
  const groupSeparator = parts.find(part => part.type === 'group')?.value || ',';
  
  const cleanedValue = formattedValue
    .replace(new RegExp(`\\${groupSeparator}`, 'g'), '')
    .replace(new RegExp(`\\${decimalSeparator}`), '.')
    .replace(/[^\d.-]/g, '');
  
  const parsed = parseFloat(cleanedValue);
  return isNaN(parsed) ? null : parsed;
}

export { formatCurrency, parseCurrency };