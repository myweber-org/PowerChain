const UserPreferencesManager = (function() {
    const STORAGE_KEY = 'user_preferences';
    
    const defaultPreferences = {
        theme: 'light',
        language: 'en',
        notifications: true,
        fontSize: 16,
        autoSave: true,
        showTutorial: false
    };

    function getPreferences() {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                return { ...defaultPreferences, ...JSON.parse(stored) };
            }
        } catch (error) {
            console.warn('Failed to load preferences:', error);
        }
        return { ...defaultPreferences };
    }

    function savePreferences(preferences) {
        try {
            const current = getPreferences();
            const updated = { ...current, ...preferences };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
            return updated;
        } catch (error) {
            console.error('Failed to save preferences:', error);
            return null;
        }
    }

    function resetPreferences() {
        try {
            localStorage.removeItem(STORAGE_KEY);
            return { ...defaultPreferences };
        } catch (error) {
            console.error('Failed to reset preferences:', error);
            return null;
        }
    }

    function getPreference(key) {
        const preferences = getPreferences();
        return preferences[key] !== undefined ? preferences[key] : defaultPreferences[key];
    }

    function setPreference(key, value) {
        return savePreferences({ [key]: value });
    }

    function subscribe(callback) {
        if (typeof callback !== 'function') {
            throw new Error('Callback must be a function');
        }

        const originalSetItem = localStorage.setItem;
        localStorage.setItem = function(key, value) {
            originalSetItem.apply(this, arguments);
            if (key === STORAGE_KEY) {
                callback(getPreferences());
            }
        };

        return function unsubscribe() {
            localStorage.setItem = originalSetItem;
        };
    }

    return {
        getPreferences,
        savePreferences,
        resetPreferences,
        getPreference,
        setPreference,
        subscribe
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
      console.error('Failed to load preferences:', error);
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
    const current = loadPreferences();
    const updated = { ...current, [key]: value };
    return savePreferences(updated);
  };

  const resetToDefaults = () => {
    return savePreferences(defaultPreferences);
  };

  const getPreference = (key) => {
    const preferences = loadPreferences();
    return preferences[key];
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
    return () => window.removeEventListener('storage', handleStorageChange);
  };

  return {
    get: getPreference,
    getAll: getAllPreferences,
    set: updatePreference,
    reset: resetToDefaults,
    subscribe
  };
})();

export default UserPreferencesManager;