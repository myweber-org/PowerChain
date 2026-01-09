const UserPreferencesManager = (() => {
  const PREFIX = 'app_pref_';
  const DEFAULTS = {
    theme: 'light',
    language: 'en',
    notifications: true,
    fontSize: 16
  };

  const validateKey = (key) => {
    if (!Object.keys(DEFAULTS).includes(key)) {
      throw new Error(`Invalid preference key: ${key}`);
    }
  };

  const get = (key) => {
    validateKey(key);
    const stored = localStorage.getItem(PREFIX + key);
    if (stored !== null) {
      try {
        return JSON.parse(stored);
      } catch {
        return DEFAULTS[key];
      }
    }
    return DEFAULTS[key];
  };

  const set = (key, value) => {
    validateKey(key);
    localStorage.setItem(PREFIX + key, JSON.stringify(value));
    dispatchEvent(new CustomEvent('preferencesChanged', { 
      detail: { key, value }
    }));
  };

  const reset = (key) => {
    if (key) {
      validateKey(key);
      localStorage.removeItem(PREFIX + key);
      set(key, DEFAULTS[key]);
    } else {
      Object.keys(DEFAULTS).forEach(k => {
        localStorage.removeItem(PREFIX + k);
        set(k, DEFAULTS[k]);
      });
    }
  };

  const getAll = () => {
    return Object.keys(DEFAULTS).reduce((acc, key) => {
      acc[key] = get(key);
      return acc;
    }, {});
  };

  const subscribe = (callback) => {
    addEventListener('preferencesChanged', callback);
    return () => removeEventListener('preferencesChanged', callback);
  };

  return {
    get,
    set,
    reset,
    getAll,
    subscribe,
    defaults: DEFAULTS
  };
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = UserPreferencesManager;
}