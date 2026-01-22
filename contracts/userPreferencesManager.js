const UserPreferencesManager = (function() {
    const PREFERENCES_KEY = 'app_preferences';
    const DEFAULT_PREFERENCES = {
        theme: 'light',
        language: 'en',
        notifications: true,
        fontSize: 16,
        autoSave: true
    };

    function getPreferences() {
        const stored = localStorage.getItem(PREFERENCES_KEY);
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

    function savePreferences(preferences) {
        try {
            const current = getPreferences();
            const updated = { ...current, ...preferences };
            localStorage.setItem(PREFERENCES_KEY, JSON.stringify(updated));
            return true;
        } catch (error) {
            console.error('Failed to save preferences:', error);
            return false;
        }
    }

    function resetPreferences() {
        localStorage.removeItem(PREFERENCES_KEY);
        return DEFAULT_PREFERENCES;
    }

    function getPreference(key) {
        const preferences = getPreferences();
        return preferences[key] !== undefined ? preferences[key] : null;
    }

    function setPreference(key, value) {
        return savePreferences({ [key]: value });
    }

    function subscribe(callback) {
        window.addEventListener('storage', function(event) {
            if (event.key === PREFERENCES_KEY) {
                callback(getPreferences());
            }
        });
    }

    return {
        get: getPreference,
        set: setPreference,
        getAll: getPreferences,
        save: savePreferences,
        reset: resetPreferences,
        subscribe: subscribe
    };
})();const UserPreferences = {
  preferences: {},

  init() {
    this.loadPreferences();
    this.setupAutoSave();
  },

  loadPreferences() {
    const stored = localStorage.getItem('userPreferences');
    if (stored) {
      try {
        this.preferences = JSON.parse(stored);
      } catch (e) {
        console.warn('Failed to parse stored preferences:', e);
        this.preferences = {};
      }
    }
  },

  savePreferences() {
    localStorage.setItem('userPreferences', JSON.stringify(this.preferences));
  },

  setupAutoSave() {
    window.addEventListener('beforeunload', () => this.savePreferences());
  },

  setPreference(key, value) {
    this.preferences[key] = value;
    this.savePreferences();
  },

  getPreference(key, defaultValue = null) {
    return this.preferences.hasOwnProperty(key) ? this.preferences[key] : defaultValue;
  },

  removePreference(key) {
    if (this.preferences.hasOwnProperty(key)) {
      delete this.preferences[key];
      this.savePreferences();
      return true;
    }
    return false;
  },

  clearAllPreferences() {
    this.preferences = {};
    localStorage.removeItem('userPreferences');
  }
};

UserPreferences.init();const UserPreferences = {
    preferences: {},

    init: function() {
        const stored = localStorage.getItem('userPreferences');
        if (stored) {
            this.preferences = JSON.parse(stored);
        }
        return this;
    },

    set: function(key, value) {
        this.preferences[key] = value;
        this.save();
        return this;
    },

    get: function(key, defaultValue = null) {
        return this.preferences[key] !== undefined ? this.preferences[key] : defaultValue;
    },

    remove: function(key) {
        delete this.preferences[key];
        this.save();
        return this;
    },

    clear: function() {
        this.preferences = {};
        localStorage.removeItem('userPreferences');
        return this;
    },

    save: function() {
        localStorage.setItem('userPreferences', JSON.stringify(this.preferences));
        return this;
    },

    getAll: function() {
        return { ...this.preferences };
    }
};

Object.freeze(UserPreferences);
export default UserPreferences.init();