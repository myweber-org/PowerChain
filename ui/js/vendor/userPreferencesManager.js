const UserPreferencesManager = (function() {
    const STORAGE_KEY = 'user_preferences';
    const DEFAULT_PREFERENCES = {
        theme: 'light',
        fontSize: 16,
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
                return DEFAULT_PREFERENCES;
            }
        }
        return DEFAULT_PREFERENCES;
    }

    function savePreferences(preferences) {
        try {
            const current = getPreferences();
            const updated = { ...current, ...preferences };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
            dispatchPreferenceChange(updated);
            return true;
        } catch (e) {
            console.error('Failed to save preferences:', e);
            return false;
        }
    }

    function resetPreferences() {
        localStorage.removeItem(STORAGE_KEY);
        dispatchPreferenceChange(DEFAULT_PREFERENCES);
        return DEFAULT_PREFERENCES;
    }

    function dispatchPreferenceChange(preferences) {
        const event = new CustomEvent('preferencesChanged', {
            detail: { preferences }
        });
        window.dispatchEvent(event);
    }

    function getPreference(key) {
        const prefs = getPreferences();
        return prefs[key];
    }

    function setPreference(key, value) {
        return savePreferences({ [key]: value });
    }

    return {
        getPreferences,
        savePreferences,
        resetPreferences,
        getPreference,
        setPreference
    };
})();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = UserPreferencesManager;
}const UserPreferencesManager = (() => {
  const PREFIX = 'user_pref_';
  const DEFAULT_PREFERENCES = {
    theme: 'light',
    language: 'en',
    notifications: true,
    fontSize: 16,
    autoSave: false
  };

  const validateKey = (key) => {
    if (!key || typeof key !== 'string') {
      throw new Error('Key must be a non-empty string');
    }
    return true;
  };

  const getFullKey = (key) => `${PREFIX}${key}`;

  const savePreference = (key, value) => {
    validateKey(key);
    try {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(getFullKey(key), serializedValue);
      return true;
    } catch (error) {
      console.error('Failed to save preference:', error);
      return false;
    }
  };

  const loadPreference = (key) => {
    validateKey(key);
    try {
      const storedValue = localStorage.getItem(getFullKey(key));
      if (storedValue === null) {
        return DEFAULT_PREFERENCES[key] || null;
      }
      return JSON.parse(storedValue);
    } catch (error) {
      console.error('Failed to load preference:', error);
      return DEFAULT_PREFERENCES[key] || null;
    }
  };

  const removePreference = (key) => {
    validateKey(key);
    try {
      localStorage.removeItem(getFullKey(key));
      return true;
    } catch (error) {
      console.error('Failed to remove preference:', error);
      return false;
    }
  };

  const getAllPreferences = () => {
    const preferences = { ...DEFAULT_PREFERENCES };
    const storageKeys = Object.keys(localStorage);
    
    storageKeys.forEach(storageKey => {
      if (storageKey.startsWith(PREFIX)) {
        const key = storageKey.replace(PREFIX, '');
        try {
          preferences[key] = JSON.parse(localStorage.getItem(storageKey));
        } catch (error) {
          console.warn(`Failed to parse preference for key: ${key}`);
        }
      }
    });
    
    return preferences;
  };

  const resetToDefaults = () => {
    Object.keys(DEFAULT_PREFERENCES).forEach(key => {
      savePreference(key, DEFAULT_PREFERENCES[key]);
    });
    return getAllPreferences();
  };

  const exportPreferences = () => {
    const prefs = getAllPreferences();
    const exportData = {
      version: '1.0',
      timestamp: new Date().toISOString(),
      preferences: prefs
    };
    return JSON.stringify(exportData, null, 2);
  };

  const importPreferences = (jsonString) => {
    try {
      const importData = JSON.parse(jsonString);
      if (importData.preferences && typeof importData.preferences === 'object') {
        Object.keys(importData.preferences).forEach(key => {
          savePreference(key, importData.preferences[key]);
        });
        return true;
      }
      return false;
    } catch (error) {
      console.error('Failed to import preferences:', error);
      return false;
    }
  };

  return {
    save: savePreference,
    load: loadPreference,
    remove: removePreference,
    getAll: getAllPreferences,
    reset: resetToDefaults,
    export: exportPreferences,
    import: importPreferences,
    defaults: DEFAULT_PREFERENCES
  };
})();const UserPreferencesManager = (function() {
    const STORAGE_KEY = 'user_preferences';
    const DEFAULT_PREFERENCES = {
        theme: 'light',
        language: 'en',
        notifications: true,
        fontSize: 16,
        autoSave: true
    };

    function getPreferences() {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            try {
                return { ...DEFAULT_PREFERENCES, ...JSON.parse(stored) };
            } catch (error) {
                console.error('Failed to parse stored preferences:', error);
                return DEFAULT_PREFERENCES;
            }
        }
        return DEFAULT_PREFERENCES;
    }

    function savePreferences(preferences) {
        const current = getPreferences();
        const updated = { ...current, ...preferences };
        
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
            return true;
        } catch (error) {
            console.error('Failed to save preferences:', error);
            return false;
        }
    }

    function resetPreferences() {
        try {
            localStorage.removeItem(STORAGE_KEY);
            return true;
        } catch (error) {
            console.error('Failed to reset preferences:', error);
            return false;
        }
    }

    function getPreference(key) {
        const preferences = getPreferences();
        return preferences[key];
    }

    function setPreference(key, value) {
        return savePreferences({ [key]: value });
    }

    function subscribe(callback) {
        window.addEventListener('storage', function(event) {
            if (event.key === STORAGE_KEY) {
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
    autoSave: false
  };

  const getPreferences = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? { ...defaultPreferences, ...JSON.parse(stored) } : defaultPreferences;
    } catch (error) {
      console.error('Failed to load preferences:', error);
      return defaultPreferences;
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
      return defaultPreferences;
    } catch (error) {
      console.error('Failed to reset preferences:', error);
      return null;
    }
  };

  const getPreference = (key) => {
    const preferences = getPreferences();
    return preferences[key] !== undefined ? preferences[key] : null;
  };

  const setPreference = (key, value) => {
    return savePreferences({ [key]: value });
  };

  return {
    getPreferences,
    savePreferences,
    resetPreferences,
    getPreference,
    setPreference
  };
})();const UserPreferences = {
  preferences: {
    theme: 'light',
    language: 'en',
    notifications: true,
    fontSize: 16
  },

  init() {
    const saved = localStorage.getItem('userPreferences');
    if (saved) {
      this.preferences = JSON.parse(saved);
    }
    this.applyPreferences();
  },

  save() {
    localStorage.setItem('userPreferences', JSON.stringify(this.preferences));
    this.applyPreferences();
  },

  get(key) {
    return this.preferences[key];
  },

  set(key, value) {
    this.preferences[key] = value;
    this.save();
  },

  applyPreferences() {
    document.documentElement.setAttribute('data-theme', this.preferences.theme);
    document.documentElement.lang = this.preferences.language;
    document.documentElement.style.fontSize = `${this.preferences.fontSize}px`;
    
    if (this.preferences.notifications) {
      Notification.requestPermission();
    }
  },

  reset() {
    this.preferences = {
      theme: 'light',
      language: 'en',
      notifications: true,
      fontSize: 16
    };
    this.save();
  }
};

Object.freeze(UserPreferences);
UserPreferences.init();