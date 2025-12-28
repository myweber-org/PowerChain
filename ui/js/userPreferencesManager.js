class UserPreferencesManager {
    constructor() {
        this.prefs = {};
        this.storageKey = 'appUserPreferences';
        this.storage = this._getAvailableStorage();
        this._loadPreferences();
    }

    _getAvailableStorage() {
        try {
            localStorage.setItem('test', 'test');
            localStorage.removeItem('test');
            return localStorage;
        } catch (e) {
            console.warn('LocalStorage unavailable, falling back to sessionStorage');
            return sessionStorage;
        }
    }

    _loadPreferences() {
        try {
            const stored = this.storage.getItem(this.storageKey);
            if (stored) {
                this.prefs = JSON.parse(stored);
            }
        } catch (error) {
            console.error('Failed to load preferences:', error);
            this.prefs = {};
        }
    }

    _savePreferences() {
        try {
            this.storage.setItem(this.storageKey, JSON.stringify(this.prefs));
        } catch (error) {
            console.error('Failed to save preferences:', error);
        }
    }

    setPreference(key, value) {
        this.prefs[key] = value;
        this._savePreferences();
        return this;
    }

    getPreference(key, defaultValue = null) {
        return this.prefs.hasOwnProperty(key) ? this.prefs[key] : defaultValue;
    }

    removePreference(key) {
        if (this.prefs.hasOwnProperty(key)) {
            delete this.prefs[key];
            this._savePreferences();
        }
        return this;
    }

    clearAllPreferences() {
        this.prefs = {};
        this.storage.removeItem(this.storageKey);
        return this;
    }

    getAllPreferences() {
        return { ...this.prefs };
    }

    hasPreference(key) {
        return this.prefs.hasOwnProperty(key);
    }
}

export default UserPreferencesManager;const UserPreferencesManager = (() => {
  const STORAGE_KEY = 'app_user_preferences';
  
  const defaultPreferences = {
    theme: 'light',
    language: 'en',
    notifications: true,
    fontSize: 16,
    autoSave: true,
    sidebarCollapsed: false
  };

  let currentPreferences = { ...defaultPreferences };

  const loadPreferences = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        currentPreferences = { ...defaultPreferences, ...parsed };
      }
    } catch (error) {
      console.warn('Failed to load preferences:', error);
    }
    return currentPreferences;
  };

  const savePreferences = (updates) => {
    try {
      currentPreferences = { ...currentPreferences, ...updates };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(currentPreferences));
      return true;
    } catch (error) {
      console.error('Failed to save preferences:', error);
      return false;
    }
  };

  const getPreference = (key) => {
    return currentPreferences[key] !== undefined 
      ? currentPreferences[key] 
      : defaultPreferences[key];
  };

  const resetToDefaults = () => {
    currentPreferences = { ...defaultPreferences };
    localStorage.removeItem(STORAGE_KEY);
    return currentPreferences;
  };

  const getAllPreferences = () => {
    return { ...currentPreferences };
  };

  const subscribe = (callback) => {
    const handler = (event) => {
      if (event.key === STORAGE_KEY) {
        loadPreferences();
        callback(getAllPreferences());
      }
    };
    window.addEventListener('storage', handler);
    
    return () => window.removeEventListener('storage', handler);
  };

  loadPreferences();

  return {
    get: getPreference,
    set: savePreferences,
    getAll: getAllPreferences,
    reset: resetToDefaults,
    subscribe
  };
})();

export default UserPreferencesManager;