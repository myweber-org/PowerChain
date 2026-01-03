const UserPreferencesManager = (() => {
  const PREFERENCES_KEY = 'app_preferences';
  
  const defaultPreferences = {
    theme: 'light',
    language: 'en',
    notifications: true,
    fontSize: 16,
    autoSave: false
  };

  const getPreferences = () => {
    try {
      const stored = localStorage.getItem(PREFERENCES_KEY);
      return stored ? JSON.parse(stored) : { ...defaultPreferences };
    } catch (error) {
      console.error('Error reading preferences:', error);
      return { ...defaultPreferences };
    }
  };

  const savePreferences = (preferences) => {
    try {
      const current = getPreferences();
      const updated = { ...current, ...preferences };
      localStorage.setItem(PREFERENCES_KEY, JSON.stringify(updated));
      return true;
    } catch (error) {
      console.error('Error saving preferences:', error);
      return false;
    }
  };

  const resetPreferences = () => {
    try {
      localStorage.setItem(PREFERENCES_KEY, JSON.stringify(defaultPreferences));
      return true;
    } catch (error) {
      console.error('Error resetting preferences:', error);
      return false;
    }
  };

  const getPreference = (key) => {
    const preferences = getPreferences();
    return preferences[key] !== undefined ? preferences[key] : defaultPreferences[key];
  };

  const setPreference = (key, value) => {
    return savePreferences({ [key]: value });
  };

  const getAllPreferences = () => {
    return getPreferences();
  };

  const clearPreferences = () => {
    try {
      localStorage.removeItem(PREFERENCES_KEY);
      return true;
    } catch (error) {
      console.error('Error clearing preferences:', error);
      return false;
    }
  };

  return {
    get: getPreference,
    set: setPreference,
    getAll: getAllPreferences,
    save: savePreferences,
    reset: resetPreferences,
    clear: clearPreferences
  };
})();

export default UserPreferencesManager;