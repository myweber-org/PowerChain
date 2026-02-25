const defaultPreferences = {
  theme: 'light',
  notifications: true,
  language: 'en',
  resultsPerPage: 25
};

function validatePreferences(userPrefs) {
  const validKeys = Object.keys(defaultPreferences);
  const validated = {};

  for (const key of validKeys) {
    if (userPrefs.hasOwnProperty(key)) {
      const value = userPrefs[key];
      
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
        case 'resultsPerPage':
          validated[key] = Number.isInteger(value) && value >= 10 && value <= 100 ? value : defaultPreferences.resultsPerPage;
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

function mergePreferences(existing, updates) {
  const validatedUpdates = validatePreferences(updates);
  return { ...existing, ...validatedUpdates };
}

function savePreferences(prefs) {
  const storageKey = 'app_preferences';
  try {
    localStorage.setItem(storageKey, JSON.stringify(prefs));
    return true;
  } catch (error) {
    console.error('Failed to save preferences:', error);
    return false;
  }
}

function loadPreferences() {
  const storageKey = 'app_preferences';
  try {
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      return validatePreferences(JSON.parse(stored));
    }
  } catch (error) {
    console.error('Failed to load preferences:', error);
  }
  return { ...defaultPreferences };
}

export { validatePreferences, mergePreferences, savePreferences, loadPreferences, defaultPreferences };