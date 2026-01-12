const userPreferencesManager = {
    preferences: {
        theme: 'light',
        language: 'en',
        notifications: true,
        fontSize: 16
    },

    init: function() {
        const stored = localStorage.getItem('userPreferences');
        if (stored) {
            this.preferences = JSON.parse(stored);
        }
        return this.preferences;
    },

    update: function(key, value) {
        if (this.preferences.hasOwnProperty(key)) {
            this.preferences[key] = value;
            this.save();
            return true;
        }
        return false;
    },

    save: function() {
        localStorage.setItem('userPreferences', JSON.stringify(this.preferences));
    },

    reset: function() {
        this.preferences = {
            theme: 'light',
            language: 'en',
            notifications: true,
            fontSize: 16
        };
        this.save();
    },

    getAll: function() {
        return {...this.preferences};
    }
};

export default userPreferencesManager;