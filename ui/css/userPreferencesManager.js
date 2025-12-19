const UserPreferences = {
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
    if (typeof key !== 'string') {
      throw new Error('Preference key must be a string');
    }
    this.preferences[key] = value;
    return this.savePreferences();
  },

  getPreference(key, defaultValue = null) {
    return key in this.preferences ? this.preferences[key] : defaultValue;
  },

  removePreference(key) {
    if (key in this.preferences) {
      delete this.preferences[key];
      return this.savePreferences();
    }
    return false;
  },

  clearAllPreferences() {
    this.preferences = {};
    localStorage.removeItem('userPreferences');
    return true;
  },

  getAllPreferences() {
    return { ...this.preferences };
  }
};

export default UserPreferences.init();