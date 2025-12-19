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

export default UserPreferencesManager;