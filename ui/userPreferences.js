function validatePreferences(prefs) {
    const defaults = {
        theme: 'light',
        language: 'en',
        notifications: true,
        fontSize: 16
    };

    return {
        theme: ['light', 'dark', 'auto'].includes(prefs.theme) ? prefs.theme : defaults.theme,
        language: ['en', 'es', 'fr', 'de'].includes(prefs.language) ? prefs.language : defaults.language,
        notifications: typeof prefs.notifications === 'boolean' ? prefs.notifications : defaults.notifications,
        fontSize: Number.isInteger(prefs.fontSize) && prefs.fontSize >= 12 && prefs.fontSize <= 24 
                 ? prefs.fontSize 
                 : defaults.fontSize
    };
}

function initializeUserPreferences() {
    const storedPrefs = JSON.parse(localStorage.getItem('userPreferences') || '{}');
    const validatedPrefs = validatePreferences(storedPrefs);
    
    if (JSON.stringify(storedPrefs) !== JSON.stringify(validatedPrefs)) {
        localStorage.setItem('userPreferences', JSON.stringify(validatedPrefs));
    }
    
    applyPreferences(validatedPrefs);
    return validatedPrefs;
}

function applyPreferences(prefs) {
    document.documentElement.setAttribute('data-theme', prefs.theme);
    document.documentElement.lang = prefs.language;
    document.documentElement.style.fontSize = `${prefs.fontSize}px`;
    
    if (!prefs.notifications) {
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                console.log('Notification permission granted');
            }
        });
    }
}

function updatePreference(key, value) {
    const currentPrefs = JSON.parse(localStorage.getItem('userPreferences') || '{}');
    const updatedPrefs = validatePreferences({ ...currentPrefs, [key]: value });
    localStorage.setItem('userPreferences', JSON.stringify(updatedPrefs));
    applyPreferences(updatedPrefs);
    return updatedPrefs;
}

export { validatePreferences, initializeUserPreferences, updatePreference };function validateUserPreferences(preferences) {
    const defaults = {
        theme: 'light',
        language: 'en',
        notifications: true,
        timezone: 'UTC'
    };

    const validated = { ...defaults, ...preferences };

    if (!['light', 'dark'].includes(validated.theme)) {
        validated.theme = defaults.theme;
    }

    if (!['en', 'es', 'fr'].includes(validated.language)) {
        validated.language = defaults.language;
    }

    if (typeof validated.notifications !== 'boolean') {
        validated.notifications = defaults.notifications;
    }

    if (!/^[A-Za-z_]+\/[A-Za-z_]+$/.test(validated.timezone)) {
        validated.timezone = defaults.timezone;
    }

    return validated;
}

function initializeUserPreferences() {
    const stored = localStorage.getItem('userPreferences');
    let preferences = {};

    try {
        preferences = stored ? JSON.parse(stored) : {};
    } catch (error) {
        console.error('Failed to parse stored preferences:', error);
    }

    const validated = validateUserPreferences(preferences);
    localStorage.setItem('userPreferences', JSON.stringify(validated));
    
    return validated;
}

function updateUserPreferences(updates) {
    const current = initializeUserPreferences();
    const merged = { ...current, ...updates };
    const validated = validateUserPreferences(merged);
    
    localStorage.setItem('userPreferences', JSON.stringify(validated));
    return validated;
}

export { validateUserPreferences, initializeUserPreferences, updateUserPreferences };function initializeUserPreferences(preferences) {
  const defaults = {
    theme: 'light',
    language: 'en',
    notifications: true,
    fontSize: 16,
    autoSave: false
  };

  function validatePreferences(prefs) {
    const validThemes = ['light', 'dark', 'auto'];
    const validLanguages = ['en', 'es', 'fr', 'de'];
    
    if (prefs.theme && !validThemes.includes(prefs.theme)) {
      console.warn(`Invalid theme: ${prefs.theme}. Using default.`);
      prefs.theme = defaults.theme;
    }
    
    if (prefs.language && !validLanguages.includes(prefs.language)) {
      console.warn(`Invalid language: ${prefs.language}. Using default.`);
      prefs.language = defaults.language;
    }
    
    if (typeof prefs.notifications !== 'boolean') {
      prefs.notifications = defaults.notifications;
    }
    
    if (typeof prefs.fontSize !== 'number' || prefs.fontSize < 12 || prefs.fontSize > 24) {
      prefs.fontSize = defaults.fontSize;
    }
    
    if (typeof prefs.autoSave !== 'boolean') {
      prefs.autoSave = defaults.autoSave;
    }
    
    return prefs;
  }

  const validatedPrefs = validatePreferences({ ...defaults, ...preferences });
  
  Object.keys(validatedPrefs).forEach(key => {
    localStorage.setItem(`userPref_${key}`, JSON.stringify(validatedPrefs[key]));
  });
  
  return validatedPrefs;
}

function getUserPreference(key) {
  const value = localStorage.getItem(`userPref_${key}`);
  return value ? JSON.parse(value) : null;
}

function resetPreferencesToDefault() {
  Object.keys(defaults).forEach(key => {
    localStorage.setItem(`userPref_${key}`, JSON.stringify(defaults[key]));
  });
  return { ...defaults };
}

export { initializeUserPreferences, getUserPreference, resetPreferencesToDefault };function validateUserPreferences(preferences) {
    const defaults = {
        theme: 'light',
        language: 'en',
        notifications: true,
        timezone: 'UTC',
        resultsPerPage: 25
    };

    const validated = { ...defaults };

    if (preferences && typeof preferences === 'object') {
        if (['light', 'dark', 'auto'].includes(preferences.theme)) {
            validated.theme = preferences.theme;
        }

        if (['en', 'es', 'fr', 'de'].includes(preferences.language)) {
            validated.language = preferences.language;
        }

        if (typeof preferences.notifications === 'boolean') {
            validated.notifications = preferences.notifications;
        }

        if (typeof preferences.timezone === 'string' && preferences.timezone.length > 0) {
            validated.timezone = preferences.timezone;
        }

        if (Number.isInteger(preferences.resultsPerPage) && preferences.resultsPerPage >= 10 && preferences.resultsPerPage <= 100) {
            validated.resultsPerPage = preferences.resultsPerPage;
        }
    }

    return validated;
}

function initializeUserPreferences() {
    try {
        const stored = localStorage.getItem('userPreferences');
        const parsed = stored ? JSON.parse(stored) : {};
        return validateUserPreferences(parsed);
    } catch (error) {
        console.error('Failed to initialize user preferences:', error);
        return validateUserPreferences({});
    }
}

function saveUserPreferences(preferences) {
    const validated = validateUserPreferences(preferences);
    localStorage.setItem('userPreferences', JSON.stringify(validated));
    return validated;
}

export { validateUserPreferences, initializeUserPreferences, saveUserPreferences };