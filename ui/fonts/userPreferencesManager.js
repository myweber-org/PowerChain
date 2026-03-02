class UserPreferencesManager {
  constructor() {
    this.prefs = this.loadPreferences();
  }

  loadPreferences() {
    const saved = localStorage.getItem('userPreferences');
    return saved ? JSON.parse(saved) : {
      theme: 'light',
      language: 'en',
      notifications: true,
      fontSize: 16
    };
  }

  savePreferences() {
    localStorage.setItem('userPreferences', JSON.stringify(this.prefs));
  }

  setPreference(key, value) {
    if (this.prefs.hasOwnProperty(key)) {
      this.prefs[key] = value;
      this.savePreferences();
      return true;
    }
    return false;
  }

  getPreference(key) {
    return this.prefs[key];
  }

  getAllPreferences() {
    return { ...this.prefs };
  }

  resetToDefaults() {
    this.prefs = {
      theme: 'light',
      language: 'en',
      notifications: true,
      fontSize: 16
    };
    this.savePreferences();
  }
}

const preferencesManager = new UserPreferencesManager();