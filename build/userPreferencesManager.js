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

export default UserPreferencesManager;