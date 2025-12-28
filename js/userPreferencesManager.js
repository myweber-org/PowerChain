class UserPreferencesManager {
    constructor() {
        this.prefs = this.loadPreferences();
    }

    loadPreferences() {
        const stored = localStorage.getItem('userPreferences');
        return stored ? JSON.parse(stored) : {
            theme: 'light',
            language: 'en',
            notifications: true,
            fontSize: 16,
            autoSave: false
        };
    }

    savePreferences() {
        localStorage.setItem('userPreferences', JSON.stringify(this.prefs));
        return true;
    }

    updatePreference(key, value) {
        if (key in this.prefs) {
            this.prefs[key] = value;
            this.savePreferences();
            return true;
        }
        return false;
    }

    getPreference(key) {
        return this.prefs[key];
    }

    resetToDefaults() {
        this.prefs = {
            theme: 'light',
            language: 'en',
            notifications: true,
            fontSize: 16,
            autoSave: false
        };
        this.savePreferences();
    }

    exportPreferences() {
        return JSON.stringify(this.prefs, null, 2);
    }

    importPreferences(jsonString) {
        try {
            const imported = JSON.parse(jsonString);
            this.prefs = { ...this.prefs, ...imported };
            this.savePreferences();
            return true;
        } catch (error) {
            console.error('Invalid preferences format:', error);
            return false;
        }
    }
}

const preferenceManager = new UserPreferencesManager();const UserPreferencesManager = (() => {
    const STORAGE_KEY = 'app_user_preferences';
    
    const defaultPreferences = {
        theme: 'light',
        fontSize: 16,
        notifications: true,
        language: 'en',
        autoSave: true,
        sidebarCollapsed: false
    };

    const getPreferences = () => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            return stored ? { ...defaultPreferences, ...JSON.parse(stored) } : { ...defaultPreferences };
        } catch (error) {
            console.error('Failed to load preferences:', error);
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
})();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = UserPreferencesManager;
}const USER_PREFERENCES_KEY = 'app_preferences';

class UserPreferencesManager {
  constructor() {
    this.preferences = this.loadPreferences();
  }

  loadPreferences() {
    try {
      const stored = localStorage.getItem(USER_PREFERENCES_KEY);
      return stored ? JSON.parse(stored) : this.getDefaultPreferences();
    } catch (error) {
      console.error('Failed to load preferences:', error);
      return this.getDefaultPreferences();
    }
  }

  getDefaultPreferences() {
    return {
      theme: 'light',
      language: 'en',
      notifications: true,
      fontSize: 16,
      autoSave: false
    };
  }

  updatePreference(key, value) {
    if (this.preferences.hasOwnProperty(key)) {
      this.preferences[key] = value;
      this.savePreferences();
      return true;
    }
    return false;
  }

  savePreferences() {
    try {
      localStorage.setItem(USER_PREFERENCES_KEY, JSON.stringify(this.preferences));
      return true;
    } catch (error) {
      console.error('Failed to save preferences:', error);
      return false;
    }
  }

  resetToDefaults() {
    this.preferences = this.getDefaultPreferences();
    this.savePreferences();
  }

  getAllPreferences() {
    return { ...this.preferences };
  }

  exportPreferences() {
    return JSON.stringify(this.preferences, null, 2);
  }

  importPreferences(jsonString) {
    try {
      const imported = JSON.parse(jsonString);
      this.preferences = { ...this.preferences, ...imported };
      this.savePreferences();
      return true;
    } catch (error) {
      console.error('Failed to import preferences:', error);
      return false;
    }
  }
}

export default UserPreferencesManager;const UserPreferencesManager = (() => {
  const PREFIX = 'app_pref_';
  const DEFAULTS = {
    theme: 'light',
    fontSize: 16,
    notifications: true,
    language: 'en'
  };

  const validateKey = (key) => {
    if (!Object.keys(DEFAULTS).includes(key)) {
      throw new Error(`Invalid preference key: ${key}`);
    }
  };

  const get = (key) => {
    validateKey(key);
    const stored = localStorage.getItem(PREFIX + key);
    if (stored === null) return DEFAULTS[key];
    
    try {
      return JSON.parse(stored);
    } catch {
      return DEFAULTS[key];
    }
  };

  const set = (key, value) => {
    validateKey(key);
    localStorage.setItem(PREFIX + key, JSON.stringify(value));
    dispatchEvent(new CustomEvent('preferencesChanged', { 
      detail: { key, value } 
    }));
  };

  const reset = () => {
    Object.keys(DEFAULTS).forEach(key => {
      localStorage.removeItem(PREFIX + key);
    });
    dispatchEvent(new Event('preferencesReset'));
  };

  const getAll = () => {
    return Object.keys(DEFAULTS).reduce((prefs, key) => {
      prefs[key] = get(key);
      return prefs;
    }, {});
  };

  const subscribe = (callback) => {
    addEventListener('preferencesChanged', callback);
    addEventListener('preferencesReset', callback);
    return () => {
      removeEventListener('preferencesChanged', callback);
      removeEventListener('preferencesReset', callback);
    };
  };

  return { get, set, reset, getAll, subscribe };
})();