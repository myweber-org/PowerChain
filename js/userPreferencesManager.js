class UserPreferencesManager {
  constructor() {
    this.prefs = this.loadPreferences();
  }

  loadPreferences() {
    const saved = localStorage.getItem('userPreferences');
    return saved ? JSON.parse(saved) : this.getDefaultPreferences();
  }

  getDefaultPreferences() {
    return {
      theme: 'light',
      language: 'en',
      notifications: true,
      fontSize: 16,
      autoSave: false,
      lastUpdated: new Date().toISOString()
    };
  }

  updatePreference(key, value) {
    if (key in this.prefs) {
      this.prefs[key] = value;
      this.prefs.lastUpdated = new Date().toISOString();
      this.savePreferences();
      return true;
    }
    return false;
  }

  savePreferences() {
    try {
      localStorage.setItem('userPreferences', JSON.stringify(this.prefs));
      return true;
    } catch (error) {
      console.error('Failed to save preferences:', error);
      return false;
    }
  }

  resetToDefaults() {
    this.prefs = this.getDefaultPreferences();
    this.savePreferences();
  }

  getAllPreferences() {
    return { ...this.prefs };
  }

  exportPreferences() {
    return JSON.stringify(this.prefs, null, 2);
  }

  importPreferences(jsonString) {
    try {
      const imported = JSON.parse(jsonString);
      this.prefs = { ...this.prefs, ...imported };
      this.prefs.lastUpdated = new Date().toISOString();
      this.savePreferences();
      return true;
    } catch (error) {
      console.error('Invalid preferences format:', error);
      return false;
    }
  }
}

export default UserPreferencesManager;