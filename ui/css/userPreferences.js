const defaultPreferences = {
  theme: 'light',
  language: 'en',
  notifications: true,
  fontSize: 16
};

function validatePreferences(userPrefs) {
  const validPrefs = {};
  
  if (userPrefs.theme && ['light', 'dark', 'auto'].includes(userPrefs.theme)) {
    validPrefs.theme = userPrefs.theme;
  } else {
    validPrefs.theme = defaultPreferences.theme;
  }
  
  if (userPrefs.language && ['en', 'es', 'fr', 'de'].includes(userPrefs.language)) {
    validPrefs.language = userPrefs.language;
  } else {
    validPrefs.language = defaultPreferences.language;
  }
  
  if (typeof userPrefs.notifications === 'boolean') {
    validPrefs.notifications = userPrefs.notifications;
  } else {
    validPrefs.notifications = defaultPreferences.notifications;
  }
  
  if (typeof userPrefs.fontSize === 'number' && userPrefs.fontSize >= 12 && userPrefs.fontSize <= 24) {
    validPrefs.fontSize = userPrefs.fontSize;
  } else {
    validPrefs.fontSize = defaultPreferences.fontSize;
  }
  
  return validPrefs;
}

function mergeWithDefaults(userPrefs) {
  return {
    ...defaultPreferences,
    ...validatePreferences(userPrefs)
  };
}

export { validatePreferences, mergeWithDefaults, defaultPreferences };