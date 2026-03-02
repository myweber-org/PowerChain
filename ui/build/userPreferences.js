const defaultPreferences = {
  theme: 'light',
  language: 'en',
  notifications: true,
  fontSize: 16
};

function validatePreferences(userPrefs) {
  const validPrefs = { ...defaultPreferences };
  
  if (userPrefs && typeof userPrefs === 'object') {
    if (['light', 'dark', 'auto'].includes(userPrefs.theme)) {
      validPrefs.theme = userPrefs.theme;
    }
    
    if (['en', 'es', 'fr', 'de'].includes(userPrefs.language)) {
      validPrefs.language = userPrefs.language;
    }
    
    if (typeof userPrefs.notifications === 'boolean') {
      validPrefs.notifications = userPrefs.notifications;
    }
    
    if (typeof userPrefs.fontSize === 'number' && userPrefs.fontSize >= 12 && userPrefs.fontSize <= 24) {
      validPrefs.fontSize = userPrefs.fontSize;
    }
  }
  
  return validPrefs;
}

function savePreferences(prefs) {
  const validated = validatePreferences(prefs);
  localStorage.setItem('userPreferences', JSON.stringify(validated));
  return validated;
}

function loadPreferences() {
  const stored = localStorage.getItem('userPreferences');
  if (stored) {
    try {
      return validatePreferences(JSON.parse(stored));
    } catch {
      return defaultPreferences;
    }
  }
  return defaultPreferences;
}

export { validatePreferences, savePreferences, loadPreferences, defaultPreferences };