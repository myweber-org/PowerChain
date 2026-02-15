const UserPreferencesManager = (() => {
    const STORAGE_KEY = 'app_preferences';
    const DEFAULTS = {
        theme: 'light',
        fontSize: 16,
        notifications: true,
        language: 'en',
        autoSave: false
    };

    let preferences = { ...DEFAULTS };

    const load = () => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                preferences = { ...DEFAULTS, ...JSON.parse(stored) };
            }
            return { ...preferences };
        } catch (error) {
            console.error('Failed to load preferences:', error);
            return { ...DEFAULTS };
        }
    };

    const save = (newPreferences) => {
        try {
            preferences = { ...preferences, ...newPreferences };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
            return true;
        } catch (error) {
            console.error('Failed to save preferences:', error);
            return false;
        }
    };

    const reset = () => {
        preferences = { ...DEFAULTS };
        localStorage.removeItem(STORAGE_KEY);
        return { ...preferences };
    };

    const get = (key) => {
        return key ? preferences[key] : { ...preferences };
    };

    const set = (key, value) => {
        if (typeof key === 'object') {
            return save(key);
        }
        return save({ [key]: value });
    };

    const subscribe = (callback) => {
        const handler = (event) => {
            if (event.key === STORAGE_KEY) {
                callback(get());
            }
        };
        window.addEventListener('storage', handler);
        return () => window.removeEventListener('storage', handler);
    };

    load();

    return {
        get,
        set,
        reset,
        subscribe,
        defaults: DEFAULTS
    };
})();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = UserPreferencesManager;
}