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

    function loadUserPreferences() {
        try {
            const stored = localStorage.getItem('userPreferences');
            if (stored) {
                const parsed = JSON.parse(stored);
                return validatePreferences(parsed);
            }
            return defaultPreferences;
        } catch (error) {
            console.error('Failed to load user preferences:', error);
            return defaultPreferences;
        }
    }

    function saveUserPreferences(preferences) {
        try {
            const validated = validatePreferences(preferences);
            localStorage.setItem('userPreferences', JSON.stringify(validated));
            return true;
        } catch (error) {
            console.error('Failed to save user preferences:', error);
            return false;
        }
    }

    function resetToDefaults() {
        return saveUserPreferences(defaultPreferences);
    }

    const currentPreferences = loadUserPreferences();
    
    return {
        getPreferences: () => ({ ...currentPreferences }),
        updatePreferences: (updates) => {
            const merged = { ...currentPreferences, ...updates };
            const saved = saveUserPreferences(merged);
            if (saved) {
                Object.assign(currentPreferences, merged);
            }
            return saved;
        },
        reset: resetToDefaults,
        validate: validatePreferences
    };
}

const userPrefs = initializeUserPreferences();