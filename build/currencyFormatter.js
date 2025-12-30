function formatCurrency(amount, locale = 'en-US', currency = 'USD') {
  if (typeof amount !== 'number' || isNaN(amount)) {
    throw new Error('Amount must be a valid number');
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
  const parts = new Intl.NumberFormat(locale).formatToParts(12345.6);
  const groupSeparator = parts.find(part => part.type === 'group').value;
  const decimalSeparator = parts.find(part => part.type === 'decimal').value;
  
  const regex = new RegExp(`[^0-9${decimalSeparator}]`, 'g');
  const cleaned = formattedString.replace(regex, '');
  const normalized = cleaned.replace(decimalSeparator, '.');
  
  return parseFloat(normalized);
}

export { formatCurrency, parseCurrency };