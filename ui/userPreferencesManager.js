const userPreferencesManager = (() => {
  const PREFERENCES_KEY = 'app_preferences';
  const defaultPreferences = {
    theme: 'light',
    language: 'en',
    notifications: true,
    fontSize: 16
  };

  const getPreferences = () => {
    try {
      const stored = localStorage.getItem(PREFERENCES_KEY);
      return stored ? JSON.parse(stored) : { ...defaultPreferences };
    } catch (error) {
      console.error('Error reading preferences:', error);
      return { ...defaultPreferences };
    }
  };

  const updatePreferences = (updates) => {
    try {
      const current = getPreferences();
      const updated = { ...current, ...updates };
      localStorage.setItem(PREFERENCES_KEY, JSON.stringify(updated));
      return updated;
    } catch (error) {
      console.error('Error updating preferences:', error);
      return getPreferences();
    }
  };

  const resetPreferences = () => {
    localStorage.removeItem(PREFERENCES_KEY);
    return { ...defaultPreferences };
  };

  const exportPreferences = () => {
    const prefs = getPreferences();
    return JSON.stringify(prefs, null, 2);
  };

  const importPreferences = (jsonString) => {
    try {
      const imported = JSON.parse(jsonString);
      return updatePreferences(imported);
    } catch (error) {
      console.error('Error importing preferences:', error);
      return getPreferences();
    }
  };

  return {
    get: getPreferences,
    update: updatePreferences,
    reset: resetPreferences,
    export: exportPreferences,
    import: importPreferences
  };
})();const UserPreferences = {
    storageKey: 'app_preferences',

    defaults: {
        theme: 'light',
        language: 'en',
        notifications: true,
        fontSize: 16
    },

    init() {
        if (!this.getPreferences()) {
            this.savePreferences(this.defaults);
        }
    },

    getPreferences() {
        try {
            const stored = localStorage.getItem(this.storageKey);
            return stored ? JSON.parse(stored) : null;
        } catch (error) {
            console.error('Failed to retrieve preferences:', error);
            return null;
        }
    },

    savePreferences(prefs) {
        try {
            const current = this.getPreferences() || this.defaults;
            const merged = { ...current, ...prefs };
            localStorage.setItem(this.storageKey, JSON.stringify(merged));
            return true;
        } catch (error) {
            console.error('Failed to save preferences:', error);
            return false;
        }
    },

    getPreference(key) {
        const prefs = this.getPreferences();
        return prefs ? prefs[key] : this.defaults[key];
    },

    setPreference(key, value) {
        const prefs = this.getPreferences() || this.defaults;
        prefs[key] = value;
        return this.savePreferences(prefs);
    },

    resetToDefaults() {
        return this.savePreferences(this.defaults);
    },

    clearPreferences() {
        try {
            localStorage.removeItem(this.storageKey);
            return true;
        } catch (error) {
            console.error('Failed to clear preferences:', error);
            return false;
        }
    }
};

UserPreferences.init();