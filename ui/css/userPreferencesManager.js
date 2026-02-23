const UserPreferences = {
  preferences: {},

  init() {
    this.loadPreferences();
  },

  loadPreferences() {
    const stored = localStorage.getItem('userPreferences');
    if (stored) {
      try {
        this.preferences = JSON.parse(stored);
      } catch (e) {
        console.error('Failed to parse stored preferences:', e);
        this.preferences = {};
      }
    }
  },

  savePreferences() {
    try {
      localStorage.setItem('userPreferences', JSON.stringify(this.preferences));
      return true;
    } catch (e) {
      console.error('Failed to save preferences:', e);
      return false;
    }
  },

  setPreference(key, value) {
    this.preferences[key] = value;
    return this.savePreferences();
  },

  getPreference(key, defaultValue = null) {
    return this.preferences[key] !== undefined ? this.preferences[key] : defaultValue;
  },

  removePreference(key) {
    delete this.preferences[key];
    return this.savePreferences();
  },

  clearAll() {
    this.preferences = {};
    localStorage.removeItem('userPreferences');
  },

  getAllPreferences() {
    return { ...this.preferences };
  }
};

UserPreferences.init();const userPreferences = {
  theme: 'light',
  language: 'en',
  notifications: true,
  fontSize: 16
};

const PREFERENCES_KEY = 'app_preferences';

function savePreferences() {
  try {
    localStorage.setItem(PREFERENCES_KEY, JSON.stringify(userPreferences));
    console.log('Preferences saved successfully');
    return true;
  } catch (error) {
    console.error('Failed to save preferences:', error);
    return false;
  }
}

function loadPreferences() {
  try {
    const saved = localStorage.getItem(PREFERENCES_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      Object.assign(userPreferences, parsed);
      console.log('Preferences loaded successfully');
      return true;
    }
  } catch (error) {
    console.error('Failed to load preferences:', error);
  }
  return false;
}

function updatePreference(key, value) {
  if (key in userPreferences) {
    userPreferences[key] = value;
    savePreferences();
    return true;
  }
  return false;
}

function resetPreferences() {
  const defaults = {
    theme: 'light',
    language: 'en',
    notifications: true,
    fontSize: 16
  };
  Object.assign(userPreferences, defaults);
  savePreferences();
}

function exportPreferences() {
  return JSON.stringify(userPreferences, null, 2);
}

function importPreferences(jsonString) {
  try {
    const imported = JSON.parse(jsonString);
    Object.assign(userPreferences, imported);
    savePreferences();
    return true;
  } catch (error) {
    console.error('Invalid preferences format:', error);
    return false;
  }
}

loadPreferences();const UserPreferencesManager = (() => {
    const STORAGE_KEY = 'app_preferences';
    const defaultPreferences = {
        theme: 'light',
        language: 'en',
        notifications: true,
        fontSize: 16,
        autoSave: false
    };

    const loadPreferences = () => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            return stored ? { ...defaultPreferences, ...JSON.parse(stored) } : { ...defaultPreferences };
        } catch (error) {
            console.error('Failed to load preferences:', error);
            return { ...defaultPreferences };
        }
    };

    const savePreferences = (preferences) => {
        try {
            const current = loadPreferences();
            const updated = { ...current, ...preferences };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
            return updated;
        } catch (error) {
            console.error('Failed to save preferences:', error);
            return null;
        }
    };

    const resetPreferences = () => {
        try {
            localStorage.removeItem(STORAGE_KEY);
            return { ...defaultPreferences };
        } catch (error) {
            console.error('Failed to reset preferences:', error);
            return null;
        }
    };

    const getPreference = (key) => {
        const preferences = loadPreferences();
        return preferences[key] !== undefined ? preferences[key] : defaultPreferences[key];
    };

    const setPreference = (key, value) => {
        return savePreferences({ [key]: value });
    };

    const getAllPreferences = () => {
        return loadPreferences();
    };

    const subscribe = (callback) => {
        const handler = (event) => {
            if (event.key === STORAGE_KEY) {
                callback(loadPreferences());
            }
        };
        window.addEventListener('storage', handler);
        return () => window.removeEventListener('storage', handler);
    };

    return {
        load: loadPreferences,
        save: savePreferences,
        reset: resetPreferences,
        get: getPreference,
        set: setPreference,
        getAll: getAllPreferences,
        subscribe
    };
})();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = UserPreferencesManager;
}const UserPreferencesManager = (() => {
  const PREFIX = 'app_pref_';
  
  const setPreference = (key, value) => {
    try {
      const serialized = JSON.stringify(value);
      localStorage.setItem(PREFIX + key, serialized);
      return true;
    } catch (error) {
      console.error('Failed to save preference:', error);
      return false;
    }
  };

  const getPreference = (key, defaultValue = null) => {
    try {
      const item = localStorage.getItem(PREFIX + key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error('Failed to retrieve preference:', error);
      return defaultValue;
    }
  };

  const removePreference = (key) => {
    localStorage.removeItem(PREFIX + key);
  };

  const clearAllPreferences = () => {
    Object.keys(localStorage)
      .filter(key => key.startsWith(PREFIX))
      .forEach(key => localStorage.removeItem(key));
  };

  const getAllPreferences = () => {
    return Object.keys(localStorage)
      .filter(key => key.startsWith(PREFIX))
      .reduce((prefs, key) => {
        const prefKey = key.replace(PREFIX, '');
        prefs[prefKey] = getPreference(prefKey);
        return prefs;
      }, {});
  };

  return {
    set: setPreference,
    get: getPreference,
    remove: removePreference,
    clear: clearAllPreferences,
    getAll: getAllPreferences
  };
})();