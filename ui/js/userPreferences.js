function validateUserPreferences(preferences) {
    const defaults = {
        theme: 'light',
        language: 'en',
        notifications: true,
        fontSize: 16
    };

    const validated = { ...defaults, ...preferences };

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

function savePreferences(preferences) {
    const validated = validateUserPreferences(preferences);
    localStorage.setItem('userPreferences', JSON.stringify(validated));
    return validated;
}

function loadPreferences() {
    const stored = localStorage.getItem('userPreferences');
    if (stored) {
        return validateUserPreferences(JSON.parse(stored));
    }
    return validateUserPreferences({});
}