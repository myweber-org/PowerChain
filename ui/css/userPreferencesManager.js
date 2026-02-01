const userPreferencesManager = (() => {
  const STORAGE_KEY = 'app_user_preferences';
  
  const defaultPreferences = {
    theme: 'light',
    language: 'en',
    notifications: true,
    fontSize: 16,
    autoSave: false
  };

  const loadPreferences = () => {
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
      const validated = validatePreferences(preferences);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(validated));
      return validated;
    } catch (error) {
      console.error('Failed to save preferences:', error);
      return null;
    }
  };

  const validatePreferences = (preferences) => {
    const validThemes = ['light', 'dark', 'auto'];
    const validLanguages = ['en', 'es', 'fr', 'de'];
    
    return {
      theme: validThemes.includes(preferences.theme) ? preferences.theme : defaultPreferences.theme,
      language: validLanguages.includes(preferences.language) ? preferences.language : defaultPreferences.language,
      notifications: typeof preferences.notifications === 'boolean' ? preferences.notifications : defaultPreferences.notifications,
      fontSize: Number.isInteger(preferences.fontSize) && preferences.fontSize >= 12 && preferences.fontSize <= 24 
        ? preferences.fontSize 
        : defaultPreferences.fontSize,
      autoSave: typeof preferences.autoSave === 'boolean' ? preferences.autoSave : defaultPreferences.autoSave
    };
  };

  const resetToDefaults = () => {
    localStorage.removeItem(STORAGE_KEY);
    return { ...defaultPreferences };
  };

  const getPreference = (key) => {
    const preferences = loadPreferences();
    return preferences[key] !== undefined ? preferences[key] : null;
  };

  const setPreference = (key, value) => {
    const current = loadPreferences();
    const updated = { ...current, [key]: value };
    return savePreferences(updated);
  };

  const applyPreferences = () => {
    const prefs = loadPreferences();
    
    document.documentElement.setAttribute('data-theme', prefs.theme);
    document.documentElement.lang = prefs.language;
    document.documentElement.style.fontSize = `${prefs.fontSize}px`;
    
    if (prefs.notifications && 'Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
    
    return prefs;
  };

  return {
    load: loadPreferences,
    save: savePreferences,
    reset: resetToDefaults,
    get: getPreference,
    set: setPreference,
    apply: applyPreferences,
    validate: validatePreferences
  };
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = userPreferencesManager;
}const UserPreferencesManager = (function() {
    const STORAGE_KEY = 'user_preferences';
    
    function getPreferences() {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : {};
    }
    
    function setPreference(key, value) {
        const preferences = getPreferences();
        preferences[key] = value;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
        return true;
    }
    
    function getPreference(key, defaultValue = null) {
        const preferences = getPreferences();
        return preferences.hasOwnProperty(key) ? preferences[key] : defaultValue;
    }
    
    function removePreference(key) {
        const preferences = getPreferences();
        if (preferences.hasOwnProperty(key)) {
            delete preferences[key];
            localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
            return true;
        }
        return false;
    }
    
    function clearAllPreferences() {
        localStorage.removeItem(STORAGE_KEY);
        return true;
    }
    
    function getAllPreferences() {
        return getPreferences();
    }
    
    return {
        set: setPreference,
        get: getPreference,
        remove: removePreference,
        clear: clearAllPreferences,
        getAll: getAllPreferences
    };
})();

