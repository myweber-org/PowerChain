const UserPreferences = {
  preferences: {},

  init() {
    const stored = localStorage.getItem('userPreferences');
    if (stored) {
      try {
        this.preferences = JSON.parse(stored);
      } catch (e) {
        this.preferences = {};
      }
    }
  },

  setPreference(key, value) {
    this.preferences[key] = value;
    this.save();
  },

  getPreference(key, defaultValue = null) {
    return this.preferences[key] !== undefined ? this.preferences[key] : defaultValue;
  },

  removePreference(key) {
    delete this.preferences[key];
    this.save();
  },

  clearAll() {
    this.preferences = {};
    localStorage.removeItem('userPreferences');
  },

  save() {
    localStorage.setItem('userPreferences', JSON.stringify(this.preferences));
  },

  getAllPreferences() {
    return { ...this.preferences };
  }
};

UserPreferences.init();