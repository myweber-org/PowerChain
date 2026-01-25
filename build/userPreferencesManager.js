const UserPreferencesManager = (() => {
    const PREF_KEY = 'app_user_preferences';
    const DEFAULT_PREFERENCES = {
        theme: 'light',
        fontSize: 16,
        notifications: true,
        language: 'en',
        autoSave: false
    };

    function getPreferences() {
        try {
            const stored = localStorage.getItem(PREF_KEY);
            return stored ? { ...DEFAULT_PREFERENCES, ...JSON.parse(stored) } : { ...DEFAULT_PREFERENCES };
        } catch (error) {
            console.error('Failed to retrieve preferences:', error);
            return { ...DEFAULT_PREFERENCES };
        }
    }

    function updatePreferences(newPreferences) {
        try {
            const current = getPreferences();
            const updated = { ...current, ...newPreferences };
            localStorage.setItem(PREF_KEY, JSON.stringify(updated));
            return updated;
        } catch (error) {
            console.error('Failed to update preferences:', error);
            return null;
        }
    }

    function resetPreferences() {
        try {
            localStorage.removeItem(PREF_KEY);
            return { ...DEFAULT_PREFERENCES };
        } catch (error) {
            console.error('Failed to reset preferences:', error);
            return null;
        }
    }

    function getPreference(key) {
        const prefs = getPreferences();
        return prefs.hasOwnProperty(key) ? prefs[key] : null;
    }

    function setPreference(key, value) {
        return updatePreferences({ [key]: value });
    }

    function getAllPreferences() {
        return getPreferences();
    }

    function exportPreferences() {
        const prefs = getPreferences();
        return JSON.stringify(prefs, null, 2);
    }

    function importPreferences(jsonString) {
        try {
            const imported = JSON.parse(jsonString);
            return updatePreferences(imported);
        } catch (error) {
            console.error('Failed to import preferences:', error);
            return null;
        }
    }

    return {
        get: getPreference,
        set: setPreference,
        getAll: getAllPreferences,
        update: updatePreferences,
        reset: resetPreferences,
        export: exportPreferences,
        import: importPreferences
    };
})();const UserPreferencesManager = (() => {
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
      return { ...defaultPreferences };
    } catch (error) {
      console.error('Failed to retrieve preferences:', error);
      return { ...defaultPreferences };
    }
  };

  const savePreferences = (preferences) => {
    try {
      const current = getPreferences();
      const updated = {
        ...current,
        ...preferences,
        lastUpdated: new Date().toISOString()
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    } catch (error) {
      console.error('Failed to save preferences:', error);
      return null;
    }
  };

  const resetPreferences = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      return { ...defaultPreferences };
    } catch (error) {
      console.error('Failed to reset preferences:', error);
      return null;
    }
  };

  const subscribe = (callback) => {
    const storageHandler = (event) => {
      if (event.key === STORAGE_KEY) {
        callback(getPreferences());
      }
    };
    window.addEventListener('storage', storageHandler);
    
    return () => {
      window.removeEventListener('storage', storageHandler);
    };
  };

  return {
    getPreferences,
    savePreferences,
    resetPreferences,
    subscribe
  };
})();

export default UserPreferencesManager;