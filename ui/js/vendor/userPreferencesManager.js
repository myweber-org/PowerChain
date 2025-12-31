const userPreferencesManager = (() => {
  const PREFERENCES_KEY = 'app_preferences';
  const DEFAULT_PREFERENCES = {
    theme: 'light',
    fontSize: 16,
    notifications: true,
    language: 'en',
    autoSave: false
  };

  const loadPreferences = () => {
    try {
      const stored = localStorage.getItem(PREFERENCES_KEY);
      return stored ? JSON.parse(stored) : { ...DEFAULT_PREFERENCES };
    } catch (error) {
      console.error('Failed to load preferences:', error);
      return { ...DEFAULT_PREFERENCES };
    }
  };

  const savePreferences = (preferences) => {
    try {
      const validated = validatePreferences(preferences);
      localStorage.setItem(PREFERENCES_KEY, JSON.stringify(validated));
      return true;
    } catch (error) {
      console.error('Failed to save preferences:', error);
      return false;
    }
  };

  const validatePreferences = (preferences) => {
    const valid = { ...DEFAULT_PREFERENCES };
    
    if (preferences.theme && ['light', 'dark', 'auto'].includes(preferences.theme)) {
      valid.theme = preferences.theme;
    }
    
    if (typeof preferences.fontSize === 'number' && preferences.fontSize >= 12 && preferences.fontSize <= 24) {
      valid.fontSize = preferences.fontSize;
    }
    
    if (typeof preferences.notifications === 'boolean') {
      valid.notifications = preferences.notifications;
    }
    
    if (preferences.language && ['en', 'es', 'fr', 'de'].includes(preferences.language)) {
      valid.language = preferences.language;
    }
    
    if (typeof preferences.autoSave === 'boolean') {
      valid.autoSave = preferences.autoSave;
    }
    
    return valid;
  };

  const resetPreferences = () => {
    localStorage.removeItem(PREFERENCES_KEY);
    return { ...DEFAULT_PREFERENCES };
  };

  const getPreference = (key) => {
    const preferences = loadPreferences();
    return preferences[key] !== undefined ? preferences[key] : DEFAULT_PREFERENCES[key];
  };

  const setPreference = (key, value) => {
    const current = loadPreferences();
    current[key] = value;
    return savePreferences(current);
  };

  const getAllPreferences = () => {
    return loadPreferences();
  };

  const setMultiplePreferences = (updates) => {
    const current = loadPreferences();
    const updated = { ...current, ...updates };
    return savePreferences(updated);
  };

  const exportPreferences = () => {
    const preferences = loadPreferences();
    return JSON.stringify(preferences, null, 2);
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
    load: loadPreferences,
    save: savePreferences,
    reset: resetPreferences,
    get: getPreference,
    set: setPreference,
    getAll: getAllPreferences,
    setMultiple: setMultiplePreferences,
    export: exportPreferences,
    import: importPreferences,
    defaults: DEFAULT_PREFERENCES
  };
})();class UserPreferencesManager {
  constructor() {
    this.prefs = this.loadPreferences();
  }

  loadPreferences() {
    const stored = localStorage.getItem('userPreferences');
    return stored ? JSON.parse(stored) : {
      theme: 'light',
      fontSize: 16,
      notifications: true,
      language: 'en'
    };
  }

  savePreferences() {
    localStorage.setItem('userPreferences', JSON.stringify(this.prefs));
    return this;
  }

  setPreference(key, value) {
    if (this.prefs.hasOwnProperty(key)) {
      this.prefs[key] = value;
      this.savePreferences();
    }
    return this;
  }

  getPreference(key) {
    return this.prefs[key];
  }

  getAllPreferences() {
    return { ...this.prefs };
  }

  resetToDefaults() {
    this.prefs = {
      theme: 'light',
      fontSize: 16,
      notifications: true,
      language: 'en'
    };
    this.savePreferences();
    return this;
  }
}

export default UserPreferencesManager;const UserPreferencesManager = (function() {
    const STORAGE_KEY = 'user_preferences';
    
    const defaultPreferences = {
        theme: 'light',
        language: 'en',
        notifications: true,
        fontSize: 16,
        autoSave: false
    };

    function getPreferences() {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : { ...defaultPreferences };
    }

    function updatePreferences(newPreferences) {
        const current = getPreferences();
        const updated = { ...current, ...newPreferences };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        return updated;
    }

    function resetPreferences() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultPreferences));
        return { ...defaultPreferences };
    }

    function getPreference(key) {
        const prefs = getPreferences();
        return prefs[key] !== undefined ? prefs[key] : defaultPreferences[key];
    }

    function setPreference(key, value) {
        return updatePreferences({ [key]: value });
    }

    function getAllPreferences() {
        return getPreferences();
    }

    function clearPreferences() {
        localStorage.removeItem(STORAGE_KEY);
    }

    return {
        get: getPreference,
        set: setPreference,
        update: updatePreferences,
        reset: resetPreferences,
        getAll: getAllPreferences,
        clear: clearPreferences
    };
})();const UserPreferencesManager = (() => {
    const STORAGE_KEY = 'app_user_preferences';
    
    const defaultPreferences = {
        theme: 'light',
        fontSize: 16,
        notifications: true,
        language: 'en',
        autoSave: false,
        sidebarCollapsed: false
    };

    const loadPreferences = () => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                return { ...defaultPreferences, ...JSON.parse(stored) };
            }
        } catch (error) {
            console.warn('Failed to load preferences:', error);
        }
        return { ...defaultPreferences };
    };

    const savePreferences = (preferences) => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
            return true;
        } catch (error) {
            console.error('Failed to save preferences:', error);
            return false;
        }
    };

    const updatePreference = (key, value) => {
        if (!defaultPreferences.hasOwnProperty(key)) {
            throw new Error(`Invalid preference key: ${key}`);
        }

        const current = loadPreferences();
        const updated = { ...current, [key]: value };
        
        if (savePreferences(updated)) {
            dispatchPreferenceChange(key, value);
            return true;
        }
        return false;
    };

    const resetPreferences = () => {
        if (savePreferences(defaultPreferences)) {
            Object.keys(defaultPreferences).forEach(key => {
                dispatchPreferenceChange(key, defaultPreferences[key]);
            });
            return true;
        }
        return false;
    };

    const dispatchPreferenceChange = (key, value) => {
        const event = new CustomEvent('preferencechange', {
            detail: { key, value }
        });
        window.dispatchEvent(event);
    };

    const getPreference = (key) => {
        const preferences = loadPreferences();
        return preferences[key];
    };

    const getAllPreferences = () => {
        return loadPreferences();
    };

    const subscribe = (callback) => {
        window.addEventListener('preferencechange', callback);
        return () => window.removeEventListener('preferencechange', callback);
    };

    return {
        get: getPreference,
        getAll: getAllPreferences,
        set: updatePreference,
        reset: resetPreferences,
        subscribe,
        defaultPreferences
    };
})();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = UserPreferencesManager;
}