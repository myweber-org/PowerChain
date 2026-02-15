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
    const decimalSeparator = parts.find(part => part.type === 'decimal').value;
    const groupSeparator = parts.find(part => part.type === 'group').value;
    
    const cleaned = formattedString
        .replace(new RegExp(`[${groupSeparator}]`, 'g'), '')
        .replace(new RegExp(`[${decimalSeparator}]`, 'g'), '.')
        .replace(/[^\d.-]/g, '');
    
    const parsed = parseFloat(cleaned);
    return isNaN(parsed) ? null : parsed;
}

export { formatCurrency, parseCurrency };function formatCurrency(value, locale = 'en-US', currency = 'USD') {
    if (typeof value !== 'number' || isNaN(value)) {
        throw new TypeError('Value must be a valid number');
    }
    
    const formatter = new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
    
    return formatter.format(value);
}

function parseCurrency(formattedString, locale = 'en-US') {
    const parts = new Intl.NumberFormat(locale).formatToParts(1234.56);
    const groupSeparator = parts.find(part => part.type === 'group')?.value || ',';
    const decimalSeparator = parts.find(part => part.type === 'decimal')?.value || '.';
    
    const regex = new RegExp(`[^0-9${decimalSeparator}]`, 'g');
    const numericString = formattedString.replace(regex, '').replace(decimalSeparator, '.');
    
    const number = parseFloat(numericString);
    return isNaN(number) ? 0 : number;
}

export { formatCurrency, parseCurrency };function formatCurrency(value, options = {}) {
  const {
    locale = 'en-US',
    currency = 'USD',
    minimumFractionDigits = 2,
    maximumFractionDigits = 2,
    style = 'currency'
  } = options;

  if (typeof value !== 'number' || isNaN(value)) {
    throw new TypeError('Value must be a valid number');
  }

  const formatter = new Intl.NumberFormat(locale, {
    style,
    currency,
    minimumFractionDigits,
    maximumFractionDigits
  });

  return formatter.format(value);
}

function parseCurrency(formattedString, locale = 'en-US') {
  const example = formatCurrency(0, { locale });
  const decimalSeparator = example.replace(/[\d\s]/g, '').charAt(0);
  const groupSeparator = example.replace(/[\d\s]/g, '').charAt(1) || '';
  
  const cleanString = formattedString
    .replace(new RegExp(`[${groupSeparator}]`, 'g'), '')
    .replace(decimalSeparator, '.')
    .replace(/[^\d.-]/g, '');
  
  return parseFloat(cleanString);
}

export { formatCurrency, parseCurrency };function formatCurrency(amount, locale = 'en-US', currency = 'USD') {
    if (typeof amount !== 'number') {
        throw new TypeError('Amount must be a number');
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
    
    const cleaned = formattedString
        .replace(new RegExp(`\\${groupSeparator}`, 'g'), '')
        .replace(new RegExp(`\\${decimalSeparator}`), '.')
        .replace(/[^\d.-]/g, '');
    
    const parsed = parseFloat(cleaned);
    return isNaN(parsed) ? null : parsed;
}

export { formatCurrency, parseCurrency };