// Example usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = UserPreferencesManager;
}const UserPreferencesManager = (() => {
  const STORAGE_KEY = 'app_user_preferences';
  const DEFAULT_PREFERENCES = {
    theme: 'light',
    language: 'en',
    notifications: true,
    fontSize: 16,
    autoSave: true,
    showTutorial: false,
    resultsPerPage: 20,
    timezone: 'UTC'
  };

  const validatePreference = (key, value) => {
    const validators = {
      theme: (val) => ['light', 'dark', 'auto'].includes(val),
      language: (val) => /^[a-z]{2}(-[A-Z]{2})?$/.test(val),
      notifications: (val) => typeof val === 'boolean',
      fontSize: (val) => Number.isInteger(val) && val >= 12 && val <= 24,
      autoSave: (val) => typeof val === 'boolean',
      showTutorial: (val) => typeof val === 'boolean',
      resultsPerPage: (val) => [10, 20, 50, 100].includes(val),
      timezone: (val) => Intl.supportedValuesOf('timeZone').includes(val)
    };

    return validators[key] ? validators[key](value) : false;
  };

  const loadPreferences = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return { ...DEFAULT_PREFERENCES };

      const parsed = JSON.parse(stored);
      const merged = { ...DEFAULT_PREFERENCES, ...parsed };

      Object.keys(merged).forEach(key => {
        if (!validatePreference(key, merged[key])) {
          merged[key] = DEFAULT_PREFERENCES[key];
        }
      });

      return merged;
    } catch (error) {
      console.warn('Failed to load preferences, using defaults:', error);
      return { ...DEFAULT_PREFERENCES };
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

      localStorage.setItem(STORAGE_KEY, JSON.stringify(validated));
      return true;
    } catch (error) {
      console.error('Failed to save preferences:', error);
      return false;
    }
  };

  const updatePreference = (key, value) => {
    if (!validatePreference(key, value)) {
      throw new Error(`Invalid preference value for ${key}: ${value}`);
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
    localStorage.removeItem(STORAGE_KEY);
    Object.keys(DEFAULT_PREFERENCES).forEach(key => {
      dispatchPreferenceChange(key, DEFAULT_PREFERENCES[key]);
    });
    return true;
  };

  const dispatchPreferenceChange = (key, value) => {
    const event = new CustomEvent('preferencechange', {
      detail: { key, value, timestamp: Date.now() }
    });
    window.dispatchEvent(event);
  };

  const exportPreferences = () => {
    const prefs = loadPreferences();
    return {
      data: prefs,
      meta: {
        exportedAt: new Date().toISOString(),
        version: '1.0',
        count: Object.keys(prefs).length
      }
    };
  };

  const importPreferences = (preferencesData) => {
    if (!preferencesData || !preferencesData.data) {
      throw new Error('Invalid preferences data format');
    }

    const imported = preferencesData.data;
    const validPreferences = {};

    Object.keys(imported).forEach(key => {
      if (DEFAULT_PREFERENCES.hasOwnProperty(key) && validatePreference(key, imported[key])) {
        validPreferences[key] = imported[key];
      }
    });

    return savePreferences(validPreferences);
  };

  return {
    getPreferences: loadPreferences,
    setPreference: updatePreference,
    reset: resetPreferences,
    export: exportPreferences,
    import: importPreferences,
    validate: validatePreference,
    subscribe: (callback) => {
      window.addEventListener('preferencechange', (event) => {
        callback(event.detail);
      });
    },
    unsubscribe: (callback) => {
      window.removeEventListener('preferencechange', callback);
    }
  };
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = UserPreferencesManager;
}const UserPreferencesManager = (() => {
  const STORAGE_KEY = 'app_user_preferences';
  
  const defaultPreferences = {
    theme: 'light',
    language: 'en',
    notifications: true,
    fontSize: 16,
    autoSave: true,
    sidebarCollapsed: false
  };

  const loadPreferences = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return { ...defaultPreferences, ...JSON.parse(stored) };
      }
    } catch (error) {
      console.error('Failed to load preferences:', error);
    }
    return { ...defaultPreferences };
  };

  const savePreferences = (preferences) => {
    try {
      const validated = validatePreferences(preferences);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(validated));
      return true;
    } catch (error) {
      console.error('Failed to save preferences:', error);
      return false;
    }
  };

  const validatePreferences = (preferences) => {
    const validThemes = ['light', 'dark', 'auto'];
    const validLanguages = ['en', 'es', 'fr', 'de'];
    
    return {
      theme: validThemes.includes(preferences.theme) ? preferences.theme : defaultPreferences.theme,
      language: validLanguages.includes(preferences.language) ? preferences.language : defaultPreferences.language,
      notifications: typeof preferences.notifications === 'boolean' ? preferences.notifications : defaultPreferences.notifications,
      fontSize: typeof preferences.fontSize === 'number' && preferences.fontSize >= 12 && preferences.fontSize <= 24 ? preferences.fontSize : defaultPreferences.fontSize,
      autoSave: typeof preferences.autoSave === 'boolean' ? preferences.autoSave : defaultPreferences.autoSave,
      sidebarCollapsed: typeof preferences.sidebarCollapsed === 'boolean' ? preferences.sidebarCollapsed : defaultPreferences.sidebarCollapsed
    };
  };

  const resetToDefaults = () => {
    localStorage.removeItem(STORAGE_KEY);
    return { ...defaultPreferences };
  };

  const getPreference = (key) => {
    const preferences = loadPreferences();
    return preferences[key] !== undefined ? preferences[key] : defaultPreferences[key];
  };

  const setPreference = (key, value) => {
    const preferences = loadPreferences();
    preferences[key] = value;
    return savePreferences(preferences);
  };

  const getAllPreferences = () => {
    return loadPreferences();
  };

  const setMultiplePreferences = (updates) => {
    const preferences = loadPreferences();
    Object.assign(preferences, updates);
    return savePreferences(preferences);
  };

  const subscribe = (callback) => {
    const handler = (event) => {
      if (event.key === STORAGE_KEY) {
        callback(getAllPreferences());
      }
    };
    window.addEventListener('storage', handler);
    
    return () => {
      window.removeEventListener('storage', handler);
    };
  };

  return {
    get: getPreference,
    set: setPreference,
    getAll: getAllPreferences,
    setMultiple: setMultiplePreferences,
    reset: resetToDefaults,
    subscribe
  };
})();

