const UserPreferencesManager = {
    storageKey: 'user_preferences',

    defaultPreferences: {
        theme: 'light',
        language: 'en',
        fontSize: 16,
        notifications: true
    },

    getPreferences() {
        try {
            const stored = localStorage.getItem(this.storageKey);
            return stored ? JSON.parse(stored) : { ...this.defaultPreferences };
        } catch (error) {
            console.error('Error reading preferences:', error);
            return { ...this.defaultPreferences };
        }
    },

    savePreferences(preferences) {
        try {
            const current = this.getPreferences();
            const updated = { ...current, ...preferences };
            localStorage.setItem(this.storageKey, JSON.stringify(updated));
            return updated;
        } catch (error) {
            console.error('Error saving preferences:', error);
            return null;
        }
    },

    resetPreferences() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.defaultPreferences));
            return { ...this.defaultPreferences };
        } catch (error) {
            console.error('Error resetting preferences:', error);
            return null;
        }
    },

    getPreference(key) {
        const preferences = this.getPreferences();
        return preferences[key] !== undefined ? preferences[key] : this.defaultPreferences[key];
    },

    setPreference(key, value) {
        return this.savePreferences({ [key]: value });
    },

    getAllPreferences() {
        return this.getPreferences();
    },

    clearPreferences() {
        try {
            localStorage.removeItem(this.storageKey);
            return true;
        } catch (error) {
            console.error('Error clearing preferences:', error);
            return false;
        }
    }
};

export default UserPreferencesManager;const UserPreferencesManager = (function() {
    const STORAGE_KEY = 'app_preferences';
    const DEFAULTS = {
        theme: 'light',
        fontSize: 16,
        notifications: true,
        language: 'en',
        autoSave: false,
        sidebarCollapsed: false
    };

    let preferences = {};

    function load() {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            preferences = stored ? JSON.parse(stored) : {};
            preferences = { ...DEFAULTS, ...preferences };
        } catch (error) {
            console.warn('Failed to load preferences:', error);
            preferences = { ...DEFAULTS };
        }
        return get();
    }

    function save() {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
            return true;
        } catch (error) {
            console.error('Failed to save preferences:', error);
            return false;
        }
    }

    function get(key = null) {
        if (key) {
            return preferences.hasOwnProperty(key) ? preferences[key] : DEFAULTS[key];
        }
        return { ...preferences };
    }

    function set(key, value) {
        if (typeof key === 'object') {
            preferences = { ...preferences, ...key };
        } else {
            preferences[key] = value;
        }
        save();
        return get();
    }

    function reset() {
        preferences = { ...DEFAULTS };
        localStorage.removeItem(STORAGE_KEY);
        return get();
    }

    function has(key) {
        return preferences.hasOwnProperty(key);
    }

    function getAllKeys() {
        return Object.keys(preferences);
    }

    function getDefaults() {
        return { ...DEFAULTS };
    }

    load();

    return {
        get,
        set,
        reset,
        has,
        getAllKeys,
        getDefaults,
        load
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
        autoSave: true,
        showTutorial: false
    };

    function getPreferences() {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                return { ...defaultPreferences, ...JSON.parse(stored) };
            }
        } catch (error) {
            console.error('Error reading preferences:', error);
        }
        return { ...defaultPreferences };
    }

    function savePreferences(preferences) {
        try {
            const current = getPreferences();
            const updated = { ...current, ...preferences };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
            return updated;
        } catch (error) {
            console.error('Error saving preferences:', error);
            return null;
        }
    }

    function resetPreferences() {
        try {
            localStorage.removeItem(STORAGE_KEY);
            return { ...defaultPreferences };
        } catch (error) {
            console.error('Error resetting preferences:', error);
            return null;
        }
    }

    function getPreference(key) {
        const prefs = getPreferences();
        return prefs[key] !== undefined ? prefs[key] : defaultPreferences[key];
    }

    function setPreference(key, value) {
        return savePreferences({ [key]: value });
    }

    function subscribe(callback) {
        if (typeof callback !== 'function') {
            throw new Error('Callback must be a function');
        }

        const handler = function(event) {
            if (event.key === STORAGE_KEY) {
                callback(getPreferences());
            }
        };

        window.addEventListener('storage', handler);
        
        return function unsubscribe() {
            window.removeEventListener('storage', handler);
        };
    }

    return {
        get: getPreference,
        set: setPreference,
        getAll: getPreferences,
        save: savePreferences,
        reset: resetPreferences,
        subscribe: subscribe,
        defaults: { ...defaultPreferences }
    };
})();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = UserPreferencesManager;
}