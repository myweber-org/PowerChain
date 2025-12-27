const UserPreferencesManager = (() => {
    const STORAGE_KEY = 'app_preferences';
    const DEFAULT_PREFERENCES = {
        theme: 'light',
        language: 'en',
        notifications: true,
        fontSize: 16,
        autoSave: false
    };

    const loadPreferences = () => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            return stored ? { ...DEFAULT_PREFERENCES, ...JSON.parse(stored) } : { ...DEFAULT_PREFERENCES };
        } catch (error) {
            console.error('Failed to load preferences:', error);
            return { ...DEFAULT_PREFERENCES };
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

    const resetPreferences = () => {
        localStorage.removeItem(STORAGE_KEY);
        return { ...DEFAULT_PREFERENCES };
    };

    const validatePreference = (key, value) => {
        const validators = {
            theme: (v) => ['light', 'dark', 'auto'].includes(v),
            language: (v) => /^[a-z]{2}$/.test(v),
            notifications: (v) => typeof v === 'boolean',
            fontSize: (v) => Number.isInteger(v) && v >= 12 && v <= 24,
            autoSave: (v) => typeof v === 'boolean'
        };
        return validators[key] ? validators[key](value) : false;
    };

    return {
        get: () => loadPreferences(),
        set: (key, value) => {
            if (!validatePreference(key, value)) {
                throw new Error(`Invalid preference: ${key}=${value}`);
            }
            const current = loadPreferences();
            const updated = { ...current, [key]: value };
            savePreferences(updated);
            return updated;
        },
        update: (updates) => {
            const current = loadPreferences();
            const updated = { ...current };
            
            Object.entries(updates).forEach(([key, value]) => {
                if (validatePreference(key, value)) {
                    updated[key] = value;
                }
            });
            
            savePreferences(updated);
            return updated;
        },
        reset: () => resetPreferences(),
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