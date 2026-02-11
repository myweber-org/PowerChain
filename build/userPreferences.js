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

userPreferences.init();