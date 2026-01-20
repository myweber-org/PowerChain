function validateUserPreferences(preferences) {
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

function initializeUserSettings() {
    const stored = localStorage.getItem('userPreferences');
    let preferences = {};

    try {
        preferences = stored ? JSON.parse(stored) : {};
    } catch (error) {
        console.error('Failed to parse stored preferences:', error);
    }

    return validateUserPreferences(preferences);
}

function saveUserPreferences(preferences) {
    const validated = validateUserPreferences(preferences);
    localStorage.setItem('userPreferences', JSON.stringify(validated));
    return validated;
}

export { validateUserPreferences, initializeUserSettings, saveUserPreferences };const defaultPreferences = {
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
  
  if (Number.isInteger(userPrefs.resultsPerPage) && userPrefs.resultsPerPage > 0) {
    validPrefs.resultsPerPage = Math.min(userPrefs.resultsPerPage, 100);
  } else {
    validPrefs.resultsPerPage = defaultPreferences.resultsPerPage;
  }
  
  return validPrefs;
}

function mergeWithDefaults(preferences) {
  return {
    ...defaultPreferences,
    ...validatePreferences(preferences)
  };
}

export { validatePreferences, mergeWithDefaults, defaultPreferences };const defaultPreferences = {
  theme: 'light',
  language: 'en',
  notifications: true,
  fontSize: 16,
  autoSave: true
};

const validThemes = ['light', 'dark', 'blue'];
const validLanguages = ['en', 'es', 'fr', 'de'];
const minFontSize = 8;
const maxFontSize = 72;

function validatePreferences(userPrefs) {
  const validated = { ...defaultPreferences };

  if (userPrefs.theme && validThemes.includes(userPrefs.theme)) {
    validated.theme = userPrefs.theme;
  }

  if (userPrefs.language && validLanguages.includes(userPrefs.language)) {
    validated.language = userPrefs.language;
  }

  if (typeof userPrefs.notifications === 'boolean') {
    validated.notifications = userPrefs.notifications;
  }

  if (typeof userPrefs.fontSize === 'number') {
    validated.fontSize = Math.min(maxFontSize, Math.max(minFontSize, userPrefs.fontSize));
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
    try {
      return validatePreferences(JSON.parse(stored));
    } catch (error) {
      console.error('Failed to parse stored preferences:', error);
    }
  }
  return { ...defaultPreferences };
}

export { validatePreferences, savePreferences, loadPreferences, defaultPreferences };const userPreferences = {
  theme: 'light',
  fontSize: 16,
  notifications: true,
  language: 'en'
};

function savePreferences(prefs) {
  try {
    localStorage.setItem('userPreferences', JSON.stringify(prefs));
    return true;
  } catch (error) {
    console.error('Failed to save preferences:', error);
    return false;
  }
}

function loadPreferences() {
  try {
    const saved = localStorage.getItem('userPreferences');
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (error) {
    console.error('Failed to load preferences:', error);
  }
  return { ...userPreferences };
}

function updatePreference(key, value) {
  const prefs = loadPreferences();
  prefs[key] = value;
  return savePreferences(prefs);
}

function resetPreferences() {
  localStorage.removeItem('userPreferences');
  return { ...userPreferences };
}

export { userPreferences, savePreferences, loadPreferences, updatePreference, resetPreferences };