const USER_PREFERENCES_KEY = 'app_preferences';

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
      autoSave: true,
      lastUpdated: new Date().toISOString()
    };
  }

  updatePreference(key, value) {
    if (!this.preferences.hasOwnProperty(key)) {
      throw new Error(`Invalid preference key: ${key}`);
    }

    const oldValue = this.preferences[key];
    this.preferences[key] = value;
    this.preferences.lastUpdated = new Date().toISOString();
    
    this.savePreferences();
    
    return { key, oldValue, newValue: value };
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
    return this.preferences;
  }

  getAllPreferences() {
    return { ...this.preferences };
  }

  getPreference(key) {
    return this.preferences[key];
  }

  exportPreferences() {
    return JSON.stringify(this.preferences, null, 2);
  }

  importPreferences(jsonString) {
    try {
      const imported = JSON.parse(jsonString);
      const defaultPrefs = this.getDefaultPreferences();
      
      for (const key in defaultPrefs) {
        if (imported.hasOwnProperty(key)) {
          this.preferences[key] = imported[key];
        }
      }
      
      this.preferences.lastUpdated = new Date().toISOString();
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
  
  const setPreference = (key, value) => {
    try {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(`${PREFIX}${key}`, serializedValue);
      return true;
    } catch (error) {
      console.error('Failed to save preference:', error);
      return false;
    }
  };

  const getPreference = (key, defaultValue = null) => {
    try {
      const item = localStorage.getItem(`${PREFIX}${key}`);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error('Failed to retrieve preference:', error);
      return defaultValue;
    }
  };

  const removePreference = (key) => {
    try {
      localStorage.removeItem(`${PREFIX}${key}`);
      return true;
    } catch (error) {
      console.error('Failed to remove preference:', error);
      return false;
    }
  };

  const clearAllPreferences = () => {
    try {
      Object.keys(localStorage)
        .filter(key => key.startsWith(PREFIX))
        .forEach(key => localStorage.removeItem(key));
      return true;
    } catch (error) {
      console.error('Failed to clear preferences:', error);
      return false;
    }
  };

  const getAllPreferences = () => {
    const preferences = {};
    try {
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith(PREFIX)) {
          const preferenceKey = key.replace(PREFIX, '');
          preferences[preferenceKey] = getPreference(preferenceKey);
        }
      });
    } catch (error) {
      console.error('Failed to get all preferences:', error);
    }
    return preferences;
  };

  return {
    set: setPreference,
    get: getPreference,
    remove: removePreference,
    clear: clearAllPreferences,
    getAll: getAllPreferences
  };
})();

export default UserPreferencesManager;