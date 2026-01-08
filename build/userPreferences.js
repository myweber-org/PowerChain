const userPreferences = {
  theme: 'light',
  language: 'en',
  notifications: true,
  fontSize: 16
};

const validThemes = ['light', 'dark', 'auto'];
const validLanguages = ['en', 'es', 'fr', 'de'];
const minFontSize = 12;
const maxFontSize = 24;

function validatePreferences(prefs) {
  const errors = [];

  if (!validThemes.includes(prefs.theme)) {
    errors.push(`Invalid theme. Must be one of: ${validThemes.join(', ')}`);
  }

  if (!validLanguages.includes(prefs.language)) {
    errors.push(`Invalid language. Must be one of: ${validLanguages.join(', ')}`);
  }

  if (typeof prefs.notifications !== 'boolean') {
    errors.push('Notifications must be a boolean value');
  }

  if (prefs.fontSize < minFontSize || prefs.fontSize > maxFontSize) {
    errors.push(`Font size must be between ${minFontSize} and ${maxFontSize}`);
  }

  return {
    isValid: errors.length === 0,
    errors: errors
  };
}

function savePreferences(prefs) {
  const validation = validatePreferences(prefs);
  
  if (!validation.isValid) {
    console.error('Invalid preferences:', validation.errors);
    return false;
  }

  try {
    localStorage.setItem('userPreferences', JSON.stringify(prefs));
    console.log('Preferences saved successfully');
    return true;
  } catch (error) {
    console.error('Failed to save preferences:', error);
    return false;
  }
}

function loadPreferences() {
  try {
    const saved = localStorage.getItem('userPreferences');
    if (saved) {
      const prefs = JSON.parse(saved);
      const validation = validatePreferences(prefs);
      
      if (validation.isValid) {
        return prefs;
      } else {
        console.warn('Saved preferences are invalid, using defaults');
      }
    }
  } catch (error) {
    console.error('Failed to load preferences:', error);
  }

  return { ...userPreferences };
}

function updatePreference(key, value) {
  const currentPrefs = loadPreferences();
  const updatedPrefs = { ...currentPrefs, [key]: value };
  
  return savePreferences(updatedPrefs);
}

export { validatePreferences, savePreferences, loadPreferences, updatePreference };