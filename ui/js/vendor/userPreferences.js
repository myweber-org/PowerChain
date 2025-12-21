const defaultPreferences = {
  theme: 'light',
  language: 'en',
  notifications: true,
  fontSize: 16,
  autoSave: true
};

function validatePreferences(userPrefs) {
  const validPreferences = {};
  
  Object.keys(defaultPreferences).forEach(key => {
    if (userPrefs.hasOwnProperty(key)) {
      const value = userPrefs[key];
      const defaultValue = defaultPreferences[key];
      
      switch (key) {
        case 'theme':
          validPreferences[key] = ['light', 'dark', 'auto'].includes(value) ? value : defaultValue;
          break;
        case 'language':
          validPreferences[key] = typeof value === 'string' && value.length === 2 ? value : defaultValue;
          break;
        case 'notifications':
        case 'autoSave':
          validPreferences[key] = typeof value === 'boolean' ? value : defaultValue;
          break;
        case 'fontSize':
          validPreferences[key] = typeof value === 'number' && value >= 12 && value <= 24 ? value : defaultValue;
          break;
        default:
          validPreferences[key] = defaultValue;
      }
    } else {
      validPreferences[key] = defaultPreferences[key];
    }
  });
  
  return validPreferences;
}

function mergePreferences(existingPrefs, newPrefs) {
  const validatedNewPrefs = validatePreferences(newPrefs);
  return { ...existingPrefs, ...validatedNewPrefs };
}

function savePreferences(prefs) {
  try {
    const validatedPrefs = validatePreferences(prefs);
    localStorage.setItem('userPreferences', JSON.stringify(validatedPrefs));
    return true;
  } catch (error) {
    console.error('Failed to save preferences:', error);
    return false;
  }
}

function loadPreferences() {
  try {
    const stored = localStorage.getItem('userPreferences');
    if (stored) {
      return validatePreferences(JSON.parse(stored));
    }
    return { ...defaultPreferences };
  } catch (error) {
    console.error('Failed to load preferences:', error);
    return { ...defaultPreferences };
  }
}

export { validatePreferences, mergePreferences, savePreferences, loadPreferences, defaultPreferences };