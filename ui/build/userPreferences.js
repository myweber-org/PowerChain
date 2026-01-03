const defaultPreferences = {
  theme: 'light',
  notifications: true,
  language: 'en',
  resultsPerPage: 20
};

function validatePreferences(userPrefs) {
  const validKeys = Object.keys(defaultPreferences);
  const validatedPrefs = { ...defaultPreferences };

  for (const key of validKeys) {
    if (userPrefs.hasOwnProperty(key)) {
      if (typeof userPrefs[key] === typeof defaultPreferences[key]) {
        validatedPrefs[key] = userPrefs[key];
      }
    }
  }

  return validatedPrefs;
}

function mergePreferences(existingPrefs, newPrefs) {
  const validatedNewPrefs = validatePreferences(newPrefs);
  return { ...existingPrefs, ...validatedNewPrefs };
}

function getPreference(key) {
  if (!defaultPreferences.hasOwnProperty(key)) {
    throw new Error(`Invalid preference key: ${key}`);
  }
  
  const stored = localStorage.getItem('userPreferences');
  if (stored) {
    const prefs = JSON.parse(stored);
    return prefs[key] !== undefined ? prefs[key] : defaultPreferences[key];
  }
  
  return defaultPreferences[key];
}

function savePreferences(prefs) {
  const validated = validatePreferences(prefs);
  const current = JSON.parse(localStorage.getItem('userPreferences') || '{}');
  const merged = mergePreferences(current, validated);
  localStorage.setItem('userPreferences', JSON.stringify(merged));
  return merged;
}

export { validatePreferences, mergePreferences, getPreference, savePreferences, defaultPreferences };