const userPreferencesManager = (() => {
  const STORAGE_KEY = 'app_user_preferences';
  const DEFAULT_PREFERENCES = {
    theme: 'light',
    language: 'en',
    notifications: true,
    fontSize: 16,
    autoSave: false
  };

  const getPreferences = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return { ...DEFAULT_PREFERENCES, ...parsed };
      }
    } catch (error) {
      console.warn('Failed to load user preferences:', error);
    }
    return { ...DEFAULT_PREFERENCES };
  };

  const updatePreferences = (updates) => {
    if (!updates || typeof updates !== 'object') {
      throw new Error('Updates must be a valid object');
    }

    const current = getPreferences();
    const merged = { ...current, ...updates };
    
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
      return merged;
    } catch (error) {
      console.error('Failed to save preferences:', error);
      throw error;
    }
  };

  const resetPreferences = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      return { ...DEFAULT_PREFERENCES };
    } catch (error) {
      console.error('Failed to reset preferences:', error);
      throw error;
    }
  };

  const getPreference = (key) => {
    const prefs = getPreferences();
    return prefs[key];
  };

  const subscribe = (callback) => {
    if (typeof callback !== 'function') {
      throw new Error('Callback must be a function');
    }

    const handler = (event) => {
      if (event.key === STORAGE_KEY) {
        callback(getPreferences());
      }
    };

    window.addEventListener('storage', handler);
    
    return () => {
      window.removeEventListener('storage', handler);
    };
  };

  return {
    getPreferences,
    updatePreferences,
    resetPreferences,
    getPreference,
    subscribe
  };
})();