const userPreferencesManager = (() => {
  const STORAGE_KEY = 'app_user_preferences';
  
  const defaultPreferences = {
    theme: 'light',
    fontSize: 16,
    notifications: true,
    language: 'en',
    autoSave: false,
    sidebarCollapsed: false
  };

  let currentPreferences = { ...defaultPreferences };

  const loadPreferences = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        currentPreferences = { ...defaultPreferences, ...parsed };
      }
    } catch (error) {
      console.warn('Failed to load user preferences:', error);
    }
    return currentPreferences;
  };

  const savePreferences = (updates) => {
    try {
      currentPreferences = { ...currentPreferences, ...updates };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(currentPreferences));
      return true;
    } catch (error) {
      console.error('Failed to save user preferences:', error);
      return false;
    }
  };

  const resetToDefaults = () => {
    currentPreferences = { ...defaultPreferences };
    localStorage.removeItem(STORAGE_KEY);
    return currentPreferences;
  };

  const getPreference = (key) => {
    return currentPreferences[key] !== undefined 
      ? currentPreferences[key] 
      : defaultPreferences[key];
  };

  const getAllPreferences = () => {
    return { ...currentPreferences };
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
    get: getPreference,
    getAll: getAllPreferences,
    set: savePreferences,
    reset: resetToDefaults,
    subscribe,
    defaults: { ...defaultPreferences }
  };
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = userPreferencesManager;
}class UserPreferencesManager {
    constructor() {
        this.prefs = this.loadPreferences();
    }

    loadPreferences() {
        const saved = localStorage.getItem('userPreferences');
        return saved ? JSON.parse(saved) : {
            theme: 'light',
            language: 'en',
            notifications: true,
            fontSize: 16
        };
    }

    savePreferences() {
        localStorage.setItem('userPreferences', JSON.stringify(this.prefs));
    }

    setPreference(key, value) {
        if (this.prefs.hasOwnProperty(key)) {
            this.prefs[key] = value;
            this.savePreferences();
            return true;
        }
        return false;
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
            language: 'en',
            notifications: true,
            fontSize: 16
        };
        this.savePreferences();
    }
}

const preferencesManager = new UserPreferencesManager();const UserPreferencesManager = (() => {
  const STORAGE_KEY = 'app_user_preferences';
  const DEFAULT_PREFERENCES = {
    theme: 'light',
    fontSize: 16,
    notificationsEnabled: true,
    language: 'en',
    autoSave: false,
    sidebarCollapsed: false
  };

  const loadPreferences = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return { ...DEFAULT_PREFERENCES, ...JSON.parse(stored) };
      }
    } catch (error) {
      console.error('Failed to load preferences:', error);
    }
    return { ...DEFAULT_PREFERENCES };
  };

  const savePreferences = (preferences) => {
    try {
      const current = loadPreferences();
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
    const prefs = loadPreferences();
    return prefs[key] !== undefined ? prefs[key] : DEFAULT_PREFERENCES[key];
  };

  const setPreference = (key, value) => {
    return savePreferences({ [key]: value });
  };

  const subscribe = (callback) => {
    const handler = (event) => {
      if (event.key === STORAGE_KEY) {
        callback(loadPreferences());
      }
    };
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  };

  return {
    load: loadPreferences,
    save: savePreferences,
    reset: resetPreferences,
    get: getPreference,
    set: setPreference,
    subscribe
  };
})();

