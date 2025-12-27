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
        fontSize: typeof prefs.fontSize === 'number' && prefs.fontSize >= 12 && prefs.fontSize <= 24 ? prefs.fontSize : defaults.fontSize
    };
}

function savePreferences(prefs) {
    const validated = validatePreferences(prefs);
    localStorage.setItem('userPreferences', JSON.stringify(validated));
    return validated;
}

function loadPreferences() {
    const stored = localStorage.getItem('userPreferences');
    if (stored) {
        return validatePreferences(JSON.parse(stored));
    }
    return validatePreferences({});
}

export { validatePreferences, savePreferences, loadPreferences };