function validatePreferences(preferences) {
  const allowedKeys = ['theme', 'language', 'notifications', 'timezone'];
  const validThemes = ['light', 'dark', 'auto'];
  const validLanguages = ['en', 'es', 'fr', 'de'];
  
  if (!preferences || typeof preferences !== 'object') {
    throw new Error('Preferences must be an object');
  }
  
  for (const key in preferences) {
    if (!allowedKeys.includes(key)) {
      throw new Error(`Invalid preference key: ${key}`);
    }
  }
  
  if (preferences.theme && !validThemes.includes(preferences.theme)) {
    throw new Error(`Invalid theme value: ${preferences.theme}`);
  }
  
  if (preferences.language && !validLanguages.includes(preferences.language)) {
    throw new Error(`Invalid language code: ${preferences.language}`);
  }
  
  if (preferences.timezone) {
    const timezoneRegex = /^[A-Za-z_]+\/[A-Za-z_]+$/;
    if (!timezoneRegex.test(preferences.timezone)) {
      throw new Error(`Invalid timezone format: ${preferences.timezone}`);
    }
  }
  
  if (preferences.notifications !== undefined) {
    if (typeof preferences.notifications !== 'boolean') {
      throw new Error('Notifications must be a boolean value');
    }
  }
  
  return true;
}function validatePreferences(prefs, rules) {
  const errors = {};

  for (const [key, rule] of Object.entries(rules)) {
    const value = prefs[key];
    
    if (rule.required && (value === undefined || value === null || value === '')) {
      errors[key] = rule.message || `${key} is required`;
      continue;
    }

    if (value !== undefined && value !== null) {
      if (rule.type && typeof value !== rule.type) {
        errors[key] = rule.message || `${key} must be of type ${rule.type}`;
      }
      
      if (rule.min && value < rule.min) {
        errors[key] = rule.message || `${key} must be at least ${rule.min}`;
      }
      
      if (rule.max && value > rule.max) {
        errors[key] = rule.message || `${key} must be at most ${rule.max}`;
      }
      
      if (rule.pattern && !rule.pattern.test(value)) {
        errors[key] = rule.message || `${key} format is invalid`;
      }
      
      if (rule.custom && !rule.custom(value)) {
        errors[key] = rule.message || `${key} failed custom validation`;
      }
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

module.exports = { validatePreferences };