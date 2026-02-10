const UserPreferencesManager = (() => {
  const PREFIX = 'app_pref_';
  const DEFAULTS = {
    theme: 'light',
    fontSize: 16,
    notifications: true,
    language: 'en'
  };

  const validateKey = (key) => {
    if (!Object.keys(DEFAULTS).includes(key)) {
      throw new Error(`Invalid preference key: ${key}`);
    }
  };

  const get = (key) => {
    validateKey(key);
    const stored = localStorage.getItem(PREFIX + key);
    if (stored === null) return DEFAULTS[key];
    
    try {
      return JSON.parse(stored);
    } catch {
      return stored;
    }
  };

  const set = (key, value) => {
    validateKey(key);
    localStorage.setItem(PREFIX + key, JSON.stringify(value));
    window.dispatchEvent(new CustomEvent('preferencesChanged', {
      detail: { key, value }
    }));
  };

  const reset = () => {
    Object.keys(DEFAULTS).forEach(key => {
      localStorage.removeItem(PREFIX + key);
    });
    window.dispatchEvent(new CustomEvent('preferencesReset'));
  };

  const getAll = () => {
    return Object.keys(DEFAULTS).reduce((prefs, key) => {
      prefs[key] = get(key);
      return prefs;
    }, {});
  };

  const subscribe = (callback) => {
    window.addEventListener('preferencesChanged', (e) => {
      callback(e.detail.key, e.detail.value);
    });
  };

  return {
    get,
    set,
    reset,
    getAll,
    subscribe
  };
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = UserPreferencesManager;
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
        get: getPreference,
        set: setPreference,
        remove: removePreference,
        clear: clearAllPreferences,
        getAll: getAllPreferences
    };
})();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = UserPreferencesManager;
}