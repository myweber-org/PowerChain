function initializeUserPreferences() {
    const defaultPreferences = {
        theme: 'light',
        language: 'en',
        notifications: true,
        fontSize: 16,
        autoSave: true
    };

    function validatePreferences(prefs) {
        const validThemes = ['light', 'dark', 'auto'];
        const validLanguages = ['en', 'es', 'fr', 'de'];
        
        if (!validThemes.includes(prefs.theme)) {
            prefs.theme = defaultPreferences.theme;
        }
        
        if (!validLanguages.includes(prefs.language)) {
            prefs.language = defaultPreferences.language;
        }
        
        if (typeof prefs.notifications !== 'boolean') {
            prefs.notifications = defaultPreferences.notifications;
        }
        
        if (typeof prefs.fontSize !== 'number' || prefs.fontSize < 12 || prefs.fontSize > 24) {
            prefs.fontSize = defaultPreferences.fontSize;
        }
        
        if (typeof prefs.autoSave !== 'boolean') {
            prefs.autoSave = defaultPreferences.autoSave;
        }
        
        return prefs;
    }

    function loadPreferences() {
        try {
            const stored = localStorage.getItem('userPreferences');
            if (stored) {
                const parsed = JSON.parse(stored);
                return validatePreferences(parsed);
            }
            return defaultPreferences;
        } catch (error) {
            console.error('Failed to load preferences:', error);
            return defaultPreferences;
        }
    }

    function savePreferences(prefs) {
        try {
            const validated = validatePreferences(prefs);
            localStorage.setItem('userPreferences', JSON.stringify(validated));
            return true;
        } catch (error) {
            console.error('Failed to save preferences:', error);
            return false;
        }
    }

    function resetToDefaults() {
        return savePreferences(defaultPreferences);
    }

    function getPreference(key) {
        const prefs = loadPreferences();
        return prefs[key] || defaultPreferences[key];
    }

    function updatePreference(key, value) {
        const prefs = loadPreferences();
        prefs[key] = value;
        return savePreferences(prefs);
    }

    return {
        load: loadPreferences,
        save: savePreferences,
        reset: resetToDefaults,
        get: getPreference,
        update: updatePreference,
        defaults: defaultPreferences
    };
}

const userPrefs = initializeUserPreferences();