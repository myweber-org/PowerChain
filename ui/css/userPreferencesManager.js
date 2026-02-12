const UserPreferencesManager = (() => {
  const STORAGE_KEY = 'app_user_preferences';
  
  const defaultPreferences = {
    theme: 'light',
    fontSize: 16,
    notifications: true,
    language: 'en',
    autoSave: true,
    sidebarCollapsed: false
  };

  const validatePreference = (key, value) => {
    const validators = {
      theme: (val) => ['light', 'dark', 'auto'].includes(val),
      fontSize: (val) => Number.isInteger(val) && val >= 12 && val <= 24,
      notifications: (val) => typeof val === 'boolean',
      language: (val) => ['en', 'es', 'fr', 'de'].includes(val),
      autoSave: (val) => typeof val === 'boolean',
      sidebarCollapsed: (val) => typeof val === 'boolean'
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

  const getPreference = (key) => {
    const preferences = loadPreferences();
    return preferences[key] !== undefined ? preferences[key] : null;
  };

  const setPreference = (key, value) => {
    if (!validatePreference(key, value)) {
      throw new Error(`Invalid value for preference "${key}"`);
    }
    
    const preferences = loadPreferences();
    preferences[key] = value;
    return savePreferences(preferences);
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
    set: setPreference,
    getAll: getAllPreferences,
    reset: resetToDefaults,
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
    lastUpdated: null
  };

  const validatePreference = (key, value) => {
    const validators = {
      theme: (val) => ['light', 'dark', 'auto'].includes(val),
      language: (val) => /^[a-z]{2}$/.test(val),
      notifications: (val) => typeof val === 'boolean',
      fontSize: (val) => Number.isInteger(val) && val >= 12 && val <= 24,
      autoSave: (val) => typeof val === 'boolean'
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

  const updatePreference = (key, value) => {
    if (!validatePreference(key, value)) {
      throw new Error(`Invalid preference value for ${key}`);
    }
    
    const current = loadPreferences();
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
    get: loadPreferences,
    set: savePreferences,
    update: updatePreference,
    reset: resetToDefaults,
    export: exportPreferences,
    import: importPreferences,
    validate: validatePreference
  };
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = UserPreferencesManager;
}class UserPreferencesManager {
  constructor(storageKey = 'user_preferences') {
    this.storageKey = storageKey;
    this.preferences = this.loadPreferences();
  }

  loadPreferences() {
    try {
      const stored = localStorage.getItem(this.storageKey);
      return stored ? JSON.parse(stored) : {};
    } catch (error) {
      console.error('Failed to load preferences:', error);
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
    return key in this.preferences ? this.preferences[key] : defaultValue;
  }

  removePreference(key) {
    if (key in this.preferences) {
      delete this.preferences[key];
      return this.savePreferences();
    }
    return false;
  }

  clearAllPreferences() {
    this.preferences = {};
    return this.savePreferences();
  }

  getAllPreferences() {
    return { ...this.preferences };
  }

  hasPreference(key) {
    return key in this.preferences;
  }
}

export default UserPreferencesManager;