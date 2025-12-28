const userPreferences = {
  theme: 'light',
  language: 'en',
  notifications: true,
  fontSize: 16
};

const PREFERENCES_KEY = 'app_preferences';

function savePreferences(prefs) {
  try {
    const serialized = JSON.stringify(prefs);
    localStorage.setItem(PREFERENCES_KEY, serialized);
    return true;
  } catch (error) {
    console.error('Failed to save preferences:', error);
    return false;
  }
}

function loadPreferences() {
  try {
    const stored = localStorage.getItem(PREFERENCES_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Failed to load preferences:', error);
  }
  return { ...userPreferences };
}

function updatePreference(key, value) {
  if (key in userPreferences) {
    const currentPrefs = loadPreferences();
    currentPrefs[key] = value;
    return savePreferences(currentPrefs);
  }
  return false;
}

function resetPreferences() {
  localStorage.removeItem(PREFERENCES_KEY);
  return { ...userPreferences };
}

function applyPreferences(prefs) {
  if (prefs.theme === 'dark') {
    document.documentElement.classList.add('dark-theme');
  } else {
    document.documentElement.classList.remove('dark-theme');
  }
  
  if (prefs.fontSize) {
    document.documentElement.style.fontSize = `${prefs.fontSize}px`;
  }
}

const preferences = loadPreferences();
applyPreferences(preferences);const userPreferencesManager = (() => {
  const PREF_KEY = 'app_preferences';
  const DEFAULT_PREFS = {
    theme: 'light',
    language: 'en',
    notifications: true,
    fontSize: 16
  };

  const loadPreferences = () => {
    try {
      const stored = localStorage.getItem(PREF_KEY);
      return stored ? JSON.parse(stored) : { ...DEFAULT_PREFS };
    } catch (error) {
      console.error('Failed to load preferences:', error);
      return { ...DEFAULT_PREFS };
    }
  };

  const savePreferences = (prefs) => {
    try {
      const current = loadPreferences();
      const updated = { ...current, ...prefs };
      localStorage.setItem(PREF_KEY, JSON.stringify(updated));
      return updated;
    } catch (error) {
      console.error('Failed to save preferences:', error);
      return null;
    }
  };

  const resetPreferences = () => {
    try {
      localStorage.setItem(PREF_KEY, JSON.stringify(DEFAULT_PREFS));
      return { ...DEFAULT_PREFS };
    } catch (error) {
      console.error('Failed to reset preferences:', error);
      return null;
    }
  };

  const getPreference = (key) => {
    const prefs = loadPreferences();
    return prefs[key] !== undefined ? prefs[key] : DEFAULT_PREFS[key];
  };

  const setPreference = (key, value) => {
    return savePreferences({ [key]: value });
  };

  const getAllPreferences = () => {
    return loadPreferences();
  };

  const clearPreferences = () => {
    try {
      localStorage.removeItem(PREF_KEY);
      return true;
    } catch (error) {
      console.error('Failed to clear preferences:', error);
      return false;
    }
  };

  return {
    load: loadPreferences,
    save: savePreferences,
    reset: resetPreferences,
    get: getPreference,
    set: setPreference,
    getAll: getAllPreferences,
    clear: clearPreferences
  };
})();

export default userPreferencesManager;