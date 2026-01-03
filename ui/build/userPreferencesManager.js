const UserPreferencesManager = (() => {
    const STORAGE_KEY = 'app_user_preferences';
    
    const defaultPreferences = {
        theme: 'light',
        language: 'en',
        notifications: true,
        fontSize: 16,
        autoSave: true,
        sidebarCollapsed: false
    };

    const loadPreferences = () => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                return { ...defaultPreferences, ...JSON.parse(stored) };
            }
        } catch (error) {
            console.error('Failed to load preferences:', error);
        }
        return { ...defaultPreferences };
    };

    const savePreferences = (preferences) => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
            return true;
        } catch (error) {
            console.error('Failed to save preferences:', error);
            return false;
        }
    };

    const updatePreference = (key, value) => {
        if (!defaultPreferences.hasOwnProperty(key)) {
            throw new Error(`Invalid preference key: ${key}`);
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
        if (savePreferences(defaultPreferences)) {
            Object.keys(defaultPreferences).forEach(key => {
                dispatchPreferenceChange(key, defaultPreferences[key]);
            });
            return true;
        }
        return false;
    };

    const dispatchPreferenceChange = (key, value) => {
        window.dispatchEvent(new CustomEvent('preferencechange', {
            detail: { key, value }
        }));
    };

    const getPreference = (key) => {
        const preferences = loadPreferences();
        return preferences[key];
    };

    const getAllPreferences = () => {
        return loadPreferences();
    };

    const subscribe = (callback) => {
        window.addEventListener('preferencechange', callback);
        return () => window.removeEventListener('preferencechange', callback);
    };

    return {
        get: getPreference,
        getAll: getAllPreferences,
        set: updatePreference,
        reset: resetPreferences,
        subscribe,
        defaultValues: { ...defaultPreferences }
    };
})();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = UserPreferencesManager;
}