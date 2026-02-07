const UserPreferencesManager = (function() {
    const STORAGE_KEY = 'user_preferences';
    const DEFAULT_PREFERENCES = {
        theme: 'light',
        fontSize: 16,
        notifications: true,
        language: 'en',
        autoSave: true
    };

    function getPreferences() {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            try {
                return { ...DEFAULT_PREFERENCES, ...JSON.parse(stored) };
            } catch (error) {
                console.error('Failed to parse stored preferences:', error);
                return DEFAULT_PREFERENCES;
            }
        }
        return DEFAULT_PREFERENCES;
    }

    function savePreferences(preferences) {
        try {
            const current = getPreferences();
            const updated = { ...current, ...preferences };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
            return updated;
        } catch (error) {
            console.error('Failed to save preferences:', error);
            return null;
        }
    }

    function resetPreferences() {
        localStorage.removeItem(STORAGE_KEY);
        return DEFAULT_PREFERENCES;
    }

    function getPreference(key) {
        const prefs = getPreferences();
        return prefs[key] !== undefined ? prefs[key] : null;
    }

    function setPreference(key, value) {
        return savePreferences({ [key]: value });
    }

    function subscribe(callback) {
        function storageEventHandler(event) {
            if (event.key === STORAGE_KEY) {
                callback(getPreferences());
            }
        }
        window.addEventListener('storage', storageEventHandler);
        
        return function unsubscribe() {
            window.removeEventListener('storage', storageEventHandler);
        };
    }

    return {
        getPreferences,
        savePreferences,
        resetPreferences,
        getPreference,
        setPreference,
        subscribe
    };
})();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = UserPreferencesManager;
}const UserPreferencesManager = {
    storageKey: 'user_preferences',

    getPreferences() {
        const stored = localStorage.getItem(this.storageKey);
        return stored ? JSON.parse(stored) : {};
    },

    setPreference(key, value) {
        const preferences = this.getPreferences();
        preferences[key] = value;
        localStorage.setItem(this.storageKey, JSON.stringify(preferences));
        return true;
    },

    getPreference(key, defaultValue = null) {
        const preferences = this.getPreferences();
        return preferences.hasOwnProperty(key) ? preferences[key] : defaultValue;
    },

    removePreference(key) {
        const preferences = this.getPreferences();
        if (preferences.hasOwnProperty(key)) {
            delete preferences[key];
            localStorage.setItem(this.storageKey, JSON.stringify(preferences));
            return true;
        }
        return false;
    },

    clearAllPreferences() {
        localStorage.removeItem(this.storageKey);
        return true;
    },

    getAllPreferences() {
        return this.getPreferences();
    }
};