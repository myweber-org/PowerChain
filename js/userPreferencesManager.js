class UserPreferencesManager {
    constructor() {
        this.prefs = this.loadPreferences();
    }

    loadPreferences() {
        const stored = localStorage.getItem('userPreferences');
        return stored ? JSON.parse(stored) : {
            theme: 'light',
            language: 'en',
            notifications: true,
            fontSize: 16,
            autoSave: false
        };
    }

    savePreferences() {
        localStorage.setItem('userPreferences', JSON.stringify(this.prefs));
        return true;
    }

    updatePreference(key, value) {
        if (key in this.prefs) {
            this.prefs[key] = value;
            this.savePreferences();
            return true;
        }
        return false;
    }

    getPreference(key) {
        return this.prefs[key];
    }

    resetToDefaults() {
        this.prefs = {
            theme: 'light',
            language: 'en',
            notifications: true,
            fontSize: 16,
            autoSave: false
        };
        this.savePreferences();
    }

    exportPreferences() {
        return JSON.stringify(this.prefs, null, 2);
    }

    importPreferences(jsonString) {
        try {
            const imported = JSON.parse(jsonString);
            this.prefs = { ...this.prefs, ...imported };
            this.savePreferences();
            return true;
        } catch (error) {
            console.error('Invalid preferences format:', error);
            return false;
        }
    }
}

const preferenceManager = new UserPreferencesManager();const UserPreferencesManager = (() => {
    const STORAGE_KEY = 'app_user_preferences';
    
    const defaultPreferences = {
        theme: 'light',
        fontSize: 16,
        notifications: true,
        language: 'en',
        autoSave: true,
        sidebarCollapsed: false
    };

    const getPreferences = () => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            return stored ? { ...defaultPreferences, ...JSON.parse(stored) } : { ...defaultPreferences };
        } catch (error) {
            console.error('Failed to load preferences:', error);
            return { ...defaultPreferences };
        }
    };

    const savePreferences = (preferences) => {
        try {
            const current = getPreferences();
            const updated = { ...current, ...preferences };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
            return updated;
        } catch (error) {
            console.error('Failed to save preferences:', error);
            return null;
        }
    };

    const resetPreferences = () => {
        try {
            localStorage.removeItem(STORAGE_KEY);
            return { ...defaultPreferences };
        } catch (error) {
            console.error('Failed to reset preferences:', error);
            return null;
        }
    };

    const getPreference = (key) => {
        const preferences = getPreferences();
        return preferences[key] !== undefined ? preferences[key] : defaultPreferences[key];
    };

    const setPreference = (key, value) => {
        return savePreferences({ [key]: value });
    };

    const subscribe = (callback) => {
        const handler = (event) => {
            if (event.key === STORAGE_KEY) {
                callback(getPreferences());
            }
        };
        window.addEventListener('storage', handler);
        return () => window.removeEventListener('storage', handler);
    };

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