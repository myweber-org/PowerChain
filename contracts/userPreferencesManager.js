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

export default UserPreferencesManager;