const UserPreferencesManager = (function() {
    const STORAGE_KEY = 'user_preferences';
    
    function getPreferences() {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : {};
    }
    
    function setPreference(key, value) {
        const preferences = getPreferences();
        preferences[key] = value;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
        return preferences;
    }
    
    function removePreference(key) {
        const preferences = getPreferences();
        delete preferences[key];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
        return preferences;
    }
    
    function clearAllPreferences() {
        localStorage.removeItem(STORAGE_KEY);
        return {};
    }
    
    function hasPreference(key) {
        const preferences = getPreferences();
        return key in preferences;
    }
    
    function getAllKeys() {
        const preferences = getPreferences();
        return Object.keys(preferences);
    }
    
    return {
        get: getPreferences,
        set: setPreference,
        remove: removePreference,
        clear: clearAllPreferences,
        has: hasPreference,
        keys: getAllKeys
    };
})();const UserPreferencesManager = (function() {
    const PREFERENCES_KEY = 'app_user_preferences';
    
    const defaultPreferences = {
        theme: 'light',
        language: 'en',
        notifications: true,
        fontSize: 16,
        autoSave: true,
        sidebarCollapsed: false
    };

    function getPreferences() {
        try {
            const stored = localStorage.getItem(PREFERENCES_KEY);
            return stored ? { ...defaultPreferences, ...JSON.parse(stored) } : { ...defaultPreferences };
        } catch (error) {
            console.error('Failed to load preferences:', error);
            return { ...defaultPreferences };
        }
    }

    function savePreferences(preferences) {
        try {
            const current = getPreferences();
            const updated = { ...current, ...preferences };
            localStorage.setItem(PREFERENCES_KEY, JSON.stringify(updated));
            return updated;
        } catch (error) {
            console.error('Failed to save preferences:', error);
            return null;
        }
    }

    function resetPreferences() {
        try {
            localStorage.removeItem(PREFERENCES_KEY);
            return { ...defaultPreferences };
        } catch (error) {
            console.error('Failed to reset preferences:', error);
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
        const originalSetItem = localStorage.setItem;
        localStorage.setItem = function(key, value) {
            originalSetItem.apply(this, arguments);
            if (key === PREFERENCES_KEY) {
                callback(getPreferences());
            }
        };
        
        return function unsubscribe() {
            localStorage.setItem = originalSetItem;
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