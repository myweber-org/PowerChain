const userPreferencesManager = (function() {
    const STORAGE_KEY = 'user_preferences';
    const DEFAULT_PREFERENCES = {
        theme: 'light',
        fontSize: 'medium',
        notifications: true,
        language: 'en',
        autoSave: true
    };

    function getPreferences() {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            try {
                return { ...DEFAULT_PREFERENCES, ...JSON.parse(stored) };
            } catch (e) {
                console.error('Failed to parse stored preferences:', e);
                return { ...DEFAULT_PREFERENCES };
            }
        }
        return { ...DEFAULT_PREFERENCES };
    }

    function savePreferences(preferences) {
        try {
            const current = getPreferences();
            const merged = { ...current, ...preferences };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
            return true;
        } catch (e) {
            console.error('Failed to save preferences:', e);
            return false;
        }
    }

    function resetPreferences() {
        localStorage.removeItem(STORAGE_KEY);
        return { ...DEFAULT_PREFERENCES };
    }

    function getPreference(key) {
        const prefs = getPreferences();
        return prefs[key] !== undefined ? prefs[key] : DEFAULT_PREFERENCES[key];
    }

    function setPreference(key, value) {
        return savePreferences({ [key]: value });
    }

    function subscribe(callback) {
        window.addEventListener('storage', function(e) {
            if (e.key === STORAGE_KEY) {
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