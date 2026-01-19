const UserPreferencesManager = (function() {
    const STORAGE_KEY = 'app_preferences';
    const DEFAULT_PREFERENCES = {
        theme: 'light',
        fontSize: 16,
        notifications: true,
        language: 'en',
        autoSave: true,
        sidebarCollapsed: false
    };

    let currentPreferences = { ...DEFAULT_PREFERENCES };

    function loadPreferences() {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                const parsed = JSON.parse(stored);
                currentPreferences = { ...DEFAULT_PREFERENCES, ...parsed };
            }
        } catch (error) {
            console.warn('Failed to load preferences:', error);
        }
        return currentPreferences;
    }

    function savePreferences() {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(currentPreferences));
            return true;
        } catch (error) {
            console.error('Failed to save preferences:', error);
            return false;
        }
    }

    function updatePreferences(updates) {
        if (!updates || typeof updates !== 'object') {
            throw new Error('Updates must be an object');
        }

        const validKeys = Object.keys(DEFAULT_PREFERENCES);
        const filteredUpdates = {};

        for (const [key, value] of Object.entries(updates)) {
            if (validKeys.includes(key)) {
                filteredUpdates[key] = value;
            }
        }

        currentPreferences = { ...currentPreferences, ...filteredUpdates };
        return savePreferences();
    }

    function resetToDefaults() {
        currentPreferences = { ...DEFAULT_PREFERENCES };
        localStorage.removeItem(STORAGE_KEY);
        return true;
    }

    function getPreference(key) {
        if (!key || !DEFAULT_PREFERENCES.hasOwnProperty(key)) {
            throw new Error(`Invalid preference key: ${key}`);
        }
        return currentPreferences[key];
    }

    function getAllPreferences() {
        return { ...currentPreferences };
    }

    function subscribeToChanges(callback) {
        if (typeof callback !== 'function') {
            throw new Error('Callback must be a function');
        }

        const originalSetItem = localStorage.setItem;
        localStorage.setItem = function(key, value) {
            const result = originalSetItem.apply(this, arguments);
            if (key === STORAGE_KEY) {
                try {
                    const newPrefs = JSON.parse(value);
                    callback(newPrefs);
                } catch (error) {
                    console.warn('Failed to parse updated preferences:', error);
                }
            }
            return result;
        };

        return function unsubscribe() {
            localStorage.setItem = originalSetItem;
        };
    }

    loadPreferences();

    return {
        get: getPreference,
        getAll: getAllPreferences,
        update: updatePreferences,
        reset: resetToDefaults,
        subscribe: subscribeToChanges
    };
})();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = UserPreferencesManager;
}const UserPreferencesManager = (() => {
  const STORAGE_KEY = 'app_preferences';
  const DEFAULT_PREFERENCES = {
    theme: 'light',
    notifications: true,
    language: 'en',
    fontSize: 14,
    autoSave: false
  };

  const loadPreferences = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return { ...DEFAULT_PREFERENCES, ...JSON.parse(stored) };
      }
    } catch (error) {
      console.error('Failed to load preferences:', error);
    }
    return { ...DEFAULT_PREFERENCES };
  };

  const savePreferences = (preferences) => {
    try {
      const current = loadPreferences();
      const updated = { ...current, ...preferences };
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
      return { ...DEFAULT_PREFERENCES };
    } catch (error) {
      console.error('Failed to reset preferences:', error);
      return null;
    }
  };

  const getPreference = (key) => {
    const preferences = loadPreferences();
    return preferences[key] !== undefined ? preferences[key] : null;
  };

  const setPreference = (key, value) => {
    return savePreferences({ [key]: value });
  };

  const getAllPreferences = () => {
    return loadPreferences();
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
    reset: resetPreferences,
    get: getPreference,
    set: setPreference,
    getAll: getAllPreferences,
    subscribe
  };
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = UserPreferencesManager;
}