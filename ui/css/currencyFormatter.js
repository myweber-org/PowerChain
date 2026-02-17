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
    return value.toString();
  }
}

function parseCurrency(formattedValue, locale = 'en-US') {
  const parts = new Intl.NumberFormat(locale).formatToParts(12345.6);
  const groupSeparator = parts.find(part => part.type === 'group')?.value || ',';
  const decimalSeparator = parts.find(part => part.type === 'decimal')?.value || '.';
  
  const regex = new RegExp(`[^0-9${decimalSeparator}]`, 'g');
  const numericString = formattedValue
    .replace(regex, '')
    .replace(decimalSeparator, '.');
  
  return parseFloat(numericString) || 0;
}

export { formatCurrency, parseCurrency };function formatCurrency(value, currency = 'USD', locale = 'en-US') {
    if (typeof value !== 'number' || isNaN(value)) {
        throw new TypeError('Value must be a valid number');
    }
    
    const formatter = new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency.toUpperCase(),
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
    
    return formatter.format(value);
}

function parseCurrency(formattedString, locale = 'en-US') {
    const parts = new Intl.NumberFormat(locale).formatToParts(12345.6);
    const groupSeparator = parts.find(part => part.type === 'group').value;
    const decimalSeparator = parts.find(part => part.type === 'decimal').value;
    
    const regex = new RegExp(`[^0-9${decimalSeparator}]`, 'g');
    const cleaned = formattedString.replace(regex, '')
                                   .replace(decimalSeparator, '.');
    
    return parseFloat(cleaned);
}

export { formatCurrency, parseCurrency };function formatCurrency(amount, locale = 'en-US', currency = 'USD') {
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(amount);
}

function parseCurrency(formattedString, locale = 'en-US') {
    const parts = new Intl.NumberFormat(locale).formatToParts(1234.56);
    const groupSeparator = parts.find(part => part.type === 'group').value;
    const decimalSeparator = parts.find(part => part.type === 'decimal').value;
    
    const regex = new RegExp(`[${groupSeparator}${decimalSeparator}]`, 'g');
    const normalized = formattedString.replace(regex, match => 
        match === groupSeparator ? '' : '.'
    );
    
    return parseFloat(normalized.replace(/[^\d.-]/g, ''));
}

export { formatCurrency, parseCurrency };function formatCurrency(value, currency = 'USD', locale = 'en-US') {
    const options = {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    };
    
    try {
        return new Intl.NumberFormat(locale, options).format(value);
    } catch (error) {
        console.error('Currency formatting error:', error);
        return value.toString();
    }
}

function parseCurrency(formattedString, locale = 'en-US') {
    const parts = new Intl.NumberFormat(locale).formatToParts(1234.56);
    const decimalSeparator = parts.find(part => part.type === 'decimal')?.value || '.';
    const groupSeparator = parts.find(part => part.type === 'group')?.value || ',';
    
    const cleaned = formattedString
        .replace(new RegExp(`\\${groupSeparator}`, 'g'), '')
        .replace(new RegExp(`\\${decimalSeparator}`), '.')
        .replace(/[^\d.-]/g, '');
    
    return parseFloat(cleaned) || 0;
}

export { formatCurrency, parseCurrency };function formatCurrency(value, locale = 'en-US', options = {}) {
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
    console.error('Currency formatting failed:', error);
    return value.toString();
  }
}

function parseCurrency(formattedValue, locale = 'en-US') {
  const parts = new Intl.NumberFormat(locale).formatToParts(1234.56);
  const decimalSeparator = parts.find(part => part.type === 'decimal')?.value || '.';
  const groupSeparator = parts.find(part => part.type === 'group')?.value || ',';
  
  const cleanValue = formattedValue
    .replace(new RegExp(`\\${groupSeparator}`, 'g'), '')
    .replace(new RegExp(`\\${decimalSeparator}`), '.')
    .replace(/[^\d.-]/g, '');
  
  const parsed = parseFloat(cleanValue);
  return isNaN(parsed) ? 0 : parsed;
}

export { formatCurrency, parseCurrency };function formatCurrency(amount, locale = 'en-US', currency = 'USD') {
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(amount);
}

function parseCurrency(formattedString, locale = 'en-US') {
    const parts = new Intl.NumberFormat(locale).formatToParts(1234.5);
    const groupSeparator = parts.find(part => part.type === 'group').value;
    const decimalSeparator = parts.find(part => part.type === 'decimal').value;
    
    const regex = new RegExp(`[${groupSeparator}${decimalSeparator}]`, 'g');
    const normalized = formattedString.replace(regex, match => 
        match === groupSeparator ? '' : '.'
    );
    
    return parseFloat(normalized.replace(/[^\d.-]/g, ''));
}

export { formatCurrency, parseCurrency };function formatCurrency(amount, locale = 'en-US', currency = 'USD') {
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(amount);
}

function parseCurrency(formattedString, locale = 'en-US') {
    const parts = new Intl.NumberFormat(locale).formatToParts(1234.56);
    const groupSeparator = parts.find(part => part.type === 'group').value;
    const decimalSeparator = parts.find(part => part.type === 'decimal').value;
    
    const regex = new RegExp(`[${groupSeparator}${decimalSeparator}]`, 'g');
    const normalized = formattedString.replace(regex, match => 
        match === groupSeparator ? '' : '.'
    );
    
    return parseFloat(normalized.replace(/[^\d.-]/g, ''));
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

export { formatCurrency, parseCurrency };