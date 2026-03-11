const USER_PREFERENCES_KEY = 'app_user_preferences';

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
      fontSize: 14,
      autoSave: false
    };
  }

  updatePreference(key, value) {
    if (!this.preferences.hasOwnProperty(key)) {
      throw new Error(`Invalid preference key: ${key}`);
    }
    
    this.preferences[key] = value;
    this.savePreferences();
    return this.preferences;
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

  clearPreferences() {
    localStorage.removeItem(USER_PREFERENCES_KEY);
    this.preferences = this.getDefaultPreferences();
  }
}

export default UserPreferencesManager;