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

export { validatePreferences, initializeUserPreferences, updatePreference };