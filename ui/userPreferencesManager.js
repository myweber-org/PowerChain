const UserPreferences = {
    preferences: {},

    init() {
        this.loadPreferences();
        this.setupEventListeners();
    },

    loadPreferences() {
        const stored = localStorage.getItem('userPreferences');
        if (stored) {
            try {
                this.preferences = JSON.parse(stored);
            } catch (e) {
                console.error('Failed to parse stored preferences:', e);
                this.preferences = this.getDefaultPreferences();
            }
        } else {
            this.preferences = this.getDefaultPreferences();
        }
    },

    getDefaultPreferences() {
        return {
            theme: 'light',
            fontSize: 'medium',
            notifications: true,
            language: 'en',
            autoSave: false,
            sidebarCollapsed: false
        };
    },

    savePreferences() {
        try {
            localStorage.setItem('userPreferences', JSON.stringify(this.preferences));
            this.dispatchEvent('preferencesUpdated', this.preferences);
            return true;
        } catch (e) {
            console.error('Failed to save preferences:', e);
            return false;
        }
    },

    getPreference(key) {
        return this.preferences[key];
    },

    setPreference(key, value) {
        if (key in this.preferences) {
            const oldValue = this.preferences[key];
            this.preferences[key] = value;
            this.savePreferences();
            this.dispatchEvent('preferenceChanged', { key, oldValue, newValue: value });
            return true;
        }
        return false;
    },

    resetToDefaults() {
        this.preferences = this.getDefaultPreferences();
        this.savePreferences();
        this.dispatchEvent('preferencesReset', this.preferences);
    },

    getAllPreferences() {
        return { ...this.preferences };
    },

    setupEventListeners() {
        window.addEventListener('storage', (event) => {
            if (event.key === 'userPreferences') {
                this.loadPreferences();
                this.dispatchEvent('preferencesSynced', this.preferences);
            }
        });
    },

    dispatchEvent(eventName, detail) {
        const event = new CustomEvent(`userPreferences:${eventName}`, { detail });
        window.dispatchEvent(event);
    }
};

UserPreferences.init();