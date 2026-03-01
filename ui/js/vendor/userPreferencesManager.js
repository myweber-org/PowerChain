const userPreferencesManager = (() => {
    const defaultPreferences = {
        theme: 'light',
        language: 'en',
        notifications: true,
        fontSize: 16,
        autoSave: false
    };

    const storageKey = 'app_user_preferences';

    const getPreferences = () => {
        try {
            const stored = localStorage.getItem(storageKey);
            if (stored) {
                const parsed = JSON.parse(stored);
                return { ...defaultPreferences, ...parsed };
            }
        } catch (error) {
            console.warn('Failed to retrieve preferences from localStorage:', error);
        }
        return { ...defaultPreferences };
    };

    const updatePreference = (key, value) => {
        if (!Object.prototype.hasOwnProperty.call(defaultPreferences, key)) {
            throw new Error(`Invalid preference key: ${key}`);
        }

        const current = getPreferences();
        const updated = { ...current, [key]: value };

        try {
            localStorage.setItem(storageKey, JSON.stringify(updated));
            return updated;
        } catch (error) {
            console.error('Failed to save preference:', error);
            return current;
        }
    };

    const resetPreferences = () => {
        try {
            localStorage.removeItem(storageKey);
            return { ...defaultPreferences };
        } catch (error) {
            console.error('Failed to reset preferences:', error);
            return getPreferences();
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