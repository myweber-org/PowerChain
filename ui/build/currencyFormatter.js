function formatCurrency(amount, locale = 'en-US', currency = 'USD') {
    if (typeof amount !== 'number' || isNaN(amount)) {
        throw new TypeError('Amount must be a valid number');
    }
    
    const formatter = new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
    
    return formatter.format(amount);
}

function parseCurrency(formattedString, locale = 'en-US') {
    const parts = new Intl.NumberFormat(locale).formatToParts(1234.56);
    const groupSeparator = parts.find(part => part.type === 'group')?.value || ',';
    const decimalSeparator = parts.find(part => part.type === 'decimal')?.value || '.';
    
    const regex = new RegExp(`[^0-9${decimalSeparator}]`, 'g');
    const numericString = formattedString.replace(regex, '').replace(decimalSeparator, '.');
    
    return parseFloat(numericString);
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
    return new Intl.NumberFormat(locale, defaultOptions).format(value);
  } catch (error) {
    console.error('Currency formatting error:', error);
    return value.toString();
  }
}

function parseFormattedCurrency(formattedValue, locale = 'en-US') {
  const parts = new Intl.NumberFormat(locale).formatToParts(1111.11);
  const decimalSeparator = parts.find(part => part.type === 'decimal')?.value || '.';
  const groupSeparator = parts.find(part => part.type === 'group')?.value || ',';
  
  const cleanValue = formattedValue
    .replace(new RegExp(`\\${groupSeparator}`, 'g'), '')
    .replace(new RegExp(`\\${decimalSeparator}`), '.')
    .replace(/[^\d.-]/g, '');
  
  return parseFloat(cleanValue) || 0;
}

export { formatCurrency, parseFormattedCurrency };function formatCurrency(amount, locale = 'en-US', currency = 'USD') {
    if (typeof amount !== 'number' || isNaN(amount)) {
        throw new Error('Invalid amount provided');
    }
    
    const formatter = new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
    
    return formatter.format(amount);
}

function parseCurrency(formattedString, locale = 'en-US') {
    const parts = new Intl.NumberFormat(locale).formatToParts(1234.56);
    const decimalSeparator = parts.find(part => part.type === 'decimal').value;
    const groupSeparator = parts.find(part => part.type === 'group').value;
    
    const cleaned = formattedString
        .replace(new RegExp('\\' + groupSeparator, 'g'), '')
        .replace(new RegExp('\\' + decimalSeparator), '.')
        .replace(/[^\d.-]/g, '');
    
    return parseFloat(cleaned);
}

export { formatCurrency, parseCurrency };function formatCurrency(amount, locale = 'en-US', currency = 'USD') {
    if (typeof amount !== 'number' || isNaN(amount)) {
        throw new TypeError('Amount must be a valid number');
    }
    
    const formatter = new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
    
    return formatter.format(amount);
}

function parseCurrency(formattedString, locale = 'en-US') {
    const parts = new Intl.NumberFormat(locale).formatToParts(1234.56);
    const decimalSeparator = parts.find(part => part.type === 'decimal')?.value || '.';
    const groupSeparator = parts.find(part => part.type === 'group')?.value || ',';
    
    const cleanString = formattedString
        .replace(new RegExp(`\\${groupSeparator}`, 'g'), '')
        .replace(new RegExp(`\\${decimalSeparator}`), '.')
        .replace(/[^\d.-]/g, '');
    
    const parsed = parseFloat(cleanString);
    return isNaN(parsed) ? null : parsed;
}

export { formatCurrency, parseCurrency };