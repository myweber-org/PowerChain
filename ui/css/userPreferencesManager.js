const UserPreferencesManager = (() => {
    const STORAGE_KEY = 'app_preferences';
    
    const defaultPreferences = {
        theme: 'light',
        fontSize: 16,
        notifications: true,
        language: 'en',
        autoSave: false,
        sidebarCollapsed: false
    };

    const getPreferences = () => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                return { ...defaultPreferences, ...JSON.parse(stored) };
            }
        } catch (error) {
            console.warn('Failed to load preferences:', error);
        }
        return { ...defaultPreferences };
    };

    const savePreferences = (updates) => {
        try {
            const current = getPreferences();
            const updated = { ...current, ...updates };
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
        get: getPreferences,
        set: savePreferences,
        reset: resetPreferences,
        subscribe,
        defaults: { ...defaultPreferences }
    };
})();const userPreferences = {
  theme: 'light',
  language: 'en',
  notifications: true,
  fontSize: 16
};

class PreferencesManager {
  constructor() {
    this.storageKey = 'user_preferences';
    this.loadPreferences();
  }

  loadPreferences() {
    const stored = localStorage.getItem(this.storageKey);
    if (stored) {
      try {
        Object.assign(userPreferences, JSON.parse(stored));
      } catch (error) {
        console.error('Failed to parse stored preferences:', error);
      }
    }
  }

  savePreferences() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(userPreferences));
      return true;
    } catch (error) {
      console.error('Failed to save preferences:', error);
      return false;
    }
  }

  updatePreference(key, value) {
    if (key in userPreferences) {
      userPreferences[key] = value;
      return this.savePreferences();
    }
    return false;
  }

  getPreference(key) {
    return userPreferences[key];
  }

  getAllPreferences() {
    return { ...userPreferences };
  }

  resetToDefaults() {
    const defaults = {
      theme: 'light',
      language: 'en',
      notifications: true,
      fontSize: 16
    };
    Object.assign(userPreferences, defaults);
    return this.savePreferences();
  }
}

const preferencesManager = new PreferencesManager();