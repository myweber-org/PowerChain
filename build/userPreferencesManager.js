const userPreferencesManager = (function() {
    const STORAGE_KEY = 'user_preferences';
    const DEFAULT_PREFERENCES = {
        theme: 'light',
        fontSize: 'medium',
        notifications: true,
        language: 'en',
        autoSave: true
    };

    function getPreferences() {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            try {
                return { ...DEFAULT_PREFERENCES, ...JSON.parse(stored) };
            } catch (e) {
                console.error('Failed to parse stored preferences:', e);
                return { ...DEFAULT_PREFERENCES };
            }
        }
        return { ...DEFAULT_PREFERENCES };
    }

    function savePreferences(preferences) {
        try {
            const current = getPreferences();
            const merged = { ...current, ...preferences };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
            return true;
        } catch (e) {
            console.error('Failed to save preferences:', e);
            return false;
        }
    }

    function resetPreferences() {
        localStorage.removeItem(STORAGE_KEY);
        return { ...DEFAULT_PREFERENCES };
    }

    function getPreference(key) {
        const prefs = getPreferences();
        return prefs[key] !== undefined ? prefs[key] : DEFAULT_PREFERENCES[key];
    }

    function setPreference(key, value) {
        return savePreferences({ [key]: value });
    }

    function subscribe(callback) {
        window.addEventListener('storage', function(e) {
            if (e.key === STORAGE_KEY) {
                callback(getPreferences());
            }
        });
    }

    return {
        get: getPreference,
        set: setPreference,
        getAll: getPreferences,
        save: savePreferences,
        reset: resetPreferences,
        subscribe: subscribe
    };
})();const UserPreferences = {
    _storageKey: 'app_user_preferences',

    getPreferences() {
        try {
            const stored = localStorage.getItem(this._storageKey);
            return stored ? JSON.parse(stored) : {};
        } catch (error) {
            console.warn('Failed to retrieve preferences:', error);
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
            localStorage.setItem(this._storageKey, JSON.stringify(preferences));
            return true;
        } catch (error) {
            console.error('Failed to save preference:', error);
            return false;
        }
    },

    getPreference(key, defaultValue = null) {
        const preferences = this.getPreferences();
        return key in preferences ? preferences[key] : defaultValue;
    },

    removePreference(key) {
        const preferences = this.getPreferences();
        if (key in preferences) {
            delete preferences[key];
            try {
                localStorage.setItem(this._storageKey, JSON.stringify(preferences));
                return true;
            } catch (error) {
                console.error('Failed to remove preference:', error);
            }
        }
        return false;
    },

    clearAll() {
        try {
            localStorage.removeItem(this._storageKey);
            return true;
        } catch (error) {
            console.error('Failed to clear preferences:', error);
            return false;
        }
    },

    getAllKeys() {
        const preferences = this.getPreferences();
        return Object.keys(preferences);
    },

    hasPreference(key) {
        const preferences = this.getPreferences();
        return key in preferences;
    }
};

