function validateUserPreferences(preferences) {
    const validKeys = ['theme', 'notifications', 'language', 'timezone'];
    const requiredKeys = ['theme', 'language'];
    
    if (typeof preferences !== 'object' || preferences === null) {
        throw new Error('Preferences must be a non-null object');
    }
    
    for (const key of Object.keys(preferences)) {
        if (!validKeys.includes(key)) {
            throw new Error(`Invalid preference key: ${key}`);
        }
    }
    
    for (const requiredKey of requiredKeys) {
        if (!preferences.hasOwnProperty(requiredKey)) {
            throw new Error(`Missing required preference: ${requiredKey}`);
        }
    }
    
    if (!['light', 'dark', 'auto'].includes(preferences.theme)) {
        throw new Error('Theme must be light, dark, or auto');
    }
    
    if (preferences.notifications !== undefined && typeof preferences.notifications !== 'boolean') {
        throw new Error('Notifications must be a boolean value');
    }
    
    if (!/^[a-z]{2}(-[A-Z]{2})?$/.test(preferences.language)) {
        throw new Error('Language must be in format like en or en-US');
    }
    
    if (preferences.timezone && !/^[A-Za-z_]+\/[A-Za-z_]+$/.test(preferences.timezone)) {
        throw new Error('Timezone must be in format like America/New_York');
    }
    
    return true;
}