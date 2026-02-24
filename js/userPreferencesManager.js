const UserPreferencesManager = {
  preferences: {},

  init() {
    this.loadPreferences();
    this.setupAutoSave();
  },

  loadPreferences() {
    try {
      const saved = localStorage.getItem('userPreferences');
      if (saved) {
        this.preferences = JSON.parse(saved);
        this.applyPreferences();
      }
    } catch (error) {
      console.error('Failed to load preferences:', error);
      this.preferences = this.getDefaultPreferences();
    }
  },

  savePreferences() {
    try {
      localStorage.setItem('userPreferences', JSON.stringify(this.preferences));
      this.dispatchEvent('preferencesSaved', this.preferences);
    } catch (error) {
      console.error('Failed to save preferences:', error);
    }
  },

  getDefaultPreferences() {
    return {
      theme: 'light',
      fontSize: 16,
      notifications: true,
      language: 'en',
      autoSave: true
    };
  },

  updatePreference(key, value) {
    if (key in this.preferences) {
      this.preferences[key] = value;
      this.savePreferences();
      this.applyPreference(key, value);
      return true;
    }
    return false;
  },

  applyPreferences() {
    Object.entries(this.preferences).forEach(([key, value]) => {
      this.applyPreference(key, value);
    });
  },

  applyPreference(key, value) {
    switch (key) {
      case 'theme':
        document.documentElement.setAttribute('data-theme', value);
        break;
      case 'fontSize':
        document.documentElement.style.fontSize = `${value}px`;
        break;
      case 'notifications':
        this.toggleNotifications(value);
        break;
    }
  },

  toggleNotifications(enabled) {
    if (enabled && 'Notification' in window) {
      if (Notification.permission === 'granted') {
        console.log('Notifications enabled');
      } else if (Notification.permission !== 'denied') {
        Notification.requestPermission();
      }
    }
  },

  setupAutoSave() {
    if (this.preferences.autoSave) {
      window.addEventListener('beforeunload', () => this.savePreferences());
    }
  },

  resetToDefaults() {
    this.preferences = this.getDefaultPreferences();
    this.savePreferences();
    this.applyPreferences();
  },

  addEventListener(event, callback) {
    window.addEventListener(`preferences:${event}`, callback);
  },

  dispatchEvent(event, data) {
    window.dispatchEvent(new CustomEvent(`preferences:${event}`, { detail: data }));
  },

  exportPreferences() {
    const dataStr = JSON.stringify(this.preferences, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = 'user-preferences.json';
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  },

  importPreferences(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const imported = JSON.parse(e.target.result);
        this.preferences = { ...this.preferences, ...imported };
        this.savePreferences();
        this.applyPreferences();
        this.dispatchEvent('preferencesImported', this.preferences);
      } catch (error) {
        console.error('Failed to import preferences:', error);
        this.dispatchEvent('importError', error);
      }
    };
    reader.readAsText(file);
  }
};

Object.freeze(UserPreferencesManager);