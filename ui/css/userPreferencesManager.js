const userPreferencesManager = (() => {
    const PREFERENCES_KEY = 'app_preferences';
    
    const defaultPreferences = {
        theme: 'light',
        language: 'en',
        notifications: true,
        fontSize: 16,
        autoSave: false
    };

    function getPreferences() {
        const stored = localStorage.getItem(PREFERENCES_KEY);
        return stored ? { ...defaultPreferences, ...JSON.parse(stored) } : { ...defaultPreferences };
    }

    function savePreferences(preferences) {
        const current = getPreferences();
        const updated = { ...current, ...preferences };
        localStorage.setItem(PREFERENCES_KEY, JSON.stringify(updated));
        return updated;
    }

    function resetPreferences() {
        localStorage.removeItem(PREFERENCES_KEY);
        return { ...defaultPreferences };
    }

    function subscribe(callback) {
        const handler = (event) => {
            if (event.key === PREFERENCES_KEY) {
                callback(getPreferences());
            }
        };
        window.addEventListener('storage', handler);
        return () => window.removeEventListener('storage', handler);
    }

    return {
        get: getPreferences,
        save: savePreferences,
        reset: resetPreferences,
        subscribe: subscribe
    };
})();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = userPreferencesManager;
}