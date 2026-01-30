const userPreferencesManager = (function() {
    const STORAGE_KEY = 'user_preferences';
    const DEFAULT_PREFERENCES = {
        theme: 'light',
        fontSize: 'medium',
        notifications: true,
        language: 'en'
    };

    function getPreferences() {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            try {
                return { ...DEFAULT_PREFERENCES, ...JSON.parse(stored) };
            } catch (e) {
                console.error('Failed to parse stored preferences:', e);
                return { ...DEFAULT_PREFERENCES };
            }
        }
        return { ...DEFAULT_PREFERENCES };
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
        dispatchPreferenceChange({ ...DEFAULT_PREFERENCES });
        return { ...DEFAULT_PREFERENCES };
    }

    function dispatchPreferenceChange(preferences) {
        window.dispatchEvent(new CustomEvent('preferencesChanged', {
            detail: preferences
        }));
    }

    function subscribe(callback) {
        window.addEventListener('preferencesChanged', (event) => {
            callback(event.detail);
        });
        return () => {
            window.removeEventListener('preferencesChanged', callback);
        };
    }

    return {
        getPreferences,
        updatePreferences,
        resetPreferences,
        subscribe
    };
})();