const userPreferences = {
  theme: 'light',
  language: 'en',
  notifications: true,
  fontSize: 16,
  autoSave: true
};

const defaultPreferences = {
  theme: 'dark',
  language: 'en',
  notifications: false,
  fontSize: 14,
  autoSave: false
};

function validatePreferences(prefs) {
  const validKeys = Object.keys(defaultPreferences);
  const validatedPrefs = {};

  for (const key of validKeys) {
    if (prefs.hasOwnProperty(key) && typeof prefs[key] === typeof defaultPreferences[key]) {
      validatedPrefs[key] = prefs[key];
    } else {
      validatedPrefs[key] = defaultPreferences[key];
    }
  }

  return validatedPrefs;
}

function mergeWithDefaults(prefs) {
  return {
    ...defaultPreferences,
    ...validatePreferences(prefs)
  };
}

function savePreferences(prefs) {
  const validPrefs = mergeWithDefaults(prefs);
  localStorage.setItem('userPreferences', JSON.stringify(validPrefs));
  return validPrefs;
}

function loadPreferences() {
  const stored = localStorage.getItem('userPreferences');
  if (stored) {
    try {
      return mergeWithDefaults(JSON.parse(stored));
    } catch {
      return { ...defaultPreferences };
    }
  }
  return { ...defaultPreferences };
}

export { savePreferences, loadPreferences, validatePreferences };function validateUserPreferences(preferences) {
    const defaults = {
        theme: 'light',
        notifications: true,
        language: 'en',
        timezone: 'UTC'
    };

    const validated = { ...defaults };

    if (preferences && typeof preferences === 'object') {
        if (['light', 'dark', 'auto'].includes(preferences.theme)) {
            validated.theme = preferences.theme;
        }

        if (typeof preferences.notifications === 'boolean') {
            validated.notifications = preferences.notifications;
        }

        if (typeof preferences.language === 'string' && preferences.language.length === 2) {
            validated.language = preferences.language.toLowerCase();
        }

        if (typeof preferences.timezone === 'string' && Intl.supportedValuesOf('timeZone').includes(preferences.timezone)) {
            validated.timezone = preferences.timezone;
        }
    }

    return validated;
}

function initializeUserPreferences() {
    const stored = localStorage.getItem('userPreferences');
    let parsed = null;

    try {
        parsed = stored ? JSON.parse(stored) : null;
    } catch (error) {
        console.warn('Failed to parse stored preferences:', error);
    }

    const preferences = validateUserPreferences(parsed);
    localStorage.setItem('userPreferences', JSON.stringify(preferences));
    return preferences;
}

