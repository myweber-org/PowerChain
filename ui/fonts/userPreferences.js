function initializeUserPreferences(preferences) {
    const defaultPreferences = {
        theme: 'light',
        language: 'en',
        notifications: true,
        fontSize: 16,
        autoSave: false
    };

    if (!preferences || typeof preferences !== 'object') {
        return defaultPreferences;
    }

    const validatedPreferences = { ...defaultPreferences };

    if (preferences.theme && ['light', 'dark', 'auto'].includes(preferences.theme)) {
        validatedPreferences.theme = preferences.theme;
    }

    if (preferences.language && ['en', 'es', 'fr', 'de'].includes(preferences.language)) {
        validatedPreferences.language = preferences.language;
    }

    if (typeof preferences.notifications === 'boolean') {
        validatedPreferences.notifications = preferences.notifications;
    }

    if (typeof preferences.fontSize === 'number' && preferences.fontSize >= 12 && preferences.fontSize <= 24) {
        validatedPreferences.fontSize = preferences.fontSize;
    }

    if (typeof preferences.autoSave === 'boolean') {
        validatedPreferences.autoSave = preferences.autoSave;
    }

    return validatedPreferences;
}

function savePreferencesToStorage(preferences) {
    try {
        localStorage.setItem('userPreferences', JSON.stringify(preferences));
        return true;
    } catch (error) {
        console.error('Failed to save preferences:', error);
        return false;
    }
}

function loadPreferencesFromStorage() {
    try {
        const stored = localStorage.getItem('userPreferences');
        if (stored) {
            return initializeUserPreferences(JSON.parse(stored));
        }
    } catch (error) {
        console.error('Failed to load preferences:', error);
    }
    return initializeUserPreferences(null);
}

export { initializeUserPreferences, savePreferencesToStorage, loadPreferencesFromStorage };