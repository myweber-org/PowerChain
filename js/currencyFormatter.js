function formatCurrency(value, locale = 'en-US', currency = 'USD') {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
}

function parseCurrency(formattedValue, locale = 'en-US') {
  const parts = new Intl.NumberFormat(locale).formatToParts(12345.6);
  const groupSeparator = parts.find(part => part.type === 'group').value;
  const decimalSeparator = parts.find(part => part.type === 'decimal').value;
  
  const regex = new RegExp(`[${groupSeparator}${decimalSeparator}]`, 'g');
  const cleaned = formattedValue.replace(regex, match => 
    match === groupSeparator ? '' : '.'
  );
  
  return parseFloat(cleaned.replace(/[^\d.-]/g, ''));
}

export { formatCurrency, parseCurrency };