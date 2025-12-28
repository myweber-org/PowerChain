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
applyPreferences(preferences);