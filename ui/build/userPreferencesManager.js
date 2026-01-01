const UserPreferencesManager = {
    storageKey: 'user_preferences',

    getPreferences() {
        try {
            const stored = localStorage.getItem(this.storageKey);
            return stored ? JSON.parse(stored) : {};
        } catch (error) {
            console.error('Failed to retrieve preferences:', error);
            return {};
        }
    },

    setPreference(key, value) {
        const preferences = this.getPreferences();
        preferences[key] = value;
        
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(preferences));
            return true;
        } catch (error) {
            console.error('Failed to save preference:', error);
            return false;
        }
    },

    removePreference(key) {
        const preferences = this.getPreferences();
        delete preferences[key];
        
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(preferences));
            return true;
        } catch (error) {
            console.error('Failed to remove preference:', error);
            return false;
        }
    },

    clearAllPreferences() {
        try {
            localStorage.removeItem(this.storageKey);
            return true;
        } catch (error) {
            console.error('Failed to clear preferences:', error);
            return false;
        }
    },

    hasPreference(key) {
        const preferences = this.getPreferences();
        return key in preferences;
    },

    getAllPreferences() {
        return { ...this.getPreferences() };
    }
};const UserPreferencesManager = (() => {
  const STORAGE_KEY = 'app_user_preferences';
  
  const defaultPreferences = {
    theme: 'light',
    language: 'en',
    notifications: true,
    fontSize: 16,
    autoSave: false,
    lastUpdated: null
  };

  const validatePreference = (key, value) => {
    const validators = {
      theme: (val) => ['light', 'dark', 'auto'].includes(val),
      language: (val) => /^[a-z]{2}$/.test(val),
      notifications: (val) => typeof val === 'boolean',
      fontSize: (val) => Number.isInteger(val) && val >= 12 && val <= 24,
      autoSave: (val) => typeof val === 'boolean',
      lastUpdated: (val) => val === null || val instanceof Date
    };

    return validators[key] ? validators[key](value) : false;
  };

  const getPreferences = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return { ...defaultPreferences };

      const parsed = JSON.parse(stored);
      const merged = { ...defaultPreferences, ...parsed };

      Object.keys(merged).forEach(key => {
        if (!validatePreference(key, merged[key])) {
          merged[key] = defaultPreferences[key];
        }
      });

      return merged;
    } catch (error) {
      console.error('Failed to load preferences:', error);
      return { ...defaultPreferences };
    }
  };

  const updatePreference = (key, value) => {
    if (!validatePreference(key, value)) {
      throw new Error(`Invalid preference value for ${key}`);
    }

    const current = getPreferences();
    const updated = {
      ...current,
      [key]: value,
      lastUpdated: new Date().toISOString()
    };

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    } catch (error) {
      console.error('Failed to save preference:', error);
      throw error;
    }
  };

  const resetPreferences = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      return { ...defaultPreferences };
    } catch (error) {
      console.error('Failed to reset preferences:', error);
      throw error;
    }
  };

  const exportPreferences = () => {
    const prefs = getPreferences();
    return JSON.stringify(prefs, null, 2);
  };

  const importPreferences = (jsonString) => {
    try {
      const imported = JSON.parse(jsonString);
      const validated = {};

      Object.keys(defaultPreferences).forEach(key => {
        if (validatePreference(key, imported[key])) {
          validated[key] = imported[key];
        } else {
          validated[key] = defaultPreferences[key];
        }
      });

      validated.lastUpdated = new Date().toISOString();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(validated));
      return validated;
    } catch (error) {
      console.error('Failed to import preferences:', error);
      throw new Error('Invalid preferences format');
    }
  };

  const subscribe = (callback) => {
    const storageHandler = (event) => {
      if (event.key === STORAGE_KEY) {
        callback(getPreferences());
      }
    };
    window.addEventListener('storage', storageHandler);
    
    return () => window.removeEventListener('storage', storageHandler);
  };

  return {
    getPreferences,
    updatePreference,
    resetPreferences,
    exportPreferences,
    importPreferences,
    subscribe,
    getDefaultPreferences: () => ({ ...defaultPreferences })
  };
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = UserPreferencesManager;
}const UserPreferences = {
  storageKey: 'app_preferences',

  defaultPreferences: {
    theme: 'light',
    language: 'en',
    notifications: true,
    fontSize: 16
  },

  getPreferences() {
    const stored = localStorage.getItem(this.storageKey);
    if (stored) {
      return { ...this.defaultPreferences, ...JSON.parse(stored) };
    }
    return this.defaultPreferences;
  },

  updatePreferences(newPreferences) {
    const current = this.getPreferences();
    const updated = { ...current, ...newPreferences };
    localStorage.setItem(this.storageKey, JSON.stringify(updated));
    this.applyPreferences(updated);
    return updated;
  },

  applyPreferences(prefs) {
    document.documentElement.setAttribute('data-theme', prefs.theme);
    document.documentElement.lang = prefs.language;
    document.documentElement.style.fontSize = `${prefs.fontSize}px`;
    
    if (prefs.notifications) {
      this.enableNotifications();
    } else {
      this.disableNotifications();
    }
  },

  enableNotifications() {
    if ('Notification' in window && Notification.permission === 'granted') {
      console.log('Notifications enabled');
    }
  },

  disableNotifications() {
    console.log('Notifications disabled');
  },

  resetToDefaults() {
    localStorage.removeItem(this.storageKey);
    this.applyPreferences(this.defaultPreferences);
    return this.defaultPreferences;
  }
};

export default UserPreferences;