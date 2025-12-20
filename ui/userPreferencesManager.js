const userPreferencesManager = (function() {
    const PREFERENCES_KEY = 'user_preferences';
    
    const defaultPreferences = {
        theme: 'light',
        fontSize: 'medium',
        notifications: true,
        language: 'en',
        autoSave: false,
        sidebarCollapsed: false
    };

    function loadPreferences() {
        try {
            const stored = localStorage.getItem(PREFERENCES_KEY);
            if (stored) {
                return { ...defaultPreferences, ...JSON.parse(stored) };
            }
        } catch (error) {
            console.error('Failed to load preferences:', error);
        }
        return { ...defaultPreferences };
    }

    function savePreferences(preferences) {
        try {
            const validated = validatePreferences(preferences);
            localStorage.setItem(PREFERENCES_KEY, JSON.stringify(validated));
            return true;
        } catch (error) {
            console.error('Failed to save preferences:', error);
            return false;
        }
    }

    function validatePreferences(preferences) {
        const valid = { ...defaultPreferences };
        
        if (preferences.theme && ['light', 'dark', 'auto'].includes(preferences.theme)) {
            valid.theme = preferences.theme;
        }
        
        if (preferences.fontSize && ['small', 'medium', 'large'].includes(preferences.fontSize)) {
            valid.fontSize = preferences.fontSize;
        }
        
        if (typeof preferences.notifications === 'boolean') {
            valid.notifications = preferences.notifications;
        }
        
        if (preferences.language && ['en', 'es', 'fr', 'de'].includes(preferences.language)) {
            valid.language = preferences.language;
        }
        
        if (typeof preferences.autoSave === 'boolean') {
            valid.autoSave = preferences.autoSave;
        }
        
        if (typeof preferences.sidebarCollapsed === 'boolean') {
            valid.sidebarCollapsed = preferences.sidebarCollapsed;
        }
        
        return valid;
    }

    function resetToDefaults() {
        localStorage.removeItem(PREFERENCES_KEY);
        return { ...defaultPreferences };
    }

    function getPreference(key) {
        const preferences = loadPreferences();
        return preferences[key] || defaultPreferences[key];
    }

    function setPreference(key, value) {
        const current = loadPreferences();
        const updated = { ...current, [key]: value };
        return savePreferences(updated);
    }

    function getAllPreferences() {
        return loadPreferences();
    }

    function subscribe(callback) {
        window.addEventListener('storage', function(event) {
            if (event.key === PREFERENCES_KEY) {
                callback(loadPreferences());
            }
        });
    }

    return {
        get: getPreference,
        set: setPreference,
        getAll: getAllPreferences,
        reset: resetToDefaults,
        subscribe: subscribe
    };
})();const userPreferencesManager = (() => {
  const STORAGE_KEY = 'app_preferences';
  const defaultPreferences = {
    theme: 'light',
    language: 'en',
    notifications: true,
    fontSize: 16,
    autoSave: false
  };

  const getPreferences = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? { ...defaultPreferences, ...JSON.parse(stored) } : { ...defaultPreferences };
    } catch (error) {
      console.error('Failed to retrieve preferences:', error);
      return { ...defaultPreferences };
    }
  };

  const savePreferences = (preferences) => {
    try {
      const current = getPreferences();
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
    const preferences = getPreferences();
    return preferences[key] !== undefined ? preferences[key] : defaultPreferences[key];
  };

  const setPreference = (key, value) => {
    return savePreferences({ [key]: value });
  };

  return {
    getPreferences,
    savePreferences,
    resetPreferences,
    getPreference,
    setPreference
  };
})();const UserPreferencesManager = (() => {
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
      language: (val) => ['en', 'es', 'fr', 'de'].includes(val),
      notifications: (val) => typeof val === 'boolean',
      fontSize: (val) => Number.isInteger(val) && val >= 12 && val <= 24,
      autoSave: (val) => typeof val === 'boolean'
    };

    return validators[key] ? validators[key](value) : false;
  };

  const loadPreferences = () => {
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

  const savePreferences = (preferences) => {
    try {
      const validated = {};
      Object.keys(preferences).forEach(key => {
        if (validatePreference(key, preferences[key])) {
          validated[key] = preferences[key];
        }
      });

      validated.lastUpdated = new Date().toISOString();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(validated));
      return true;
    } catch (error) {
      console.error('Failed to save preferences:', error);
      return false;
    }
  };

  const resetToDefaults = () => {
    localStorage.removeItem(STORAGE_KEY);
    return { ...defaultPreferences };
  };

  const getPreference = (key) => {
    const preferences = loadPreferences();
    return preferences[key] !== undefined ? preferences[key] : null;
  };

  const setPreference = (key, value) => {
    if (!validatePreference(key, value)) {
      throw new Error(`Invalid value for preference "${key}"`);
    }

    const preferences = loadPreferences();
    preferences[key] = value;
    return savePreferences(preferences);
  };

  const getAllPreferences = () => {
    return loadPreferences();
  };

  const setMultiplePreferences = (updates) => {
    const preferences = loadPreferences();
    Object.keys(updates).forEach(key => {
      if (validatePreference(key, updates[key])) {
        preferences[key] = updates[key];
      }
    });
    return savePreferences(preferences);
  };

  return {
    get: getPreference,
    set: setPreference,
    getAll: getAllPreferences,
    setMultiple: setMultiplePreferences,
    reset: resetToDefaults,
    validate: validatePreference
  };
})();

export default UserPreferencesManager;const UserPreferencesManager = (() => {
    const STORAGE_KEY = 'app_preferences';
    const DEFAULT_PREFERENCES = {
        theme: 'light',
        language: 'en',
        notifications: true,
        fontSize: 16,
        autoSave: false
    };

    let preferences = { ...DEFAULT_PREFERENCES };

    const loadPreferences = () => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                const parsed = JSON.parse(stored);
                preferences = { ...DEFAULT_PREFERENCES, ...parsed };
            }
        } catch (error) {
            console.warn('Failed to load preferences:', error);
        }
        return preferences;
    };

    const savePreferences = (newPreferences) => {
        preferences = { ...preferences, ...newPreferences };
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
            return true;
        } catch (error) {
            console.error('Failed to save preferences:', error);
            return false;
        }
    };

    const resetPreferences = () => {
        preferences = { ...DEFAULT_PREFERENCES };
        localStorage.removeItem(STORAGE_KEY);
        return preferences;
    };

    const getPreference = (key) => {
        return preferences[key] !== undefined ? preferences[key] : null;
    };

    const getAllPreferences = () => {
        return { ...preferences };
    };

    const subscribe = (callback) => {
        window.addEventListener('storage', (event) => {
            if (event.key === STORAGE_KEY) {
                loadPreferences();
                callback(getAllPreferences());
            }
        });
    };

    loadPreferences();

    return {
        get: getPreference,
        getAll: getAllPreferences,
        set: savePreferences,
        reset: resetPreferences,
        subscribe
    };
})();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = UserPreferencesManager;
}