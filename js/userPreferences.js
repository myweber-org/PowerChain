function validateUserPreferences(prefs) {
    const defaults = {
        theme: 'light',
        language: 'en',
        notifications: true,
        fontSize: 14
    };

    const validated = { ...defaults, ...prefs };

    if (!['light', 'dark', 'auto'].includes(validated.theme)) {
        validated.theme = defaults.theme;
    }

    if (!['en', 'es', 'fr', 'de'].includes(validated.language)) {
        validated.language = defaults.language;
    }

    if (typeof validated.notifications !== 'boolean') {
        validated.notifications = defaults.notifications;
    }

    if (typeof validated.fontSize !== 'number' || validated.fontSize < 10 || validated.fontSize > 24) {
        validated.fontSize = defaults.fontSize;
    }

    return validated;
}

function initializeUserPreferences() {
    const storedPrefs = JSON.parse(localStorage.getItem('userPreferences') || '{}');
    const validatedPrefs = validateUserPreferences(storedPrefs);
    
    localStorage.setItem('userPreferences', JSON.stringify(validatedPrefs));
    applyPreferences(validatedPrefs);
    
    return validatedPrefs;
}

function applyPreferences(prefs) {
    document.documentElement.setAttribute('data-theme', prefs.theme);
    document.documentElement.lang = prefs.language;
    document.documentElement.style.fontSize = `${prefs.fontSize}px`;
    
    if (prefs.notifications && 'Notification' in window && Notification.permission === 'granted') {
        new Notification('Preferences applied successfully');
    }
}

export { validateUserPreferences, initializeUserPreferences, applyPreferences };const defaultPreferences = {
  theme: 'light',
  notifications: true,
  language: 'en',
  resultsPerPage: 25
};

function validatePreferences(userPrefs) {
  const validPreferences = {};
  
  if (userPrefs.theme && ['light', 'dark', 'auto'].includes(userPrefs.theme)) {
    validPreferences.theme = userPrefs.theme;
  } else {
    validPreferences.theme = defaultPreferences.theme;
  }
  
  if (typeof userPrefs.notifications === 'boolean') {
    validPreferences.notifications = userPrefs.notifications;
  } else {
    validPreferences.notifications = defaultPreferences.notifications;
  }
  
  if (userPrefs.language && ['en', 'es', 'fr', 'de'].includes(userPrefs.language)) {
    validPreferences.language = userPrefs.language;
  } else {
    validPreferences.language = defaultPreferences.language;
  }
  
  if (Number.isInteger(userPrefs.resultsPerPage) && userPrefs.resultsPerPage > 0) {
    validPreferences.resultsPerPage = Math.min(userPrefs.resultsPerPage, 100);
  } else {
    validPreferences.resultsPerPage = defaultPreferences.resultsPerPage;
  }
  
  return validPreferences;
}

function initializePreferences() {
  const storedPrefs = localStorage.getItem('userPreferences');
  let userPrefs = defaultPreferences;
  
  if (storedPrefs) {
    try {
      const parsedPrefs = JSON.parse(storedPrefs);
      userPrefs = validatePreferences(parsedPrefs);
    } catch (error) {
      console.warn('Invalid preferences in storage, using defaults');
    }
  }
  
  localStorage.setItem('userPreferences', JSON.stringify(userPrefs));
  return userPrefs;
}

function updatePreference(key, value) {
  const currentPrefs = JSON.parse(localStorage.getItem('userPreferences')) || defaultPreferences;
  const updatedPrefs = { ...currentPrefs, [key]: value };
  const validatedPrefs = validatePreferences(updatedPrefs);
  
  localStorage.setItem('userPreferences', JSON.stringify(validatedPrefs));
  return validatedPrefs;
}

export { initializePreferences, validatePreferences, updatePreference, defaultPreferences };function validateUserPreferences(prefs) {
    const defaults = {
        theme: 'light',
        language: 'en',
        notifications: true,
        fontSize: 16
    };

    const validated = { ...defaults, ...prefs };

    if (!['light', 'dark', 'auto'].includes(validated.theme)) {
        validated.theme = defaults.theme;
    }

    if (!['en', 'es', 'fr', 'de'].includes(validated.language)) {
        validated.language = defaults.language;
    }

    if (typeof validated.notifications !== 'boolean') {
        validated.notifications = defaults.notifications;
    }

    if (typeof validated.fontSize !== 'number' || validated.fontSize < 12 || validated.fontSize > 24) {
        validated.fontSize = defaults.fontSize;
    }

    return validated;
}

function initializeUserPreferences() {
    const stored = localStorage.getItem('userPreferences');
    let preferences = {};

    try {
        preferences = stored ? JSON.parse(stored) : {};
    } catch (e) {
        console.warn('Failed to parse stored preferences, using defaults');
    }

    return validateUserPreferences(preferences);
}

function saveUserPreferences(preferences) {
    const validated = validateUserPreferences(preferences);
    localStorage.setItem('userPreferences', JSON.stringify(validated));
    return validated;
}

export { validateUserPreferences, initializeUserPreferences, saveUserPreferences };