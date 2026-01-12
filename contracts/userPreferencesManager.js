const UserPreferencesManager = (() => {
    const STORAGE_KEY = 'app_preferences';
    const DEFAULT_PREFERENCES = {
        theme: 'light',
        fontSize: 16,
        notifications: true,
        language: 'en',
        autoSave: false
    };

    let preferences = { ...DEFAULT_PREFERENCES };

    const loadPreferences = () => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                preferences = { ...DEFAULT_PREFERENCES, ...JSON.parse(stored) };
            }
        } catch (error) {
            console.warn('Failed to load preferences:', error);
        }
    };

    const savePreferences = () => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
        } catch (error) {
            console.warn('Failed to save preferences:', error);
        }
    };

    const getPreference = (key) => {
        return preferences[key] !== undefined ? preferences[key] : DEFAULT_PREFERENCES[key];
    };

    const setPreference = (key, value) => {
        if (key in DEFAULT_PREFERENCES) {
            preferences[key] = value;
            savePreferences();
            return true;
        }
        return false;
    };

    const resetPreferences = () => {
        preferences = { ...DEFAULT_PREFERENCES };
        localStorage.removeItem(STORAGE_KEY);
    };

    const getAllPreferences = () => {
        return { ...preferences };
    };

    loadPreferences();

    return {
        get: getPreference,
        set: setPreference,
        reset: resetPreferences,
        getAll: getAllPreferences
    };
})();