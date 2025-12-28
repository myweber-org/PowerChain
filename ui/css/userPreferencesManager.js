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
})();