const userPreferencesManager = (() => {
  const STORAGE_KEY = 'app_preferences';
  const DEFAULT_PREFERENCES = {
    theme: 'light',
    fontSize: 16,
    notifications: true,
    language: 'en',
    autoSave: false,
    sidebarCollapsed: false
  };

  const validatePreferences = (prefs) => {
    const validKeys = Object.keys(DEFAULT_PREFERENCES);
    const filtered = {};
    
    validKeys.forEach(key => {
      if (prefs[key] !== undefined && typeof prefs[key] === typeof DEFAULT_PREFERENCES[key]) {
        filtered[key] = prefs[key];
      } else {
        filtered[key] = DEFAULT_PREFERENCES[key];
      }
    });
    
    return filtered;
  };

  const savePreferences = (preferences) => {
    try {
      const validated = validatePreferences(preferences);
      const serialized = JSON.stringify(validated);
      localStorage.setItem(STORAGE_KEY, serialized);
      return validated;
    } catch (error) {
      console.error('Failed to save preferences:', error);
      return DEFAULT_PREFERENCES;
    }
  };

  const loadPreferences = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return DEFAULT_PREFERENCES;
      
      const parsed = JSON.parse(stored);
      return validatePreferences(parsed);
    } catch (error) {
      console.error('Failed to load preferences:', error);
      return DEFAULT_PREFERENCES;
    }
  };

  const updatePreference = (key, value) => {
    const current = loadPreferences();
    if (current[key] === undefined) return current;
    
    const updated = { ...current, [key]: value };
    return savePreferences(updated);
  };

  const resetPreferences = () => {
    localStorage.removeItem(STORAGE_KEY);
    return DEFAULT_PREFERENCES;
  };

  const getPreference = (key) => {
    const prefs = loadPreferences();
    return prefs[key] !== undefined ? prefs[key] : DEFAULT_PREFERENCES[key];
  };

  const exportPreferences = () => {
    const prefs = loadPreferences();
    return JSON.stringify(prefs, null, 2);
  };

  const importPreferences = (jsonString) => {
    try {
      const imported = JSON.parse(jsonString);
      return savePreferences(imported);
    } catch (error) {
      console.error('Invalid preferences format:', error);
      return loadPreferences();
    }
  };

  return {
    save: savePreferences,
    load: loadPreferences,
    update: updatePreference,
    reset: resetPreferences,
    get: getPreference,
    export: exportPreferences,
    import: importPreferences,
    defaults: DEFAULT_PREFERENCES
  };
})();