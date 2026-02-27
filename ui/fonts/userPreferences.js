const defaultPreferences = {
  theme: 'light',
  notifications: true,
  language: 'en',
  resultsPerPage: 20
};

function validatePreferences(userPrefs) {
  const validPrefs = { ...defaultPreferences };
  
  if (userPrefs && typeof userPrefs === 'object') {
    if (['light', 'dark', 'auto'].includes(userPrefs.theme)) {
      validPrefs.theme = userPrefs.theme;
    }
    
    if (typeof userPrefs.notifications === 'boolean') {
      validPrefs.notifications = userPrefs.notifications;
    }
    
    if (['en', 'es', 'fr', 'de'].includes(userPrefs.language)) {
      validPrefs.language = userPrefs.language;
    }
    
    if (Number.isInteger(userPrefs.resultsPerPage) && 
        userPrefs.resultsPerPage >= 10 && 
        userPrefs.resultsPerPage <= 100) {
      validPrefs.resultsPerPage = userPrefs.resultsPerPage;
    }
  }
  
  return validPrefs;
}

function savePreferences(prefs) {
  const validated = validatePreferences(prefs);
  localStorage.setItem('userPreferences', JSON.stringify(validated));
  return validated;
}

function loadPreferences() {
  const stored = localStorage.getItem('userPreferences');
  if (stored) {
    try {
      return validatePreferences(JSON.parse(stored));
    } catch (e) {
      console.error('Failed to parse stored preferences:', e);
    }
  }
  return { ...defaultPreferences };
}

export { validatePreferences, savePreferences, loadPreferences, defaultPreferences };function initializeUserPreferences(preferences) {
    const defaultPreferences = {
        theme: 'light',
        language: 'en',
        notifications: true,
        fontSize: 16,
        autoSave: false
    };

    if (!preferences || typeof preferences !== 'object') {
        return defaultPreferences;
    }

    const validatedPreferences = { ...defaultPreferences };

    if (preferences.theme && ['light', 'dark', 'auto'].includes(preferences.theme)) {
        validatedPreferences.theme = preferences.theme;
    }

    if (preferences.language && ['en', 'es', 'fr', 'de'].includes(preferences.language)) {
        validatedPreferences.language = preferences.language;
    }

    if (typeof preferences.notifications === 'boolean') {
        validatedPreferences.notifications = preferences.notifications;
    }

    if (typeof preferences.fontSize === 'number' && preferences.fontSize >= 12 && preferences.fontSize <= 24) {
        validatedPreferences.fontSize = preferences.fontSize;
    }

    if (typeof preferences.autoSave === 'boolean') {
        validatedPreferences.autoSave = preferences.autoSave;
    }

    return validatedPreferences;
}

function savePreferencesToStorage(preferences) {
    try {
        localStorage.setItem('userPreferences', JSON.stringify(preferences));
        return true;
    } catch (error) {
        console.error('Failed to save preferences:', error);
        return false;
    }
}

function loadPreferencesFromStorage() {
    try {
        const stored = localStorage.getItem('userPreferences');
        return stored ? JSON.parse(stored) : null;
    } catch (error) {
        console.error('Failed to load preferences:', error);
        return null;
    }
}

export { initializeUserPreferences, savePreferencesToStorage, loadPreferencesFromStorage };