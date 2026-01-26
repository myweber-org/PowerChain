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
      return stored ? { ...defaultPreferences, ...JSON.parse(stored) } : { ...defaultPreferences };
    } catch (error) {
      console.error('Failed to load preferences:', error);
      return { ...defaultPreferences };
    }
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

  const applyPreferences = () => {
    const prefs = loadPreferences();
    
    document.documentElement.setAttribute('data-theme', prefs.theme);
    document.documentElement.lang = prefs.language;
    document.documentElement.style.fontSize = `${prefs.fontSize}px`;
    
    if (prefs.notifications && 'Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
    
    return prefs;
  };

  return {
    load: loadPreferences,
    save: savePreferences,
    reset: resetToDefaults,
    get: getPreference,
    set: setPreference,
    apply: applyPreferences,
    validate: validatePreferences
  };
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = userPreferencesManager;
}const UserPreferencesManager = (function() {
    const STORAGE_KEY = 'user_preferences';
    
    function getPreferences() {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : {};
    }
    
    function setPreference(key, value) {
        const preferences = getPreferences();
        preferences[key] = value;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
        return true;
    }
    
    function getPreference(key, defaultValue = null) {
        const preferences = getPreferences();
        return preferences.hasOwnProperty(key) ? preferences[key] : defaultValue;
    }
    
    function removePreference(key) {
        const preferences = getPreferences();
        if (preferences.hasOwnProperty(key)) {
            delete preferences[key];
            localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
            return true;
        }
        return false;
    }
    
    function clearAllPreferences() {
        localStorage.removeItem(STORAGE_KEY);
        return true;
    }
    
    function getAllPreferences() {
        return getPreferences();
    }
    
    return {
        set: setPreference,
        get: getPreference,
        remove: removePreference,
        clear: clearAllPreferences,
        getAll: getAllPreferences
    };
})();

// Example usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = UserPreferencesManager;
}