const UserPreferencesManager = {
    preferences: {},

    init: function() {
        const stored = localStorage.getItem('userPreferences');
        if (stored) {
            this.preferences = JSON.parse(stored);
        } else {
            this.preferences = {
                theme: 'light',
                language: 'en',
                notifications: true,
                fontSize: 16
            };
            this.save();
        }
    },

    get: function(key) {
        return this.preferences[key];
    },

    set: function(key, value) {
        this.preferences[key] = value;
        this.save();
        return true;
    },

    getAll: function() {
        return { ...this.preferences };
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

    save: function() {
        localStorage.setItem('userPreferences', JSON.stringify(this.preferences));
    }
};

UserPreferencesManager.init();