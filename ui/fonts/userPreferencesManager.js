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

export default UserPreferencesManager;