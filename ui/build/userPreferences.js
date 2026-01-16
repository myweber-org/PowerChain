const defaultPreferences = {
  theme: 'light',
  notifications: true,
  language: 'en',
  resultsPerPage: 20
};

function validatePreferences(userPrefs) {
  const validKeys = Object.keys(defaultPreferences);
  const validatedPrefs = { ...defaultPreferences };

  for (const key of validKeys) {
    if (userPrefs.hasOwnProperty(key)) {
      if (typeof userPrefs[key] === typeof defaultPreferences[key]) {
        validatedPrefs[key] = userPrefs[key];
      }
    }
  }

  return validatedPrefs;
}

function mergePreferences(existingPrefs, newPrefs) {
  const validatedNewPrefs = validatePreferences(newPrefs);
  return { ...existingPrefs, ...validatedNewPrefs };
}

function getPreference(key) {
  if (!defaultPreferences.hasOwnProperty(key)) {
    throw new Error(`Invalid preference key: ${key}`);
  }
  
  const stored = localStorage.getItem('userPreferences');
  if (stored) {
    const prefs = JSON.parse(stored);
    return prefs[key] !== undefined ? prefs[key] : defaultPreferences[key];
  }
  
  return defaultPreferences[key];
}

function savePreferences(prefs) {
  const validated = validatePreferences(prefs);
  const current = JSON.parse(localStorage.getItem('userPreferences') || '{}');
  const merged = mergePreferences(current, validated);
  localStorage.setItem('userPreferences', JSON.stringify(merged));
  return merged;
}

export { validatePreferences, mergePreferences, getPreference, savePreferences, defaultPreferences };function validateUserPreferences(preferences) {
    const defaults = {
        theme: 'light',
        notifications: true,
        language: 'en',
        timezone: 'UTC',
        resultsPerPage: 25
    };

    const validated = { ...defaults, ...preferences };

    if (!['light', 'dark', 'auto'].includes(validated.theme)) {
        validated.theme = defaults.theme;
    }

    if (typeof validated.notifications !== 'boolean') {
        validated.notifications = defaults.notifications;
    }

    if (!['en', 'es', 'fr', 'de'].includes(validated.language)) {
        validated.language = defaults.language;
    }

    if (!/^[A-Za-z_]+\/[A-Za-z_]+$/.test(validated.timezone)) {
        validated.timezone = defaults.timezone;
    }

    if (typeof validated.resultsPerPage !== 'number' || 
        validated.resultsPerPage < 10 || 
        validated.resultsPerPage > 100) {
        validated.resultsPerPage = defaults.resultsPerPage;
    }

    return validated;
}

function saveUserPreferences(preferences) {
    const validated = validateUserPreferences(preferences);
    localStorage.setItem('userPreferences', JSON.stringify(validated));
    return validated;
}

function loadUserPreferences() {
    const stored = localStorage.getItem('userPreferences');
    if (stored) {
        try {
            return validateUserPreferences(JSON.parse(stored));
        } catch (error) {
            console.error('Failed to parse stored preferences:', error);
        }
    }
    return validateUserPreferences({});
}

export { validateUserPreferences, saveUserPreferences, loadUserPreferences };function validateUserPreferences(preferences) {
    const defaults = {
        theme: 'light',
        language: 'en',
        notifications: true,
        fontSize: 16,
        autoSave: false
    };

    const validated = { ...defaults, ...preferences };

    if (!['light', 'dark', 'auto'].includes(validated.theme)) {
        validated.theme = defaults.theme;
    }

    if (!['en', 'es', 'fr', 'de'].includes(validated.language)) {
        validated.language = defaults.language;
    }

    if (typeof validated.notifications !== 'boolean') {
        validated.notifications = defaults.notifications;
    }

    if (typeof validated.fontSize !== 'number' || validated.fontSize < 12 || validated.fontSize > 24) {
        validated.fontSize = defaults.fontSize;
    }

    if (typeof validated.autoSave !== 'boolean') {
        validated.autoSave = defaults.autoSave;
    }

    return validated;
}

function saveUserPreferences(preferences) {
    const validatedPrefs = validateUserPreferences(preferences);
    localStorage.setItem('userPreferences', JSON.stringify(validatedPrefs));
    return validatedPrefs;
}

function loadUserPreferences() {
    const stored = localStorage.getItem('userPreferences');
    if (stored) {
        try {
            return validateUserPreferences(JSON.parse(stored));
        } catch (error) {
            console.error('Failed to parse stored preferences:', error);
        }
    }
    return validateUserPreferences({});
}

export { validateUserPreferences, saveUserPreferences, loadUserPreferences };