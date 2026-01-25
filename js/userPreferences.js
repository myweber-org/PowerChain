function initializeUserPreferences(preferences) {
  const defaults = {
    theme: 'light',
    language: 'en',
    notifications: true,
    fontSize: 16,
    autoSave: false
  };

  if (!preferences || typeof preferences !== 'object') {
    return defaults;
  }

  const validated = { ...defaults };

  if (preferences.theme && ['light', 'dark', 'auto'].includes(preferences.theme)) {
    validated.theme = preferences.theme;
  }

  if (preferences.language && typeof preferences.language === 'string') {
    validated.language = preferences.language.toLowerCase();
  }

  if (typeof preferences.notifications === 'boolean') {
    validated.notifications = preferences.notifications;
  }

  if (typeof preferences.fontSize === 'number' && preferences.fontSize >= 12 && preferences.fontSize <= 24) {
    validated.fontSize = preferences.fontSize;
  }

  if (typeof preferences.autoSave === 'boolean') {
    validated.autoSave = preferences.autoSave;
  }

  return validated;
}

function savePreferences(preferences) {
  try {
    const validated = initializeUserPreferences(preferences);
    localStorage.setItem('userPreferences', JSON.stringify(validated));
    return { success: true, preferences: validated };
  } catch (error) {
    console.error('Failed to save preferences:', error);
    return { success: false, error: error.message };
  }
}

function loadPreferences() {
  try {
    const stored = localStorage.getItem('userPreferences');
    if (stored) {
      return initializeUserPreferences(JSON.parse(stored));
    }
    return initializeUserPreferences(null);
  } catch (error) {
    console.error('Failed to load preferences:', error);
    return initializeUserPreferences(null);
  }
}

export { initializeUserPreferences, savePreferences, loadPreferences };