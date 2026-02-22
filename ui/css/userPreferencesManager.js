const UserPreferences = {
  preferences: {},

  init() {
    this.loadPreferences();
  },

  loadPreferences() {
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

  savePreferences() {
    try {
      localStorage.setItem('userPreferences', JSON.stringify(this.preferences));
      return true;
    } catch (e) {
      console.error('Failed to save preferences:', e);
      return false;
    }
  },

  setPreference(key, value) {
    this.preferences[key] = value;
    return this.savePreferences();
  },

  getPreference(key, defaultValue = null) {
    return this.preferences[key] !== undefined ? this.preferences[key] : defaultValue;
  },

  removePreference(key) {
    delete this.preferences[key];
    return this.savePreferences();
  },

  clearAll() {
    this.preferences = {};
    localStorage.removeItem('userPreferences');
  },

  getAllPreferences() {
    return { ...this.preferences };
  }
};

UserPreferences.init();const userPreferences = {
  theme: 'light',
  language: 'en',
  notifications: true,
  fontSize: 16
};

const PREFERENCES_KEY = 'app_preferences';

function savePreferences() {
  try {
    localStorage.setItem(PREFERENCES_KEY, JSON.stringify(userPreferences));
    console.log('Preferences saved successfully');
    return true;
  } catch (error) {
    console.error('Failed to save preferences:', error);
    return false;
  }
}

function loadPreferences() {
  try {
    const saved = localStorage.getItem(PREFERENCES_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      Object.assign(userPreferences, parsed);
      console.log('Preferences loaded successfully');
      return true;
    }
  } catch (error) {
    console.error('Failed to load preferences:', error);
  }
  return false;
}

function updatePreference(key, value) {
  if (key in userPreferences) {
    userPreferences[key] = value;
    savePreferences();
    return true;
  }
  return false;
}

function resetPreferences() {
  const defaults = {
    theme: 'light',
    language: 'en',
    notifications: true,
    fontSize: 16
  };
  Object.assign(userPreferences, defaults);
  savePreferences();
}

function exportPreferences() {
  return JSON.stringify(userPreferences, null, 2);
}

function importPreferences(jsonString) {
  try {
    const imported = JSON.parse(jsonString);
    Object.assign(userPreferences, imported);
    savePreferences();
    return true;
  } catch (error) {
    console.error('Invalid preferences format:', error);
    return false;
  }
}

loadPreferences();