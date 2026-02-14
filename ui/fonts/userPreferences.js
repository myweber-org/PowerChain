const defaultPreferences = {
  theme: 'light',
  notifications: true,
  language: 'en',
  resultsPerPage: 20
};

function validatePreferences(userPrefs) {
  const validPrefs = { ...defaultPreferences };
  
  if (userPrefs && typeof userPrefs === 'object') {
    if (['light', 'dark', 'auto'].includes(userPrefs.theme)) {
      validPrefs.theme = userPrefs.theme;
    }
    
    if (typeof userPrefs.notifications === 'boolean') {
      validPrefs.notifications = userPrefs.notifications;
    }
    
    if (['en', 'es', 'fr', 'de'].includes(userPrefs.language)) {
      validPrefs.language = userPrefs.language;
    }
    
    if (Number.isInteger(userPrefs.resultsPerPage) && 
        userPrefs.resultsPerPage >= 10 && 
        userPrefs.resultsPerPage <= 100) {
      validPrefs.resultsPerPage = userPrefs.resultsPerPage;
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
    } catch (e) {
      console.error('Failed to parse stored preferences:', e);
    }
  }
  return { ...defaultPreferences };
}

export { validatePreferences, savePreferences, loadPreferences, defaultPreferences };