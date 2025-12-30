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
}