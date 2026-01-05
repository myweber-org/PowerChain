const userPreferencesManager = (() => {
    const STORAGE_KEY = 'app_preferences';
    const DEFAULT_PREFERENCES = {
        theme: 'light',
        fontSize: 'medium',
        notifications: true,
        language: 'en',
        autoSave: false
    };

    function getPreferences() {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (!stored) return { ...DEFAULT_PREFERENCES };
        
        try {
            const parsed = JSON.parse(stored);
            return { ...DEFAULT_PREFERENCES, ...parsed };
        } catch {
            return { ...DEFAULT_PREFERENCES };
        }
    }

    function savePreferences(preferences) {
        const current = getPreferences();
        const updated = { ...current, ...preferences };
        
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
            return true;
        } catch {
            return false;
        }
    }

    function resetPreferences() {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_PREFERENCES));
            return true;
        } catch {
            return false;
        }
    }

    function getPreference(key) {
        const prefs = getPreferences();
        return prefs[key] !== undefined ? prefs[key] : DEFAULT_PREFERENCES[key];
    }

    function setPreference(key, value) {
        return savePreferences({ [key]: value });
    }

    function subscribe(callback) {
        if (typeof callback !== 'function') return;
        
        const originalSetItem = localStorage.setItem;
        localStorage.setItem = function(key, value) {
            originalSetItem.apply(this, arguments);
            if (key === STORAGE_KEY) {
                callback(getPreferences());
            }
        };
    }

    return {
        get: getPreference,
        set: setPreference,
        getAll: getPreferences,
        save: savePreferences,
        reset: resetPreferences,
        subscribe: subscribe,
        defaults: { ...DEFAULT_PREFERENCES }
    };
})();