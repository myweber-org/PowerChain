const UserPreferencesManager = (() => {
  const PREFIX = 'app_pref_';
  const DEFAULTS = {
    theme: 'light',
    language: 'en',
    notifications: true,
    fontSize: 16
  };

  const validateKey = (key) => {
    if (!Object.keys(DEFAULTS).includes(key)) {
      throw new Error(`Invalid preference key: ${key}`);
    }
  };

  const get = (key) => {
    validateKey(key);
    const stored = localStorage.getItem(PREFIX + key);
    if (stored !== null) {
      try {
        return JSON.parse(stored);
      } catch {
        return DEFAULTS[key];
      }
    }
    return DEFAULTS[key];
  };

  const set = (key, value) => {
    validateKey(key);
    localStorage.setItem(PREFIX + key, JSON.stringify(value));
    dispatchEvent(new CustomEvent('preferencesChanged', { 
      detail: { key, value }
    }));
  };

  const reset = (key) => {
    if (key) {
      validateKey(key);
      localStorage.removeItem(PREFIX + key);
      set(key, DEFAULTS[key]);
    } else {
      Object.keys(DEFAULTS).forEach(k => {
        localStorage.removeItem(PREFIX + k);
        set(k, DEFAULTS[k]);
      });
    }
  };

  const getAll = () => {
    return Object.keys(DEFAULTS).reduce((acc, key) => {
      acc[key] = get(key);
      return acc;
    }, {});
  };

  const subscribe = (callback) => {
    addEventListener('preferencesChanged', callback);
    return () => removeEventListener('preferencesChanged', callback);
  };

  return {
    get,
    set,
    reset,
    getAll,
    subscribe,
    defaults: DEFAULTS
  };
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = UserPreferencesManager;
}const UserPreferencesManager = (() => {
  const STORAGE_KEY = 'app_user_preferences';
  const DEFAULT_PREFERENCES = {
    theme: 'light',
    language: 'en',
    notifications: true,
    fontSize: 16,
    autoSave: true
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
    return preferences[key];
  };

  const getAllPreferences = () => {
    return { ...preferences };
  };

  loadPreferences();

  return {
    get: getPreference,
    getAll: getAllPreferences,
    set: savePreferences,
    reset: resetPreferences
  };
})();const UserPreferencesManager = (() => {
  const STORAGE_KEY = 'app_user_preferences';

  const defaultPreferences = {
    theme: 'light',
    language: 'en',
    notifications: true,
    fontSize: 16,
    autoSave: true,
    showTutorial: false
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

    if (typeof preferences.showTutorial === 'boolean') {
      valid.showTutorial = preferences.showTutorial;
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
    get: getPreference,
    set: setPreference,
    getAll: getAllPreferences,
    reset: resetToDefaults,
    subscribe
  };
})();

export default UserPreferencesManager;