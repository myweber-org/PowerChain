class UserPreferencesManager {
  constructor() {
    this.preferences = this.loadPreferences();
    this.defaults = {
      theme: 'light',
      language: 'en',
      notifications: true,
      fontSize: 16,
      autoSave: false
    };
  }

  loadPreferences() {
    try {
      const stored = localStorage.getItem('userPreferences');
      return stored ? JSON.parse(stored) : {};
    } catch (error) {
      console.warn('Failed to load preferences:', error);
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
    return this.preferences[key] !== undefined 
      ? this.preferences[key] 
      : this.defaults[key];
  }

  setPreference(key, value) {
    if (this.defaults[key] === undefined) {
      throw new Error(`Invalid preference key: ${key}`);
    }

    const oldValue = this.getPreference(key);
    this.preferences[key] = value;
    
    if (this.savePreferences()) {
      this.dispatchPreferenceChange(key, value, oldValue);
      return true;
    }
    
    return false;
  }

  resetPreference(key) {
    if (this.defaults[key] === undefined) {
      throw new Error(`Invalid preference key: ${key}`);
    }

    const oldValue = this.getPreference(key);
    delete this.preferences[key];
    
    if (this.savePreferences()) {
      this.dispatchPreferenceChange(key, this.defaults[key], oldValue);
      return true;
    }
    
    return false;
  }

  resetAllPreferences() {
    const oldPreferences = { ...this.preferences };
    this.preferences = {};
    
    if (this.savePreferences()) {
      Object.keys(this.defaults).forEach(key => {
        this.dispatchPreferenceChange(key, this.defaults[key], oldPreferences[key]);
      });
      return true;
    }
    
    return false;
  }

  getAllPreferences() {
    return Object.keys(this.defaults).reduce((acc, key) => {
      acc[key] = this.getPreference(key);
      return acc;
    }, {});
  }

  dispatchPreferenceChange(key, newValue, oldValue) {
    const event = new CustomEvent('preferencechange', {
      detail: { key, newValue, oldValue }
    });
    window.dispatchEvent(event);
  }
}

const preferenceManager = new UserPreferencesManager();

window.addEventListener('preferencechange', (event) => {
  console.log(`Preference changed: ${event.detail.key}`, {
    from: event.detail.oldValue,
    to: event.detail.newValue
  });
});

export default preferenceManager;class UserPreferencesManager {
  constructor() {
    this.prefs = this.loadPreferences();
  }

  loadPreferences() {
    const saved = localStorage.getItem('userPreferences');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.warn('Failed to parse saved preferences:', e);
      }
    }
    return this.getDefaultPreferences();
  }

  getDefaultPreferences() {
    return {
      theme: 'light',
      fontSize: 16,
      notifications: true,
      language: 'en',
      autoSave: true,
      sidebarCollapsed: false
    };
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

  getAllPreferences() {
    return { ...this.prefs };
  }

  resetToDefaults() {
    this.prefs = this.getDefaultPreferences();
    this.savePreferences();
  }

  savePreferences() {
    try {
      localStorage.setItem('userPreferences', JSON.stringify(this.prefs));
      return true;
    } catch (e) {
      console.error('Failed to save preferences:', e);
      return false;
    }
  }

  exportPreferences() {
    const dataStr = JSON.stringify(this.prefs, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    return dataUri;
  }

  importPreferences(jsonString) {
    try {
      const imported = JSON.parse(jsonString);
      const defaults = this.getDefaultPreferences();
      
      for (const key in defaults) {
        if (key in imported) {
          this.prefs[key] = imported[key];
        }
      }
      
      this.savePreferences();
      return true;
    } catch (e) {
      console.error('Failed to import preferences:', e);
      return false;
    }
  }
}

const userPrefs = new UserPreferencesManager();const UserPreferencesManager = (function() {
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
        get: getPreference,
        set: setPreference,
        remove: removePreference,
        clear: clearAllPreferences,
        getAll: getAllPreferences
    };
})();const userPreferencesManager = (function() {
    const PREFERENCES_KEY = 'app_preferences';
    
    function getPreferences() {
        const stored = localStorage.getItem(PREFERENCES_KEY);
        return stored ? JSON.parse(stored) : {};
    }
    
    function setPreference(key, value) {
        const preferences = getPreferences();
        preferences[key] = value;
        localStorage.setItem(PREFERENCES_KEY, JSON.stringify(preferences));
        return preferences;
    }
    
    function removePreference(key) {
        const preferences = getPreferences();
        delete preferences[key];
        localStorage.setItem(PREFERENCES_KEY, JSON.stringify(preferences));
        return preferences;
    }
    
    function clearPreferences() {
        localStorage.removeItem(PREFERENCES_KEY);
        return {};
    }
    
    function hasPreference(key) {
        const preferences = getPreferences();
        return key in preferences;
    }
    
    function getAllKeys() {
        const preferences = getPreferences();
        return Object.keys(preferences);
    }
    
    function getPreference(key, defaultValue = null) {
        const preferences = getPreferences();
        return preferences[key] !== undefined ? preferences[key] : defaultValue;
    }
    
    return {
        get: getPreference,
        set: setPreference,
        remove: removePreference,
        clear: clearPreferences,
        has: hasPreference,
        keys: getAllKeys,
        getAll: getPreferences
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
        return preferences;
    }
    
    function removePreference(key) {
        const preferences = getPreferences();
        delete preferences[key];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
        return preferences;
    }
    
    function clearAllPreferences() {
        localStorage.removeItem(STORAGE_KEY);
        return {};
    }
    
    function hasPreference(key) {
        const preferences = getPreferences();
        return key in preferences;
    }
    
    function getAllPreferences() {
        return getPreferences();
    }
    
    return {
        get: getPreferences,
        set: setPreference,
        remove: removePreference,
        clear: clearAllPreferences,
        has: hasPreference,
        all: getAllPreferences
    };
})();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = UserPreferencesManager;
}