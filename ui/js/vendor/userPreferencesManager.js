const userPreferencesManager = (() => {
    const defaultPreferences = {
        theme: 'light',
        language: 'en',
        notifications: true,
        fontSize: 16,
        autoSave: false
    };

    const storageKey = 'app_user_preferences';

    const getPreferences = () => {
        try {
            const stored = localStorage.getItem(storageKey);
            if (stored) {
                const parsed = JSON.parse(stored);
                return { ...defaultPreferences, ...parsed };
            }
        } catch (error) {
            console.warn('Failed to retrieve preferences from localStorage:', error);
        }
        return { ...defaultPreferences };
    };

    const updatePreference = (key, value) => {
        if (!Object.prototype.hasOwnProperty.call(defaultPreferences, key)) {
            throw new Error(`Invalid preference key: ${key}`);
        }

        const current = getPreferences();
        const updated = { ...current, [key]: value };

        try {
            localStorage.setItem(storageKey, JSON.stringify(updated));
            return updated;
        } catch (error) {
            console.error('Failed to save preference:', error);
            return current;
        }
    };

    const resetPreferences = () => {
        try {
            localStorage.removeItem(storageKey);
            return { ...defaultPreferences };
        } catch (error) {
            console.error('Failed to reset preferences:', error);
            return getPreferences();
        }
    };

    const subscribe = (callback) => {
        const handler = (event) => {
            if (event.key === storageKey) {
                callback(getPreferences());
            }
        };
        window.addEventListener('storage', handler);
        return () => window.removeEventListener('storage', handler);
    };

    return {
        getPreferences,
        updatePreference,
        resetPreferences,
        subscribe
    };
})();const UserPreferencesManager = (function() {
    const STORAGE_KEY = 'user_preferences';
    const DEFAULT_PREFERENCES = {
        theme: 'light',
        fontSize: 16,
        notifications: true,
        language: 'en'
    };

    function getStorage() {
        try {
            if (typeof localStorage !== 'undefined') {
                return localStorage;
            }
        } catch (e) {
            console.warn('localStorage not available, falling back to sessionStorage');
        }
        return sessionStorage;
    }

    function loadPreferences() {
        const storage = getStorage();
        const stored = storage.getItem(STORAGE_KEY);
        
        if (!stored) {
            return { ...DEFAULT_PREFERENCES };
        }

        try {
            const parsed = JSON.parse(stored);
            return { ...DEFAULT_PREFERENCES, ...parsed };
        } catch (error) {
            console.error('Failed to parse stored preferences:', error);
            return { ...DEFAULT_PREFERENCES };
        }
    }

    function savePreferences(preferences) {
        const storage = getStorage();
        const current = loadPreferences();
        const updated = { ...current, ...preferences };
        
        try {
            storage.setItem(STORAGE_KEY, JSON.stringify(updated));
            return true;
        } catch (error) {
            console.error('Failed to save preferences:', error);
            return false;
        }
    }

    function resetPreferences() {
        const storage = getStorage();
        try {
            storage.removeItem(STORAGE_KEY);
            return true;
        } catch (error) {
            console.error('Failed to reset preferences:', error);
            return false;
        }
    }

    function getPreference(key) {
        const preferences = loadPreferences();
        return preferences[key];
    }

    function setPreference(key, value) {
        return savePreferences({ [key]: value });
    }

    function getAllPreferences() {
        return loadPreferences();
    }

    function subscribe(callback) {
        if (typeof callback !== 'function') {
            throw new Error('Callback must be a function');
        }

        const originalSetItem = Storage.prototype.setItem;
        Storage.prototype.setItem = function(key, value) {
            originalSetItem.apply(this, [key, value]);
            if (key === STORAGE_KEY) {
                callback(JSON.parse(value));
            }
        };

        return function unsubscribe() {
            Storage.prototype.setItem = originalSetItem;
        };
    }

    return {
        get: getPreference,
        set: setPreference,
        getAll: getAllPreferences,
        save: savePreferences,
        reset: resetPreferences,
        subscribe: subscribe
    };
})();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = UserPreferencesManager;
}const userPreferencesManager = (() => {
    const STORAGE_KEY = 'app_preferences';
    
    const defaultPreferences = {
        theme: 'light',
        fontSize: 'medium',
        notifications: true,
        language: 'en',
        autoSave: false
    };

    function getPreferences() {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            return stored ? { ...defaultPreferences, ...JSON.parse(stored) } : { ...defaultPreferences };
        } catch (error) {
            console.error('Failed to retrieve preferences:', error);
            return { ...defaultPreferences };
        }
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
        const prefs = getPreferences();
        return prefs[key] !== undefined ? prefs[key] : defaultPreferences[key];
    }

    function setPreference(key, value) {
        return savePreferences({ [key]: value });
    }

    function subscribe(callback) {
        window.addEventListener('storage', (event) => {
            if (event.key === STORAGE_KEY) {
                callback(getPreferences());
            }
        });
    }

    return {
        get: getPreference,
        set: setPreference,
        getAll: getPreferences,
        save: savePreferences,
        reset: resetPreferences,
        subscribe
    };
})();class UserPreferencesManager {
    constructor() {
        this.preferences = this.loadPreferences();
    }

    loadPreferences() {
        const stored = localStorage.getItem('userPreferences');
        return stored ? JSON.parse(stored) : {
            theme: 'light',
            language: 'en',
            notifications: true,
            fontSize: 16
        };
    }

    savePreferences() {
        localStorage.setItem('userPreferences', JSON.stringify(this.preferences));
        return true;
    }

    updatePreference(key, value) {
        if (key in this.preferences) {
            this.preferences[key] = value;
            this.savePreferences();
            return true;
        }
        return false;
    }

    getPreference(key) {
        return this.preferences[key];
    }

    getAllPreferences() {
        return { ...this.preferences };
    }

    resetToDefaults() {
        this.preferences = {
            theme: 'light',
            language: 'en',
            notifications: true,
            fontSize: 16
        };
        this.savePreferences();
    }
}

