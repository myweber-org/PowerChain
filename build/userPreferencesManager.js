const UserPreferencesManager = (() => {
  const STORAGE_KEY = 'app_user_preferences';
  const DEFAULT_PREFERENCES = {
    theme: 'light',
    language: 'en',
    notifications: true,
    fontSize: 16,
    autoSave: false,
    timezone: 'UTC'
  };

  const validatePreference = (key, value) => {
    const validators = {
      theme: (val) => ['light', 'dark', 'auto'].includes(val),
      language: (val) => /^[a-z]{2}(-[A-Z]{2})?$/.test(val),
      notifications: (val) => typeof val === 'boolean',
      fontSize: (val) => Number.isInteger(val) && val >= 12 && val <= 24,
      autoSave: (val) => typeof val === 'boolean',
      timezone: (val) => Intl.supportedValuesOf('timeZone').includes(val)
    };
    
    return validators[key] ? validators[key](value) : false;
  };

  const loadPreferences = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return { ...DEFAULT_PREFERENCES };
      
      const parsed = JSON.parse(stored);
      const merged = { ...DEFAULT_PREFERENCES };
      
      Object.keys(parsed).forEach(key => {
        if (key in DEFAULT_PREFERENCES && validatePreference(key, parsed[key])) {
          merged[key] = parsed[key];
        }
      });
      
      return merged;
    } catch (error) {
      console.warn('Failed to load preferences, using defaults:', error);
      return { ...DEFAULT_PREFERENCES };
    }
  };

  const savePreferences = (updates) => {
    try {
      const current = loadPreferences();
      const updated = { ...current };
      
      Object.entries(updates).forEach(([key, value]) => {
        if (key in DEFAULT_PREFERENCES && validatePreference(key, value)) {
          updated[key] = value;
        }
      });
      
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return { success: true, preferences: updated };
    } catch (error) {
      console.error('Failed to save preferences:', error);
      return { success: false, error: error.message };
    }
  };

  const resetPreferences = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      return { success: true, preferences: { ...DEFAULT_PREFERENCES } };
    } catch (error) {
      console.error('Failed to reset preferences:', error);
      return { success: false, error: error.message };
    }
  };

  const exportPreferences = () => {
    const prefs = loadPreferences();
    return {
      data: prefs,
      meta: {
        exportedAt: new Date().toISOString(),
        version: '1.0.0',
        checksum: btoa(JSON.stringify(prefs)).slice(0, 32)
      }
    };
  };

  const importPreferences = (importData) => {
    if (!importData?.data || typeof importData.data !== 'object') {
      return { success: false, error: 'Invalid import data structure' };
    }
    
    return savePreferences(importData.data);
  };

  const getPreference = (key) => {
    const prefs = loadPreferences();
    return prefs[key] ?? null;
  };

  const subscribe = (callback) => {
    const handler = (event) => {
      if (event.key === STORAGE_KEY) {
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
    export: exportPreferences,
    import: importPreferences,
    get: getPreference,
    subscribe,
    defaults: { ...DEFAULT_PREFERENCES }
  };
})();

export default UserPreferencesManager;