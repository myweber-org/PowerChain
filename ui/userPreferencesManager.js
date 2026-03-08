const UserPreferencesManager = (function() {
    const STORAGE_KEY = 'app_user_preferences';

    const defaultPreferences = {
        theme: 'light',
        language: 'en',
        notifications: true,
        fontSize: 16,
        autoSave: true
    };

    function getPreferences() {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            try {
                return { ...defaultPreferences, ...JSON.parse(stored) };
            } catch (error) {
                console.error('Failed to parse stored preferences:', error);
                return defaultPreferences;
            }
        }
        return defaultPreferences;
    }

    function updatePreferences(newPreferences) {
        const current = getPreferences();
        const updated = { ...current, ...newPreferences };
        
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
            return updated;
        } catch (error) {
            console.error('Failed to save preferences:', error);
            return current;
        }
    }

    function resetPreferences() {
        try {
            localStorage.removeItem(STORAGE_KEY);
            return defaultPreferences;
        } catch (error) {
            console.error('Failed to reset preferences:', error);
            return getPreferences();
        }
    }

    function getPreference(key) {
        const prefs = getPreferences();
        return prefs[key] !== undefined ? prefs[key] : defaultPreferences[key];
    }

    function setPreference(key, value) {
        return updatePreferences({ [key]: value });
    }

    function subscribe(callback) {
        if (typeof callback !== 'function') {
            throw new Error('Callback must be a function');
        }

        const handler = function(event) {
            if (event.key === STORAGE_KEY) {
                callback(getPreferences());
            }
        };

        window.addEventListener('storage', handler);
        
        return function unsubscribe() {
            window.removeEventListener('storage', handler);
        };
    }

    return {
        get: getPreference,
        set: setPreference,
        getAll: getPreferences,
        update: updatePreferences,
        reset: resetPreferences,
        subscribe: subscribe
    };
})();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = UserPreferencesManager;
}