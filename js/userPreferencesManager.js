const userPreferencesManager = (function() {
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
    
    function clearPreferences() {
        localStorage.removeItem(STORAGE_KEY);
        return true;
    }
    
    function getAllPreferences() {
        return getPreferences();
    }
    
    return {
        get: getPreference,
        set: setPreference,
        remove: removePreference,
        clear: clearPreferences,
        getAll: getAllPreferences
    };
})();const userPreferencesManager = (function() {
    const PREFERENCES_KEY = 'app_preferences';
    const DEFAULT_PREFERENCES = {
        theme: 'light',
        language: 'en',
        notifications: true,
        fontSize: 16,
        autoSave: false
    };

    function getPreferences() {
        const stored = localStorage.getItem(PREFERENCES_KEY);
        if (stored) {
            try {
                return { ...DEFAULT_PREFERENCES, ...JSON.parse(stored) };
            } catch (error) {
                console.error('Failed to parse preferences:', error);
                return DEFAULT_PREFERENCES;
            }
        }
        return DEFAULT_PREFERENCES;
    }

    function savePreferences(preferences) {
        try {
            const current = getPreferences();
            const updated = { ...current, ...preferences };
            localStorage.setItem(PREFERENCES_KEY, JSON.stringify(updated));
            return updated;
        } catch (error) {
            console.error('Failed to save preferences:', error);
            return null;
        }
    }

    function resetPreferences() {
        localStorage.removeItem(PREFERENCES_KEY);
        return DEFAULT_PREFERENCES;
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
            if (event.key === PREFERENCES_KEY) {
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
})();const UserPreferencesManager = (() => {
  const STORAGE_KEY = 'app_user_preferences';
  
  const defaultPreferences = {
    theme: 'light',
    language: 'en',
    notifications: true,
    fontSize: 16,
    autoSave: true,
    sidebarCollapsed: false
  };

  const getPreferences = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return { ...defaultPreferences, ...parsed };
      }
    } catch (error) {
      console.error('Error reading preferences:', error);
    }
    return { ...defaultPreferences };
  };

  const savePreferences = (updates) => {
    try {
      const current = getPreferences();
      const merged = { ...current, ...updates };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
      return merged;
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
    set: savePreferences,
    reset: resetPreferences,
    subscribe
  };
})();

