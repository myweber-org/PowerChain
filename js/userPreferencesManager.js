const userPreferencesManager = (function() {
    const PREFERENCES_KEY = 'app_preferences';
    
    function getPreferences() {
        const stored = localStorage.getItem(PREFERENCES_KEY);
        return stored ? JSON.parse(stored) : {};
    }
    
    function setPreference(key, value) {
        const preferences = getPreferences();
        preferences[key] = value;
        localStorage.setItem(PREFERENCES_KEY, JSON.stringify(preferences));
        return preferences;
    }
    
    function removePreference(key) {
        const preferences = getPreferences();
        delete preferences[key];
        localStorage.setItem(PREFERENCES_KEY, JSON.stringify(preferences));
        return preferences;
    }
    
    function clearPreferences() {
        localStorage.removeItem(PREFERENCES_KEY);
        return {};
    }
    
    function hasPreference(key) {
        const preferences = getPreferences();
        return key in preferences;
    }
    
    function getAllKeys() {
        const preferences = getPreferences();
        return Object.keys(preferences);
    }
    
    return {
        get: getPreferences,
        set: setPreference,
        remove: removePreference,
        clear: clearPreferences,
        has: hasPreference,
        keys: getAllKeys
    };
})();const UserPreferences = {
  storageKey: 'app_user_preferences',

  defaultPreferences: {
    theme: 'light',
    language: 'en',
    fontSize: 16,
    notifications: true,
    autoSave: false
  },

  validatePreference(key, value) {
    const validators = {
      theme: (val) => ['light', 'dark', 'auto'].includes(val),
      language: (val) => ['en', 'es', 'fr', 'de'].includes(val),
      fontSize: (val) => Number.isInteger(val) && val >= 12 && val <= 24,
      notifications: (val) => typeof val === 'boolean',
      autoSave: (val) => typeof val === 'boolean'
    };

    return validators[key] ? validators[key](value) : false;
  },

  load() {
    try {
      const stored = localStorage.getItem(this.storageKey);
      if (!stored) return { ...this.defaultPreferences };

      const parsed = JSON.parse(stored);
      const validated = {};

      for (const key in this.defaultPreferences) {
        if (this.validatePreference(key, parsed[key])) {
          validated[key] = parsed[key];
        } else {
          validated[key] = this.defaultPreferences[key];
        }
      }

      return validated;
    } catch (error) {
      console.error('Failed to load preferences:', error);
      return { ...this.defaultPreferences };
    }
  },

  save(preferences) {
    try {
      const validated = {};

      for (const key in this.defaultPreferences) {
        if (this.validatePreference(key, preferences[key])) {
          validated[key] = preferences[key];
        } else {
          validated[key] = this.defaultPreferences[key];
        }
      }

      localStorage.setItem(this.storageKey, JSON.stringify(validated));
      return true;
    } catch (error) {
      console.error('Failed to save preferences:', error);
      return false;
    }
  },

  update(key, value) {
    if (!this.validatePreference(key, value)) {
      throw new Error(`Invalid value for preference "${key}"`);
    }

    const current = this.load();
    current[key] = value;
    return this.save(current);
  },

  reset() {
    try {
      localStorage.removeItem(this.storageKey);
      return true;
    } catch (error) {
      console.error('Failed to reset preferences:', error);
      return false;
    }
  },

  getAll() {
    return this.load();
  }
};

export default UserPreferences;const UserPreferencesManager = (function() {
    const STORAGE_KEY = 'user_preferences';
    const DEFAULT_PREFERENCES = {
        theme: 'light',
        language: 'en',
        fontSize: 'medium',
        notifications: true
    };

    function getPreferences() {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : {...DEFAULT_PREFERENCES};
    }

    function savePreferences(preferences) {
        const current = getPreferences();
        const updated = {...current, ...preferences};
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        dispatchChangeEvent(updated);
        return updated;
    }

    function resetPreferences() {
        localStorage.removeItem(STORAGE_KEY);
        dispatchChangeEvent({...DEFAULT_PREFERENCES});
        return {...DEFAULT_PREFERENCES};
    }

    function dispatchChangeEvent(preferences) {
        const event = new CustomEvent('preferencesChanged', {
            detail: { preferences }
        });
        window.dispatchEvent(event);
    }

    function getPreference(key) {
        const preferences = getPreferences();
        return preferences[key] !== undefined ? preferences[key] : DEFAULT_PREFERENCES[key];
    }

    return {
        get: getPreference,
        getAll: getPreferences,
        set: savePreferences,
        reset: resetPreferences,
        subscribe: function(callback) {
            window.addEventListener('preferencesChanged', (e) => callback(e.detail.preferences));
            return () => window.removeEventListener('preferencesChanged', callback);
        }
    };
})();