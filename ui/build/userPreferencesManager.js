const USER_PREFERENCES_KEY = 'app_user_preferences';

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
            autoSave: false,
            lastUpdated: new Date().toISOString()
        };
    }

    updatePreference(key, value) {
        if (!this.preferences.hasOwnProperty(key)) {
            throw new Error(`Invalid preference key: ${key}`);
        }

        const oldValue = this.preferences[key];
        this.preferences[key] = value;
        this.preferences.lastUpdated = new Date().toISOString();
        
        this.savePreferences();
        
        return {
            success: true,
            key,
            oldValue,
            newValue: value,
            timestamp: this.preferences.lastUpdated
        };
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
        return this.savePreferences();
    }

    getAllPreferences() {
        return { ...this.preferences };
    }

    getPreference(key) {
        return this.preferences[key];
    }

    exportPreferences() {
        return {
            data: this.preferences,
            format: 'json',
            version: '1.0',
            exportedAt: new Date().toISOString()
        };
    }

    importPreferences(data) {
        if (!data || typeof data !== 'object') {
            throw new Error('Invalid preferences data');
        }

        const defaultPrefs = this.getDefaultPreferences();
        const mergedPreferences = { ...defaultPrefs, ...data };
        
        this.preferences = mergedPreferences;
        this.preferences.lastUpdated = new Date().toISOString();
        
        return this.savePreferences();
    }
}

const userPrefs = new UserPreferencesManager();
export default userPrefs;