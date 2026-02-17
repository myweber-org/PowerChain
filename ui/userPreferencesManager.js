const userPreferencesManager = (() => {
    const STORAGE_KEY = 'app_preferences';
    const defaultPreferences = {
        theme: 'light',
        fontSize: 16,
        notifications: true,
        language: 'en'
    };

    function getPreferences() {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : { ...defaultPreferences };
    }

    function updatePreferences(newPreferences) {
        const current = getPreferences();
        const updated = { ...current, ...newPreferences };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        dispatchChangeEvent(updated);
        return updated;
    }

    function resetPreferences() {
        localStorage.removeItem(STORAGE_KEY);
        dispatchChangeEvent(defaultPreferences);
        return { ...defaultPreferences };
    }

    function dispatchChangeEvent(preferences) {
        const event = new CustomEvent('preferencesChanged', {
            detail: { preferences }
        });
        window.dispatchEvent(event);
    }

    function getPreference(key) {
        const prefs = getPreferences();
        return prefs[key] !== undefined ? prefs[key] : defaultPreferences[key];
    }

    return {
        get: getPreference,
        getAll: getPreferences,
        update: updatePreferences,
        reset: resetPreferences
    };
})();