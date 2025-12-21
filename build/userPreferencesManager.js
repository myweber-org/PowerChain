const UserPreferencesManager = (() => {
  const STORAGE_KEY = 'app_preferences';
  const defaultPreferences = {
    theme: 'light',
    language: 'en',
    notifications: true,
    fontSize: 16,
    autoSave: true
  };

  const loadPreferences = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? { ...defaultPreferences, ...JSON.parse(stored) } : { ...defaultPreferences };
    } catch (error) {
      console.error('Failed to load preferences:', error);
      return { ...defaultPreferences };
    }
  };

  const savePreferences = (preferences) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
      return true;
    } catch (error) {
      console.error('Failed to save preferences:', error);
      return false;
    }
  };

  const resetPreferences = () => {
    localStorage.removeItem(STORAGE_KEY);
    return { ...defaultPreferences };
  };

  const validatePreference = (key, value) => {
    const validators = {
      theme: (v) => ['light', 'dark', 'auto'].includes(v),
      language: (v) => ['en', 'es', 'fr', 'de'].includes(v),
      notifications: (v) => typeof v === 'boolean',
      fontSize: (v) => Number.isInteger(v) && v >= 12 && v <= 24,
      autoSave: (v) => typeof v === 'boolean'
    };
    return validators[key] ? validators[key](value) : false;
  };

  return {
    getPreferences: () => loadPreferences(),
    
    updatePreference: (key, value) => {
      if (!validatePreference(key, value)) {
        throw new Error(`Invalid value for preference "${key}"`);
      }
      
      const current = loadPreferences();
      const updated = { ...current, [key]: value };
      
      if (savePreferences(updated)) {
        window.dispatchEvent(new CustomEvent('preferencesChanged', { 
          detail: { key, value, preferences: updated }
        }));
        return updated;
      }
      return current;
    },
    
    updateMultiplePreferences: (updates) => {
      const current = loadPreferences();
      const updated = { ...current };
      
      Object.entries(updates).forEach(([key, value]) => {
        if (validatePreference(key, value)) {
          updated[key] = value;
        }
      });
      
      if (savePreferences(updated)) {
        window.dispatchEvent(new CustomEvent('preferencesChanged', { 
          detail: { preferences: updated }
        }));
        return updated;
      }
      return current;
    },
    
    resetToDefaults: () => {
      const reset = resetPreferences();
      window.dispatchEvent(new CustomEvent('preferencesChanged', { 
        detail: { preferences: reset }
      }));
      return reset;
    },
    
    exportPreferences: () => {
      const prefs = loadPreferences();
      return JSON.stringify(prefs, null, 2);
    },
    
    importPreferences: (jsonString) => {
      try {
        const imported = JSON.parse(jsonString);
        const validated = {};
        
        Object.entries(imported).forEach(([key, value]) => {
          if (validatePreference(key, value)) {
            validated[key] = value;
          }
        });
        
        return this.updateMultiplePreferences(validated);
      } catch (error) {
        throw new Error('Invalid preferences format');
      }
    }
  };
})();

export default UserPreferencesManager;const UserPreferencesManager = (() => {
  const STORAGE_KEY = 'app_preferences';
  const DEFAULT_PREFERENCES = {
    theme: 'light',
    language: 'en',
    notifications: true,
    fontSize: 'medium'
  };

  const getPreferences = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? { ...DEFAULT_PREFERENCES, ...JSON.parse(stored) } : DEFAULT_PREFERENCES;
    } catch (error) {
      console.error('Failed to retrieve preferences:', error);
      return DEFAULT_PREFERENCES;
    }
  };

  const updatePreferences = (updates) => {
    try {
      const current = getPreferences();
      const updated = { ...current, ...updates };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    } catch (error) {
      console.error('Failed to update preferences:', error);
      return null;
    }
  };

  const resetPreferences = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      return DEFAULT_PREFERENCES;
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
    updatePreferences,
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
        fontSize: 'medium',
        autoSave: false,
        lastUpdated: null
    };

    function getPreferences() {
        try {
            const stored = localStorage.getItem(PREFERENCES_KEY);
            if (stored) {
                return JSON.parse(stored);
            }
            return { ...defaultPreferences };
        } catch (error) {
            console.error('Failed to retrieve preferences:', error);
            return { ...defaultPreferences };
        }
    }

    function savePreferences(preferences) {
        try {
            const mergedPreferences = {
                ...defaultPreferences,
                ...preferences,
                lastUpdated: new Date().toISOString()
            };
            localStorage.setItem(PREFERENCES_KEY, JSON.stringify(mergedPreferences));
            return true;
        } catch (error) {
            console.error('Failed to save preferences:', error);
            return false;
        }
    }

    function updatePreference(key, value) {
        const current = getPreferences();
        const updated = { ...current, [key]: value };
        return savePreferences(updated);
    }

    function resetToDefaults() {
        return savePreferences(defaultPreferences);
    }

    function exportPreferences() {
        const prefs = getPreferences();
        const blob = new Blob([JSON.stringify(prefs, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'user-preferences.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    function importPreferences(jsonString) {
        try {
            const imported = JSON.parse(jsonString);
            return savePreferences(imported);
        } catch (error) {
            console.error('Failed to import preferences:', error);
            return false;
        }
    }

    function subscribeToChanges(callback) {
        if (typeof callback !== 'function') {
            throw new Error('Callback must be a function');
        }

        const storageHandler = (event) => {
            if (event.key === PREFERENCES_KEY) {
                callback(getPreferences());
            }
        };

        window.addEventListener('storage', storageHandler);
        
        return () => {
            window.removeEventListener('storage', storageHandler);
        };
    }

    return {
        getPreferences,
        savePreferences,
        updatePreference,
        resetToDefaults,
        exportPreferences,
        importPreferences,
        subscribeToChanges
    };
})();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = userPreferencesManager;
}