export default UserPreferencesManager;const UserPreferencesManager = (() => {
  const STORAGE_KEY = 'app_preferences';
  
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
      language: (val) => /^[a-z]{2}(-[A-Z]{2})?$/.test(val),
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
      console.warn('Failed to load preferences:', error);
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

  const resetToDefaults = () => {
    return savePreferences(defaultPreferences);
  };

  const exportPreferences = () => {
    const prefs = loadPreferences();
    const blob = new Blob([JSON.stringify(prefs, null, 2)], { 
      type: 'application/json' 
    });
    return URL.createObjectURL(blob);
  };

  const importPreferences = (jsonString) => {
    try {
      const imported = JSON.parse(jsonString);
      return savePreferences(imported);
    } catch (error) {
      console.error('Invalid preferences format:', error);
      return false;
    }
  };

  return {
    get: (key) => {
      const prefs = loadPreferences();
      return key ? prefs[key] : { ...prefs };
    },
    
    set: (key, value) => {
      if (typeof key === 'object') {
        return savePreferences(key);
      }
      
      if (validatePreference(key, value)) {
        const prefs = loadPreferences();
        prefs[key] = value;
        return savePreferences(prefs);
      }
      return false;
    },
    
    reset: resetToDefaults,
    export: exportPreferences,
    import: importPreferences,
    
    subscribe: (callback) => {
      const handler = (event) => {
        if (event.key === STORAGE_KEY) {
          callback(loadPreferences());
        }
      };
      window.addEventListener('storage', handler);
      return () => window.removeEventListener('storage', handler);
    }
  };
})();const UserPreferencesManager = (() => {
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
    window.dispatchEvent(new CustomEvent('preferencesChanged', {
      detail: { key, value }
    }));
  };

  const reset = () => {
    Object.keys(DEFAULTS).forEach(key => {
      localStorage.removeItem(PREFIX + key);
    });
    window.dispatchEvent(new Event('preferencesReset'));
  };

  const getAll = () => {
    return Object.keys(DEFAULTS).reduce((prefs, key) => {
      prefs[key] = get(key);
      return prefs;
    }, {});
  };

  const subscribe = (callback) => {
    const handler = (event) => callback(event.detail);
    window.addEventListener('preferencesChanged', handler);
    return () => window.removeEventListener('preferencesChanged', handler);
  };

  return {
    get,
    set,
    reset,
    getAll,
    subscribe
  };
})();const userPreferencesManager = (() => {
  const PREFERENCES_KEY = 'app_preferences';
  
  const defaultPreferences = {
    theme: 'light',
    fontSize: 16,
    notifications: true,
    language: 'en',
    autoSave: false,
    lastUpdated: null
  };

  const loadPreferences = () => {
    try {
      const stored = localStorage.getItem(PREFERENCES_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (error) {
      console.warn('Failed to load preferences:', error);
    }
    return { ...defaultPreferences };
  };

  const savePreferences = (preferences) => {
    try {
      const updated = {
        ...loadPreferences(),
        ...preferences,
        lastUpdated: new Date().toISOString()
      };
      localStorage.setItem(PREFERENCES_KEY, JSON.stringify(updated));
      return updated;
    } catch (error) {
      console.error('Failed to save preferences:', error);
      return null;
    }
  };

  const resetPreferences = () => {
    try {
      localStorage.removeItem(PREFERENCES_KEY);
      return { ...defaultPreferences };
    } catch (error) {
      console.error('Failed to reset preferences:', error);
      return null;
    }
  };

  const getPreference = (key) => {
    const prefs = loadPreferences();
    return prefs[key] !== undefined ? prefs[key] : defaultPreferences[key];
  };

  const setPreference = (key, value) => {
    return savePreferences({ [key]: value });
  };

  const getAllPreferences = () => {
    return loadPreferences();
  };

  const subscribe = (callback) => {
    const handler = (event) => {
      if (event.key === PREFERENCES_KEY) {
        callback(getAllPreferences());
      }
    };
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  };

  return {
    get: getPreference,
    set: setPreference,
    getAll: getAllPreferences,
    reset: resetPreferences,
    subscribe
  };
})();const userPreferencesManager = (() => {
    const PREFERENCES_KEY = 'app_user_preferences';
    const DEFAULT_PREFERENCES = {
        theme: 'light',
        language: 'en',
        notifications: true,
        fontSize: 16,
        autoSave: true
    };

    const getPreferences = () => {
        try {
            const stored = localStorage.getItem(PREFERENCES_KEY);
            return stored ? JSON.parse(stored) : { ...DEFAULT_PREFERENCES };
        } catch (error) {
            console.error('Failed to retrieve preferences:', error);
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
            console.error('Failed to save preferences:', error);
            return null;
        }
    };

    const resetPreferences = () => {
        try {
            localStorage.setItem(PREFERENCES_KEY, JSON.stringify(DEFAULT_PREFERENCES));
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
            if (event.key === PREFERENCES_KEY) {
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
        const handler = (event) => callback(event.detail);
        window.addEventListener('preferencechange', handler);
        
        return () => {
            window.removeEventListener('preferencechange', handler);
        };
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
}const userPreferencesManager = (() => {
    const PREFERENCES_KEY = 'app_user_preferences';
    const DEFAULT_PREFERENCES = {
        theme: 'light',
        fontSize: 16,
        notifications: true,
        language: 'en',
        autoSave: false
    };

    const getPreferences = () => {
        try {
            const stored = localStorage.getItem(PREFERENCES_KEY);
            return stored ? JSON.parse(stored) : { ...DEFAULT_PREFERENCES };
        } catch (error) {
            console.error('Failed to retrieve preferences:', error);
            return { ...DEFAULT_PREFERENCES };
        }
    };

    const savePreferences = (preferences) => {
        try {
            const current = getPreferences();
            const updated = { ...current, ...preferences };
            localStorage.setItem(PREFERENCES_KEY, JSON.stringify(updated));
            return true;
        } catch (error) {
            console.error('Failed to save preferences:', error);
            return false;
        }
    };

    const resetPreferences = () => {
        try {
            localStorage.setItem(PREFERENCES_KEY, JSON.stringify(DEFAULT_PREFERENCES));
            return true;
        } catch (error) {
            console.error('Failed to reset preferences:', error);
            return false;
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
            if (event.key === PREFERENCES_KEY) {
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

export default userPreferencesManager;const UserPreferences = {
  _storageKey: 'app_user_preferences',

  getPreferences() {
    try {
      const stored = localStorage.getItem(this._storageKey);
      return stored ? JSON.parse(stored) : {};
    } catch (error) {
      console.error('Failed to retrieve preferences:', error);
      return {};
    }
  },

  setPreference(key, value) {
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

  removePreference(key) {
    const preferences = this.getPreferences();
    delete preferences[key];
    
    try {
      localStorage.setItem(this._storageKey, JSON.stringify(preferences));
      return true;
    } catch (error) {
      console.error('Failed to remove preference:', error);
      return false;
    }
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

  getAll() {
    return this.getPreferences();
  }
};

export default UserPreferences;const UserPreferences = {
  preferences: {},

  init() {
    const stored = localStorage.getItem('userPreferences');
    if (stored) {
      try {
        this.preferences = JSON.parse(stored);
      } catch (e) {
        console.warn('Failed to parse stored preferences');
        this.preferences = {};
      }
    }
    return this;
  },

  set(key, value) {
    this.preferences[key] = value;
    this.save();
    return this;
  },

  get(key, defaultValue = null) {
    return key in this.preferences ? this.preferences[key] : defaultValue;
  },

  remove(key) {
    delete this.preferences[key];
    this.save();
    return this;
  },

  clear() {
    this.preferences = {};
    localStorage.removeItem('userPreferences');
    return this;
  },

  save() {
    localStorage.setItem('userPreferences', JSON.stringify(this.preferences));
    return this;
  },

  getAll() {
    return { ...this.preferences };
  }
};

Object.freeze(UserPreferences);
export default UserPreferences.init();class UserPreferencesManager {
    constructor() {
        this.prefs = {};
        this.storageAvailable = this.checkStorageAvailability();
        this.loadPreferences();
    }

    checkStorageAvailability() {
        const testKey = '__storage_test__';
        try {
            localStorage.setItem(testKey, testKey);
            localStorage.removeItem(testKey);
            return true;
        } catch (e) {
            console.warn('LocalStorage unavailable, falling back to sessionStorage');
            return false;
        }
    }

    getStorage() {
        return this.storageAvailable ? localStorage : sessionStorage;
    }

    loadPreferences() {
        const storage = this.getStorage();
        const stored = storage.getItem('userPreferences');
        if (stored) {
            try {
                this.prefs = JSON.parse(stored);
            } catch (error) {
                console.error('Failed to parse stored preferences:', error);
                this.prefs = {};
            }
        }
    }

    savePreference(key, value) {
        this.prefs[key] = value;
        const storage = this.getStorage();
        try {
            storage.setItem('userPreferences', JSON.stringify(this.prefs));
            return true;
        } catch (error) {
            console.error('Failed to save preference:', error);
            return false;
        }
    }

    getPreference(key, defaultValue = null) {
        return this.prefs.hasOwnProperty(key) ? this.prefs[key] : defaultValue;
    }

    removePreference(key) {
        if (this.prefs.hasOwnProperty(key)) {
            delete this.prefs[key];
            const storage = this.getStorage();
            storage.setItem('userPreferences', JSON.stringify(this.prefs));
            return true;
        }
        return false;
    }

    clearAllPreferences() {
        this.prefs = {};
        const storage = this.getStorage();
        storage.removeItem('userPreferences');
    }
}