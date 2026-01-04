const UserPreferencesManager = (() => {
  const STORAGE_KEY = 'app_preferences';
  
  const defaultPreferences = {
    theme: 'light',
    language: 'en',
    notifications: true,
    fontSize: 16,
    autoSave: true,
    sidebarCollapsed: false
  };

  const loadPreferences = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
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
      localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
      return true;
    } catch (error) {
      console.error('Failed to save preferences:', error);
      return false;
    }
  };

  const validatePreference = (key, value) => {
    const validators = {
      theme: (v) => ['light', 'dark', 'auto'].includes(v),
      language: (v) => /^[a-z]{2}(-[A-Z]{2})?$/.test(v),
      notifications: (v) => typeof v === 'boolean',
      fontSize: (v) => Number.isInteger(v) && v >= 12 && v <= 24,
      autoSave: (v) => typeof v === 'boolean',
      sidebarCollapsed: (v) => typeof v === 'boolean'
    };
    
    return validators[key] ? validators[key](value) : false;
  };

  let currentPreferences = loadPreferences();

  return {
    get: (key) => {
      if (key) {
        return currentPreferences[key];
      }
      return { ...currentPreferences };
    },

    set: (key, value) => {
      if (typeof key === 'object') {
        const updates = key;
        let hasChanges = false;
        
        Object.keys(updates).forEach(k => {
          if (validatePreference(k, updates[k])) {
            currentPreferences[k] = updates[k];
            hasChanges = true;
          }
        });
        
        if (hasChanges) {
          savePreferences(currentPreferences);
        }
        return hasChanges;
      }
      
      if (validatePreference(key, value)) {
        currentPreferences[key] = value;
        savePreferences(currentPreferences);
        return true;
      }
      return false;
    },

    reset: () => {
      currentPreferences = { ...defaultPreferences };
      localStorage.removeItem(STORAGE_KEY);
      return true;
    },

    subscribe: (callback) => {
      const handler = (event) => {
        if (event.key === STORAGE_KEY) {
          currentPreferences = loadPreferences();
          callback(currentPreferences);
        }
      };
      
      window.addEventListener('storage', handler);
      
      return () => {
        window.removeEventListener('storage', handler);
      };
    },

    export: () => {
      return JSON.stringify(currentPreferences);
    },

    import: (jsonString) => {
      try {
        const imported = JSON.parse(jsonString);
        return this.set(imported);
      } catch (error) {
        console.error('Failed to import preferences:', error);
        return false;
      }
    }
  };
})();

export default UserPreferencesManager;