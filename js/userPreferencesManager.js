const userPreferencesManager = (() => {
  const PREFIX = 'app_pref_';
  const DEFAULT_PREFERENCES = {
    theme: 'light',
    fontSize: 16,
    notifications: true,
    language: 'en'
  };

  const validateKey = (key) => {
    if (!key || typeof key !== 'string') {
      throw new Error('Invalid preference key');
    }
    return true;
  };

  const validateValue = (value) => {
    if (value === undefined || value === null) {
      throw new Error('Invalid preference value');
    }
    return true;
  };

  const getStoredPreferences = () => {
    try {
      const stored = localStorage.getItem(PREFIX + 'all');
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  };

  const savePreferences = (prefs) => {
    try {
      localStorage.setItem(PREFIX + 'all', JSON.stringify(prefs));
      return true;
    } catch {
      return false;
    }
  };

  return {
    get: (key) => {
      validateKey(key);
      const prefs = getStoredPreferences();
      return prefs[key] !== undefined ? prefs[key] : DEFAULT_PREFERENCES[key];
    },

    set: (key, value) => {
      validateKey(key);
      validateValue(value);
      const prefs = getStoredPreferences();
      prefs[key] = value;
      return savePreferences(prefs);
    },

    getAll: () => {
      const stored = getStoredPreferences();
      return { ...DEFAULT_PREFERENCES, ...stored };
    },

    reset: () => {
      try {
        localStorage.removeItem(PREFIX + 'all');
        return true;
      } catch {
        return false;
      }
    },

    resetToDefaults: () => {
      return savePreferences(DEFAULT_PREFERENCES);
    },

    has: (key) => {
      validateKey(key);
      const prefs = getStoredPreferences();
      return prefs[key] !== undefined;
    },

    remove: (key) => {
      validateKey(key);
      const prefs = getStoredPreferences();
      delete prefs[key];
      return savePreferences(prefs);
    }
  };
})();

export default userPreferencesManager;