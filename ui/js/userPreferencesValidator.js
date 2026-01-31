function validatePreferences(preferences) {
    const validKeys = ['theme', 'language', 'notifications', 'timezone'];
    const validThemes = ['light', 'dark', 'auto'];
    const validLanguages = ['en', 'es', 'fr', 'de'];
    
    if (!preferences || typeof preferences !== 'object') {
        throw new Error('Preferences must be an object');
    }
    
    for (const key in preferences) {
        if (!validKeys.includes(key)) {
            throw new Error(`Invalid preference key: ${key}`);
        }
    }
    
    if (preferences.theme && !validThemes.includes(preferences.theme)) {
        throw new Error(`Invalid theme value: ${preferences.theme}`);
    }
    
    if (preferences.language && !validLanguages.includes(preferences.language)) {
        throw new Error(`Invalid language value: ${preferences.language}`);
    }
    
    if (preferences.timezone && typeof preferences.timezone !== 'string') {
        throw new Error('Timezone must be a string');
    }
    
    if (preferences.notifications !== undefined && typeof preferences.notifications !== 'boolean') {
        throw new Error('Notifications must be a boolean value');
    }
    
    return true;
}

module.exports = { validatePreferences };