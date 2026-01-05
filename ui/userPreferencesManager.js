const userPreferences = {
  theme: 'light',
  language: 'en',
  notifications: true,
  fontSize: 16
};

const UserPreferencesManager = {
  storageKey: 'user_preferences',

  load() {
    const saved = localStorage.getItem(this.storageKey);
    if (saved) {
      Object.assign(userPreferences, JSON.parse(saved));
    }
    return userPreferences;
  },

  save() {
    localStorage.setItem(this.storageKey, JSON.stringify(userPreferences));
    return true;
  },

  update(key, value) {
    if (userPreferences.hasOwnProperty(key)) {
      userPreferences[key] = value;
      this.save();
      return true;
    }
    return false;
  },

  reset() {
    const defaults = {
      theme: 'light',
      language: 'en',
      notifications: true,
      fontSize: 16
    };
    Object.assign(userPreferences, defaults);
    localStorage.removeItem(this.storageKey);
    return defaults;
  },

  getAll() {
    return { ...userPreferences };
  }
};

export default UserPreferencesManager;const UserPreferencesManager = (function() {
    const STORAGE_KEY = 'app_preferences';
    const DEFAULT_PREFERENCES = {
        theme: 'light',
        language: 'en',
        notifications: true,
        fontSize: 16,
        autoSave: false
    };

    let currentPreferences = { ...DEFAULT_PREFERENCES };

    function loadPreferences() {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                const parsed = JSON.parse(stored);
                currentPreferences = { ...DEFAULT_PREFERENCES, ...parsed };
            }
        } catch (error) {
            console.warn('Failed to load preferences:', error);
        }
        return currentPreferences;
    }

    function savePreferences(newPreferences) {
        try {
            const merged = { ...currentPreferences, ...newPreferences };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
            currentPreferences = merged;
            return true;
        } catch (error) {
            console.error('Failed to save preferences:', error);
            return false;
        }
    }

    function resetPreferences() {
        localStorage.removeItem(STORAGE_KEY);
        currentPreferences = { ...DEFAULT_PREFERENCES };
        return currentPreferences;
    }

    function getPreference(key) {
        return currentPreferences[key];
    }

    function setPreference(key, value) {
        return savePreferences({ [key]: value });
    }

    function getAllPreferences() {
        return { ...currentPreferences };
    }

    function validatePreferences(prefs) {
        const validKeys = Object.keys(DEFAULT_PREFERENCES);
        return Object.keys(prefs).every(key => validKeys.includes(key));
    }

    loadPreferences();

    return {
        load: loadPreferences,
        save: savePreferences,
        reset: resetPreferences,
        get: getPreference,
        set: setPreference,
        getAll: getAllPreferences,
        validate: validatePreferences,
        defaults: { ...DEFAULT_PREFERENCES }
    };
})();

export default UserPreferencesManager;