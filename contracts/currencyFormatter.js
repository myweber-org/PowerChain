function formatCurrency(value, locale = 'en-US', currency = 'USD') {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
}

function parseCurrency(formattedValue, locale = 'en-US') {
  const example = formatCurrency(1234.56, locale);
  const cleanPattern = example.replace(/[\d\s.,]/g, '');
  const decimalSeparator = example.match(/[^\d\s]/g)?.[1] || '.';
  const groupSeparator = example.match(/[^\d\s]/g)?.[0] || ',';
  
  const cleanValue = formattedValue
    .replace(new RegExp(`[${cleanPattern}]`, 'g'), '')
    .replace(new RegExp(`\\${groupSeparator}`, 'g'), '')
    .replace(new RegExp(`\\${decimalSeparator}`), '.');
  
  return parseFloat(cleanValue) || 0;
}

export { formatCurrency, parseCurrency };function formatCurrency(amount, locale = 'en-US', currency = 'USD') {
  if (typeof amount !== 'number' || isNaN(amount)) {
    throw new TypeError('Amount must be a valid number');
  }
  
  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency
    }).format(amount);
  } catch (error) {
    throw new Error(`Invalid locale or currency: ${error.message}`);
  }
}

function parseCurrency(formattedString, locale = 'en-US') {
  const parts = new Intl.NumberFormat(locale).formatToParts(1234.5);
  const decimalSeparator = parts.find(part => part.type === 'decimal')?.value || '.';
  const groupSeparator = parts.find(part => part.type === 'group')?.value || ',';
  
  const cleanString = formattedString
    .replace(new RegExp(`[${groupSeparator}]`, 'g'), '')
    .replace(new RegExp(`[${decimalSeparator}]`, 'g'), '.')
    .replace(/[^\d.-]/g, '');
  
  const parsed = parseFloat(cleanString);
  return isNaN(parsed) ? null : parsed;
}

export { formatCurrency, parseCurrency };