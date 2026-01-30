const userPreferencesManager = (() => {
    const defaultPreferences = {
        theme: 'light',
        language: 'en',
        notifications: true,
        fontSize: 16,
        autoSave: false
    };

    const storageKey = 'app_user_preferences';

    const validatePreference = (key, value) => {
        const validators = {
            theme: (val) => ['light', 'dark', 'auto'].includes(val),
            language: (val) => ['en', 'es', 'fr', 'de'].includes(val),
            notifications: (val) => typeof val === 'boolean',
            fontSize: (val) => Number.isInteger(val) && val >= 12 && val <= 24,
            autoSave: (val) => typeof val === 'boolean'
        };

        return validators[key] ? validators[key](value) : false;
    };

    const getPreferences = () => {
        try {
            const stored = localStorage.getItem(storageKey);
            if (!stored) return { ...defaultPreferences };

            const parsed = JSON.parse(stored);
            return { ...defaultPreferences, ...parsed };
        } catch (error) {
            console.error('Failed to load preferences:', error);
            return { ...defaultPreferences };
        }
    };

    const updatePreference = (key, value) => {
        if (!validatePreference(key, value)) {
            throw new Error(`Invalid preference: ${key}=${value}`);
        }

        const current = getPreferences();
        const updated = { ...current, [key]: value };

        try {
            localStorage.setItem(storageKey, JSON.stringify(updated));
            return updated;
        } catch (error) {
            console.error('Failed to save preference:', error);
            throw error;
        }
    };

    const resetPreferences = () => {
        try {
            localStorage.removeItem(storageKey);
            return { ...defaultPreferences };
        } catch (error) {
            console.error('Failed to reset preferences:', error);
            throw error;
        }
    };

    const subscribe = (callback) => {
        const handler = (event) => {
            if (event.key === storageKey) {
                callback(getPreferences());
            }
        };
        window.addEventListener('storage', handler);
        return () => window.removeEventListener('storage', handler);
    };

    return {
        getPreferences,
        updatePreference,
        resetPreferences,
        subscribe
    };
})();

export default userPreferencesManager;const UserPreferences = {
  preferences: {},

  init() {
    this.loadPreferences();
    this.setupListeners();
  },

  loadPreferences() {
    const stored = localStorage.getItem('userPreferences');
    if (stored) {
      try {
        this.preferences = JSON.parse(stored);
      } catch (e) {
        console.warn('Failed to parse stored preferences:', e);
        this.preferences = this.getDefaultPreferences();
      }
    } else {
      this.preferences = this.getDefaultPreferences();
    }
  },

  getDefaultPreferences() {
    return {
      theme: 'light',
      notifications: true,
      fontSize: 16,
      language: 'en',
      autoSave: true
    };
  },

  savePreferences() {
    try {
      localStorage.setItem('userPreferences', JSON.stringify(this.preferences));
      this.dispatchEvent('preferencesUpdated', this.preferences);
      return true;
    } catch (e) {
      console.error('Failed to save preferences:', e);
      return false;
    }
  },

  getPreference(key) {
    return this.preferences[key];
  },

  setPreference(key, value) {
    if (key in this.preferences) {
      this.preferences[key] = value;
      return this.savePreferences();
    }
    return false;
  },

  resetToDefaults() {
    this.preferences = this.getDefaultPreferences();
    return this.savePreferences();
  },

  setupListeners() {
    window.addEventListener('storage', (e) => {
      if (e.key === 'userPreferences') {
        this.loadPreferences();
        this.dispatchEvent('preferencesSynced', this.preferences);
      }
    });
  },

  dispatchEvent(eventName, detail) {
    const event = new CustomEvent(eventName, { detail });
    window.dispatchEvent(event);
  }
};

UserPreferences.init();