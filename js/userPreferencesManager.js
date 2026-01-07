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

export default UserPreferencesManager;const UserPreferencesManager = (() => {
  const STORAGE_KEY = 'app_user_preferences';

  const defaultPreferences = {
    theme: 'light',
    language: 'en',
    notifications: true,
    fontSize: 16,
    autoSave: false,
    lastUpdated: null
  };

  const getPreferences = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return { ...defaultPreferences, ...parsed };
      }
    } catch (error) {
      console.error('Failed to load preferences:', error);
    }
    return { ...defaultPreferences };
  };

  const savePreferences = (preferences) => {
    try {
      const updatedPreferences = {
        ...preferences,
        lastUpdated: new Date().toISOString()
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPreferences));
      return true;
    } catch (error) {
      console.error('Failed to save preferences:', error);
      return false;
    }
  };

  const updatePreference = (key, value) => {
    const current = getPreferences();
    if (current.hasOwnProperty(key)) {
      current[key] = value;
      return savePreferences(current);
    }
    return false;
  };

  const resetToDefaults = () => {
    return savePreferences(defaultPreferences);
  };

  const exportPreferences = () => {
    const prefs = getPreferences();
    const dataStr = JSON.stringify(prefs, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    return dataUri;
  };

  const importPreferences = (jsonString) => {
    try {
      const imported = JSON.parse(jsonString);
      const validKeys = Object.keys(defaultPreferences);
      const filtered = {};
      
      validKeys.forEach(key => {
        if (imported.hasOwnProperty(key)) {
          filtered[key] = imported[key];
        }
      });

      return savePreferences(filtered);
    } catch (error) {
      console.error('Failed to import preferences:', error);
      return false;
    }
  };

  return {
    getPreferences,
    savePreferences,
    updatePreference,
    resetToDefaults,
    exportPreferences,
    importPreferences
  };
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = UserPreferencesManager;
}const UserPreferencesManager = (() => {
  const STORAGE_KEY = 'app_user_preferences';
  
  const defaultPreferences = {
    theme: 'light',
    fontSize: 16,
    notifications: true,
    language: 'en',
    autoSave: false,
    sidebarCollapsed: false
  };

  const loadPreferences = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return { ...defaultPreferences, ...JSON.parse(stored) };
      }
    } catch (error) {
      console.warn('Failed to load preferences:', error);
    }
    return { ...defaultPreferences };
  };

  const savePreferences = (preferences) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
      return true;
    } catch (error) {
      console.error('Failed to save preferences:', error);
      return false;
    }
  };

  const updatePreference = (key, value) => {
    if (!defaultPreferences.hasOwnProperty(key)) {
      throw new Error(`Invalid preference key: ${key}`);
    }
    
    const current = loadPreferences();
    const updated = { ...current, [key]: value };
    
    if (savePreferences(updated)) {
      dispatchPreferenceChange(key, value);
      return true;
    }
    return false;
  };

  const resetPreferences = () => {
    if (savePreferences(defaultPreferences)) {
      Object.keys(defaultPreferences).forEach(key => {
        dispatchPreferenceChange(key, defaultPreferences[key]);
      });
      return true;
    }
    return false;
  };

  const dispatchPreferenceChange = (key, value) => {
    const event = new CustomEvent('preferencechange', {
      detail: { key, value }
    });
    window.dispatchEvent(event);
  };

  const getPreference = (key) => {
    const preferences = loadPreferences();
    return preferences[key];
  };

  const getAllPreferences = () => {
    return loadPreferences();
  };

  const subscribe = (callback) => {
    const handler = (event) => callback(event.detail);
    window.addEventListener('preferencechange', handler);
    return () => window.removeEventListener('preferencechange', handler);
  };

  return {
    get: getPreference,
    getAll: getAllPreferences,
    set: updatePreference,
    reset: resetPreferences,
    subscribe,
    default: defaultPreferences
  };
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = UserPreferencesManager;
}