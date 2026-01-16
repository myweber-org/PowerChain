const UserPreferencesManager = (() => {
    const STORAGE_KEY = 'app_user_preferences';
    const DEFAULT_PREFERENCES = {
        theme: 'light',
        fontSize: 16,
        notifications: true,
        language: 'en',
        autoSave: false
    };

    const validatePreference = (key, value) => {
        const validators = {
            theme: (val) => ['light', 'dark', 'auto'].includes(val),
            fontSize: (val) => Number.isInteger(val) && val >= 12 && val <= 24,
            notifications: (val) => typeof val === 'boolean',
            language: (val) => ['en', 'es', 'fr', 'de'].includes(val),
            autoSave: (val) => typeof val === 'boolean'
        };

        return validators[key] ? validators[key](value) : false;
    };

    const loadPreferences = () => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (!stored) return { ...DEFAULT_PREFERENCES };

            const parsed = JSON.parse(stored);
            const validated = {};

            Object.keys(DEFAULT_PREFERENCES).forEach(key => {
                if (validatePreference(key, parsed[key])) {
                    validated[key] = parsed[key];
                } else {
                    validated[key] = DEFAULT_PREFERENCES[key];
                }
            });

            return validated;
        } catch (error) {
            console.error('Failed to load preferences:', error);
            return { ...DEFAULT_PREFERENCES };
        }
    };

    const savePreferences = (preferences) => {
        try {
            const validated = {};
            
            Object.keys(preferences).forEach(key => {
                if (validatePreference(key, preferences[key])) {
                    validated[key] = preferences[key];
                }
            });

            localStorage.setItem(STORAGE_KEY, JSON.stringify(validated));
            return true;
        } catch (error) {
            console.error('Failed to save preferences:', error);
            return false;
        }
    };

    const updatePreference = (key, value) => {
        if (!validatePreference(key, value)) {
            throw new Error(`Invalid value for preference: ${key}`);
        }

        const current = loadPreferences();
        const updated = { ...current, [key]: value };
        
        if (savePreferences(updated)) {
            dispatchPreferenceChange(key, value);
            return true;
        }
        
        return false;
    };

    const resetPreferences = () => {
        localStorage.removeItem(STORAGE_KEY);
        Object.keys(DEFAULT_PREFERENCES).forEach(key => {
            dispatchPreferenceChange(key, DEFAULT_PREFERENCES[key]);
        });
        return true;
    };

    const dispatchPreferenceChange = (key, value) => {
        const event = new CustomEvent('preferencechange', {
            detail: { key, value }
        });
        window.dispatchEvent(event);
    };

    const getPreference = (key) => {
        const prefs = loadPreferences();
        return prefs[key] !== undefined ? prefs[key] : DEFAULT_PREFERENCES[key];
    };

    const getAllPreferences = () => {
        return loadPreferences();
    };

    return {
        get: getPreference,
        getAll: getAllPreferences,
        update: updatePreference,
        reset: resetPreferences,
        validate: validatePreference,
        onPreferenceChange: (callback) => {
            window.addEventListener('preferencechange', (e) => {
                callback(e.detail.key, e.detail.value);
            });
        }
    };
})();

export default UserPreferencesManager;const UserPreferencesManager = (function() {
    const STORAGE_KEY = 'user_preferences';
    
    function getPreferences() {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : {};
    }
    
    function setPreference(key, value) {
        const preferences = getPreferences();
        preferences[key] = value;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
        return true;
    }
    
    function getPreference(key, defaultValue = null) {
        const preferences = getPreferences();
        return preferences.hasOwnProperty(key) ? preferences[key] : defaultValue;
    }
    
    function removePreference(key) {
        const preferences = getPreferences();
        if (preferences.hasOwnProperty(key)) {
            delete preferences[key];
            localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
            return true;
        }
        return false;
    }
    
    function clearAllPreferences() {
        localStorage.removeItem(STORAGE_KEY);
        return true;
    }
    
    function getAllPreferences() {
        return getPreferences();
    }
    
    return {
        get: getPreference,
        set: setPreference,
        remove: removePreference,
        clear: clearAllPreferences,
        getAll: getAllPreferences
    };
})();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = UserPreferencesManager;
}