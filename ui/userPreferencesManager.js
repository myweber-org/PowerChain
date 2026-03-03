const UserPreferencesManager = (() => {
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
      language: (val) => /^[a-z]{2}$/.test(val),
      notifications: (val) => typeof val === 'boolean',
      fontSize: (val) => Number.isInteger(val) && val >= 12 && val <= 24,
      autoSave: (val) => typeof val === 'boolean',
      lastUpdated: (val) => val === null || val instanceof Date
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
      
      dispatchEvent(new CustomEvent('preferencesChanged', { 
        detail: { preferences: validated } 
      }));
      
      return true;
    } catch (error) {
      console.error('Failed to save preferences:', error);
      return false;
    }
  };

  const resetPreferences = () => {
    localStorage.removeItem(STORAGE_KEY);
    return savePreferences(defaultPreferences);
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

  const subscribe = (callback) => {
    const handler = (event) => callback(event.detail.preferences);
    addEventListener('preferencesChanged', handler);
    
    return () => {
      removeEventListener('preferencesChanged', handler);
    };
  };

  return {
    load: loadPreferences,
    save: savePreferences,
    reset: resetPreferences,
    get: getPreference,
    set: setPreference,
    subscribe,
    validate: validatePreference
  };
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = UserPreferencesManager;
}const userPreferencesManager = (() => {
  const PREFERENCES_KEY = 'app_preferences';
  
  const defaultPreferences = {
    theme: 'light',
    fontSize: 16,
    notifications: true,
    language: 'en',
    autoSave: false,
    sidebarCollapsed: false
  };

  const getPreferences = () => {
    try {
      const stored = localStorage.getItem(PREFERENCES_KEY);
      return stored ? { ...defaultPreferences, ...JSON.parse(stored) } : defaultPreferences;
    } catch (error) {
      console.error('Failed to load preferences:', error);
      return defaultPreferences;
    }
  };

  const savePreferences = (updates) => {
    try {
      const current = getPreferences();
      const updated = { ...current, ...updates };
      localStorage.setItem(PREFERENCES_KEY, JSON.stringify(updated));
      return updated;
    } catch (error) {
      console.error('Failed to save preferences:', error);
      return null;
    }
  };

  const resetPreferences = () => {
    try {
      localStorage.removeItem(PREFERENCES_KEY);
      return defaultPreferences;
    } catch (error) {
      console.error('Failed to reset preferences:', error);
      return null;
    }
  };

  const watchPreference = (key, callback) => {
    if (!defaultPreferences.hasOwnProperty(key)) {
      throw new Error(`Invalid preference key: ${key}`);
    }

    const handler = (event) => {
      if (event.key === PREFERENCES_KEY) {
        try {
          const newValue = getPreferences()[key];
          callback(newValue);
        } catch (error) {
          console.error('Preference watch error:', error);
        }
      }
    };

    window.addEventListener('storage', handler);
    
    return () => window.removeEventListener('storage', handler);
  };

  return {
    get: getPreferences,
    set: savePreferences,
    reset: resetPreferences,
    watch: watchPreference,
    defaults: { ...defaultPreferences }
  };
})();

export default userPreferencesManager;