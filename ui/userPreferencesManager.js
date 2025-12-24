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
export default UserPreferences;const UserPreferences = {
  storageKey: 'app_preferences',

  defaults: {
    theme: 'light',
    fontSize: 16,
    notifications: true,
    language: 'en'
  },

  load() {
    try {
      const stored = localStorage.getItem(this.storageKey);
      return stored ? JSON.parse(stored) : { ...this.defaults };
    } catch (error) {
      console.error('Failed to load preferences:', error);
      return { ...this.defaults };
    }
  },

  save(preferences) {
    try {
      const merged = { ...this.defaults, ...preferences };
      localStorage.setItem(this.storageKey, JSON.stringify(merged));
      return true;
    } catch (error) {
      console.error('Failed to save preferences:', error);
      return false;
    }
  },

  update(key, value) {
    const current = this.load();
    current[key] = value;
    return this.save(current);
  },

  reset() {
    return this.save(this.defaults);
  },

  getAll() {
    return this.load();
  },

  get(key) {
    const prefs = this.load();
    return prefs[key] !== undefined ? prefs[key] : this.defaults[key];
  }
};

export default UserPreferences;