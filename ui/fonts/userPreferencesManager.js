class UserPreferencesManager {
    constructor() {
        this.preferences = this.loadPreferences();
        this.listeners = new Set();
    }

    loadPreferences() {
        try {
            const stored = localStorage.getItem('userPreferences');
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
            autoSave: true,
            showTutorial: false
        };
    }

    savePreferences() {
        try {
            localStorage.setItem('userPreferences', JSON.stringify(this.preferences));
            this.notifyListeners();
            return true;
        } catch (error) {
            console.error('Failed to save preferences:', error);
            return false;
        }
    }

    updatePreference(key, value) {
        if (key in this.preferences) {
            this.preferences[key] = value;
            return this.savePreferences();
        }
        return false;
    }

    getPreference(key) {
        return this.preferences[key];
    }

    getAllPreferences() {
        return { ...this.preferences };
    }

    resetToDefaults() {
        this.preferences = this.getDefaultPreferences();
        return this.savePreferences();
    }

    addChangeListener(callback) {
        this.listeners.add(callback);
    }

    removeChangeListener(callback) {
        this.listeners.delete(callback);
    }

    notifyListeners() {
        this.listeners.forEach(callback => {
            try {
                callback(this.preferences);
            } catch (error) {
                console.error('Listener error:', error);
            }
        });
    }

    exportPreferences() {
        return JSON.stringify(this.preferences, null, 2);
    }

    importPreferences(jsonString) {
        try {
            const imported = JSON.parse(jsonString);
            const isValid = Object.keys(this.getDefaultPreferences())
                .every(key => key in imported);
            
            if (isValid) {
                this.preferences = { ...this.getDefaultPreferences(), ...imported };
                return this.savePreferences();
            }
            return false;
        } catch (error) {
            console.error('Failed to import preferences:', error);
            return false;
        }
    }
}