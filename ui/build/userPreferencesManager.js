const UserPreferencesManager = (() => {
  const STORAGE_KEY = 'app_user_preferences';
  
  const defaultPreferences = {
    theme: 'light',
    language: 'en',
    notifications: true,
    fontSize: 16,
    autoSave: true,
    lastUpdated: null
  };

  const getPreferences = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return { ...defaultPreferences, ...parsed };
      }
      return { ...defaultPreferences };
    } catch (error) {
      console.error('Failed to retrieve preferences:', error);
      return { ...defaultPreferences };
    }
  };

  const savePreferences = (updates) => {
    try {
      const current = getPreferences();
      const updated = {
        ...current,
        ...updates,
        lastUpdated: new Date().toISOString()
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    } catch (error) {
      console.error('Failed to save preferences:', error);
      return null;
    }
  };

  const resetPreferences = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      return { ...defaultPreferences };
    } catch (error) {
      console.error('Failed to reset preferences:', error);
      return null;
    }
  };

  const subscribe = (callback) => {
    const handler = (event) => {
      if (event.key === STORAGE_KEY) {
        callback(getPreferences());
      }
    };
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  };

  return {
    get: getPreferences,
    save: savePreferences,
    reset: resetPreferences,
    subscribe
  };
})();

export default UserPreferencesManager;const UserPreferencesManager = (() => {
    const PREFERENCE_KEYS = {
        THEME: 'app_theme',
        LANGUAGE: 'app_language',
        NOTIFICATIONS: 'notifications_enabled',
        VOLUME: 'audio_volume'
    };

    const DEFAULT_PREFERENCES = {
        [PREFERENCE_KEYS.THEME]: 'light',
        [PREFERENCE_KEYS.LANGUAGE]: 'en',
        [PREFERENCE_KEYS.NOTIFICATIONS]: true,
        [PREFERENCE_KEYS.VOLUME]: 80
    };

    const validatePreference = (key, value) => {
        switch(key) {
            case PREFERENCE_KEYS.THEME:
                return ['light', 'dark', 'auto'].includes(value) ? value : DEFAULT_PREFERENCES[key];
            case PREFERENCE_KEYS.LANGUAGE:
                return ['en', 'es', 'fr', 'de'].includes(value) ? value : DEFAULT_PREFERENCES[key];
            case PREFERENCE_KEYS.NOTIFICATIONS:
                return typeof value === 'boolean' ? value : DEFAULT_PREFERENCES[key];
            case PREFERENCE_KEYS.VOLUME:
                const numValue = Number(value);
                return !isNaN(numValue) && numValue >= 0 && numValue <= 100 ? numValue : DEFAULT_PREFERENCES[key];
            default:
                return value;
        }
    };

    const getAllPreferences = () => {
        const preferences = {};
        Object.keys(PREFERENCE_KEYS).forEach(key => {
            const storageKey = PREFERENCE_KEYS[key];
            const storedValue = localStorage.getItem(storageKey);
            preferences[storageKey] = storedValue !== null 
                ? validatePreference(storageKey, storedValue)
                : DEFAULT_PREFERENCES[storageKey];
        });
        return preferences;
    };

    const setPreference = (key, value) => {
        if (!Object.values(PREFERENCE_KEYS).includes(key)) {
            console.warn(`Invalid preference key: ${key}`);
            return false;
        }

        const validatedValue = validatePreference(key, value);
        try {
            localStorage.setItem(key, validatedValue);
            return true;
        } catch (error) {
            console.error('Failed to save preference:', error);
            return false;
        }
    };

    const resetToDefaults = () => {
        Object.entries(DEFAULT_PREFERENCES).forEach(([key, value]) => {
            localStorage.setItem(key, value);
        });
        return getAllPreferences();
    };

    const exportPreferences = () => {
        const prefs = getAllPreferences();
        return JSON.stringify(prefs, null, 2);
    };

    const importPreferences = (jsonString) => {
        try {
            const importedPrefs = JSON.parse(jsonString);
            Object.entries(importedPrefs).forEach(([key, value]) => {
                if (Object.values(PREFERENCE_KEYS).includes(key)) {
                    setPreference(key, value);
                }
            });
            return true;
        } catch (error) {
            console.error('Failed to import preferences:', error);
            return false;
        }
    };

    return {
        KEYS: PREFERENCE_KEYS,
        get: (key) => {
            const allPrefs = getAllPreferences();
            return allPrefs[key];
        },
        set: setPreference,
        getAll: getAllPreferences,
        reset: resetToDefaults,
        export: exportPreferences,
        import: importPreferences
    };
})();const UserPreferencesManager = {
  storageKey: 'app_user_preferences',

  getPreferences() {
    try {
      const stored = localStorage.getItem(this.storageKey);
      return stored ? JSON.parse(stored) : {};
    } catch (error) {
      console.error('Failed to retrieve preferences:', error);
      return {};
    }
  },

  setPreference(key, value) {
    if (!key || typeof key !== 'string') {
      throw new Error('Preference key must be a non-empty string');
    }

    const preferences = this.getPreferences();
    preferences[key] = value;

    try {
      localStorage.setItem(this.storageKey, JSON.stringify(preferences));
      return true;
    } catch (error) {
      console.error('Failed to save preference:', error);
      return false;
    }
  },

  removePreference(key) {
    const preferences = this.getPreferences();
    delete preferences[key];

    try {
      localStorage.setItem(this.storageKey, JSON.stringify(preferences));
      return true;
    } catch (error) {
      console.error('Failed to remove preference:', error);
      return false;
    }
  },

  clearAllPreferences() {
    try {
      localStorage.removeItem(this.storageKey);
      return true;
    } catch (error) {
      console.error('Failed to clear preferences:', error);
      return false;
    }
  },

  hasPreference(key) {
    const preferences = this.getPreferences();
    return Object.prototype.hasOwnProperty.call(preferences, key);
  },

  getAllPreferences() {
    return { ...this.getPreferences() };
  }
};class UserPreferencesManager {
  constructor() {
    this.prefs = this.loadPreferences();
  }

  loadPreferences() {
    const stored = localStorage.getItem('userPreferences');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        console.warn('Failed to parse stored preferences:', e);
      }
    }
    return this.getDefaultPreferences();
  }

  getDefaultPreferences() {
    return {
      theme: 'light',
      fontSize: 16,
      notifications: true,
      language: 'en',
      autoSave: false,
      lastUpdated: new Date().toISOString()
    };
  }

  updatePreference(key, value) {
    if (this.prefs.hasOwnProperty(key)) {
      this.prefs[key] = value;
      this.prefs.lastUpdated = new Date().toISOString();
      this.savePreferences();
      return true;
    }
    return false;
  }

  savePreferences() {
    try {
      localStorage.setItem('userPreferences', JSON.stringify(this.prefs));
      return true;
    } catch (e) {
      console.error('Failed to save preferences:', e);
      return false;
    }
  }

  resetToDefaults() {
    this.prefs = this.getDefaultPreferences();
    this.savePreferences();
  }

  getAllPreferences() {
    return { ...this.prefs };
  }

  exportPreferences() {
    return JSON.stringify(this.prefs, null, 2);
  }

  importPreferences(jsonString) {
    try {
      const imported = JSON.parse(jsonString);
      this.prefs = { ...this.getDefaultPreferences(), ...imported };
      this.prefs.lastUpdated = new Date().toISOString();
      this.savePreferences();
      return true;
    } catch (e) {
      console.error('Failed to import preferences:', e);
      return false;
    }
  }
}

export default UserPreferencesManager;