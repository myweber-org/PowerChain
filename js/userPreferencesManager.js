const UserPreferencesManager = {
  preferences: {},

  init() {
    this.loadPreferences();
    this.setupAutoSave();
  },

  loadPreferences() {
    try {
      const saved = localStorage.getItem('userPreferences');
      if (saved) {
        this.preferences = JSON.parse(saved);
        this.applyPreferences();
      }
    } catch (error) {
      console.error('Failed to load preferences:', error);
      this.preferences = this.getDefaultPreferences();
    }
  },

  savePreferences() {
    try {
      localStorage.setItem('userPreferences', JSON.stringify(this.preferences));
      this.dispatchEvent('preferencesSaved', this.preferences);
    } catch (error) {
      console.error('Failed to save preferences:', error);
    }
  },

  getDefaultPreferences() {
    return {
      theme: 'light',
      fontSize: 16,
      notifications: true,
      language: 'en',
      autoSave: true
    };
  },

  updatePreference(key, value) {
    if (key in this.preferences) {
      this.preferences[key] = value;
      this.savePreferences();
      this.applyPreference(key, value);
      return true;
    }
    return false;
  },

  applyPreferences() {
    Object.entries(this.preferences).forEach(([key, value]) => {
      this.applyPreference(key, value);
    });
  },

  applyPreference(key, value) {
    switch (key) {
      case 'theme':
        document.documentElement.setAttribute('data-theme', value);
        break;
      case 'fontSize':
        document.documentElement.style.fontSize = `${value}px`;
        break;
      case 'notifications':
        this.toggleNotifications(value);
        break;
    }
  },

  toggleNotifications(enabled) {
    if (enabled && 'Notification' in window) {
      if (Notification.permission === 'granted') {
        console.log('Notifications enabled');
      } else if (Notification.permission !== 'denied') {
        Notification.requestPermission();
      }
    }
  },

  setupAutoSave() {
    if (this.preferences.autoSave) {
      window.addEventListener('beforeunload', () => this.savePreferences());
    }
  },

  resetToDefaults() {
    this.preferences = this.getDefaultPreferences();
    this.savePreferences();
    this.applyPreferences();
  },

  addEventListener(event, callback) {
    window.addEventListener(`preferences:${event}`, callback);
  },

  dispatchEvent(event, data) {
    window.dispatchEvent(new CustomEvent(`preferences:${event}`, { detail: data }));
  },

  exportPreferences() {
    const dataStr = JSON.stringify(this.preferences, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = 'user-preferences.json';
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  },

  importPreferences(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const imported = JSON.parse(e.target.result);
        this.preferences = { ...this.preferences, ...imported };
        this.savePreferences();
        this.applyPreferences();
        this.dispatchEvent('preferencesImported', this.preferences);
      } catch (error) {
        console.error('Failed to import preferences:', error);
        this.dispatchEvent('importError', error);
      }
    };
    reader.readAsText(file);
  }
};

Object.freeze(UserPreferencesManager);const UserPreferencesManager = (() => {
    const STORAGE_KEY = 'app_preferences';
    
    const defaultPreferences = {
        theme: 'light',
        fontSize: 16,
        notifications: true,
        language: 'en',
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
            console.error('Failed to load preferences:', error);
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

    const resetToDefaults = () => {
        currentPreferences = { ...defaultPreferences };
        localStorage.removeItem(STORAGE_KEY);
        return currentPreferences;
    };

    const getPreference = (key) => {
        return currentPreferences[key] !== undefined 
            ? currentPreferences[key] 
            : defaultPreferences[key];
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
        getAll: getAllPreferences,
        set: savePreferences,
        reset: resetToDefaults,
        subscribe,
        defaults: { ...defaultPreferences }
    };
})();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = UserPreferencesManager;
}const userPreferencesManager = (() => {
  const STORAGE_KEY = 'app_user_preferences';
  const defaultPreferences = {
    theme: 'light',
    language: 'en',
    notifications: true,
    fontSize: 'medium',
    autoSave: false
  };

  function getPreferences() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultPreferences));
      return { ...defaultPreferences };
    }
    
    try {
      const parsed = JSON.parse(stored);
      return { ...defaultPreferences, ...parsed };
    } catch {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultPreferences));
      return { ...defaultPreferences };
    }
  }

  function updatePreferences(newPreferences) {
    const current = getPreferences();
    const updated = { ...current, ...newPreferences };
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    dispatchEvent(new CustomEvent('preferencesChanged', { detail: updated }));
    return updated;
  }

  function resetPreferences() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultPreferences));
    dispatchEvent(new CustomEvent('preferencesChanged', { detail: defaultPreferences }));
    return { ...defaultPreferences };
  }

  function getPreference(key) {
    const prefs = getPreferences();
    return prefs[key] !== undefined ? prefs[key] : defaultPreferences[key];
  }

  function subscribe(callback) {
    const handler = (event) => callback(event.detail);
    addEventListener('preferencesChanged', handler);
    
    return () => {
      removeEventListener('preferencesChanged', handler);
    };
  }

  return {
    getPreferences,
    updatePreferences,
    resetPreferences,
    getPreference,
    subscribe
  };
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = userPreferencesManager;
}const UserPreferencesManager = (() => {
  const STORAGE_KEY = 'app_user_preferences';
  const DEFAULT_PREFERENCES = {
    theme: 'light',
    fontSize: 16,
    notificationsEnabled: true,
    language: 'en',
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
      console.warn('Failed to retrieve preferences:', error);
    }
    return { ...DEFAULT_PREFERENCES };
  };

  const updatePreference = (key, value) => {
    if (!Object.prototype.hasOwnProperty.call(DEFAULT_PREFERENCES, key)) {
      throw new Error(`Invalid preference key: ${key}`);
    }

    const current = getPreferences();
    const updated = { ...current, [key]: value };

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    } catch (error) {
      console.error('Failed to save preference:', error);
      return current;
    }
  };

  const resetPreferences = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      return { ...DEFAULT_PREFERENCES };
    } catch (error) {
      console.error('Failed to reset preferences:', error);
      return getPreferences();
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
    updatePreference,
    resetPreferences,
    subscribe
  };
})();

