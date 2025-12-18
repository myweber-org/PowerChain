const userPreferencesManager = (() => {
  const STORAGE_KEY = 'app_user_preferences';
  
  const defaultPreferences = {
    theme: 'light',
    fontSize: 16,
    notifications: true,
    language: 'en',
    autoSave: false,
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
      console.warn('Failed to load user preferences:', error);
    }
    return currentPreferences;
  };

  const savePreferences = (updates) => {
    try {
      currentPreferences = { ...currentPreferences, ...updates };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(currentPreferences));
      return true;
    } catch (error) {
      console.error('Failed to save user preferences:', error);
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
  module.exports = userPreferencesManager;
}