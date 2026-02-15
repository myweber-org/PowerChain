const defaultPreferences = {
  theme: 'light',
  fontSize: 16,
  notifications: true,
  language: 'en'
};

function validatePreferences(userPrefs) {
  const validKeys = Object.keys(defaultPreferences);
  const validatedPrefs = { ...defaultPreferences };

  for (const key of validKeys) {
    if (userPrefs.hasOwnProperty(key)) {
      if (typeof userPrefs[key] === typeof defaultPreferences[key]) {
        validatedPrefs[key] = userPrefs[key];
      } else {
        console.warn(`Invalid type for preference "${key}", using default.`);
      }
    }
  }

  const invalidKeys = Object.keys(userPrefs).filter(key => !validKeys.includes(key));
  if (invalidKeys.length > 0) {
    console.warn(`Ignored invalid preference keys: ${invalidKeys.join(', ')}`);
  }

  return validatedPrefs;
}

function savePreferences(preferences) {
  const validated = validatePreferences(preferences);
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
      return { ...defaultPreferences };
    }
  }
  return { ...defaultPreferences };
}

export { savePreferences, loadPreferences, defaultPreferences };