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

export { formatCurrency, parseCurrency };