export default UserPreferencesManager;const UserPreferencesManager = (() => {
  const PREFIX = 'app_pref_';
  const DEFAULT_PREFERENCES = {
    theme: 'light',
    fontSize: 16,
    notifications: true,
    language: 'en',
    autoSave: false,
    sidebarCollapsed: false
  };

  const validateKey = (key) => {
    if (!Object.keys(DEFAULT_PREFERENCES).includes(key)) {
      throw new Error(`Invalid preference key: ${key}`);
    }
  };

  const getStorageKey = (key) => `${PREFIX}${key}`;

  const getAll = () => {
    const preferences = { ...DEFAULT_PREFERENCES };
    
    Object.keys(DEFAULT_PREFERENCES).forEach(key => {
      const storedValue = localStorage.getItem(getStorageKey(key));
      if (storedValue !== null) {
        try {
          preferences[key] = JSON.parse(storedValue);
        } catch {
          preferences[key] = storedValue;
        }
      }
    });
    
    return preferences;
  };

  const get = (key) => {
    validateKey(key);
    const storedValue = localStorage.getItem(getStorageKey(key));
    
    if (storedValue === null) {
      return DEFAULT_PREFERENCES[key];
    }
    
    try {
      return JSON.parse(storedValue);
    } catch {
      return storedValue;
    }
  };

  const set = (key, value) => {
    validateKey(key);
    const storageKey = getStorageKey(key);
    
    if (value === undefined || value === null) {
      localStorage.removeItem(storageKey);
      return;
    }
    
    const valueToStore = typeof value === 'object' 
      ? JSON.stringify(value) 
      : String(value);
    
    localStorage.setItem(storageKey, valueToStore);
    
    const event = new CustomEvent('preferenceChanged', {
      detail: { key, value, oldValue: get(key) }
    });
    window.dispatchEvent(event);
  };

  const reset = (key = null) => {
    if (key) {
      validateKey(key);
      localStorage.removeItem(getStorageKey(key));
    } else {
      Object.keys(DEFAULT_PREFERENCES).forEach(k => {
        localStorage.removeItem(getStorageKey(k));
      });
    }
  };

  const subscribe = (callback) => {
    window.addEventListener('preferenceChanged', callback);
    return () => window.removeEventListener('preferenceChanged', callback);
  };

  const exportPreferences = () => {
    const prefs = getAll();
    const blob = new Blob([JSON.stringify(prefs, null, 2)], { 
      type: 'application/json' 
    });
    return URL.createObjectURL(blob);
  };

  const importPreferences = (jsonString) => {
    try {
      const imported = JSON.parse(jsonString);
      Object.keys(imported).forEach(key => {
        if (Object.keys(DEFAULT_PREFERENCES).includes(key)) {
          set(key, imported[key]);
        }
      });
      return true;
    } catch {
      return false;
    }
  };

  return {
    get,
    set,
    getAll,
    reset,
    subscribe,
    exportPreferences,
    importPreferences,
    DEFAULT_PREFERENCES
  };
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = UserPreferencesManager;
}const userPreferencesManager = (() => {
    const STORAGE_KEY = 'user_preferences';
    const DEFAULT_PREFERENCES = {
        theme: 'light',
        language: 'en',
        fontSize: 16,
        notificationsEnabled: true
    };

    const getPreferences = () => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            return stored ? JSON.parse(stored) : { ...DEFAULT_PREFERENCES };
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
            localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_PREFERENCES));
            return { ...DEFAULT_PREFERENCES };
        } catch (error) {
            console.error('Error resetting preferences:', error);
            return null;
        }
    };

    const getPreference = (key) => {
        const preferences = getPreferences();
        return preferences[key] !== undefined ? preferences[key] : DEFAULT_PREFERENCES[key];
    };

    const setPreference = (key, value) => {
        return savePreferences({ [key]: value });
    };

    const applyTheme = () => {
        const theme = getPreference('theme');
        document.documentElement.setAttribute('data-theme', theme);
    };

    const applyFontSize = () => {
        const fontSize = getPreference('fontSize');
        document.documentElement.style.fontSize = `${fontSize}px`;
    };

    const initialize = () => {
        applyTheme();
        applyFontSize();
    };

    return {
        getPreferences,
        savePreferences,
        resetPreferences,
        getPreference,
        setPreference,
        applyTheme,
        applyFontSize,
        initialize
    };
})();

export default userPreferencesManager;