export default UserPreferencesManager;const UserPreferencesManager = (() => {
  const STORAGE_KEY = 'app_user_preferences';
  
  const defaultPreferences = {
    theme: 'light',
    language: 'en',
    notifications: true,
    fontSize: 16,
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
      console.error('Failed to load preferences:', error);
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

  const resetToDefaults = () => {
    localStorage.removeItem(STORAGE_KEY);
    return { ...defaultPreferences };
  };

  const validatePreference = (key, value) => {
    const validators = {
      theme: (v) => ['light', 'dark', 'auto'].includes(v),
      language: (v) => /^[a-z]{2}(-[A-Z]{2})?$/.test(v),
      notifications: (v) => typeof v === 'boolean',
      fontSize: (v) => Number.isInteger(v) && v >= 12 && v <= 24,
      autoSave: (v) => typeof v === 'boolean',
      sidebarCollapsed: (v) => typeof v === 'boolean'
    };
    
    return validators[key] ? validators[key](value) : false;
  };

  return {
    get: (key) => {
      const prefs = loadPreferences();
      return key ? prefs[key] : { ...prefs };
    },
    
    set: (key, value) => {
      if (!validatePreference(key, value)) {
        throw new Error(`Invalid value for preference "${key}"`);
      }
      
      const prefs = loadPreferences();
      prefs[key] = value;
      
      if (savePreferences(prefs)) {
        window.dispatchEvent(new CustomEvent('preferencesChanged', {
          detail: { key, value, all: prefs }
        }));
        return true;
      }
      return false;
    },
    
    update: (updates) => {
      const prefs = loadPreferences();
      
      for (const [key, value] of Object.entries(updates)) {
        if (validatePreference(key, value)) {
          prefs[key] = value;
        }
      }
      
      if (savePreferences(prefs)) {
        window.dispatchEvent(new CustomEvent('preferencesUpdated', {
          detail: { updates, all: prefs }
        }));
        return true;
      }
      return false;
    },
    
    reset: resetToDefaults,
    
    subscribe: (callback) => {
      const handler = (event) => callback(event.detail);
      window.addEventListener('preferencesChanged', handler);
      window.addEventListener('preferencesUpdated', handler);
      
      return () => {
        window.removeEventListener('preferencesChanged', handler);
        window.removeEventListener('preferencesUpdated', handler);
      };
    }
  };
})();

export default UserPreferencesManager;const UserPreferences = {
  preferences: {},

  init() {
    this.loadPreferences();
    window.addEventListener('beforeunload', () => this.savePreferences());
  },

  setPreference(key, value) {
    this.preferences[key] = value;
    this.savePreferences();
  },

  getPreference(key, defaultValue = null) {
    return this.preferences[key] || defaultValue;
  },

  removePreference(key) {
    delete this.preferences[key];
    this.savePreferences();
  },

  loadPreferences() {
    try {
      const stored = localStorage.getItem('userPreferences');
      this.preferences = stored ? JSON.parse(stored) : {};
    } catch (error) {
      console.error('Failed to load preferences:', error);
      this.preferences = {};
    }
  },

  savePreferences() {
    try {
      localStorage.setItem('userPreferences', JSON.stringify(this.preferences));
    } catch (error) {
      console.error('Failed to save preferences:', error);
    }
  },

  clearAll() {
    this.preferences = {};
    localStorage.removeItem('userPreferences');
  }
};

UserPreferences.init();const UserPreferencesManager = (() => {
  const STORAGE_KEY = 'app_preferences';
  
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
      if (stored) {
        return { ...defaultPreferences, ...JSON.parse(stored) };
      }
    } catch (error) {
      console.warn('Failed to parse stored preferences:', error);
    }
    return { ...defaultPreferences };
  };

  const savePreferences = (updates) => {
    try {
      const current = getPreferences();
      const updated = { ...current, ...updates };
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
    subscribe,
    getDefaults: () => ({ ...defaultPreferences })
  };
})();

export default UserPreferencesManager;const userPreferencesManager = (() => {
  const STORAGE_KEY = 'app_user_preferences';
  const DEFAULT_PREFERENCES = {
    theme: 'light',
    language: 'en',
    notifications: true,
    fontSize: 16,
    autoSave: false
  };

  function getPreferences() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : { ...DEFAULT_PREFERENCES };
    } catch (error) {
      console.error('Failed to retrieve preferences:', error);
      return { ...DEFAULT_PREFERENCES };
    }
  }

  function savePreferences(preferences) {
    try {
      const current = getPreferences();
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
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_PREFERENCES));
      return { ...DEFAULT_PREFERENCES };
    } catch (error) {
      console.error('Failed to reset preferences:', error);
      return null;
    }
  }

  function getPreference(key) {
    const preferences = getPreferences();
    return preferences[key] !== undefined ? preferences[key] : DEFAULT_PREFERENCES[key];
  }

  function setPreference(key, value) {
    return savePreferences({ [key]: value });
  }

  function subscribe(callback) {
    const originalSetItem = localStorage.setItem;
    localStorage.setItem = function(key, value) {
      originalSetItem.apply(this, arguments);
      if (key === STORAGE_KEY) {
        callback(getPreferences());
      }
    };
    return () => {
      localStorage.setItem = originalSetItem;
    };
  }

  return {
    getPreferences,
    savePreferences,
    resetPreferences,
    getPreference,
    setPreference,
    subscribe
  };
})();

export default userPreferencesManager;const UserPreferencesManager = (() => {
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

export default UserPreferencesManager;const userPreferencesManager = (() => {
  const STORAGE_KEY = 'app_user_preferences';
  const DEFAULT_PREFERENCES = {
    theme: 'light',
    language: 'en',
    notifications: true,
    fontSize: 16,
    autoSave: true
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
      return preferences;
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
    const handler = (event) => {
      if (event.key === STORAGE_KEY) {
        loadPreferences();
        callback(getAllPreferences());
      }
    };
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  };

  loadPreferences();

  return {
    load: loadPreferences,
    save: savePreferences,
    reset: resetPreferences,
    get: getPreference,
    getAll: getAllPreferences,
    subscribe
  };
})();

export default userPreferencesManager;