const UserPreferencesManager = (function() {
    const STORAGE_KEY = 'user_preferences';
    const DEFAULT_PREFERENCES = {
        theme: 'light',
        language: 'en',
        notifications: true,
        fontSize: 16,
        autoSave: false
    };

    function getPreferences() {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            try {
                return { ...DEFAULT_PREFERENCES, ...JSON.parse(stored) };
            } catch (error) {
                console.error('Failed to parse stored preferences:', error);
                return DEFAULT_PREFERENCES;
            }
        }
        return DEFAULT_PREFERENCES;
    }

    function updatePreferences(newPreferences) {
        const current = getPreferences();
        const updated = { ...current, ...newPreferences };
        
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
            return updated;
        } catch (error) {
            console.error('Failed to save preferences:', error);
            return current;
        }
    }

    function resetPreferences() {
        localStorage.removeItem(STORAGE_KEY);
        return DEFAULT_PREFERENCES;
    }

    function getPreference(key) {
        const prefs = getPreferences();
        return prefs[key] !== undefined ? prefs[key] : null;
    }

    function setPreference(key, value) {
        return updatePreferences({ [key]: value });
    }

    function subscribe(callback) {
        window.addEventListener('storage', function(event) {
            if (event.key === STORAGE_KEY) {
                callback(getPreferences());
            }
        });
    }

    return {
        get: getPreferences,
        update: updatePreferences,
        reset: resetPreferences,
        getPreference: getPreference,
        setPreference: setPreference,
        subscribe: subscribe
    };
})();const UserPreferences = {
    storageKey: 'app_preferences',

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

    getAllPreferences() {
        return this.getPreferences();
    }
};

export default UserPreferences;const UserPreferences = {
  _prefs: {},

  init() {
    const stored = localStorage.getItem('userPrefs');
    this._prefs = stored ? JSON.parse(stored) : {};
  },

  set(key, value) {
    this._prefs[key] = value;
    this._save();
    return this;
  },

  get(key, defaultValue = null) {
    return this._prefs.hasOwnProperty(key) ? this._prefs[key] : defaultValue;
  },

  remove(key) {
    delete this._prefs[key];
    this._save();
    return this;
  },

  clear() {
    this._prefs = {};
    localStorage.removeItem('userPrefs');
  },

  getAll() {
    return { ...this._prefs };
  },

  _save() {
    localStorage.setItem('userPrefs', JSON.stringify(this._prefs));
  }
};

UserPreferences.init();