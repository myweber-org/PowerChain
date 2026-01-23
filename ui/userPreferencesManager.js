const userPreferencesManager = (() => {
  const PREFERENCES_KEY = 'app_preferences';
  const defaultPreferences = {
    theme: 'light',
    language: 'en',
    notifications: true,
    fontSize: 16
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

  const updatePreferences = (updates) => {
    try {
      const current = getPreferences();
      const updated = { ...current, ...updates };
      localStorage.setItem(PREFERENCES_KEY, JSON.stringify(updated));
      return updated;
    } catch (error) {
      console.error('Error updating preferences:', error);
      return getPreferences();
    }
  };

  const resetPreferences = () => {
    localStorage.removeItem(PREFERENCES_KEY);
    return { ...defaultPreferences };
  };

  const exportPreferences = () => {
    const prefs = getPreferences();
    return JSON.stringify(prefs, null, 2);
  };

  const importPreferences = (jsonString) => {
    try {
      const imported = JSON.parse(jsonString);
      return updatePreferences(imported);
    } catch (error) {
      console.error('Error importing preferences:', error);
      return getPreferences();
    }
  };

  return {
    get: getPreferences,
    update: updatePreferences,
    reset: resetPreferences,
    export: exportPreferences,
    import: importPreferences
  };
})();