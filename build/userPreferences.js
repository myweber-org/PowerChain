const defaultPreferences = {
  theme: 'light',
  language: 'en',
  notifications: true,
  fontSize: 14,
  autoSave: true
};

function validatePreferences(userPrefs) {
  const validPrefs = { ...defaultPreferences };
  
  for (const key in userPrefs) {
    if (key in defaultPreferences) {
      if (typeof userPrefs[key] === typeof defaultPreferences[key]) {
        validPrefs[key] = userPrefs[key];
      } else {
        console.warn(`Invalid type for preference "${key}". Using default.`);
      }
    } else {
      console.warn(`Unknown preference "${key}" will be ignored.`);
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
    } catch (error) {
      console.error('Failed to parse stored preferences:', error);
    }
  }
  return { ...defaultPreferences };
}

export { savePreferences, loadPreferences, defaultPreferences };