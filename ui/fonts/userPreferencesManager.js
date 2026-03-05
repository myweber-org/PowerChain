class UserPreferencesManager {
  constructor() {
    this.prefs = this.loadPreferences();
  }

  loadPreferences() {
    const saved = localStorage.getItem('userPreferences');
    return saved ? JSON.parse(saved) : {
      theme: 'light',
      language: 'en',
      notifications: true,
      fontSize: 16
    };
  }

  savePreferences() {
    localStorage.setItem('userPreferences', JSON.stringify(this.prefs));
  }

  setPreference(key, value) {
    if (this.prefs.hasOwnProperty(key)) {
      this.prefs[key] = value;
      this.savePreferences();
      return true;
    }
    return false;
  }

  getPreference(key) {
    return this.prefs[key];
  }

  getAllPreferences() {
    return { ...this.prefs };
  }

  resetToDefaults() {
    this.prefs = {
      theme: 'light',
      language: 'en',
      notifications: true,
      fontSize: 16
    };
    this.savePreferences();
  }
}

const preferencesManager = new UserPreferencesManager();const userPreferencesManager = (() => {
  const STORAGE_KEY = 'app_preferences';
  
  const defaultPreferences = {
    theme: 'light',
    fontSize: 16,
    notifications: true,
    language: 'en',
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

  const savePreferences = (updates) => {
    try {
      const current = getPreferences();
      const updated = {
        ...current,
        ...updates,
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
    const handler = (event) => {
      if (event.key === STORAGE_KEY) {
        callback(getPreferences());
      }
    };
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  };

  return {
    getPreferences,
    savePreferences,
    resetPreferences,
    subscribe
  };
})();

export default userPreferencesManager;const UserPreferencesManager = {
    storageKey: 'user_preferences',

    defaults: {
        theme: 'light',
        fontSize: 16,
        notifications: true,
        language: 'en',
        autoSave: true
    },

    init() {
        if (!this.load()) {
            this.save(this.defaults);
        }
    },

    load() {
        try {
            const data = localStorage.getItem(this.storageKey);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error('Failed to load preferences:', error);
            return null;
        }
    },

    save(preferences) {
        try {
            const merged = { ...this.defaults, ...preferences };
            localStorage.setItem(this.storageKey, JSON.stringify(merged));
            return true;
        } catch (error) {
            console.error('Failed to save preferences:', error);
            return false;
        }
    },

    get(key) {
        const prefs = this.load();
        return prefs ? prefs[key] : this.defaults[key];
    },

    set(key, value) {
        const prefs = this.load() || this.defaults;
        prefs[key] = value;
        return this.save(prefs);
    },

    reset() {
        return this.save(this.defaults);
    },

    getAll() {
        return this.load() || this.defaults;
    },

    export() {
        return JSON.stringify(this.getAll(), null, 2);
    },

    import(jsonString) {
        try {
            const data = JSON.parse(jsonString);
            return this.save(data);
        } catch (error) {
            console.error('Invalid preferences data:', error);
            return false;
        }
    }
};

UserPreferencesManager.init();const UserPreferencesManager = (() => {
  const STORAGE_KEY = 'user_preferences';
  const DEFAULT_PREFERENCES = {
    theme: 'light',
    language: 'en',
    notifications: true,
    fontSize: 16,
    autoSave: true
  };

  let currentPreferences = { ...DEFAULT_PREFERENCES };

  const loadPreferences = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        currentPreferences = { ...DEFAULT_PREFERENCES, ...parsed };
      }
      return currentPreferences;
    } catch (error) {
      console.error('Failed to load preferences:', error);
      return currentPreferences;
    }
  };

  const savePreferences = (updates) => {
    try {
      currentPreferences = { ...currentPreferences, ...updates };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(currentPreferences));
      return currentPreferences;
    } catch (error) {
      console.error('Failed to save preferences:', error);
      return null;
    }
  };

  const resetPreferences = () => {
    currentPreferences = { ...DEFAULT_PREFERENCES };
    localStorage.removeItem(STORAGE_KEY);
    return currentPreferences;
  };

  const getPreference = (key) => {
    return currentPreferences[key] !== undefined 
      ? currentPreferences[key] 
      : DEFAULT_PREFERENCES[key];
  };

  const getAllPreferences = () => {
    return { ...currentPreferences };
  };

  const hasCustomPreferences = () => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored !== null && stored !== JSON.stringify(DEFAULT_PREFERENCES);
  };

  loadPreferences();

  return {
    save: savePreferences,
    load: loadPreferences,
    reset: resetPreferences,
    get: getPreference,
    getAll: getAllPreferences,
    hasCustom: hasCustomPreferences,
    defaults: DEFAULT_PREFERENCES
  };
})();

export default UserPreferencesManager;