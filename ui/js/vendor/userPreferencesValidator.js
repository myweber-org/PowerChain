function validateUserPreferences(preferences) {
    const allowedKeys = ['theme', 'language', 'notifications', 'timezone'];
    const validThemes = ['light', 'dark', 'auto'];
    const validLanguages = ['en', 'es', 'fr', 'de'];
    
    if (!preferences || typeof preferences !== 'object') {
        throw new Error('Preferences must be an object');
    }
    
    for (const key in preferences) {
        if (!allowedKeys.includes(key)) {
            throw new Error(`Invalid preference key: ${key}`);
        }
    }
    
    if (preferences.theme && !validThemes.includes(preferences.theme)) {
        throw new Error(`Invalid theme value: ${preferences.theme}`);
    }
    
    if (preferences.language && !validLanguages.includes(preferences.language)) {
        throw new Error(`Invalid language code: ${preferences.language}`);
    }
    
    if (preferences.timezone) {
        const timezoneRegex = /^[A-Za-z_]+\/[A-Za-z_]+$/;
        if (!timezoneRegex.test(preferences.timezone)) {
            throw new Error(`Invalid timezone format: ${preferences.timezone}`);
        }
    }
    
    if (preferences.notifications !== undefined && typeof preferences.notifications !== 'boolean') {
        throw new Error('Notifications must be a boolean value');
    }
    
    return true;
}