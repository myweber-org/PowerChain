const UserPreferencesManager = (function() {
    const PREFIX = 'user_pref_';
    
    const defaultPreferences = {
        theme: 'light',
        language: 'en',
        notifications: true,
        fontSize: 16,
        autoSave: true
    };

    function getKey(key) {
        return `${PREFIX}${key}`;
    }

    function getAllPreferences() {
        const preferences = {};
        Object.keys(defaultPreferences).forEach(key => {
            const value = localStorage.getItem(getKey(key));
            preferences[key] = value !== null ? JSON.parse(value) : defaultPreferences[key];
        });
        return preferences;
    }

    function getPreference(key) {
        if (!defaultPreferences.hasOwnProperty(key)) {
            console.warn(`Unknown preference key: ${key}`);
            return null;
        }
        
        const storedValue = localStorage.getItem(getKey(key));
        return storedValue !== null ? JSON.parse(storedValue) : defaultPreferences[key];
    }

    function setPreference(key, value) {
        if (!defaultPreferences.hasOwnProperty(key)) {
            console.warn(`Cannot set unknown preference: ${key}`);
            return false;
        }

        try {
            localStorage.setItem(getKey(key), JSON.stringify(value));
            return true;
        } catch (error) {
            console.error('Failed to save preference:', error);
            return false;
        }
    }

    function resetPreference(key) {
        if (!defaultPreferences.hasOwnProperty(key)) {
            console.warn(`Cannot reset unknown preference: ${key}`);
            return false;
        }

        localStorage.removeItem(getKey(key));
        return true;
    }

    function resetAllPreferences() {
        Object.keys(defaultPreferences).forEach(key => {
            localStorage.removeItem(getKey(key));
        });
    }

    function exportPreferences() {
        const prefs = getAllPreferences();
        return JSON.stringify(prefs, null, 2);
    }

    function importPreferences(jsonString) {
        try {
            const importedPrefs = JSON.parse(jsonString);
            Object.keys(importedPrefs).forEach(key => {
                if (defaultPreferences.hasOwnProperty(key)) {
                    setPreference(key, importedPrefs[key]);
                }
            });
            return true;
        } catch (error) {
            console.error('Failed to import preferences:', error);
            return false;
        }
    }

    function subscribe(key, callback) {
        if (typeof callback !== 'function') {
            console.error('Callback must be a function');
            return;
        }

        const originalSetItem = localStorage.setItem;
        localStorage.setItem = function(storageKey, value) {
            originalSetItem.apply(this, arguments);
            
            if (storageKey === getKey(key)) {
                callback(JSON.parse(value));
            }
        };
    }

    return {
        getAll: getAllPreferences,
        get: getPreference,
        set: setPreference,
        reset: resetPreference,
        resetAll: resetAllPreferences,
        export: exportPreferences,
        import: importPreferences,
        subscribe: subscribe
    };
})();const UserPreferencesManager = (function() {
    const STORAGE_KEY = 'user_preferences';
    const DEFAULT_PREFERENCES = {
        theme: 'light',
        language: 'en',
        notifications: true,
        fontSize: 16,
        autoSave: true
    };

    function getPreferences() {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                return { ...DEFAULT_PREFERENCES, ...JSON.parse(stored) };
            }
        } catch (error) {
            console.error('Failed to parse stored preferences:', error);
        }
        return { ...DEFAULT_PREFERENCES };
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
        try {
            localStorage.removeItem(STORAGE_KEY);
            return { ...DEFAULT_PREFERENCES };
        } catch (error) {
            console.error('Failed to reset preferences:', error);
            return null;
        }
    }

    function getPreference(key) {
        const preferences = getPreferences();
        return preferences[key] !== undefined ? preferences[key] : null;
    }

    function setPreference(key, value) {
        return savePreferences({ [key]: value });
    }

    function subscribe(callback) {
        window.addEventListener('storage', function(event) {
            if (event.key === STORAGE_KEY) {
                callback(getPreferences());
            }
        });
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
}