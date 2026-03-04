function formatCurrency(value, locale = 'en-US', currency = 'USD', options = {}) {
  const defaultOptions = {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  };

  const mergedOptions = { ...defaultOptions, ...options };
  
  try {
    const formatter = new Intl.NumberFormat(locale, mergedOptions);
    return formatter.format(value);
  } catch (error) {
    console.error('Currency formatting error:', error);
    return value.toString();
  }
}

export { formatCurrency };