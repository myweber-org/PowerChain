class UserPreferencesManager {
  constructor() {
    this.preferences = this.loadPreferences();
  }

  loadPreferences() {
    const stored = localStorage.getItem('userPreferences');
    return stored ? JSON.parse(stored) : {
      theme: 'light',
      notifications: true,
      language: 'en',
      fontSize: 16,
      autoSave: false
    };
  }

  savePreferences() {
    localStorage.setItem('userPreferences', JSON.stringify(this.preferences));
  }

  updatePreference(key, value) {
    if (this.preferences.hasOwnProperty(key)) {
      this.preferences[key] = value;
      this.savePreferences();
      return true;
    }
    return false;
  }

  getPreference(key) {
    return this.preferences[key];
  }

  resetToDefaults() {
    this.preferences = {
      theme: 'light',
      notifications: true,
      language: 'en',
      fontSize: 16,
      autoSave: false
    };
    this.savePreferences();
  }

  exportPreferences() {
    const dataStr = JSON.stringify(this.preferences);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = 'user-preferences.json';
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  }

  importPreferences(file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target.result);
        this.preferences = { ...this.preferences, ...imported };
        this.savePreferences();
      } catch (error) {
        console.error('Invalid preferences file:', error);
      }
    };
    reader.readAsText(file);
  }
}

const preferencesManager = new UserPreferencesManager();const UserPreferencesManager = (() => {
  const STORAGE_KEY = 'app_preferences';
  const DEFAULT_PREFERENCES = {
    theme: 'light',
    language: 'en',
    notifications: true,
    fontSize: 'medium'
  };

  const getPreferences = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? { ...DEFAULT_PREFERENCES, ...JSON.parse(stored) } : { ...DEFAULT_PREFERENCES };
    } catch (error) {
      console.error('Failed to retrieve preferences:', error);
      return { ...DEFAULT_PREFERENCES };
    }
  };

  const savePreferences = (preferences) => {
    try {
      const current = getPreferences();
      const updated = { ...current, ...preferences };
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
      return { ...DEFAULT_PREFERENCES };
    } catch (error) {
      console.error('Failed to reset preferences:', error);
      return null;
    }
  };

  const getPreference = (key) => {
    const preferences = getPreferences();
    return preferences[key] !== undefined ? preferences[key] : DEFAULT_PREFERENCES[key];
  };

  const setPreference = (key, value) => {
    return savePreferences({ [key]: value });
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
    getPreferences,
    savePreferences,
    resetPreferences,
    getPreference,
    setPreference,
    subscribe
  };
})();

export default UserPreferencesManager;const UserPreferencesManager = (() => {
    const STORAGE_KEY = 'app_preferences';
    const DEFAULT_PREFERENCES = {
        theme: 'light',
        fontSize: 16,
        notifications: true,
        language: 'en',
        autoSave: false
    };

    let currentPreferences = { ...DEFAULT_PREFERENCES };

    const loadPreferences = () => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                currentPreferences = { ...DEFAULT_PREFERENCES, ...JSON.parse(stored) };
            }
            return currentPreferences;
        } catch (error) {
            console.error('Failed to load preferences:', error);
            return { ...DEFAULT_PREFERENCES };
        }
    };

    const savePreferences = (updates) => {
        try {
            currentPreferences = { ...currentPreferences, ...updates };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(currentPreferences));
            return true;
        } catch (error) {
            console.error('Failed to save preferences:', error);
            return false;
        }
    };

    const resetPreferences = () => {
        currentPreferences = { ...DEFAULT_PREFERENCES };
        localStorage.removeItem(STORAGE_KEY);
        return currentPreferences;
    };

    const getPreference = (key) => {
        return currentPreferences[key] !== undefined ? currentPreferences[key] : DEFAULT_PREFERENCES[key];
    };

    const getAllPreferences = () => {
        return { ...currentPreferences };
    };

    const validatePreference = (key, value) => {
        const validators = {
            theme: (val) => ['light', 'dark', 'auto'].includes(val),
            fontSize: (val) => Number.isInteger(val) && val >= 12 && val <= 24,
            notifications: (val) => typeof val === 'boolean',
            language: (val) => ['en', 'es', 'fr', 'de'].includes(val),
            autoSave: (val) => typeof val === 'boolean'
        };

        return validators[key] ? validators[key](value) : false;
    };

    loadPreferences();

    return {
        save: savePreferences,
        load: loadPreferences,
        reset: resetPreferences,
        get: getPreference,
        getAll: getAllPreferences,
        validate: validatePreference,
        defaults: { ...DEFAULT_PREFERENCES }
    };
})();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = UserPreferencesManager;
}const userPreferencesManager = (() => {
    const STORAGE_KEY = 'app_preferences';
    const defaultPreferences = {
        theme: 'light',
        language: 'en',
        notifications: true,
        fontSize: 16,
        autoSave: true
    };

    const getPreferences = () => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            return stored ? { ...defaultPreferences, ...JSON.parse(stored) } : { ...defaultPreferences };
        } catch (error) {
            console.error('Error loading preferences:', error);
            return { ...defaultPreferences };
        }
    };

    const savePreferences = (preferences) => {
        try {
            const current = getPreferences();
            const updated = { ...current, ...preferences };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
            return updated;
        } catch (error) {
            console.error('Error saving preferences:', error);
            return null;
        }
    };

    const resetPreferences = () => {
        try {
            localStorage.removeItem(STORAGE_KEY);
            return { ...defaultPreferences };
        } catch (error) {
            console.error('Error resetting preferences:', error);
            return null;
        }
    };

    const getPreference = (key) => {
        const preferences = getPreferences();
        return preferences[key] !== undefined ? preferences[key] : defaultPreferences[key];
    };

    const setPreference = (key, value) => {
        return savePreferences({ [key]: value });
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
        getPreferences,
        savePreferences,
        resetPreferences,
        getPreference,
        setPreference,
        subscribe
    };
})();const UserPreferences = {
  storageKey: 'app_preferences',

  defaults: {
    theme: 'light',
    language: 'en',
    notifications: true,
    fontSize: 16
  },

  init() {
    if (!this.load()) {
      this.save(this.defaults);
    }
  },

  load() {
    try {
      const data = localStorage.getItem(this.storageKey);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Failed to load preferences:', error);
      return null;
    }
  },

  save(preferences) {
    try {
      const merged = { ...this.defaults, ...preferences };
      localStorage.setItem(this.storageKey, JSON.stringify(merged));
      return true;
    } catch (error) {
      console.error('Failed to save preferences:', error);
      return false;
    }
  },

  get(key) {
    const prefs = this.load();
    return prefs ? prefs[key] : this.defaults[key];
  },

  set(key, value) {
    const prefs = this.load() || this.defaults;
    prefs[key] = value;
    return this.save(prefs);
  },

  reset() {
    return this.save(this.defaults);
  },

  getAll() {
    return this.load() || this.defaults;
  }
};

UserPreferences.init();