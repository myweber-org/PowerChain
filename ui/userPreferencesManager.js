const userPreferencesManager = (() => {
    const PREFERENCES_KEY = 'app_preferences';
    const DEFAULT_PREFERENCES = {
        theme: 'light',
        fontSize: 16,
        notifications: true,
        language: 'en'
    };

    const getPreferences = () => {
        try {
            const stored = localStorage.getItem(PREFERENCES_KEY);
            return stored ? JSON.parse(stored) : { ...DEFAULT_PREFERENCES };
        } catch (error) {
            console.error('Failed to retrieve preferences:', error);
            return { ...DEFAULT_PREFERENCES };
        }
    };

    const savePreferences = (preferences) => {
        try {
            const current = getPreferences();
            const updated = { ...current, ...preferences };
            localStorage.setItem(PREFERENCES_KEY, JSON.stringify(updated));
            return updated;
        } catch (error) {
            console.error('Failed to save preferences:', error);
            return null;
        }
    };

    const resetPreferences = () => {
        try {
            localStorage.setItem(PREFERENCES_KEY, JSON.stringify(DEFAULT_PREFERENCES));
            return { ...DEFAULT_PREFERENCES };
        } catch (error) {
            console.error('Failed to reset preferences:', error);
            return null;
        }
    };

    const getPreference = (key) => {
        const preferences = getPreferences();
        return preferences[key] !== undefined ? preferences[key] : DEFAULT_PREFERENCES[key];
    };

    const setPreference = (key, value) => {
        return savePreferences({ [key]: value });
    };

    const subscribe = (callback) => {
        const handler = (event) => {
            if (event.key === PREFERENCES_KEY) {
                callback(getPreferences());
            }
        };
        window.addEventListener('storage', handler);
        return () => window.removeEventListener('storage', handler);
    };

    return {
        getPreferences,
        savePreferences,
        resetPreferences,
        getPreference,
        setPreference,
        subscribe
    };
})();const UserPreferencesManager = {
  storageKey: 'app_user_preferences',

  defaults: {
    theme: 'light',
    language: 'en',
    fontSize: 16,
    notifications: true,
    autoSave: false,
    sidebarCollapsed: false
  },

  init() {
    if (!this.getPreferences()) {
      this.savePreferences(this.defaults);
    }
    return this.getPreferences();
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

  savePreferences(preferences) {
    try {
      const current = this.getPreferences() || this.defaults;
      const merged = { ...current, ...preferences };
      localStorage.setItem(this.storageKey, JSON.stringify(merged));
      return true;
    } catch (error) {
      console.error('Failed to save preferences:', error);
      return false;
    }
  },

  updatePreference(key, value) {
    const current = this.getPreferences();
    if (current && key in this.defaults) {
      return this.savePreferences({ [key]: value });
    }
    return false;
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
  },

  getAllPreferences() {
    return this.getPreferences() || this.defaults;
  }
};

export default UserPreferencesManager;const UserPreferencesManager = (function() {
    const STORAGE_TYPES = {
        LOCAL: 'localStorage',
        SESSION: 'sessionStorage'
    };

    let currentStorageType = null;

    function detectStorageSupport() {
        try {
            if (window.localStorage) {
                currentStorageType = STORAGE_TYPES.LOCAL;
                return true;
            }
        } catch (e) {
            console.warn('localStorage not available, falling back to sessionStorage');
        }

        try {
            if (window.sessionStorage) {
                currentStorageType = STORAGE_TYPES.SESSION;
                return true;
            }
        } catch (e) {
            console.error('No storage mechanism available');
        }

        return false;
    }

    function getStorage() {
        if (!currentStorageType && !detectStorageSupport()) {
            return null;
        }

        return currentStorageType === STORAGE_TYPES.LOCAL 
            ? window.localStorage 
            : window.sessionStorage;
    }

    function setPreference(key, value) {
        const storage = getStorage();
        if (!storage) return false;

        try {
            const data = {
                value: value,
                timestamp: new Date().toISOString()
            };
            storage.setItem(key, JSON.stringify(data));
            return true;
        } catch (e) {
            console.error('Failed to save preference:', e);
            return false;
        }
    }

    function getPreference(key, defaultValue = null) {
        const storage = getStorage();
        if (!storage) return defaultValue;

        try {
            const item = storage.getItem(key);
            if (!item) return defaultValue;

            const data = JSON.parse(item);
            return data.value;
        } catch (e) {
            console.error('Failed to retrieve preference:', e);
            return defaultValue;
        }
    }

    function removePreference(key) {
        const storage = getStorage();
        if (!storage) return false;

        try {
            storage.removeItem(key);
            return true;
        } catch (e) {
            console.error('Failed to remove preference:', e);
            return false;
        }
    }

    function clearAllPreferences() {
        const storage = getStorage();
        if (!storage) return false;

        try {
            storage.clear();
            return true;
        } catch (e) {
            console.error('Failed to clear preferences:', e);
            return false;
        }
    }

    function getAllPreferences() {
        const storage = getStorage();
        if (!storage) return {};

        const preferences = {};
        for (let i = 0; i < storage.length; i++) {
            const key = storage.key(i);
            try {
                const item = storage.getItem(key);
                if (item) {
                    const data = JSON.parse(item);
                    preferences[key] = {
                        value: data.value,
                        timestamp: data.timestamp
                    };
                }
            } catch (e) {
                console.warn(`Failed to parse preference for key: ${key}`);
            }
        }
        return preferences;
    }

    function getStorageType() {
        return currentStorageType;
    }

    return {
        setPreference,
        getPreference,
        removePreference,
        clearAllPreferences,
        getAllPreferences,
        getStorageType
    };
})();