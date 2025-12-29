const defaultPreferences = {
  theme: 'light',
  notifications: true,
  language: 'en',
  timezone: 'UTC',
  resultsPerPage: 25
};

function validatePreferences(preferences) {
  const validKeys = Object.keys(defaultPreferences);
  const validated = {};
  
  for (const key of validKeys) {
    if (preferences.hasOwnProperty(key)) {
      const value = preferences[key];
      
      switch(key) {
        case 'theme':
          validated[key] = ['light', 'dark', 'auto'].includes(value) ? value : defaultPreferences.theme;
          break;
        case 'notifications':
          validated[key] = typeof value === 'boolean' ? value : defaultPreferences.notifications;
          break;
        case 'language':
          validated[key] = typeof value === 'string' && value.length === 2 ? value : defaultPreferences.language;
          break;
        case 'timezone':
          validated[key] = typeof value === 'string' ? value : defaultPreferences.timezone;
          break;
        case 'resultsPerPage':
          validated[key] = Number.isInteger(value) && value > 0 && value <= 100 ? value : defaultPreferences.resultsPerPage;
          break;
        default:
          validated[key] = defaultPreferences[key];
      }
    } else {
      validated[key] = defaultPreferences[key];
    }
  }
  
  return validated;
}

function mergePreferences(userPrefs, savedPrefs = {}) {
  const validatedUser = validatePreferences(userPrefs);
  const validatedSaved = validatePreferences(savedPrefs);
  
  return {
    ...defaultPreferences,
    ...validatedSaved,
    ...validatedUser
  };
}

function savePreferences(preferences) {
  const validated = validatePreferences(preferences);
  localStorage.setItem('userPreferences', JSON.stringify(validated));
  return validated;
}

function loadPreferences() {
  const stored = localStorage.getItem('userPreferences');
  if (stored) {
    try {
      return validatePreferences(JSON.parse(stored));
    } catch (error) {
      console.error('Failed to parse stored preferences:', error);
      return defaultPreferences;
    }
  }
  return defaultPreferences;
}

export { validatePreferences, mergePreferences, savePreferences, loadPreferences, defaultPreferences };