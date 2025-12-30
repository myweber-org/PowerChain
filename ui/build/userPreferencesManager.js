const UserPreferencesManager = (() => {
    const STORAGE_KEY = 'app_preferences';
    const DEFAULTS = {
        theme: 'light',
        fontSize: 16,
        notifications: true,
        language: 'en'
    };

    const loadPreferences = () => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            return stored ? { ...DEFAULTS, ...JSON.parse(stored) } : { ...DEFAULTS };
        } catch (error) {
            console.warn('Failed to load preferences:', error);
            return { ...DEFAULTS };
        }
    };

    const savePreferences = (preferences) => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
            return true;
        } catch (error) {
            console.error('Failed to save preferences:', error);
            return false;
        }
    };

    const resetToDefaults = () => {
        localStorage.removeItem(STORAGE_KEY);
        return { ...DEFAULTS };
    };

    const validatePreference = (key, value) => {
        const validators = {
            theme: (v) => ['light', 'dark', 'auto'].includes(v),
            fontSize: (v) => Number.isInteger(v) && v >= 12 && v <= 24,
            notifications: (v) => typeof v === 'boolean',
            language: (v) => ['en', 'es', 'fr', 'de'].includes(v)
        };
        return validators[key] ? validators[key](value) : false;
    };

    return {
        get: (key) => {
            const prefs = loadPreferences();
            return key ? prefs[key] : prefs;
        },
        set: (key, value) => {
            if (!validatePreference(key, value)) {
                throw new Error(`Invalid value for preference "${key}"`);
            }
            const prefs = loadPreferences();
            prefs[key] = value;
            return savePreferences(prefs);
        },
        reset: resetToDefaults,
        subscribe: (callback) => {
            const handler = (event) => {
                if (event.key === STORAGE_KEY) {
                    callback(loadPreferences());
                }
            };
            window.addEventListener('storage', handler);
            return () => window.removeEventListener('storage', handler);
        }
    };
})();