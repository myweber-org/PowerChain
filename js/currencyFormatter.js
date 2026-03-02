function formatCurrency(value, locale = 'en-US', currency = 'USD', options = {}) {
  const defaultOptions = {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  };
  
  const mergedOptions = { ...defaultOptions, ...options };
  
  try {
    return new Intl.NumberFormat(locale, mergedOptions).format(value);
  } catch (error) {
    console.error('Currency formatting error:', error);
    return value.toString();
  }
}

function parseCurrency(formattedValue, locale = 'en-US') {
  const parts = new Intl.NumberFormat(locale).formatToParts(12345.67);
  const decimalSeparator = parts.find(part => part.type === 'decimal')?.value || '.';
  const groupSeparator = parts.find(part => part.type === 'group')?.value || ',';
  
  const cleanValue = formattedValue
    .replace(new RegExp(`\\${groupSeparator}`, 'g'), '')
    .replace(new RegExp(`\\${decimalSeparator}`), '.')
    .replace(/[^\d.-]/g, '');
  
  return parseFloat(cleanValue) || 0;
}

export { formatCurrency, parseCurrency };function formatCurrency(value, locale = 'en-US', options = {}) {
  const defaultOptions = {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    ...options
  };
  
  try {
    const formatter = new Intl.NumberFormat(locale, defaultOptions);
    return formatter.format(value);
  } catch (error) {
    console.error('Currency formatting error:', error);
    return value.toString();
  }
}

function parseCurrency(formattedValue, locale = 'en-US') {
  const example = formatCurrency(1234.56, locale);
  const groupSeparator = example.replace(/\d/g, '').charAt(1);
  const decimalSeparator = example.replace(/\d/g, '').charAt(example.length - 3);
  
  const cleaned = formattedValue
    .replace(new RegExp(`[${groupSeparator}]`, 'g'), '')
    .replace(new RegExp(`[${decimalSeparator}]`, 'g'), '.')
    .replace(/[^\d.-]/g, '');
  
  return parseFloat(cleaned) || 0;
}

export { formatCurrency, parseCurrency };