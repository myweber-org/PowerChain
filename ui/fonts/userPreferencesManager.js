const UserPreferencesManager = (() => {
  const PREFIX = 'app_pref_';
  const DEFAULT_PREFERENCES = {
    theme: 'light',
    fontSize: 16,
    notifications: true,
    language: 'en',
    autoSave: false,
    sidebarCollapsed: false
  };

  const validateKey = (key) => {
    if (!Object.keys(DEFAULT_PREFERENCES).includes(key)) {
      throw new Error(`Invalid preference key: ${key}`);
    }
  };

  const getStorageKey = (key) => `${PREFIX}${key}`;

  return {
    setPreference(key, value) {
      validateKey(key);
      const storageKey = getStorageKey(key);
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(storageKey, serializedValue);
      return this;
    },

    getPreference(key) {
      validateKey(key);
      const storageKey = getStorageKey(key);
      const storedValue = localStorage.getItem(storageKey);
      
      if (storedValue === null) {
        return DEFAULT_PREFERENCES[key];
      }
      
      try {
        return JSON.parse(storedValue);
      } catch {
        localStorage.removeItem(storageKey);
        return DEFAULT_PREFERENCES[key];
      }
    },

    getAllPreferences() {
      return Object.keys(DEFAULT_PREFERENCES).reduce((prefs, key) => {
        prefs[key] = this.getPreference(key);
        return prefs;
      }, {});
    },

    resetPreference(key) {
      validateKey(key);
      const storageKey = getStorageKey(key);
      localStorage.removeItem(storageKey);
      return this;
    },

    resetAllPreferences() {
      Object.keys(DEFAULT_PREFERENCES).forEach(key => {
        this.resetPreference(key);
      });
      return this;
    },

    exportPreferences() {
      const prefs = this.getAllPreferences();
      return JSON.stringify(prefs, null, 2);
    },

    importPreferences(jsonString) {
      try {
        const importedPrefs = JSON.parse(jsonString);
        Object.keys(importedPrefs).forEach(key => {
          if (Object.keys(DEFAULT_PREFERENCES).includes(key)) {
            this.setPreference(key, importedPrefs[key]);
          }
        });
        return true;
      } catch {
        return false;
      }
    },

    hasUnsavedChanges() {
      return Object.keys(DEFAULT_PREFERENCES).some(key => {
        const currentValue = this.getPreference(key);
        return currentValue !== DEFAULT_PREFERENCES[key];
      });
    }
  };
})();

export default UserPreferencesManager;const userPreferencesManager = (function() {
    const STORAGE_KEY = 'user_preferences';
    
    const defaultPreferences = {
        theme: 'light',
        language: 'en',
        notifications: true,
        fontSize: 16,
        autoSave: false,
        sidebarCollapsed: false
    };
    
    function loadPreferences() {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            return stored ? { ...defaultPreferences, ...JSON.parse(stored) } : { ...defaultPreferences };
        } catch (error) {
            console.error('Failed to load preferences:', error);
            return { ...defaultPreferences };
        }
    }
    
    function savePreferences(preferences) {
        try {
            const current = loadPreferences();
            const updated = { ...current, ...preferences };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
            return updated;
        } catch (error) {
            console.error('Failed to save preferences:', error);
            return null;
        }
    }
    
    function resetPreferences() {
        try {
            localStorage.removeItem(STORAGE_KEY);
            return { ...defaultPreferences };
        } catch (error) {
            console.error('Failed to reset preferences:', error);
            return null;
        }
    }
    
    function getPreference(key) {
        const preferences = loadPreferences();
        return preferences[key] !== undefined ? preferences[key] : defaultPreferences[key];
    }
    
    function setPreference(key, value) {
        return savePreferences({ [key]: value });
    }
    
    function getAllPreferences() {
        return loadPreferences();
    }
    
    function subscribe(callback) {
        window.addEventListener('storage', function(event) {
            if (event.key === STORAGE_KEY) {
                callback(loadPreferences());
            }
        });
    }
    
    return {
        load: loadPreferences,
        save: savePreferences,
        reset: resetPreferences,
        get: getPreference,
        set: setPreference,
        getAll: getAllPreferences,
        subscribe: subscribe
    };
})();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = userPreferencesManager;
}const userPreferencesManager = (function() {
    const PREFERENCES_KEY = 'user_preferences';
    const DEFAULT_PREFERENCES = {
        theme: 'light',
        language: 'en',
        notifications: true,
        fontSize: 16
    };

    function getPreferences() {
        const stored = localStorage.getItem(PREFERENCES_KEY);
        if (stored) {
            try {
                return { ...DEFAULT_PREFERENCES, ...JSON.parse(stored) };
            } catch (e) {
                console.error('Failed to parse stored preferences:', e);
                return DEFAULT_PREFERENCES;
            }
        }
        return DEFAULT_PREFERENCES;
    }

    function savePreferences(preferences) {
        try {
            const current = getPreferences();
            const merged = { ...current, ...preferences };
            localStorage.setItem(PREFERENCES_KEY, JSON.stringify(merged));
            return merged;
        } catch (e) {
            console.error('Failed to save preferences:', e);
            return null;
        }
    }

    function resetPreferences() {
        localStorage.removeItem(PREFERENCES_KEY);
        return DEFAULT_PREFERENCES;
    }

    function getPreference(key) {
        const prefs = getPreferences();
        return prefs[key] !== undefined ? prefs[key] : null;
    }

    function setPreference(key, value) {
        return savePreferences({ [key]: value });
    }

    function subscribe(callback) {
        window.addEventListener('storage', function(e) {
            if (e.key === PREFERENCES_KEY) {
                callback(getPreferences());
            }
        });
    }

    return {
        get: getPreferences,
        save: savePreferences,
        reset: resetPreferences,
        getPreference: getPreference,
        setPreference: setPreference,
        subscribe: subscribe
    };
})();