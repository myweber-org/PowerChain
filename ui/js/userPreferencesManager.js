const userPreferencesManager = (() => {
    const STORAGE_KEY = 'app_preferences';
    const defaultPreferences = {
        theme: 'light',
        language: 'en',
        notifications: true,
        fontSize: 16,
        autoSave: false
    };

    const getPreferences = () => {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? { ...defaultPreferences, ...JSON.parse(stored) } : { ...defaultPreferences };
    };

    const updatePreference = (key, value) => {
        if (!defaultPreferences.hasOwnProperty(key)) {
            throw new Error(`Invalid preference key: ${key}`);
        }
        const current = getPreferences();
        const updated = { ...current, [key]: value };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        return updated;
    };

    const resetPreferences = () => {
        localStorage.removeItem(STORAGE_KEY);
        return { ...defaultPreferences };
    };

    const subscribe = (callback) => {
        const handler = (event) => {
            if (event.key === STORAGE_KEY) {
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