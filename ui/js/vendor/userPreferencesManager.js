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
UserPreferences.init();const UserPreferencesManager = (() => {
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
      localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
      return true;
    } catch (error) {
      console.error('Failed to save preferences:', error);
      return false;
    }
  };

  const updatePreference = (key, value) => {
    const current = loadPreferences();
    const updated = { ...current, [key]: value };
    return savePreferences(updated);
  };

  const resetToDefaults = () => {
    return savePreferences(defaultPreferences);
  };

  const getPreference = (key) => {
    const prefs = loadPreferences();
    return prefs[key] !== undefined ? prefs[key] : defaultPreferences[key];
  };

  const getAllPreferences = () => {
    return loadPreferences();
  };

  const subscribe = (callback) => {
    const handler = (event) => {
      if (event.key === STORAGE_KEY) {
        callback(getAllPreferences());
      }
    };
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  };

  return {
    get: getPreference,
    getAll: getAllPreferences,
    set: updatePreference,
    reset: resetToDefaults,
    subscribe
  };
})();

export default UserPreferencesManager;const UserPreferencesManager = (() => {
  const STORAGE_KEY = 'app_preferences';
  const DEFAULT_PREFERENCES = {
    theme: 'light',
    fontSize: 16,
    notifications: true,
    language: 'en'
  };

  const getPreferences = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return { ...DEFAULT_PREFERENCES, ...JSON.parse(stored) };
      }
    } catch (error) {
      console.warn('Failed to read preferences from localStorage:', error);
    }
    return { ...DEFAULT_PREFERENCES };
  };

  const savePreferences = (preferences) => {
    try {
      const current = getPreferences();
      const updated = { ...current, ...preferences };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    } catch (error) {
      console.warn('Failed to save preferences to localStorage:', error);
      return null;
    }
  };

  const resetPreferences = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      return { ...DEFAULT_PREFERENCES };
    } catch (error) {
      console.warn('Failed to reset preferences:', error);
      return getPreferences();
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
    getPreferences,
    savePreferences,
    resetPreferences,
    subscribe
  };
})();

export default UserPreferencesManager;class UserPreferencesManager {
    constructor(storageKey = 'user_preferences') {
        this.storageKey = storageKey;
        this.preferences = this.loadPreferences();
    }

    loadPreferences() {
        try {
            const stored = localStorage.getItem(this.storageKey);
            return stored ? JSON.parse(stored) : {};
        } catch (error) {
            console.warn('Failed to load preferences:', error);
            return {};
        }
    }

    savePreferences() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.preferences));
            return true;
        } catch (error) {
            console.error('Failed to save preferences:', error);
            return false;
        }
    }

    setPreference(key, value) {
        this.preferences[key] = value;
        return this.savePreferences();
    }

    getPreference(key, defaultValue = null) {
        return this.preferences.hasOwnProperty(key) ? this.preferences[key] : defaultValue;
    }

    removePreference(key) {
        if (this.preferences.hasOwnProperty(key)) {
            delete this.preferences[key];
            return this.savePreferences();
        }
        return false;
    }

    clearAllPreferences() {
        this.preferences = {};
        try {
            localStorage.removeItem(this.storageKey);
            return true;
        } catch (error) {
            console.error('Failed to clear preferences:', error);
            return false;
        }
    }

    getAllPreferences() {
        return { ...this.preferences };
    }

    hasPreference(key) {
        return this.preferences.hasOwnProperty(key);
    }
}

export default UserPreferencesManager;const UserPreferencesManager = (() => {
  const STORAGE_KEY = 'app_user_preferences';
  
  const defaultPreferences = {
    theme: 'light',
    language: 'en',
    notifications: true,
    fontSize: 16,
    autoSave: false,
    lastUpdated: null
  };

  const validatePreferences = (prefs) => {
    const validThemes = ['light', 'dark', 'auto'];
    const validLanguages = ['en', 'es', 'fr', 'de'];
    
    return {
      theme: validThemes.includes(prefs.theme) ? prefs.theme : defaultPreferences.theme,
      language: validLanguages.includes(prefs.language) ? prefs.language : defaultPreferences.language,
      notifications: typeof prefs.notifications === 'boolean' ? prefs.notifications : defaultPreferences.notifications,
      fontSize: typeof prefs.fontSize === 'number' && prefs.fontSize >= 12 && prefs.fontSize <= 24 
        ? prefs.fontSize 
        : defaultPreferences.fontSize,
      autoSave: typeof prefs.autoSave === 'boolean' ? prefs.autoSave : defaultPreferences.autoSave,
      lastUpdated: prefs.lastUpdated || new Date().toISOString()
    };
  };

  const saveToStorage = (preferences) => {
    try {
      const validatedPrefs = validatePreferences(preferences);
      validatedPrefs.lastUpdated = new Date().toISOString();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(validatedPrefs));
      return validatedPrefs;
    } catch (error) {
      console.error('Failed to save preferences:', error);
      return null;
    }
  };

  const loadFromStorage = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return defaultPreferences;
      
      const parsed = JSON.parse(stored);
      return validatePreferences(parsed);
    } catch (error) {
      console.error('Failed to load preferences:', error);
      return defaultPreferences;
    }
  };

  const updatePreference = (key, value) => {
    const current = loadFromStorage();
    if (!(key in current)) {
      throw new Error(`Invalid preference key: ${key}`);
    }
    
    const updated = { ...current, [key]: value };
    return saveToStorage(updated);
  };

  const resetToDefaults = () => {
    return saveToStorage(defaultPreferences);
  };

  const exportPreferences = () => {
    const prefs = loadFromStorage();
    return JSON.stringify(prefs, null, 2);
  };

  const importPreferences = (jsonString) => {
    try {
      const imported = JSON.parse(jsonString);
      return saveToStorage(imported);
    } catch (error) {
      console.error('Failed to import preferences:', error);
      return null;
    }
  };

  const getPreference = (key) => {
    const prefs = loadFromStorage();
    return prefs[key] !== undefined ? prefs[key] : null;
  };

  const getAllPreferences = () => {
    return loadFromStorage();
  };

  const subscribe = (callback) => {
    const handler = (event) => {
      if (event.key === STORAGE_KEY) {
        callback(getAllPreferences());
      }
    };
    window.addEventListener('storage', handler);
    
    return () => window.removeEventListener('storage', handler);
  };

  return {
    get: getPreference,
    getAll: getAllPreferences,
    update: updatePreference,
    reset: resetToDefaults,
    export: exportPreferences,
    import: importPreferences,
    subscribe
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

  const getPreferences = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return { ...defaultPreferences, ...JSON.parse(stored) };
      }
      return { ...defaultPreferences };
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
    return preferences[key] !== undefined ? preferences[key] : null;
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
}const UserPreferences = {
    preferences: {},

    init: function() {
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

    setPreference: function(key, value) {
        this.preferences[key] = value;
        this.save();
        return this;
    },

    getPreference: function(key, defaultValue = null) {
        return this.preferences.hasOwnProperty(key) ? this.preferences[key] : defaultValue;
    },

    removePreference: function(key) {
        if (this.preferences.hasOwnProperty(key)) {
            delete this.preferences[key];
            this.save();
        }
        return this;
    },

    clearAll: function() {
        this.preferences = {};
        localStorage.removeItem('userPreferences');
        return this;
    },

    save: function() {
        localStorage.setItem('userPreferences', JSON.stringify(this.preferences));
        return this;
    },

    getAll: function() {
        return {...this.preferences};
    }
};

const userPrefs = Object.create(UserPreferences).init();