const userPreferencesManager = (() => {
    const STORAGE_KEY = 'user_preferences';
    const DEFAULT_PREFERENCES = {
        theme: 'light',
        language: 'en',
        notifications: true,
        fontSize: 16
    };

    let preferences = { ...DEFAULT_PREFERENCES };

    const loadPreferences = () => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                preferences = { ...DEFAULT_PREFERENCES, ...JSON.parse(stored) };
            }
        } catch (error) {
            console.error('Failed to load preferences:', error);
        }
        return preferences;
    };

    const savePreferences = (newPreferences) => {
        preferences = { ...preferences, ...newPreferences };
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
        } catch (error) {
            console.error('Failed to save preferences:', error);
        }
        return preferences;
    };

    const resetPreferences = () => {
        preferences = { ...DEFAULT_PREFERENCES };
        try {
            localStorage.removeItem(STORAGE_KEY);
        } catch (error) {
            console.error('Failed to reset preferences:', error);
        }
        return preferences;
    };

    const getPreference = (key) => {
        return preferences[key];
    };

    const getAllPreferences = () => {
        return { ...preferences };
    };

    loadPreferences();

    return {
        save: savePreferences,
        reset: resetPreferences,
        get: getPreference,
        getAll: getAllPreferences
    };
})();