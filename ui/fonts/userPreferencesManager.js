class UserPreferencesManager {
    constructor() {
        this.preferences = this.loadPreferences();
    }

    loadPreferences() {
        const stored = localStorage.getItem('userPreferences');
        if (stored) {
            try {
                return JSON.parse(stored);
            } catch (error) {
                console.error('Failed to parse stored preferences:', error);
            }
        }
        return this.getDefaultPreferences();
    }

    getDefaultPreferences() {
        return {
            theme: 'light',
            language: 'en',
            notifications: true,
            fontSize: 16,
            autoSave: false,
            showTutorial: true
        };
    }

    updatePreference(key, value) {
        if (key in this.preferences) {
            this.preferences[key] = value;
            this.savePreferences();
            return true;
        }
        return false;
    }

    savePreferences() {
        try {
            localStorage.setItem('userPreferences', JSON.stringify(this.preferences));
            return true;
        } catch (error) {
            console.error('Failed to save preferences:', error);
            return false;
        }
    }

    resetToDefaults() {
        this.preferences = this.getDefaultPreferences();
        this.savePreferences();
    }

    getAllPreferences() {
        return { ...this.preferences };
    }

    getPreference(key) {
        return this.preferences[key];
    }

    exportPreferences() {
        return JSON.stringify(this.preferences, null, 2);
    }

    importPreferences(jsonString) {
        try {
            const imported = JSON.parse(jsonString);
            this.preferences = { ...this.preferences, ...imported };
            this.savePreferences();
            return true;
        } catch (error) {
            console.error('Failed to import preferences:', error);
            return false;
        }
    }
}

const userPrefs = new UserPreferencesManager();