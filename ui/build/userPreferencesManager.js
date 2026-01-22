const UserPreferencesManager = {
    preferences: {},

    init: function() {
        const stored = localStorage.getItem('userPreferences');
        if (stored) {
            this.preferences = JSON.parse(stored);
        } else {
            this.preferences = {
                theme: 'light',
                language: 'en',
                notifications: true,
                fontSize: 16
            };
            this.save();
        }
    },

    get: function(key) {
        return this.preferences[key];
    },

    set: function(key, value) {
        this.preferences[key] = value;
        this.save();
        return true;
    },

    getAll: function() {
        return { ...this.preferences };
    },

    reset: function() {
        this.preferences = {
            theme: 'light',
            language: 'en',
            notifications: true,
            fontSize: 16
        };
        this.save();
    },

    save: function() {
        localStorage.setItem('userPreferences', JSON.stringify(this.preferences));
    }
};

UserPreferencesManager.init();const UserPreferencesManager = (() => {
    const PREFIX = 'app_pref_';
    const DEFAULT_PREFERENCES = {
        theme: 'light',
        fontSize: 14,
        notifications: true,
        language: 'en',
        autoSave: false
    };

    const validateKey = (key) => {
        if (!Object.keys(DEFAULT_PREFERENCES).includes(key)) {
            throw new Error(`Invalid preference key: ${key}`);
        }
    };

    const get = (key) => {
        validateKey(key);
        const stored = localStorage.getItem(PREFIX + key);
        
        if (stored === null) {
            return DEFAULT_PREFERENCES[key];
        }

        try {
            const parsed = JSON.parse(stored);
            return parsed !== null ? parsed : DEFAULT_PREFERENCES[key];
        } catch {
            return DEFAULT_PREFERENCES[key];
        }
    };

    const set = (key, value) => {
        validateKey(key);
        const type = typeof DEFAULT_PREFERENCES[key];
        
        if (typeof value !== type) {
            throw new Error(`Type mismatch for ${key}. Expected ${type}, got ${typeof value}`);
        }

        localStorage.setItem(PREFIX + key, JSON.stringify(value));
        dispatchEvent(new CustomEvent('preferencesChanged', { 
            detail: { key, value } 
        }));
    };

    const getAll = () => {
        return Object.keys(DEFAULT_PREFERENCES).reduce((prefs, key) => {
            prefs[key] = get(key);
            return prefs;
        }, {});
    };

    const reset = () => {
        Object.keys(DEFAULT_PREFERENCES).forEach(key => {
            localStorage.removeItem(PREFIX + key);
        });
        dispatchEvent(new CustomEvent('preferencesReset'));
    };

    const subscribe = (callback) => {
        const handler = (event) => callback(event.detail);
        addEventListener('preferencesChanged', handler);
        return () => removeEventListener('preferencesChanged', handler);
    };

    return {
        get,
        set,
        getAll,
        reset,
        subscribe,
        DEFAULT_PREFERENCES
    };
})();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = UserPreferencesManager;
}const UserPreferencesManager = (function() {
    const STORAGE_KEY = 'user_preferences';
    
    const defaultPreferences = {
        theme: 'light',
        language: 'en',
        notifications: true,
        fontSize: 16,
        autoSave: true
    };

    function getPreferences() {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            try {
                return { ...defaultPreferences, ...JSON.parse(stored) };
            } catch (error) {
                console.error('Failed to parse stored preferences:', error);
                return defaultPreferences;
            }
        }
        return defaultPreferences;
    }

    function savePreferences(preferences) {
        try {
            const current = getPreferences();
            const updated = { ...current, ...preferences };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
            return true;
        } catch (error) {
            console.error('Failed to save preferences:', error);
            return false;
        }
    }

    function resetPreferences() {
        localStorage.removeItem(STORAGE_KEY);
        return defaultPreferences;
    }

    function getPreference(key) {
        const preferences = getPreferences();
        return preferences[key];
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
        get: getPreferences,
        save: savePreferences,
        reset: resetPreferences,
        getPreference: getPreference,
        setPreference: setPreference,
        subscribe: subscribe
    };
})();const USER_PREFERENCES_KEY = 'app_preferences';

class UserPreferencesManager {
    constructor() {
        this.preferences = this.loadPreferences();
    }

    loadPreferences() {
        try {
            const stored = localStorage.getItem(USER_PREFERENCES_KEY);
            return stored ? JSON.parse(stored) : this.getDefaultPreferences();
        } catch (error) {
            console.error('Failed to load preferences:', error);
            return this.getDefaultPreferences();
        }
    }

    getDefaultPreferences() {
        return {
            theme: 'light',
            language: 'en',
            notifications: true,
            fontSize: 16,
            autoSave: true,
            lastUpdated: new Date().toISOString()
        };
    }

    updatePreference(key, value) {
        if (key in this.preferences) {
            this.preferences[key] = value;
            this.preferences.lastUpdated = new Date().toISOString();
            this.savePreferences();
            return true;
        }
        return false;
    }

    savePreferences() {
        try {
            localStorage.setItem(USER_PREFERENCES_KEY, JSON.stringify(this.preferences));
            return true;
        } catch (error) {
            console.error('Failed to save preferences:', error);
            return false;
        }
    }

    resetToDefaults() {
        this.preferences = this.getDefaultPreferences();
        this.savePreferences();
    }

    getAllPreferences() {
        return { ...this.preferences };
    }

    exportPreferences() {
        return JSON.stringify(this.preferences, null, 2);
    }

    importPreferences(jsonString) {
        try {
            const imported = JSON.parse(jsonString);
            this.preferences = { ...this.getDefaultPreferences(), ...imported };
            this.preferences.lastUpdated = new Date().toISOString();
            this.savePreferences();
            return true;
        } catch (error) {
            console.error('Failed to import preferences:', error);
            return false;
        }
    }
}

const preferencesManager = new UserPreferencesManager();