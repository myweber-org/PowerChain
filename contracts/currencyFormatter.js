const currencyFormatter = (value, locale = 'en-US', currency = 'USD') => {
  if (typeof value !== 'number' || isNaN(value)) {
    throw new Error('Invalid input: value must be a number');
  }
  
  const formatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
  
  return formatter.format(value);
};

const formatCurrencyWithSymbol = (value, currencySymbol = '$', decimalPlaces = 2) => {
  const fixedValue = Number(value).toFixed(decimalPlaces);
  const parts = fixedValue.split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return `${currencySymbol}${parts.join('.')}`;
};

export { currencyFormatter, formatCurrencyWithSymbol };function formatCurrency(value, locale = 'en-US', currency = 'USD') {
    if (typeof value !== 'number') {
        throw new TypeError('Value must be a number');
    }
    
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(value);
}

function parseCurrency(formattedString, locale = 'en-US') {
    const parts = new Intl.NumberFormat(locale).formatToParts(1234.56);
    const decimalSeparator = parts.find(part => part.type === 'decimal').value;
    const groupSeparator = parts.find(part => part.type === 'group').value;
    
    const cleaned = formattedString
        .replace(new RegExp(`\\${groupSeparator}`, 'g'), '')
        .replace(new RegExp(`\\${decimalSeparator}`), '.')
        .replace(/[^\d.-]/g, '');
    
    return parseFloat(cleaned);
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

function parseCurrency(formattedValue, locale = 'en-US') {
    const parts = new Intl.NumberFormat(locale).formatToParts(1111.11);
    const decimalSeparator = parts.find(part => part.type === 'decimal')?.value || '.';
    const groupSeparator = parts.find(part => part.type === 'group')?.value || ',';
    
    const cleanValue = formattedValue
        .replace(new RegExp(`\\${groupSeparator}`, 'g'), '')
        .replace(new RegExp(`\\${decimalSeparator}`), '.')
        .replace(/[^\d.-]/g, '');
    
    const parsed = parseFloat(cleanValue);
    return isNaN(parsed) ? null : parsed;
}

export { formatCurrency, parseCurrency };function formatCurrency(amount, locale = 'en-US', currency = 'USD') {
    if (typeof amount !== 'number' || isNaN(amount)) {
        throw new Error('Amount must be a valid number');
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
    
    const parsedValue = parseFloat(cleanString);
    
    if (isNaN(parsedValue)) {
        throw new Error('Invalid currency string');
    }
    
    return parsedValue;
}

export { formatCurrency, parseCurrency };function formatCurrency(amount, locale = 'en-US', currency = 'USD') {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
}

function parseFormattedCurrency(formattedString, locale = 'en-US') {
  const parts = new Intl.NumberFormat(locale).formatToParts(1234.5);
  const groupSeparator = parts.find(part => part.type === 'group').value;
  const decimalSeparator = parts.find(part => part.type === 'decimal').value;
  
  const cleanString = formattedString
    .replace(new RegExp(`[${groupSeparator}]`, 'g'), '')
    .replace(new RegExp(`[${decimalSeparator}]`, 'g'), '.')
    .replace(/[^\d.-]/g, '');
    
  return parseFloat(cleanString);
}

export { formatCurrency, parseFormattedCurrency };