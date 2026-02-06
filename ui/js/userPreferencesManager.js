const userPreferencesManager = (() => {
  const STORAGE_KEY = 'app_user_preferences';
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
      if (stored) {
        return { ...defaultPreferences, ...JSON.parse(stored) };
      }
    } catch (error) {
      console.error('Failed to load preferences:', error);
    }
    return { ...defaultPreferences };
  };

  const savePreferences = (preferences) => {
    try {
      const validated = validatePreferences(preferences);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(validated));
      return validated;
    } catch (error) {
      console.error('Failed to save preferences:', error);
      return null;
    }
  };

  const validatePreferences = (preferences) => {
    const validThemes = ['light', 'dark', 'auto'];
    const validLanguages = ['en', 'es', 'fr', 'de'];
    
    return {
      theme: validThemes.includes(preferences.theme) ? preferences.theme : defaultPreferences.theme,
      language: validLanguages.includes(preferences.language) ? preferences.language : defaultPreferences.language,
      notifications: typeof preferences.notifications === 'boolean' ? preferences.notifications : defaultPreferences.notifications,
      fontSize: Number.isInteger(preferences.fontSize) && preferences.fontSize >= 12 && preferences.fontSize <= 24 
        ? preferences.fontSize 
        : defaultPreferences.fontSize,
      autoSave: typeof preferences.autoSave === 'boolean' ? preferences.autoSave : defaultPreferences.autoSave
    };
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
    const current = loadPreferences();
    const updated = { ...current, [key]: value };
    return savePreferences(updated);
  };

  const subscribe = (callback) => {
    const handleStorageChange = (event) => {
      if (event.key === STORAGE_KEY) {
        callback(loadPreferences());
      }
    };
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  };

  return {
    load: loadPreferences,
    save: savePreferences,
    reset: resetToDefaults,
    get: getPreference,
    set: setPreference,
    subscribe,
    defaults: { ...defaultPreferences }
  };
})();const UserPreferencesManager = (() => {
    const STORAGE_KEY = 'app_user_preferences';
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
        try {
            preferences = { ...preferences, ...newPreferences };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
            return true;
        } catch (error) {
            console.error('Failed to save preferences:', error);
            return false;
        }
    };

    const getPreference = (key) => {
        return preferences[key] !== undefined ? preferences[key] : null;
    };

    const resetToDefaults = () => {
        preferences = { ...DEFAULT_PREFERENCES };
        localStorage.removeItem(STORAGE_KEY);
        return preferences;
    };

    const getAllPreferences = () => {
        return { ...preferences };
    };

    loadPreferences();

    return {
        get: getPreference,
        set: savePreferences,
        reset: resetToDefaults,
        getAll: getAllPreferences
    };
})();const UserPreferencesManager = (() => {
  const PREFIX = 'app_pref_';
  
  const setPreference = (key, value) => {
    try {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(PREFIX + key, serializedValue);
      return true;
    } catch (error) {
      console.error('Failed to save preference:', error);
      return false;
    }
  };

  const getPreference = (key, defaultValue = null) => {
    try {
      const item = localStorage.getItem(PREFIX + key);
      if (item === null) return defaultValue;
      return JSON.parse(item);
    } catch (error) {
      console.error('Failed to retrieve preference:', error);
      return defaultValue;
    }
  };

  const removePreference = (key) => {
    try {
      localStorage.removeItem(PREFIX + key);
      return true;
    } catch (error) {
      console.error('Failed to remove preference:', error);
      return false;
    }
  };

  const clearAllPreferences = () => {
    try {
      const keysToRemove = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith(PREFIX)) {
          keysToRemove.push(key);
        }
      }
      keysToRemove.forEach(key => localStorage.removeItem(key));
      return true;
    } catch (error) {
      console.error('Failed to clear preferences:', error);
      return false;
    }
  };

  const getAllPreferences = () => {
    const preferences = {};
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith(PREFIX)) {
          const prefKey = key.replace(PREFIX, '');
          preferences[prefKey] = getPreference(prefKey);
        }
      }
    } catch (error) {
      console.error('Failed to get all preferences:', error);
    }
    return preferences;
  };

  return {
    set: setPreference,
    get: getPreference,
    remove: removePreference,
    clear: clearAllPreferences,
    getAll: getAllPreferences
  };
})();

export default UserPreferencesManager;