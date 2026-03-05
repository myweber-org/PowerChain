class UserPreferencesManager {
  constructor() {
    this.preferences = this.loadPreferences();
  }

  loadPreferences() {
    const stored = localStorage.getItem('userPreferences');
    return stored ? JSON.parse(stored) : {
      theme: 'light',
      notifications: true,
      language: 'en',
      fontSize: 16,
      autoSave: false
    };
  }

  savePreferences() {
    localStorage.setItem('userPreferences', JSON.stringify(this.preferences));
  }

  updatePreference(key, value) {
    if (this.preferences.hasOwnProperty(key)) {
      this.preferences[key] = value;
      this.savePreferences();
      return true;
    }
    return false;
  }

  getPreference(key) {
    return this.preferences[key];
  }

  resetToDefaults() {
    this.preferences = {
      theme: 'light',
      notifications: true,
      language: 'en',
      fontSize: 16,
      autoSave: false
    };
    this.savePreferences();
  }

  exportPreferences() {
    const dataStr = JSON.stringify(this.preferences);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = 'user-preferences.json';
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  }

  importPreferences(file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target.result);
        this.preferences = { ...this.preferences, ...imported };
        this.savePreferences();
      } catch (error) {
        console.error('Invalid preferences file:', error);
      }
    };
    reader.readAsText(file);
  }
}

const preferencesManager = new UserPreferencesManager();