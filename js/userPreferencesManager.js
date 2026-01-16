const userPreferencesManager = (() => {
  const PREFIX = 'app_pref_';
  const DEFAULT_PREFERENCES = {
    theme: 'light',
    fontSize: 16,
    notifications: true,
    language: 'en'
  };

  const validateKey = (key) => {
    if (!key || typeof key !== 'string') {
      throw new Error('Invalid preference key');
    }
    return true;
  };

  const validateValue = (value) => {
    if (value === undefined || value === null) {
      throw new Error('Invalid preference value');
    }
    return true;
  };

  const getStoredPreferences = () => {
    try {
      const stored = localStorage.getItem(PREFIX + 'all');
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  };

  const savePreferences = (prefs) => {
    try {
      localStorage.setItem(PREFIX + 'all', JSON.stringify(prefs));
      return true;
    } catch {
      return false;
    }
  };

  return {
    get: (key) => {
      validateKey(key);
      const prefs = getStoredPreferences();
      return prefs[key] !== undefined ? prefs[key] : DEFAULT_PREFERENCES[key];
    },

    set: (key, value) => {
      validateKey(key);
      validateValue(value);
      const prefs = getStoredPreferences();
      prefs[key] = value;
      return savePreferences(prefs);
    },

    getAll: () => {
      const stored = getStoredPreferences();
      return { ...DEFAULT_PREFERENCES, ...stored };
    },

    reset: () => {
      try {
        localStorage.removeItem(PREFIX + 'all');
        return true;
      } catch {
        return false;
      }
    },

    resetToDefaults: () => {
      return savePreferences(DEFAULT_PREFERENCES);
    },

    has: (key) => {
      validateKey(key);
      const prefs = getStoredPreferences();
      return prefs[key] !== undefined;
    },

    remove: (key) => {
      validateKey(key);
      const prefs = getStoredPreferences();
      delete prefs[key];
      return savePreferences(prefs);
    }
  };
})();

export default userPreferencesManager;const UserPreferencesManager = (() => {
  const STORAGE_KEY = 'app_user_preferences';
  
  const defaultPreferences = {
    theme: 'light',
    language: 'en',
    notifications: true,
    fontSize: 16,
    autoSave: true,
    sidebarCollapsed: false
  };

  const getPreferences = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return { ...defaultPreferences, ...JSON.parse(stored) };
      }
      return { ...defaultPreferences };
    } catch (error) {
      console.error('Failed to load preferences:', error);
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

  const subscribe = (callback) => {
    const handler = (event) => {
      if (event.key === STORAGE_KEY) {
        callback(getPreferences());
      }
    };
    window.addEventListener('storage', handler);
    
    return () => {
      window.removeEventListener('storage', handler);
    };
  };

  return {
    getPreferences,
    savePreferences,
    resetPreferences,
    getPreference,
    setPreference,
    subscribe
  };
})();

export default UserPreferencesManager;const UserPreferencesManager = (() => {
  const STORAGE_KEY = 'app_user_preferences';
  
  const defaultPreferences = {
    theme: 'light',
    language: 'en',
    notifications: true,
    fontSize: 16,
    autoSave: true,
    sidebarCollapsed: false
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
      return true;
    } catch (error) {
      console.error('Failed to save preferences:', error);
      return false;
    }
  };

  const validatePreferences = (preferences) => {
    const valid = {};
    
    if (preferences.theme && ['light', 'dark', 'auto'].includes(preferences.theme)) {
      valid.theme = preferences.theme;
    }
    
    if (preferences.language && typeof preferences.language === 'string') {
      valid.language = preferences.language;
    }
    
    if (typeof preferences.notifications === 'boolean') {
      valid.notifications = preferences.notifications;
    }
    
    if (typeof preferences.fontSize === 'number' && preferences.fontSize >= 12 && preferences.fontSize <= 24) {
      valid.fontSize = preferences.fontSize;
    }
    
    if (typeof preferences.autoSave === 'boolean') {
      valid.autoSave = preferences.autoSave;
    }
    
    if (typeof preferences.sidebarCollapsed === 'boolean') {
      valid.sidebarCollapsed = preferences.sidebarCollapsed;
    }
    
    return valid;
  };

  const resetToDefaults = () => {
    localStorage.removeItem(STORAGE_KEY);
    return { ...defaultPreferences };
  };

  const getPreference = (key) => {
    const preferences = loadPreferences();
    return preferences[key];
  };

  const setPreference = (key, value) => {
    const preferences = loadPreferences();
    preferences[key] = value;
    return savePreferences(preferences);
  };

  const getAllPreferences = () => {
    return loadPreferences();
  };

  const subscribe = (callback) => {
    const storageHandler = (event) => {
      if (event.key === STORAGE_KEY) {
        callback(loadPreferences());
      }
    };
    window.addEventListener('storage', storageHandler);
    
    return () => {
      window.removeEventListener('storage', storageHandler);
    };
  };

  return {
    get: getPreference,
    set: setPreference,
    getAll: getAllPreferences,
    reset: resetToDefaults,
    subscribe
  };
})();

export default UserPreferencesManager;