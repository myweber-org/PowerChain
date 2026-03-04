const UserPreferencesManager = (() => {
    const STORAGE_KEY = 'app_user_preferences';
    const DEFAULT_PREFERENCES = {
        theme: 'light',
        fontSize: 16,
        notifications: true,
        language: 'en',
        autoSave: false
    };

    let currentPreferences = { ...DEFAULT_PREFERENCES };

    const loadPreferences = () => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                const parsed = JSON.parse(stored);
                currentPreferences = { ...DEFAULT_PREFERENCES, ...parsed };
            }
        } catch (error) {
            console.error('Failed to load preferences:', error);
        }
        return currentPreferences;
    };

    const savePreferences = (updates) => {
        currentPreferences = { ...currentPreferences, ...updates };
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(currentPreferences));
            return true;
        } catch (error) {
            console.error('Failed to save preferences:', error);
            return false;
        }
    };

    const resetPreferences = () => {
        currentPreferences = { ...DEFAULT_PREFERENCES };
        localStorage.removeItem(STORAGE_KEY);
        return currentPreferences;
    };

    const getPreference = (key) => {
        return currentPreferences[key] !== undefined ? currentPreferences[key] : null;
    };

    const getAllPreferences = () => {
        return { ...currentPreferences };
    };

    const validatePreference = (key, value) => {
        const validators = {
            theme: (val) => ['light', 'dark', 'auto'].includes(val),
            fontSize: (val) => Number.isInteger(val) && val >= 12 && val <= 24,
            notifications: (val) => typeof val === 'boolean',
            language: (val) => ['en', 'es', 'fr', 'de'].includes(val),
            autoSave: (val) => typeof val === 'boolean'
        };

        return validators[key] ? validators[key](value) : false;
    };

    loadPreferences();

    return {
        get: getPreference,
        getAll: getAllPreferences,
        set: savePreferences,
        reset: resetPreferences,
        validate: validatePreference
    };
})();

export default UserPreferencesManager;