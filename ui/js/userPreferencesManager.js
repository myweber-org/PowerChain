class UserPreferencesManager {
    constructor() {
        this.prefs = {};
        this.storageKey = 'appUserPreferences';
        this.storage = this._getAvailableStorage();
        this._loadPreferences();
    }

    _getAvailableStorage() {
        try {
            localStorage.setItem('test', 'test');
            localStorage.removeItem('test');
            return localStorage;
        } catch (e) {
            console.warn('LocalStorage unavailable, falling back to sessionStorage');
            return sessionStorage;
        }
    }

    _loadPreferences() {
        try {
            const stored = this.storage.getItem(this.storageKey);
            if (stored) {
                this.prefs = JSON.parse(stored);
            }
        } catch (error) {
            console.error('Failed to load preferences:', error);
            this.prefs = {};
        }
    }

    _savePreferences() {
        try {
            this.storage.setItem(this.storageKey, JSON.stringify(this.prefs));
        } catch (error) {
            console.error('Failed to save preferences:', error);
        }
    }

    setPreference(key, value) {
        this.prefs[key] = value;
        this._savePreferences();
        return this;
    }

    getPreference(key, defaultValue = null) {
        return this.prefs.hasOwnProperty(key) ? this.prefs[key] : defaultValue;
    }

    removePreference(key) {
        if (this.prefs.hasOwnProperty(key)) {
            delete this.prefs[key];
            this._savePreferences();
        }
        return this;
    }

    clearAllPreferences() {
        this.prefs = {};
        this.storage.removeItem(this.storageKey);
        return this;
    }

    getAllPreferences() {
        return { ...this.prefs };
    }

    hasPreference(key) {
        return this.prefs.hasOwnProperty(key);
    }
}

export default UserPreferencesManager;