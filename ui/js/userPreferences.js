const userPreferences = {
  theme: 'light',
  language: 'en',
  notifications: true,
  fontSize: 16
};

const defaultPreferences = {
  theme: 'light',
  language: 'en',
  notifications: true,
  fontSize: 14
};

function validatePreferences(prefs) {
  const validThemes = ['light', 'dark', 'auto'];
  const validLanguages = ['en', 'es', 'fr', 'de'];
  
  const validated = { ...defaultPreferences };
  
  if (prefs.theme && validThemes.includes(prefs.theme)) {
    validated.theme = prefs.theme;
  }
  
  if (prefs.language && validLanguages.includes(prefs.language)) {
    validated.language = prefs.language;
  }
  
  if (typeof prefs.notifications === 'boolean') {
    validated.notifications = prefs.notifications;
  }
  
  if (prefs.fontSize && Number.isInteger(prefs.fontSize) && prefs.fontSize >= 12 && prefs.fontSize <= 24) {
    validated.fontSize = prefs.fontSize;
  }
  
  return validated;
}

function mergePreferences(userPrefs) {
  return validatePreferences({
    ...defaultPreferences,
    ...userPrefs
  });
}

export { userPreferences, defaultPreferences, validatePreferences, mergePreferences };