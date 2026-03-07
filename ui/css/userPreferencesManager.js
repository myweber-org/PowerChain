class UserPreferencesManager {
  constructor() {
    this.preferences = this.loadPreferences();
  }

  loadPreferences() {
    try {
      const stored = localStorage.getItem('userPreferences');
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
      showTutorial: false
    };
  }

  updatePreference(key, value) {
    if (this.preferences.hasOwnProperty(key)) {
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

export default UserPreferencesManager;const UserPreferences = {
  preferences: {},

  init() {
    this.loadPreferences();
    return this;
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
      return true;
    } catch (error) {
      console.error('Failed to save preferences:', error);
      return false;
    }
  },

  setPreference(key, value) {
    if (typeof key !== 'string' || key.trim() === '') {
      throw new Error('Preference key must be a non-empty string');
    }
    
    this.preferences[key] = value;
    return this.savePreferences();
  },

  getPreference(key, defaultValue = null) {
    return this.preferences.hasOwnProperty(key) ? this.preferences[key] : defaultValue;
  },

  removePreference(key) {
    if (this.preferences.hasOwnProperty(key)) {
      delete this.preferences[key];
      return this.savePreferences();
    }
    return false;
  },

  clearAllPreferences() {
    this.preferences = {};
    return this.savePreferences();
  },

  getAllPreferences() {
    return { ...this.preferences };
  },

  hasPreference(key) {
    return this.preferences.hasOwnProperty(key);
  }
};

export default UserPreferences.init();