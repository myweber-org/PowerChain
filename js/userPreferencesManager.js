const userPreferencesManager = (() => {
  const PREFERENCES_KEY = 'app_preferences';
  const DEFAULT_PREFERENCES = {
    theme: 'light',
    fontSize: 16,
    notifications: true,
    language: 'en',
    autoSave: false
  };

  const loadPreferences = () => {
    try {
      const stored = localStorage.getItem(PREFERENCES_KEY);
      if (stored) {
        return { ...DEFAULT_PREFERENCES, ...JSON.parse(stored) };
      }
    } catch (error) {
      console.warn('Failed to load preferences:', error);
    }
    return { ...DEFAULT_PREFERENCES };
  };

  const savePreferences = (preferences) => {
    try {
      const validated = validatePreferences(preferences);
      localStorage.setItem(PREFERENCES_KEY, JSON.stringify(validated));
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
    
    if (typeof preferences.fontSize === 'number' && preferences.fontSize >= 12 && preferences.fontSize <= 24) {
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
    
    return valid;
  };

  const resetToDefaults = () => {
    localStorage.removeItem(PREFERENCES_KEY);
    return { ...DEFAULT_PREFERENCES };
  };

  const getPreference = (key) => {
    const prefs = loadPreferences();
    return prefs[key] !== undefined ? prefs[key] : DEFAULT_PREFERENCES[key];
  };

  const setPreference = (key, value) => {
    const current = loadPreferences();
    const updated = { ...current, [key]: value };
    return savePreferences(updated);
  };

  const getAllPreferences = () => {
    return loadPreferences();
  };

  const subscribe = (callback) => {
    const handler = (event) => {
      if (event.key === PREFERENCES_KEY) {
        callback(loadPreferences());
      }
    };
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  };

  return {
    get: getPreference,
    set: setPreference,
    getAll: getAllPreferences,
    reset: resetToDefaults,
    subscribe
  };
})();

export default userPreferencesManager;class UserPreferencesManager {
  constructor() {
    this.storageKey = 'user_preferences';
    this.defaults = {
      theme: 'light',
      language: 'en',
      notifications: true,
      fontSize: 16
    };
    this.preferences = this.loadPreferences();
  }

  loadPreferences() {
    try {
      const stored = localStorage.getItem(this.storageKey);
      return stored ? { ...this.defaults, ...JSON.parse(stored) } : { ...this.defaults };
    } catch (error) {
      console.error('Failed to load preferences:', error);
      return { ...this.defaults };
    }
  }

  savePreferences() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.preferences));
      return true;
    } catch (error) {
      console.error('Failed to save preferences:', error);
      return false;
    }
  }

  getPreference(key) {
    return this.preferences[key] !== undefined ? this.preferences[key] : this.defaults[key];
  }

  setPreference(key, value) {
    if (this.defaults[key] !== undefined) {
      this.preferences[key] = value;
      return this.savePreferences();
    }
    return false;
  }

  resetToDefaults() {
    this.preferences = { ...this.defaults };
    return this.savePreferences();
  }

  getAllPreferences() {
    return { ...this.preferences };
  }
}

const preferencesManager = new UserPreferencesManager();