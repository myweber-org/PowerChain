function initializeUserPreferences() {
    const defaultPreferences = {
        theme: 'light',
        language: 'en',
        notifications: true,
        fontSize: 16,
        autoSave: true
    };

    const savedPreferences = JSON.parse(localStorage.getItem('userPreferences')) || {};

    const validatedPreferences = Object.keys(defaultPreferences).reduce((prefs, key) => {
        const savedValue = savedPreferences[key];
        const defaultValue = defaultPreferences[key];

        if (savedValue !== undefined && typeof savedValue === typeof defaultValue) {
            prefs[key] = savedValue;
        } else {
            prefs[key] = defaultValue;
        }
        return prefs;
    }, {});

    localStorage.setItem('userPreferences', JSON.stringify(validatedPreferences));
    return validatedPreferences;
}

function updatePreference(key, value) {
    const currentPreferences = JSON.parse(localStorage.getItem('userPreferences')) || {};
    
    if (currentPreferences.hasOwnProperty(key)) {
        const expectedType = typeof currentPreferences[key];
        if (typeof value === expectedType) {
            currentPreferences[key] = value;
            localStorage.setItem('userPreferences', JSON.stringify(currentPreferences));
            return true;
        }
    }
    return false;
}

function resetPreferences() {
    localStorage.removeItem('userPreferences');
    return initializeUserPreferences();
}

export { initializeUserPreferences, updatePreference, resetPreferences };