export default UserPreferences;const UserPreferencesManager = (function() {
    const STORAGE_KEY = 'user_preferences';
    
    const defaultPreferences = {
        theme: 'light',
        language: 'en',
        notifications: true,
        fontSize: 16,
        autoSave: false
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
            const validated = validatePreferences(preferences);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(validated));
            return true;
        } catch (error) {
            console.error('Failed to save preferences:', error);
            return false;
        }
    }

    function validatePreferences(preferences) {
        const valid = { ...defaultPreferences };
        
        if (preferences.theme && ['light', 'dark', 'auto'].includes(preferences.theme)) {
            valid.theme = preferences.theme;
        }
        
        if (preferences.language && typeof preferences.language === 'string') {
            valid.language = preferences.language;
        }
        
        if (typeof preferences.notifications === 'boolean') {
            valid.notifications = preferences.notifications;
        }
        
        if (typeof preferences.fontSize === 'number' && preferences.fontSize >= 12 && preferences.fontSize <= 24) {
            valid.fontSize = preferences.fontSize;
        }
        
        if (typeof preferences.autoSave === 'boolean') {
            valid.autoSave = preferences.autoSave;
        }
        
        return valid;
    }

    function resetPreferences() {
        localStorage.removeItem(STORAGE_KEY);
        return { ...defaultPreferences };
    }

    function getPreference(key) {
        const preferences = loadPreferences();
        return preferences[key] !== undefined ? preferences[key] : defaultPreferences[key];
    }

    function setPreference(key, value) {
        const current = loadPreferences();
        const updated = { ...current, [key]: value };
        return savePreferences(updated);
    }

    function getAllPreferences() {
        return loadPreferences();
    }

    function subscribe(callback) {
        if (typeof callback !== 'function') {
            throw new Error('Callback must be a function');
        }
        
        const handler = function(event) {
            if (event.key === STORAGE_KEY) {
                callback(loadPreferences());
            }
        };
        
        window.addEventListener('storage', handler);
        
        return function unsubscribe() {
            window.removeEventListener('storage', handler);
        };
    }

    return {
        get: getPreference,
        set: setPreference,
        getAll: getAllPreferences,
        save: savePreferences,
        reset: resetPreferences,
        subscribe: subscribe,
        defaults: { ...defaultPreferences }
    };
})();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = UserPreferencesManager;
}const UserPreferences = {
  storageKey: 'app_preferences',

  defaults: {
    theme: 'light',
    language: 'en',
    notifications: true,
    fontSize: 16,
    autoSave: false
  },

  load() {
    try {
      const stored = localStorage.getItem(this.storageKey);
      return stored ? JSON.parse(stored) : { ...this.defaults };
    } catch (error) {
      console.warn('Failed to load preferences:', error);
      return { ...this.defaults };
    }
  },

  save(preferences) {
    try {
      const merged = { ...this.defaults, ...this.load(), ...preferences };
      localStorage.setItem(this.storageKey, JSON.stringify(merged));
      return true;
    } catch (error) {
      console.error('Failed to save preferences:', error);
      return false;
    }
  },

  reset() {
    try {
      localStorage.removeItem(this.storageKey);
      return true;
    } catch (error) {
      console.error('Failed to reset preferences:', error);
      return false;
    }
  },

  get(key) {
    const prefs = this.load();
    return prefs[key] !== undefined ? prefs[key] : this.defaults[key];
  },

  set(key, value) {
    return this.save({ [key]: value });
  },

  getAll() {
    return this.load();
  },

  subscribe(callback) {
    const handler = (event) => {
      if (event.key === this.storageKey) {
        callback(this.load());
      }
    };
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }
};

export default UserPreferences;const userPreferencesManager = (() => {
  const STORAGE_KEY = 'app_user_preferences';
  
  const defaultPreferences = {
    theme: 'light',
    language: 'en',
    notifications: true,
    fontSize: 16,
    autoSave: false,
    lastUpdated: null
  };

  const validatePreference = (key, value) => {
    const validators = {
      theme: (val) => ['light', 'dark', 'auto'].includes(val),
      language: (val) => /^[a-z]{2}$/.test(val),
      notifications: (val) => typeof val === 'boolean',
      fontSize: (val) => Number.isInteger(val) && val >= 12 && val <= 24,
      autoSave: (val) => typeof val === 'boolean',
      lastUpdated: (val) => val === null || val instanceof Date
    };

    return validators[key] ? validators[key](value) : false;
  };

  const loadPreferences = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return { ...defaultPreferences };

      const parsed = JSON.parse(stored);
      const merged = { ...defaultPreferences, ...parsed };

      Object.keys(merged).forEach(key => {
        if (!validatePreference(key, merged[key])) {
          merged[key] = defaultPreferences[key];
        }
      });

      return merged;
    } catch (error) {
      console.error('Failed to load preferences:', error);
      return { ...defaultPreferences };
    }
  };

  const savePreferences = (preferences) => {
    try {
      const validated = {};
      
      Object.keys(preferences).forEach(key => {
        if (validatePreference(key, preferences[key])) {
          validated[key] = preferences[key];
        }
      });

      validated.lastUpdated = new Date().toISOString();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(validated));
      return true;
    } catch (error) {
      console.error('Failed to save preferences:', error);
      return false;
    }
  };

  const updatePreference = (key, value) => {
    const current = loadPreferences();
    
    if (!validatePreference(key, value)) {
      throw new Error(`Invalid value for preference "${key}"`);
    }

    const updated = { ...current, [key]: value };
    return savePreferences(updated);
  };

  const resetToDefaults = () => {
    return savePreferences(defaultPreferences);
  };

  const exportPreferences = () => {
    const prefs = loadPreferences();
    return JSON.stringify(prefs, null, 2);
  };

  const importPreferences = (jsonString) => {
    try {
      const imported = JSON.parse(jsonString);
      return savePreferences(imported);
    } catch (error) {
      console.error('Failed to import preferences:', error);
      return false;
    }
  };

  return {
    getPreferences: loadPreferences,
    setPreference: updatePreference,
    reset: resetToDefaults,
    export: exportPreferences,
    import: importPreferences,
    validate: validatePreference
  };
})();