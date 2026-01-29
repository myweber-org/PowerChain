const UserPreferencesManager = (function() {
    const STORAGE_KEY = 'user_preferences';
    const DEFAULT_PREFERENCES = {
        theme: 'light',
        language: 'en',
        fontSize: 'medium',
        notifications: true,
        autoSave: false
    };

    function getPreferences() {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            try {
                return { ...DEFAULT_PREFERENCES, ...JSON.parse(stored) };
            } catch (e) {
                console.error('Failed to parse stored preferences:', e);
                return DEFAULT_PREFERENCES;
            }
        }
        return DEFAULT_PREFERENCES;
    }

    function savePreferences(preferences) {
        try {
            const current = getPreferences();
            const updated = { ...current, ...preferences };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
            dispatchPreferenceChange(updated);
            return true;
        } catch (e) {
            console.error('Failed to save preferences:', e);
            return false;
        }
    }

    function resetPreferences() {
        localStorage.removeItem(STORAGE_KEY);
        dispatchPreferenceChange(DEFAULT_PREFERENCES);
        return DEFAULT_PREFERENCES;
    }

    function dispatchPreferenceChange(preferences) {
        window.dispatchEvent(new CustomEvent('preferencesChanged', {
            detail: preferences
        }));
    }

    function getPreference(key) {
        const prefs = getPreferences();
        return prefs[key] !== undefined ? prefs[key] : null;
    }

    function setPreference(key, value) {
        return savePreferences({ [key]: value });
    }

    function initialize() {
        const prefs = getPreferences();
        applyTheme(prefs.theme);
        applyLanguage(prefs.language);
        applyFontSize(prefs.fontSize);
        return prefs;
    }

    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
    }

    function applyLanguage(lang) {
        document.documentElement.lang = lang;
    }

    function applyFontSize(size) {
        const sizes = { small: '12px', medium: '16px', large: '20px' };
        document.documentElement.style.fontSize = sizes[size] || sizes.medium;
    }

    return {
        getPreferences,
        savePreferences,
        resetPreferences,
        getPreference,
        setPreference,
        initialize,
        applyTheme,
        applyLanguage,
        applyFontSize
    };
})();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = UserPreferencesManager;
}