const UserPreferences = {
  preferences: {
    theme: 'light',
    language: 'en',
    notifications: true,
    fontSize: 16
  },

  init() {
    const saved = this.loadFromStorage();
    if (saved) {
      this.preferences = { ...this.preferences, ...saved };
    }
    this.applyPreferences();
  },

  loadFromStorage() {
    try {
      const stored = localStorage.getItem('userPreferences');
      return stored ? JSON.parse(stored) : null;
    } catch (error) {
      console.warn('Failed to load preferences from localStorage:', error);
      return null;
    }
  },

  saveToStorage() {
    try {
      localStorage.setItem('userPreferences', JSON.stringify(this.preferences));
      return true;
    } catch (error) {
      console.warn('Failed to save preferences to localStorage:', error);
      return false;
    }
  },

  updatePreference(key, value) {
    if (key in this.preferences) {
      this.preferences[key] = value;
      this.applyPreference(key, value);
      this.saveToStorage();
      return true;
    }
    return false;
  },

  applyPreferences() {
    Object.entries(this.preferences).forEach(([key, value]) => {
      this.applyPreference(key, value);
    });
  },

  applyPreference(key, value) {
    switch (key) {
      case 'theme':
        document.documentElement.setAttribute('data-theme', value);
        break;
      case 'fontSize':
        document.documentElement.style.fontSize = `${value}px`;
        break;
      case 'notifications':
        if (value && 'Notification' in window) {
          Notification.requestPermission();
        }
        break;
    }
  },

  resetToDefaults() {
    const defaults = {
      theme: 'light',
      language: 'en',
      notifications: true,
      fontSize: 16
    };
    this.preferences = defaults;
    this.applyPreferences();
    this.saveToStorage();
  },

  exportPreferences() {
    return JSON.stringify(this.preferences, null, 2);
  },

  importPreferences(jsonString) {
    try {
      const imported = JSON.parse(jsonString);
      this.preferences = { ...this.preferences, ...imported };
      this.applyPreferences();
      this.saveToStorage();
      return true;
    } catch (error) {
      console.error('Invalid preferences format:', error);
      return false;
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  UserPreferences.init();
});

if (typeof module !== 'undefined' && module.exports) {
  module.exports = UserPreferences;
}class UserPreferencesManager {
    constructor() {
        this.preferences = this.loadPreferences();
        this.defaults = {
            theme: 'light',
            fontSize: 16,
            notifications: true,
            language: 'en',
            autoSave: true
        };
    }

    loadPreferences() {
        try {
            const stored = localStorage.getItem('userPreferences');
            return stored ? JSON.parse(stored) : {};
        } catch (error) {
            console.error('Failed to load preferences:', error);
            return {};
        }
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

    getPreference(key) {
        return this.preferences.hasOwnProperty(key) ? this.preferences[key] : this.defaults[key];
    }

    setPreference(key, value) {
        if (this.defaults.hasOwnProperty(key)) {
            this.preferences[key] = value;
            return this.savePreferences();
        }
        return false;
    }

    resetPreference(key) {
        if (this.defaults.hasOwnProperty(key)) {
            delete this.preferences[key];
            return this.savePreferences();
        }
        return false;
    }

    resetAllPreferences() {
        this.preferences = {};
        return this.savePreferences();
    }

    getAllPreferences() {
        return {
            ...this.defaults,
            ...this.preferences
        };
    }

    hasCustomPreference(key) {
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

  const getPreferences = () => {
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

  const savePreferences = (updates) => {
    try {
      const current = getPreferences();
      const newPreferences = { ...current };
      
      Object.keys(updates).forEach(key => {
        if (key in defaultPreferences && validatePreference(key, updates[key])) {
          newPreferences[key] = updates[key];
        }
      });
      
      newPreferences.lastUpdated = new Date().toISOString();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newPreferences));
      
      return { success: true, preferences: newPreferences };
    } catch (error) {
      console.error('Failed to save preferences:', error);
      return { success: false, error: error.message };
    }
  };

  const resetPreferences = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      return { success: true, preferences: { ...defaultPreferences } };
    } catch (error) {
      console.error('Failed to reset preferences:', error);
      return { success: false, error: error.message };
    }
  };

  const exportPreferences = () => {
    const prefs = getPreferences();
    return JSON.stringify(prefs, null, 2);
  };

  const importPreferences = (jsonString) => {
    try {
      const imported = JSON.parse(jsonString);
      return savePreferences(imported);
    } catch (error) {
      return { success: false, error: 'Invalid JSON format' };
    }
  };

  const subscribe = (callback) => {
    const storageHandler = (event) => {
      if (event.key === STORAGE_KEY || event.key === null) {
        callback(getPreferences());
      }
    };
    
    window.addEventListener('storage', storageHandler);
    
    return () => window.removeEventListener('storage', storageHandler);
  };

  return {
    get: getPreferences,
    set: savePreferences,
    reset: resetPreferences,
    export: exportPreferences,
    import: importPreferences,
    subscribe,
    getDefaults: () => ({ ...defaultPreferences })
  };
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = UserPreferencesManager;
}const userPreferences = {
  theme: 'light',
  language: 'en',
  notifications: true,
  fontSize: 16
};

const PREFERENCES_KEY = 'app_preferences';

function savePreferences(prefs) {
  try {
    localStorage.setItem(PREFERENCES_KEY, JSON.stringify(prefs));
    return true;
  } catch (error) {
    console.error('Failed to save preferences:', error);
    return false;
  }
}

function loadPreferences() {
  try {
    const stored = localStorage.getItem(PREFERENCES_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Failed to load preferences:', error);
  }
  return { ...userPreferences };
}

function updatePreference(key, value) {
  if (key in userPreferences) {
    const prefs = loadPreferences();
    prefs[key] = value;
    return savePreferences(prefs);
  }
  return false;
}

function resetPreferences() {
  localStorage.removeItem(PREFERENCES_KEY);
  return { ...userPreferences };
}

function getCurrentPreferences() {
  return loadPreferences();
}

export {
  savePreferences,
  loadPreferences,
  updatePreference,
  resetPreferences,
  getCurrentPreferences
};