const defaultPreferences = {
  theme: 'light',
  language: 'en',
  notifications: true,
  fontSize: 14,
  autoSave: true
};

const validThemes = ['light', 'dark', 'blue'];
const validLanguages = ['en', 'es', 'fr', 'de'];
const minFontSize = 8;
const maxFontSize = 32;

function validatePreferences(userPrefs) {
  const validated = { ...defaultPreferences };
  
  if (userPrefs.theme && validThemes.includes(userPrefs.theme)) {
    validated.theme = userPrefs.theme;
  }
  
  if (userPrefs.language && validLanguages.includes(userPrefs.language)) {
    validated.language = userPrefs.language;
  }
  
  if (typeof userPrefs.notifications === 'boolean') {
    validated.notifications = userPrefs.notifications;
  }
  
  if (typeof userPrefs.autoSave === 'boolean') {
    validated.autoSave = userPrefs.autoSave;
  }
  
  if (typeof userPrefs.fontSize === 'number') {
    validated.fontSize = Math.min(
      maxFontSize, 
      Math.max(minFontSize, userPrefs.fontSize)
    );
  }
  
  return validated;
}

function savePreferences(prefs) {
  const validatedPrefs = validatePreferences(prefs);
  localStorage.setItem('userPreferences', JSON.stringify(validatedPrefs));
  return validatedPrefs;
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

export { savePreferences, loadPreferences, validatePreferences };