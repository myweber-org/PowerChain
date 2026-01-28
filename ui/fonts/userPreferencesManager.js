class UserPreferencesManager {
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
    return key in this.preferences ? this.preferences[key] : defaultValue;
  }

  removePreference(key) {
    const existed = key in this.preferences;
    if (existed) {
      delete this.preferences[key];
      this.savePreferences();
    }
    return existed;
  }

  clearAllPreferences() {
    this.preferences = {};
    localStorage.removeItem(this.storageKey);
  }

  getAllPreferences() {
    return { ...this.preferences };
  }

  hasPreference(key) {
    return key in this.preferences;
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

  const savePreferences = (preferences) => {
    try {
      const updatedPreferences = {
        ...preferences,
        lastUpdated: new Date().toISOString()
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPreferences));
      return true;
    } catch (error) {
      console.error('Error saving preferences:', error);
      return false;
    }
  };

  const updatePreference = (key, value) => {
    const current = getPreferences();
    const updated = { ...current, [key]: value };
    return savePreferences(updated);
  };

  const resetToDefaults = () => {
    return savePreferences(defaultPreferences);
  };

  const exportPreferences = () => {
    const prefs = getPreferences();
    const dataStr = JSON.stringify(prefs, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `user-preferences-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const importPreferences = (jsonString) => {
    try {
      const imported = JSON.parse(jsonString);
      const validKeys = Object.keys(defaultPreferences);
      const filtered = {};
      
      validKeys.forEach(key => {
        if (key in imported) {
          filtered[key] = imported[key];
        }
      });
      
      return savePreferences(filtered);
    } catch (error) {
      console.error('Error importing preferences:', error);
      return false;
    }
  };

  const getPreference = (key) => {
    const prefs = getPreferences();
    return prefs[key] !== undefined ? prefs[key] : defaultPreferences[key];
  };

  const subscribe = (callback) => {
    const handleStorageChange = (event) => {
      if (event.key === STORAGE_KEY) {
        callback(getPreferences());
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  };

  return {
    getPreferences,
    savePreferences,
    updatePreference,
    resetToDefaults,
    exportPreferences,
    importPreferences,
    getPreference,
    subscribe
  };
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = UserPreferencesManager;
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
}