export default UserPreferencesManager;class UserPreferencesManager {
  constructor() {
    this.preferences = this.loadPreferences();
  }

  loadPreferences() {
    const stored = localStorage.getItem('userPreferences');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (error) {
        console.error('Failed to parse stored preferences:', error);
      }
    }
    return this.getDefaultPreferences();
  }

  getDefaultPreferences() {
    return {
      theme: 'light',
      language: 'en',
      notifications: true,
      fontSize: 16,
      autoSave: true,
      timezone: 'UTC'
    };
  }

  updatePreference(key, value) {
    if (key in this.preferences) {
      this.preferences[key] = value;
      this.savePreferences();
      return true;
    }
    return false;
  }

  savePreferences() {
    try {
      localStorage.setItem('userPreferences', JSON.stringify(this.preferences));
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

  getPreference(key) {
    return this.preferences[key];
  }
}

export default UserPreferencesManager;const userPreferencesManager = (() => {
    const STORAGE_KEY = 'user_preferences';
    const DEFAULT_PREFERENCES = {
        theme: 'light',
        language: 'en',
        notifications: true,
        fontSize: 16,
        autoSave: false
    };

    let preferences = { ...DEFAULT_PREFERENCES };

    const loadPreferences = () => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                preferences = { ...DEFAULT_PREFERENCES, ...JSON.parse(stored) };
            }
            return preferences;
        } catch (error) {
            console.error('Failed to load preferences:', error);
            return { ...DEFAULT_PREFERENCES };
        }
    };

    const savePreferences = (newPreferences) => {
        try {
            preferences = { ...preferences, ...newPreferences };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
            return true;
        } catch (error) {
            console.error('Failed to save preferences:', error);
            return false;
        }
    };

    const resetPreferences = () => {
        preferences = { ...DEFAULT_PREFERENCES };
        localStorage.removeItem(STORAGE_KEY);
        return preferences;
    };

    const getPreference = (key) => {
        return preferences[key] !== undefined ? preferences[key] : null;
    };

    const getAllPreferences = () => {
        return { ...preferences };
    };

    const subscribe = (callback) => {
        window.addEventListener('storage', (event) => {
            if (event.key === STORAGE_KEY) {
                loadPreferences();
                callback(getAllPreferences());
            }
        });
    };

    loadPreferences();

    return {
        save: savePreferences,
        load: loadPreferences,
        reset: resetPreferences,
        get: getPreference,
        getAll: getAllPreferences,
        subscribe: subscribe,
        defaults: DEFAULT_PREFERENCES
    };
})();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = userPreferencesManager;
}const userPreferencesManager = (() => {
    const PREFERENCES_KEY = 'app_preferences';
    const DEFAULT_PREFERENCES = {
        theme: 'light',
        language: 'en',
        notifications: true,
        fontSize: 14
    };

    const getPreferences = () => {
        try {
            const stored = localStorage.getItem(PREFERENCES_KEY);
            return stored ? JSON.parse(stored) : { ...DEFAULT_PREFERENCES };
        } catch (error) {
            console.error('Error reading preferences:', error);
            return { ...DEFAULT_PREFERENCES };
        }
    };

    const savePreferences = (preferences) => {
        try {
            const current = getPreferences();
            const updated = { ...current, ...preferences };
            localStorage.setItem(PREFERENCES_KEY, JSON.stringify(updated));
            return updated;
        } catch (error) {
            console.error('Error saving preferences:', error);
            return null;
        }
    };

    const resetPreferences = () => {
        try {
            localStorage.setItem(PREFERENCES_KEY, JSON.stringify(DEFAULT_PREFERENCES));
            return { ...DEFAULT_PREFERENCES };
        } catch (error) {
            console.error('Error resetting preferences:', error);
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

    return {
        getPreferences,
        savePreferences,
        resetPreferences,
        getPreference,
        setPreference
    };
})();