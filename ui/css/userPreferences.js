const defaultPreferences = {
  theme: 'light',
  language: 'en',
  notifications: true,
  fontSize: 16
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

function initializePreferences() {
  const storedPrefs = localStorage.getItem('userPreferences');
  let userPrefs = defaultPreferences;

  if (storedPrefs) {
    try {
      const parsedPrefs = JSON.parse(storedPrefs);
      userPrefs = validatePreferences(parsedPrefs);
    } catch (error) {
      console.error('Failed to parse stored preferences:', error);
    }
  }

  localStorage.setItem('userPreferences', JSON.stringify(userPrefs));
  return userPrefs;
}

function updatePreference(key, value) {
  if (!defaultPreferences.hasOwnProperty(key)) {
    throw new Error(`Invalid preference key: ${key}`);
  }

  if (typeof value !== typeof defaultPreferences[key]) {
    throw new Error(`Invalid type for preference ${key}`);
  }

  const currentPrefs = JSON.parse(localStorage.getItem('userPreferences')) || defaultPreferences;
  currentPrefs[key] = value;
  localStorage.setItem('userPreferences', JSON.stringify(currentPrefs));
  return currentPrefs;
}

export { initializePreferences, updatePreference, validatePreferences };