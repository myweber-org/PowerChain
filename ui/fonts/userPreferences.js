function initializeUserPreferences(preferences) {
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
        if (stored) {
            return initializeUserPreferences(JSON.parse(stored));
        }
    } catch (error) {
        console.error('Failed to load preferences:', error);
    }
    return initializeUserPreferences(null);
}

export { initializeUserPreferences, savePreferencesToStorage, loadPreferencesFromStorage };const defaultPreferences = {
  theme: 'light',
  notifications: true,
  language: 'en',
  resultsPerPage: 25
};

function validatePreferences(userPrefs) {
  const validPreferences = {};
  
  // Validate theme
  if (['light', 'dark', 'auto'].includes(userPrefs.theme)) {
    validPreferences.theme = userPrefs.theme;
  } else {
    validPreferences.theme = defaultPreferences.theme;
  }
  
  // Validate notifications
  if (typeof userPrefs.notifications === 'boolean') {
    validPreferences.notifications = userPrefs.notifications;
  } else {
    validPreferences.notifications = defaultPreferences.notifications;
  }
  
  // Validate language
  if (typeof userPrefs.language === 'string' && userPrefs.language.length === 2) {
    validPreferences.language = userPrefs.language.toLowerCase();
  } else {
    validPreferences.language = defaultPreferences.language;
  }
  
  // Validate results per page
  if (Number.isInteger(userPrefs.resultsPerPage) && userPrefs.resultsPerPage >= 10 && userPrefs.resultsPerPage <= 100) {
    validPreferences.resultsPerPage = userPrefs.resultsPerPage;
  } else {
    validPreferences.resultsPerPage = defaultPreferences.resultsPerPage;
  }
  
  return validPreferences;
}

function mergeWithDefaults(userPrefs) {
  return {
    ...defaultPreferences,
    ...validatePreferences(userPrefs)
  };
}

export { validatePreferences, mergeWithDefaults, defaultPreferences };