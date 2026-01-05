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
})();