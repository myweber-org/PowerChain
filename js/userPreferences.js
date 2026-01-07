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

export { validateUserPreferences, initializeUserPreferences, applyPreferences };