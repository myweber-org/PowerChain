const userPreferences = {
  theme: 'light',
  language: 'en',
  notifications: true,
  fontSize: 16,
  autoSave: true
};

const defaultPreferences = {
  theme: 'dark',
  language: 'en',
  notifications: false,
  fontSize: 14,
  autoSave: false
};

function validatePreferences(prefs) {
  const validKeys = Object.keys(defaultPreferences);
  const validatedPrefs = {};

  for (const key of validKeys) {
    if (prefs.hasOwnProperty(key) && typeof prefs[key] === typeof defaultPreferences[key]) {
      validatedPrefs[key] = prefs[key];
    } else {
      validatedPrefs[key] = defaultPreferences[key];
    }
  }

  return validatedPrefs;
}

function mergeWithDefaults(prefs) {
  return {
    ...defaultPreferences,
    ...validatePreferences(prefs)
  };
}

function savePreferences(prefs) {
  const validPrefs = mergeWithDefaults(prefs);
  localStorage.setItem('userPreferences', JSON.stringify(validPrefs));
  return validPrefs;
}

function loadPreferences() {
  const stored = localStorage.getItem('userPreferences');
  if (stored) {
    try {
      return mergeWithDefaults(JSON.parse(stored));
    } catch {
      return { ...defaultPreferences };
    }
  }
  return { ...defaultPreferences };
}

export { savePreferences, loadPreferences, validatePreferences };