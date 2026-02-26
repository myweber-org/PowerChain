const defaultPreferences = {
  theme: 'light',
  notifications: true,
  language: 'en',
  resultsPerPage: 25
};

function validatePreferences(userPrefs) {
  const validPreferences = { ...defaultPreferences };
  
  if (userPrefs && typeof userPrefs === 'object') {
    if (['light', 'dark', 'auto'].includes(userPrefs.theme)) {
      validPreferences.theme = userPrefs.theme;
    }
    
    if (typeof userPrefs.notifications === 'boolean') {
      validPreferences.notifications = userPrefs.notifications;
    }
    
    if (['en', 'es', 'fr', 'de'].includes(userPrefs.language)) {
      validPreferences.language = userPrefs.language;
    }
    
    if (Number.isInteger(userPrefs.resultsPerPage) && 
        userPrefs.resultsPerPage >= 10 && 
        userPrefs.resultsPerPage <= 100) {
      validPreferences.resultsPerPage = userPrefs.resultsPerPage;
    }
  }
  
  return validPreferences;
}

function savePreferences(preferences) {
  const validatedPrefs = validatePreferences(preferences);
  localStorage.setItem('userPreferences', JSON.stringify(validatedPrefs));
  return validatedPrefs;
}

function loadPreferences() {
  const storedPrefs = localStorage.getItem('userPreferences');
  if (storedPrefs) {
    try {
      return validatePreferences(JSON.parse(storedPrefs));
    } catch (error) {
      console.error('Failed to parse stored preferences:', error);
    }
  }
  return { ...defaultPreferences };
}

export { validatePreferences, savePreferences, loadPreferences };function initializeUserPreferences(preferences) {
    const defaults = {
        theme: 'light',
        language: 'en',
        notifications: true,
        fontSize: 16,
        autoSave: false
    };

    const validatedPrefs = { ...defaults };

    if (preferences && typeof preferences === 'object') {
        for (const key in defaults) {
            if (preferences.hasOwnProperty(key)) {
                const value = preferences[key];
                const defaultType = typeof defaults[key];

                if (typeof value === defaultType) {
                    if (defaultType === 'number' && key === 'fontSize') {
                        validatedPrefs[key] = Math.max(12, Math.min(24, value));
                    } else if (defaultType === 'boolean' || defaultType === 'string') {
                        validatedPrefs[key] = value;
                    }
                }
            }
        }
    }

    if (!validatedPrefs.theme || !['light', 'dark', 'auto'].includes(validatedPrefs.theme)) {
        validatedPrefs.theme = defaults.theme;
    }

    if (!validatedPrefs.language || !['en', 'es', 'fr', 'de'].includes(validatedPrefs.language)) {
        validatedPrefs.language = defaults.language;
    }

    return validatedPrefs;
}

function savePreferences(preferences) {
    try {
        localStorage.setItem('userPreferences', JSON.stringify(preferences));
        return true;
    } catch (error) {
        console.error('Failed to save preferences:', error);
        return false;
    }
}

function loadPreferences() {
    try {
        const stored = localStorage.getItem('userPreferences');
        return stored ? JSON.parse(stored) : null;
    } catch (error) {
        console.error('Failed to load preferences:', error);
        return null;
    }
}

function resetPreferences() {
    try {
        localStorage.removeItem('userPreferences');
        return initializeUserPreferences({});
    } catch (error) {
        console.error('Failed to reset preferences:', error);
        return initializeUserPreferences({});
    }
}

export { initializeUserPreferences, savePreferences, loadPreferences, resetPreferences };const userPreferences = {
  theme: 'light',
  notifications: true,
  language: 'en',
  fontSize: 16
};

const defaultPreferences = {
  theme: 'light',
  notifications: true,
  language: 'en',
  fontSize: 14
};

function validatePreferences(prefs) {
  const validThemes = ['light', 'dark', 'auto'];
  const validLanguages = ['en', 'es', 'fr', 'de'];
  
  if (!validThemes.includes(prefs.theme)) {
    prefs.theme = defaultPreferences.theme;
  }
  
  if (!validLanguages.includes(prefs.language)) {
    prefs.language = defaultPreferences.language;
  }
  
  if (typeof prefs.notifications !== 'boolean') {
    prefs.notifications = defaultPreferences.notifications;
  }
  
  if (typeof prefs.fontSize !== 'number' || prefs.fontSize < 8 || prefs.fontSize > 32) {
    prefs.fontSize = defaultPreferences.fontSize;
  }
  
  return prefs;
}

function mergeWithDefaults(prefs) {
  return {
    ...defaultPreferences,
    ...prefs
  };
}

export function initializeUserPreferences(userPrefs = {}) {
  const merged = mergeWithDefaults(userPrefs);
  return validatePreferences(merged);
}

export function savePreferences(prefs) {
  try {
    localStorage.setItem('userPreferences', JSON.stringify(prefs));
    return true;
  } catch (error) {
    console.error('Failed to save preferences:', error);
    return false;
  }
}

export function loadPreferences() {
  try {
    const stored = localStorage.getItem('userPreferences');
    if (stored) {
      return validatePreferences(JSON.parse(stored));
    }
    return defaultPreferences;
  } catch (error) {
    console.error('Failed to load preferences:', error);
    return defaultPreferences;
  }
}