function formatCurrency(amount, locale = 'en-US', currency = 'USD') {
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
    
    return parseFloat(cleaned);
}

export { formatCurrency, parseCurrency };function formatCurrency(amount, locale = 'en-US', currency = 'USD') {
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency
    }).format(amount);
}

function parseCurrency(formattedString, locale = 'en-US') {
    const parts = new Intl.NumberFormat(locale).formatToParts(12345.6);
    const groupSeparator = parts.find(part => part.type === 'group').value;
    const decimalSeparator = parts.find(part => part.type === 'decimal').value;
    
    const regex = new RegExp(`[${groupSeparator}${decimalSeparator}]`, 'g');
    const normalized = formattedString.replace(regex, match => 
        match === groupSeparator ? '' : '.'
    );
    
    return parseFloat(normalized.replace(/[^\d.-]/g, ''));
}

export { formatCurrency, parseCurrency };const currencyFormatter = (amount, locale = 'en-US', currency = 'USD') => {
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
};

export default currencyFormatter;function formatCurrency(amount, locale = 'en-US', currency = 'USD') {
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
    const groupSeparator = parts.find(part => part.type === 'group').value;
    const decimalSeparator = parts.find(part => part.type === 'decimal').value;
    
    const regex = new RegExp(`[${groupSeparator}${decimalSeparator}]`, 'g');
    const normalized = formattedString.replace(regex, match => 
        match === groupSeparator ? '' : '.'
    );
    
    return parseFloat(normalized.replace(/[^\d.-]/g, ''));
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
  const parts = new Intl.NumberFormat(locale).formatToParts(12345.6);
  const groupSeparator = parts.find(part => part.type === 'group')?.value || ',';
  const decimalSeparator = parts.find(part => part.type === 'decimal')?.value || '.';
  
  const regex = new RegExp(`[^0-9${decimalSeparator}]`, 'g');
  const numericString = formattedValue
    .replace(regex, '')
    .replace(decimalSeparator, '.');
  
  const number = parseFloat(numericString);
  return isNaN(number) ? 0 : number;
}

export { formatCurrency, parseCurrency };