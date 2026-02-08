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
}