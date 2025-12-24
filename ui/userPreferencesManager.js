const UserPreferences = {
  preferences: {},

  init() {
    try {
      const stored = localStorage.getItem('userPreferences');
      this.preferences = stored ? JSON.parse(stored) : {};
    } catch (error) {
      console.warn('Failed to load preferences from localStorage:', error);
      this.preferences = {};
    }
  },

  set(key, value) {
    this.preferences[key] = value;
    this.persist();
  },

  get(key, defaultValue = null) {
    return this.preferences.hasOwnProperty(key) ? this.preferences[key] : defaultValue;
  },

  remove(key) {
    delete this.preferences[key];
    this.persist();
  },

  clear() {
    this.preferences = {};
    this.persist();
  },

  getAll() {
    return { ...this.preferences };
  },

  persist() {
    try {
      localStorage.setItem('userPreferences', JSON.stringify(this.preferences));
    } catch (error) {
      console.warn('Failed to save preferences to localStorage:', error);
    }
  }
};

UserPreferences.init();
export default UserPreferences;