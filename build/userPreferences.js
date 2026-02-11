function validateUserPreferences(preferences) {
    const defaults = {
        theme: 'light',
        language: 'en',
        notifications: true,
        timezone: 'UTC'
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

    if (!/^[A-Za-z_]+\/[A-Za-z_]+$/.test(validated.timezone)) {
        validated.timezone = defaults.timezone;
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

export { validateUserPreferences, initializeUserSettings, saveUserPreferences };const userPreferences = {
  preferences: {},

  init() {
    const stored = localStorage.getItem('userPreferences');
    if (stored) {
      this.preferences = JSON.parse(stored);
    }
  },

  set(key, value) {
    this.preferences[key] = value;
    this.save();
  },

  get(key) {
    return this.preferences[key];
  },

  remove(key) {
    delete this.preferences[key];
    this.save();
  },

  save() {
    localStorage.setItem('userPreferences', JSON.stringify(this.preferences));
  },

  clear() {
    this.preferences = {};
    localStorage.removeItem('userPreferences');
  }
};

userPreferences.init();const defaultPreferences = {
  theme: 'light',
  language: 'en',
  notifications: true,
  fontSize: 16,
  autoSave: true
};

function validatePreferences(userPrefs) {
  const validPreferences = { ...defaultPreferences };
  
  for (const key in userPrefs) {
    if (key in defaultPreferences) {
      if (typeof userPrefs[key] === typeof defaultPreferences[key]) {
        validPreferences[key] = userPrefs[key];
      } else {
        console.warn(`Invalid type for preference "${key}". Using default.`);
      }
    } else {
      console.warn(`Unknown preference "${key}" will be ignored.`);
    }
  }
  
  return validPreferences;
}

function savePreferences(preferences) {
  try {
    const validated = validatePreferences(preferences);
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
    return { ...defaultPreferences };
  } catch (error) {
    console.error('Failed to load preferences:', error);
    return { ...defaultPreferences };
  }
}

function resetPreferences() {
  localStorage.removeItem('userPreferences');
  return { ...defaultPreferences };
}

export { validatePreferences, savePreferences, loadPreferences, resetPreferences };