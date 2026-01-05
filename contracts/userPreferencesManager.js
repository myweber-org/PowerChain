class UserPreferencesManager {
    constructor(storageKey = 'user_preferences') {
        this.storageKey = storageKey;
        this.preferences = this.loadPreferences();
    }

    loadPreferences() {
        try {
            const stored = localStorage.getItem(this.storageKey);
            return stored ? JSON.parse(stored) : {};
        } catch (error) {
            console.error('Failed to load preferences:', error);
            return {};
        }
    }

    savePreferences() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.preferences));
            return true;
        } catch (error) {
            console.error('Failed to save preferences:', error);
            return false;
        }
    }

    setPreference(key, value) {
        this.preferences[key] = value;
        return this.savePreferences();
    }

    getPreference(key, defaultValue = null) {
        return this.preferences.hasOwnProperty(key) ? this.preferences[key] : defaultValue;
    }

    removePreference(key) {
        if (this.preferences.hasOwnProperty(key)) {
            delete this.preferences[key];
            return this.savePreferences();
        }
        return false;
    }

    clearAllPreferences() {
        this.preferences = {};
        return this.savePreferences();
    }

    getAllPreferences() {
        return { ...this.preferences };
    }

    hasPreference(key) {
        return this.preferences.hasOwnProperty(key);
    }
}

export default UserPreferencesManager;