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

const preferenceManager = new UserPreferencesManager();