export { validateUserPreferences, initializeUserPreferences };function validateUserPreferences(preferences) {
    const defaults = {
        theme: 'light',
        language: 'en',
        notifications: true,
        fontSize: 16
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

    return validated;
}

function savePreferences(preferences) {
    const validated = validateUserPreferences(preferences);
    localStorage.setItem('userPreferences', JSON.stringify(validated));
    return validated;
}

function loadPreferences() {
    const stored = localStorage.getItem('userPreferences');
    if (stored) {
        return validateUserPreferences(JSON.parse(stored));
    }
    return validateUserPreferences({});
}function validateUserPreferences(preferences) {
    const defaults = {
        theme: 'light',
        language: 'en',
        notifications: true,
        fontSize: 16
    };

    return {
        theme: preferences.theme && ['light', 'dark', 'auto'].includes(preferences.theme) 
            ? preferences.theme 
            : defaults.theme,
        language: preferences.language && ['en', 'es', 'fr', 'de'].includes(preferences.language)
            ? preferences.language
            : defaults.language,
        notifications: typeof preferences.notifications === 'boolean'
            ? preferences.notifications
            : defaults.notifications,
        fontSize: typeof preferences.fontSize === 'number' 
            && preferences.fontSize >= 12 
            && preferences.fontSize <= 24
            ? preferences.fontSize
            : defaults.fontSize
    };
}

function initializeUserPreferences() {
    const storedPreferences = JSON.parse(localStorage.getItem('userPreferences')) || {};
    const validatedPreferences = validateUserPreferences(storedPreferences);
    
    localStorage.setItem('userPreferences', JSON.stringify(validatedPreferences));
    return validatedPreferences;
}

function updateUserPreference(key, value) {
    const currentPreferences = JSON.parse(localStorage.getItem('userPreferences')) || {};
    const updatedPreferences = { ...currentPreferences, [key]: value };
    const validatedPreferences = validateUserPreferences(updatedPreferences);
    
    localStorage.setItem('userPreferences', JSON.stringify(validatedPreferences));
    return validatedPreferences;
}

function resetUserPreferences() {
    const defaultPreferences = validateUserPreferences({});
    localStorage.setItem('userPreferences', JSON.stringify(defaultPreferences));
    return defaultPreferences;
}

export { validateUserPreferences, initializeUserPreferences, updateUserPreference, resetUserPreferences };const defaultPreferences = {
  theme: 'light',
  notifications: true,
  language: 'en',
  fontSize: 16,
  autoSave: true
};

function validatePreferences(userPrefs) {
  const validPreferences = {};
  
  for (const key in defaultPreferences) {
    if (userPrefs.hasOwnProperty(key)) {
      const value = userPrefs[key];
      
      switch (key) {
        case 'theme':
          if (['light', 'dark', 'auto'].includes(value)) {
            validPreferences[key] = value;
          } else {
            validPreferences[key] = defaultPreferences[key];
          }
          break;
          
        case 'notifications':
        case 'autoSave':
          if (typeof value === 'boolean') {
            validPreferences[key] = value;
          } else {
            validPreferences[key] = defaultPreferences[key];
          }
          break;
          
        case 'language':
          if (typeof value === 'string' && value.length === 2) {
            validPreferences[key] = value.toLowerCase();
          } else {
            validPreferences[key] = defaultPreferences[key];
          }
          break;
          
        case 'fontSize':
          if (typeof value === 'number' && value >= 8 && value <= 32) {
            validPreferences[key] = value;
          } else {
            validPreferences[key] = defaultPreferences[key];
          }
          break;
          
        default:
          validPreferences[key] = defaultPreferences[key];
      }
    } else {
      validPreferences[key] = defaultPreferences[key];
    }
  }
  
  return validPreferences;
}

function mergePreferences(existingPrefs, newPrefs) {
  const validatedNewPrefs = validatePreferences(newPrefs);
  return { ...existingPrefs, ...validatedNewPrefs };
}

function savePreferences(prefs) {
  try {
    const validatedPrefs = validatePreferences(prefs);
    localStorage.setItem('userPreferences', JSON.stringify(validatedPrefs));
    return true;
  } catch (error) {
    console.error('Failed to save preferences:', error);
    return false;
  }
}

function loadPreferences() {
  try {
    const savedPrefs = localStorage.getItem('userPreferences');
    if (savedPrefs) {
      return validatePreferences(JSON.parse(savedPrefs));
    }
  } catch (error) {
    console.error('Failed to load preferences:', error);
  }
  
  return { ...defaultPreferences };
}

export { validatePreferences, mergePreferences, savePreferences, loadPreferences, defaultPreferences };const defaultPreferences = {
  theme: 'light',
  notifications: true,
  language: 'en',
  resultsPerPage: 25
};

function validatePreferences(userPrefs) {
  const validPrefs = {};
  
  if (userPrefs.theme && ['light', 'dark', 'auto'].includes(userPrefs.theme)) {
    validPrefs.theme = userPrefs.theme;
  } else {
    validPrefs.theme = defaultPreferences.theme;
  }
  
  if (typeof userPrefs.notifications === 'boolean') {
    validPrefs.notifications = userPrefs.notifications;
  } else {
    validPrefs.notifications = defaultPreferences.notifications;
  }
  
  if (userPrefs.language && ['en', 'es', 'fr', 'de'].includes(userPrefs.language)) {
    validPrefs.language = userPrefs.language;
  } else {
    validPrefs.language = defaultPreferences.language;
  }
  
  if (Number.isInteger(userPrefs.resultsPerPage) && userPrefs.resultsPerPage >= 10 && userPrefs.resultsPerPage <= 100) {
    validPrefs.resultsPerPage = userPrefs.resultsPerPage;
  } else {
    validPrefs.resultsPerPage = defaultPreferences.resultsPerPage;
  }
  
  return validPrefs;
}

function mergePreferences(userPrefs) {
  return {
    ...defaultPreferences,
    ...validatePreferences(userPrefs)
  };
}

export { defaultPreferences, validatePreferences, mergePreferences };const defaultPreferences = {
  theme: 'light',
  language: 'en',
  notifications: true,
  fontSize: 16,
  autoSave: true
};

function validatePreferences(userPrefs) {
  const validPrefs = { ...defaultPreferences };
  
  for (const key in userPrefs) {
    if (key in defaultPreferences) {
      if (typeof userPrefs[key] === typeof defaultPreferences[key]) {
        validPrefs[key] = userPrefs[key];
      } else {
        console.warn(`Invalid type for preference "${key}". Using default.`);
      }
    } else {
      console.warn(`Unknown preference "${key}". Ignoring.`);
    }
  }
  
  return validPrefs;
}

function savePreferences(prefs) {
  try {
    const validated = validatePreferences(prefs);
    localStorage.setItem('userPreferences', JSON.stringify(validated));
    return true;
  } catch (error) {
    console.error('Failed to save preferences:', error);
    return false;
  }
}

function loadPreferences() {
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

function resetPreferences() {
  localStorage.removeItem('userPreferences');
  return defaultPreferences;
}

export { validatePreferences, savePreferences, loadPreferences, resetPreferences, defaultPreferences };const defaultPreferences = {
  theme: 'light',
  notifications: true,
  language: 'en',
  fontSize: 14,
  autoSave: true
};

const validThemes = ['light', 'dark', 'blue'];
const validLanguages = ['en', 'es', 'fr', 'de'];

function validatePreferences(userPrefs) {
  const validated = { ...defaultPreferences };
  
  if (userPrefs.theme && validThemes.includes(userPrefs.theme)) {
    validated.theme = userPrefs.theme;
  }
  
  if (typeof userPrefs.notifications === 'boolean') {
    validated.notifications = userPrefs.notifications;
  }
  
  if (userPrefs.language && validLanguages.includes(userPrefs.language)) {
    validated.language = userPrefs.language;
  }
  
  if (typeof userPrefs.fontSize === 'number' && userPrefs.fontSize >= 10 && userPrefs.fontSize <= 24) {
    validated.fontSize = userPrefs.fontSize;
  }
  
  if (typeof userPrefs.autoSave === 'boolean') {
    validated.autoSave = userPrefs.autoSave;
  }
  
  return validated;
}

function savePreferences(prefs) {
  const validatedPrefs = validatePreferences(prefs);
  localStorage.setItem('userPreferences', JSON.stringify(validatedPrefs));
  return validatedPrefs;
}

function loadPreferences() {
  const stored = localStorage.getItem('userPreferences');
  if (stored) {
    return validatePreferences(JSON.parse(stored));
  }
  return { ...defaultPreferences };
}

export { savePreferences, loadPreferences, defaultPreferences };