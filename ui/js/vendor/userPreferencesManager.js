const UserPreferencesManager = (function() {
    const STORAGE_KEY = 'user_preferences';
    
    function getPreferences() {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            return stored ? JSON.parse(stored) : {};
        } catch (error) {
            console.error('Failed to retrieve preferences:', error);
            return {};
        }
    }
    
    function setPreference(key, value) {
        if (!key || typeof key !== 'string') {
            throw new Error('Preference key must be a non-empty string');
        }
        
        const preferences = getPreferences();
        preferences[key] = value;
        
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
            return true;
        } catch (error) {
            console.error('Failed to save preference:', error);
            return false;
        }
    }
    
    function getPreference(key, defaultValue = null) {
        const preferences = getPreferences();
        return preferences.hasOwnProperty(key) ? preferences[key] : defaultValue;
    }
    
    function removePreference(key) {
        const preferences = getPreferences();
        if (preferences.hasOwnProperty(key)) {
            delete preferences[key];
            
            try {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
                return true;
            } catch (error) {
                console.error('Failed to remove preference:', error);
                return false;
            }
        }
        return false;
    }
    
    function clearAllPreferences() {
        try {
            localStorage.removeItem(STORAGE_KEY);
            return true;
        } catch (error) {
            console.error('Failed to clear preferences:', error);
            return false;
        }
    }
    
    function getAllPreferences() {
        return { ...getPreferences() };
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