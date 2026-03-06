const userPreferencesManager = (() => {
  const STORAGE_KEY = 'user_preferences';
  const DEFAULT_PREFERENCES = {
    theme: 'light',
    language: 'en',
    notifications: true,
    fontSize: 16
  };

  const getPreferences = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? { ...DEFAULT_PREFERENCES, ...JSON.parse(stored) } : { ...DEFAULT_PREFERENCES };
    } catch (error) {
      console.error('Error reading preferences:', error);
      return { ...DEFAULT_PREFERENCES };
    }
  };

  const savePreferences = (preferences) => {
    try {
      const current = getPreferences();
      const updated = { ...current, ...preferences };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    } catch (error) {
      console.error('Error saving preferences:', error);
      return null;
    }
  };

  const resetPreferences = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      return { ...DEFAULT_PREFERENCES };
    } catch (error) {
      console.error('Error resetting preferences:', error);
      return null;
    }
  };

  const getPreference = (key) => {
    const preferences = getPreferences();
    return preferences[key] !== undefined ? preferences[key] : null;
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
  const DEFAULT_PREFERENCES = {
    theme: 'light',
    fontSize: 16,
    notifications: true,
    language: 'en',
    autoSave: false
  };

  const loadPreferences = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return { ...DEFAULT_PREFERENCES, ...parsed };
      }
    } catch (error) {
      console.warn('Failed to load preferences:', error);
    }
    return { ...DEFAULT_PREFERENCES };
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
    const validThemes = ['light', 'dark', 'auto'];
    const validLanguages = ['en', 'es', 'fr', 'de'];
    
    return {
      theme: validThemes.includes(preferences.theme) ? preferences.theme : DEFAULT_PREFERENCES.theme,
      fontSize: Math.max(12, Math.min(24, Number(preferences.fontSize) || DEFAULT_PREFERENCES.fontSize)),
      notifications: Boolean(preferences.notifications),
      language: validLanguages.includes(preferences.language) ? preferences.language : DEFAULT_PREFERENCES.language,
      autoSave: Boolean(preferences.autoSave)
    };
  };

  const resetToDefaults = () => {
    localStorage.removeItem(STORAGE_KEY);
    return { ...DEFAULT_PREFERENCES };
  };

  const getPreference = (key) => {
    const prefs = loadPreferences();
    return prefs[key] !== undefined ? prefs[key] : DEFAULT_PREFERENCES[key];
  };

  const updatePreference = (key, value) => {
    const current = loadPreferences();
    const updated = { ...current, [key]: value };
    const validated = validatePreferences(updated);
    return savePreferences(validated) ? validated : current;
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
    reset: resetToDefaults,
    get: getPreference,
    update: updatePreference,
    subscribe,
    defaults: { ...DEFAULT_PREFERENCES }
  };
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = UserPreferencesManager;
}