const UserPreferencesManager = (function() {
    const PREFERENCES_KEY = 'app_preferences';
    
    const defaultPreferences = {
        theme: 'light',
        language: 'en',
        notifications: true,
        fontSize: 16,
        autoSave: true
    };

    function getPreferences() {
        const stored = localStorage.getItem(PREFERENCES_KEY);
        return stored ? JSON.parse(stored) : {...defaultPreferences};
    }

    function savePreferences(preferences) {
        const current = getPreferences();
        const updated = {...current, ...preferences};
        localStorage.setItem(PREFERENCES_KEY, JSON.stringify(updated));
        return updated;
    }

    function resetPreferences() {
        localStorage.setItem(PREFERENCES_KEY, JSON.stringify(defaultPreferences));
        return {...defaultPreferences};
    }

    function getPreference(key) {
        const preferences = getPreferences();
        return preferences[key] !== undefined ? preferences[key] : defaultPreferences[key];
    }

    function setPreference(key, value) {
        const preferences = getPreferences();
        preferences[key] = value;
        return savePreferences(preferences);
    }

    function subscribe(callback) {
        window.addEventListener('storage', function(event) {
            if (event.key === PREFERENCES_KEY) {
                callback(getPreferences());
            }
        });
    }

    return {
        get: getPreference,
        set: setPreference,
        getAll: getPreferences,
        save: savePreferences,
        reset: resetPreferences,
        subscribe: subscribe
    };
})();