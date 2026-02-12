const UserPreferences = {
  preferences: {
    theme: 'light',
    language: 'en',
    notifications: true,
    fontSize: 16
  },

  init() {
    const saved = this.loadFromStorage();
    if (saved) {
      this.preferences = { ...this.preferences, ...saved };
    }
    this.applyPreferences();
  },

  loadFromStorage() {
    try {
      const stored = localStorage.getItem('userPreferences');
      return stored ? JSON.parse(stored) : null;
    } catch (error) {
      console.warn('Failed to load preferences from localStorage:', error);
      return null;
    }
  },

  saveToStorage() {
    try {
      localStorage.setItem('userPreferences', JSON.stringify(this.preferences));
      return true;
    } catch (error) {
      console.warn('Failed to save preferences to localStorage:', error);
      return false;
    }
  },

  updatePreference(key, value) {
    if (key in this.preferences) {
      this.preferences[key] = value;
      this.applyPreference(key, value);
      this.saveToStorage();
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
        if (value && 'Notification' in window) {
          Notification.requestPermission();
        }
        break;
    }
  },

  resetToDefaults() {
    const defaults = {
      theme: 'light',
      language: 'en',
      notifications: true,
      fontSize: 16
    };
    this.preferences = defaults;
    this.applyPreferences();
    this.saveToStorage();
  },

  exportPreferences() {
    return JSON.stringify(this.preferences, null, 2);
  },

  importPreferences(jsonString) {
    try {
      const imported = JSON.parse(jsonString);
      this.preferences = { ...this.preferences, ...imported };
      this.applyPreferences();
      this.saveToStorage();
      return true;
    } catch (error) {
      console.error('Invalid preferences format:', error);
      return false;
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  UserPreferences.init();
});

if (typeof module !== 'undefined' && module.exports) {
  module.exports = UserPreferences;
}class UserPreferencesManager {
    constructor() {
        this.preferences = this.loadPreferences();
        this.defaults = {
            theme: 'light',
            fontSize: 16,
            notifications: true,
            language: 'en',
            autoSave: true
        };
    }

    loadPreferences() {
        try {
            const stored = localStorage.getItem('userPreferences');
            return stored ? JSON.parse(stored) : {};
        } catch (error) {
            console.error('Failed to load preferences:', error);
            return {};
        }
    }

    savePreferences() {
        try {
            localStorage.setItem('userPreferences', JSON.stringify(this.preferences));
            return true;
        } catch (error) {
            console.error('Failed to save preferences:', error);
            return false;
        }
    }

    getPreference(key) {
        return this.preferences.hasOwnProperty(key) ? this.preferences[key] : this.defaults[key];
    }

    setPreference(key, value) {
        if (this.defaults.hasOwnProperty(key)) {
            this.preferences[key] = value;
            return this.savePreferences();
        }
        return false;
    }

    resetPreference(key) {
        if (this.defaults.hasOwnProperty(key)) {
            delete this.preferences[key];
            return this.savePreferences();
        }
        return false;
    }

    resetAllPreferences() {
        this.preferences = {};
        return this.savePreferences();
    }

    getAllPreferences() {
        return {
            ...this.defaults,
            ...this.preferences
        };
    }

    hasCustomPreference(key) {
        return this.preferences.hasOwnProperty(key);
    }
}

export default UserPreferencesManager;