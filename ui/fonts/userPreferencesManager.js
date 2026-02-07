const UserPreferencesManager = (() => {
  const PREFIX = 'app_pref_';
  const DEFAULT_PREFERENCES = {
    theme: 'light',
    fontSize: 16,
    notifications: true,
    language: 'en',
    autoSave: false,
    sidebarCollapsed: false
  };

  const validateKey = (key) => {
    if (!Object.keys(DEFAULT_PREFERENCES).includes(key)) {
      throw new Error(`Invalid preference key: ${key}`);
    }
  };

  const getStorageKey = (key) => `${PREFIX}${key}`;

  return {
    setPreference(key, value) {
      validateKey(key);
      const storageKey = getStorageKey(key);
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(storageKey, serializedValue);
      return this;
    },

    getPreference(key) {
      validateKey(key);
      const storageKey = getStorageKey(key);
      const storedValue = localStorage.getItem(storageKey);
      
      if (storedValue === null) {
        return DEFAULT_PREFERENCES[key];
      }
      
      try {
        return JSON.parse(storedValue);
      } catch {
        localStorage.removeItem(storageKey);
        return DEFAULT_PREFERENCES[key];
      }
    },

    getAllPreferences() {
      return Object.keys(DEFAULT_PREFERENCES).reduce((prefs, key) => {
        prefs[key] = this.getPreference(key);
        return prefs;
      }, {});
    },

    resetPreference(key) {
      validateKey(key);
      const storageKey = getStorageKey(key);
      localStorage.removeItem(storageKey);
      return this;
    },

    resetAllPreferences() {
      Object.keys(DEFAULT_PREFERENCES).forEach(key => {
        this.resetPreference(key);
      });
      return this;
    },

    exportPreferences() {
      const prefs = this.getAllPreferences();
      return JSON.stringify(prefs, null, 2);
    },

    importPreferences(jsonString) {
      try {
        const importedPrefs = JSON.parse(jsonString);
        Object.keys(importedPrefs).forEach(key => {
          if (Object.keys(DEFAULT_PREFERENCES).includes(key)) {
            this.setPreference(key, importedPrefs[key]);
          }
        });
        return true;
      } catch {
        return false;
      }
    },

    hasUnsavedChanges() {
      return Object.keys(DEFAULT_PREFERENCES).some(key => {
        const currentValue = this.getPreference(key);
        return currentValue !== DEFAULT_PREFERENCES[key];
      });
    }
  };
})();

export default UserPreferencesManager;