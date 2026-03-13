const UserPreferencesManager = (() => {
  const STORAGE_KEY = 'app_user_preferences';
  
  const defaultPreferences = {
    theme: 'light',
    language: 'en',
    notifications: true,
    fontSize: 16,
    autoSave: false,
    lastUpdated: null
  };

  const getPreferences = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return { ...defaultPreferences };
      
      const parsed = JSON.parse(stored);
      return { ...defaultPreferences, ...parsed };
    } catch (error) {
      console.error('Failed to retrieve preferences:', error);
      return { ...defaultPreferences };
    }
  };

  const savePreferences = (updates) => {
    try {
      const current = getPreferences();
      const merged = { 
        ...current, 
        ...updates, 
        lastUpdated: new Date().toISOString() 
      };
      
      localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
      return { success: true, preferences: merged };
    } catch (error) {
      console.error('Failed to save preferences:', error);
      return { success: false, error: error.message };
    }
  };

  const resetPreferences = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      return { success: true };
    } catch (error) {
      console.error('Failed to reset preferences:', error);
      return { success: false, error: error.message };
    }
  };

  const subscribe = (callback) => {
    const handler = (event) => {
      if (event.key === STORAGE_KEY && event.newValue) {
        try {
          callback(JSON.parse(event.newValue));
        } catch (error) {
          console.error('Failed to parse updated preferences:', error);
        }
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

if (typeof module !== 'undefined' && module.exports) {
  module.exports = UserPreferencesManager;
}const userPreferencesManager = {
    preferences: {},

    init() {
        const stored = localStorage.getItem('userPreferences');
        if (stored) {
            try {
                this.preferences = JSON.parse(stored);
            } catch (e) {
                console.error('Failed to parse stored preferences:', e);
                this.preferences = {};
            }
        }
    },

    setPreference(key, value) {
        this.preferences[key] = value;
        this.save();
    },

    getPreference(key, defaultValue = null) {
        return this.preferences[key] !== undefined ? this.preferences[key] : defaultValue;
    },

    removePreference(key) {
        delete this.preferences[key];
        this.save();
    },

    clearAll() {
        this.preferences = {};
        localStorage.removeItem('userPreferences');
    },

    save() {
        localStorage.setItem('userPreferences', JSON.stringify(this.preferences));
    }
};

userPreferencesManager.init();