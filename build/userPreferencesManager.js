const UserPreferencesManager = (function() {
    const STORAGE_KEY = 'app_preferences';
    
    const defaultPreferences = {
        theme: 'light',
        language: 'en',
        notifications: true,
        fontSize: 16,
        autoSave: true,
        showTutorial: false
    };

    function getPreferences() {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? { ...defaultPreferences, ...JSON.parse(stored) } : { ...defaultPreferences };
    }

    function updatePreferences(newPreferences) {
        const current = getPreferences();
        const updated = { ...current, ...newPreferences };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        dispatchPreferenceChange(updated);
        return updated;
    }

    function resetPreferences() {
        localStorage.removeItem(STORAGE_KEY);
        dispatchPreferenceChange(defaultPreferences);
        return { ...defaultPreferences };
    }

    function getPreference(key) {
        const prefs = getPreferences();
        return prefs[key] !== undefined ? prefs[key] : defaultPreferences[key];
    }

    const listeners = new Set();
    
    function addChangeListener(callback) {
        listeners.add(callback);
        return () => listeners.delete(callback);
    }

    function dispatchPreferenceChange(preferences) {
        listeners.forEach(callback => {
            try {
                callback(preferences);
            } catch (error) {
                console.error('Preference listener error:', error);
            }
        });
    }

    window.addEventListener('storage', (event) => {
        if (event.key === STORAGE_KEY) {
            dispatchPreferenceChange(getPreferences());
        }
    });

    return {
        getPreferences,
        updatePreferences,
        resetPreferences,
        getPreference,
        addChangeListener,
        defaultPreferences
    };
})();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = UserPreferencesManager;
}