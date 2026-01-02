const userPreferencesManager = (() => {
  const PREFERENCES_KEY = 'app_preferences';
  const DEFAULT_PREFERENCES = {
    theme: 'light',
    language: 'en',
    notifications: true,
    fontSize: 16,
    autoSave: false
  };

  const loadPreferences = () => {
    try {
      const stored = localStorage.getItem(PREFERENCES_KEY);
      return stored ? JSON.parse(stored) : { ...DEFAULT_PREFERENCES };
    } catch (error) {
      console.error('Failed to load preferences:', error);
      return { ...DEFAULT_PREFERENCES };
    }
  };

  const savePreferences = (preferences) => {
    try {
      localStorage.setItem(PREFERENCES_KEY, JSON.stringify(preferences));
      return true;
    } catch (error) {
      console.error('Failed to save preferences:', error);
      return false;
    }
  };

  const updatePreference = (key, value) => {
    if (!Object.keys(DEFAULT_PREFERENCES).includes(key)) {
      throw new Error(`Invalid preference key: ${key}`);
    }

    const current = loadPreferences();
    const updated = { ...current, [key]: value };
    return savePreferences(updated);
  };

  const resetToDefaults = () => {
    return savePreferences(DEFAULT_PREFERENCES);
  };

  const getPreference = (key) => {
    const prefs = loadPreferences();
    return prefs[key] !== undefined ? prefs[key] : DEFAULT_PREFERENCES[key];
  };

  const getAllPreferences = () => {
    return loadPreferences();
  };

  const subscribe = (callback) => {
    const handleStorageChange = (event) => {
      if (event.key === PREFERENCES_KEY) {
        callback(loadPreferences());
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  };

  return {
    loadPreferences,
    savePreferences,
    updatePreference,
    resetToDefaults,
    getPreference,
    getAllPreferences,
    subscribe
  };
})();

export default userPreferencesManager;