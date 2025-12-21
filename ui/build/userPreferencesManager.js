const UserPreferencesManager = (function() {
    const PREFIX = 'app_pref_';
    const DEFAULT_PREFERENCES = {
        theme: 'light',
        language: 'en',
        notifications: true,
        fontSize: 16,
        autoSave: false
    };

    function getKey(key) {
        return `${PREFIX}${key}`;
    }

    function getAllPreferences() {
        const preferences = {};
        Object.keys(DEFAULT_PREFERENCES).forEach(key => {
            const storedValue = localStorage.getItem(getKey(key));
            if (storedValue !== null) {
                try {
                    preferences[key] = JSON.parse(storedValue);
                } catch {
                    preferences[key] = storedValue;
                }
            } else {
                preferences[key] = DEFAULT_PREFERENCES[key];
            }
        });
        return preferences;
    }

    function setPreference(key, value) {
        if (!DEFAULT_PREFERENCES.hasOwnProperty(key)) {
            throw new Error(`Invalid preference key: ${key}`);
        }
        localStorage.setItem(getKey(key), JSON.stringify(value));
        return value;
    }

    function resetPreferences() {
        Object.keys(DEFAULT_PREFERENCES).forEach(key => {
            localStorage.removeItem(getKey(key));
        });
        return DEFAULT_PREFERENCES;
    }

    function exportPreferences() {
        const prefs = getAllPreferences();
        return JSON.stringify(prefs, null, 2);
    }

    function importPreferences(jsonString) {
        try {
            const imported = JSON.parse(jsonString);
            Object.keys(imported).forEach(key => {
                if (DEFAULT_PREFERENCES.hasOwnProperty(key)) {
                    setPreference(key, imported[key]);
                }
            });
            return getAllPreferences();
        } catch (error) {
            throw new Error('Invalid preferences format');
        }
    }

    return {
        getAll: getAllPreferences,
        get: function(key) {
            const allPrefs = getAllPreferences();
            return allPrefs[key];
        },
        set: setPreference,
        reset: resetPreferences,
        export: exportPreferences,
        import: importPreferences,
        getDefaults: function() {
            return { ...DEFAULT_PREFERENCES };
        }
    };
})();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = UserPreferencesManager;
}