export default UserPreferencesManager;const userPreferencesManager = (() => {
  const PREFERENCES_KEY = 'app_preferences';
  
  const defaultPreferences = {
    theme: 'light',
    language: 'en',
    notifications: true,
    fontSize: 16,
    autoSave: false
  };

  const getPreferences = () => {
    try {
      const stored = localStorage.getItem(PREFERENCES_KEY);
      return stored ? { ...defaultPreferences, ...JSON.parse(stored) } : { ...defaultPreferences };
    } catch (error) {
      console.error('Error reading preferences:', error);
      return { ...defaultPreferences };
    }
  };

  const savePreferences = (preferences) => {
    try {
      const current = getPreferences();
      const updated = { ...current, ...preferences };
      localStorage.setItem(PREFERENCES_KEY, JSON.stringify(updated));
      return updated;
    } catch (error) {
      console.error('Error saving preferences:', error);
      return null;
    }
  };

  const resetPreferences = () => {
    try {
      localStorage.removeItem(PREFERENCES_KEY);
      return { ...defaultPreferences };
    } catch (error) {
      console.error('Error resetting preferences:', error);
      return null;
    }
  };

  const getPreference = (key) => {
    const preferences = getPreferences();
    return preferences[key] !== undefined ? preferences[key] : defaultPreferences[key];
  };

  const setPreference = (key, value) => {
    return savePreferences({ [key]: value });
  };

  const subscribe = (callback) => {
    const handler = (event) => {
      if (event.key === PREFERENCES_KEY) {
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
    getPreference,
    setPreference,
    subscribe
  };
})();

export default userPreferencesManager;const userPreferencesManager = (() => {
    const PREFERENCES_KEY = 'app_preferences';
    
    const defaultPreferences = {
        theme: 'light',
        fontSize: 'medium',
        notifications: true,
        language: 'en',
        autoSave: false,
        sidebarCollapsed: false
    };

    const loadPreferences = () => {
        try {
            const stored = localStorage.getItem(PREFERENCES_KEY);
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
            const merged = { ...loadPreferences(), ...preferences };
            localStorage.setItem(PREFERENCES_KEY, JSON.stringify(merged));
            return merged;
        } catch (error) {
            console.error('Failed to save preferences:', error);
            return null;
        }
    };

    const resetPreferences = () => {
        try {
            localStorage.removeItem(PREFERENCES_KEY);
            return { ...defaultPreferences };
        } catch (error) {
            console.error('Failed to reset preferences:', error);
            return null;
        }
    };

    const getPreference = (key) => {
        const prefs = loadPreferences();
        return prefs[key] !== undefined ? prefs[key] : defaultPreferences[key];
    };

    const setPreference = (key, value) => {
        return savePreferences({ [key]: value });
    };

    const subscribe = (callback) => {
        const handler = (event) => {
            if (event.key === PREFERENCES_KEY) {
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
        subscribe,
        defaultPreferences
    };
})();

export default userPreferencesManager;