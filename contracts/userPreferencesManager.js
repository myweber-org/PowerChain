const userPreferencesManager = (() => {
    const defaultPreferences = {
        theme: 'light',
        language: 'en',
        notifications: true,
        fontSize: 16,
        autoSave: false
    };

    const storageKey = 'app_user_preferences';

    const validatePreference = (key, value) => {
        const validators = {
            theme: (val) => ['light', 'dark', 'auto'].includes(val),
            language: (val) => ['en', 'es', 'fr', 'de'].includes(val),
            notifications: (val) => typeof val === 'boolean',
            fontSize: (val) => Number.isInteger(val) && val >= 12 && val <= 24,
            autoSave: (val) => typeof val === 'boolean'
        };

        return validators[key] ? validators[key](value) : false;
    };

    const getPreferences = () => {
        try {
            const stored = localStorage.getItem(storageKey);
            if (!stored) return { ...defaultPreferences };

            const parsed = JSON.parse(stored);
            return { ...defaultPreferences, ...parsed };
        } catch (error) {
            console.error('Failed to load preferences:', error);
            return { ...defaultPreferences };
        }
    };

    const updatePreference = (key, value) => {
        if (!validatePreference(key, value)) {
            throw new Error(`Invalid preference: ${key}=${value}`);
        }

        const current = getPreferences();
        const updated = { ...current, [key]: value };

        try {
            localStorage.setItem(storageKey, JSON.stringify(updated));
            return updated;
        } catch (error) {
            console.error('Failed to save preference:', error);
            throw error;
        }
    };

    const resetPreferences = () => {
        try {
            localStorage.removeItem(storageKey);
            return { ...defaultPreferences };
        } catch (error) {
            console.error('Failed to reset preferences:', error);
            throw error;
        }
    };

    const subscribe = (callback) => {
        const handler = (event) => {
            if (event.key === storageKey) {
                callback(getPreferences());
            }
        };
        window.addEventListener('storage', handler);
        return () => window.removeEventListener('storage', handler);
    };

    return {
        getPreferences,
        updatePreference,
        resetPreferences,
        subscribe
    };
})();

export default userPreferencesManager;