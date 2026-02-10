function validateUserPreferences(preferences) {
    const requiredFields = ['theme', 'language', 'notifications'];
    const allowedThemes = ['light', 'dark', 'auto'];
    const allowedLanguages = ['en', 'es', 'fr', 'de'];

    if (!preferences || typeof preferences !== 'object') {
        throw new Error('Preferences must be an object');
    }

    for (const field of requiredFields) {
        if (!preferences.hasOwnProperty(field)) {
            throw new Error(`Missing required field: ${field}`);
        }
    }

    if (!allowedThemes.includes(preferences.theme)) {
        throw new Error(`Invalid theme. Allowed values: ${allowedThemes.join(', ')}`);
    }

    if (!allowedLanguages.includes(preferences.language)) {
        throw new Error(`Invalid language. Allowed values: ${allowedLanguages.join(', ')}`);
    }

    if (typeof preferences.notifications !== 'boolean') {
        throw new Error('Notifications must be a boolean value');
    }

    if (preferences.hasOwnProperty('timezone')) {
        const timezoneRegex = /^[A-Za-z_]+\/[A-Za-z_]+$/;
        if (!timezoneRegex.test(preferences.timezone)) {
            throw new Error('Invalid timezone format. Use format: Area/Location');
        }
    }

    return true;
}function validateUserPreferences(preferences) {
    const requiredFields = ['theme', 'language', 'notifications'];
    const allowedThemes = ['light', 'dark', 'auto'];
    const allowedLanguages = ['en', 'es', 'fr', 'de'];
    
    for (const field of requiredFields) {
        if (!preferences.hasOwnProperty(field)) {
            throw new Error(`Missing required field: ${field}`);
        }
    }
    
    if (!allowedThemes.includes(preferences.theme)) {
        throw new Error(`Invalid theme. Allowed values: ${allowedThemes.join(', ')}`);
    }
    
    if (!allowedLanguages.includes(preferences.language)) {
        throw new Error(`Invalid language. Allowed values: ${allowedLanguages.join(', ')}`);
    }
    
    if (typeof preferences.notifications !== 'boolean') {
        throw new Error('Notifications must be a boolean value');
    }
    
    if (preferences.hasOwnProperty('timezone')) {
        const timezoneRegex = /^[A-Za-z_]+\/[A-Za-z_]+$/;
        if (!timezoneRegex.test(preferences.timezone)) {
            throw new Error('Invalid timezone format');
        }
    }
    
    return true;
}function validateUserPreferences(preferences) {
    const requiredFields = ['theme', 'language', 'notifications'];
    const allowedThemes = ['light', 'dark', 'auto'];
    const allowedLanguages = ['en', 'es', 'fr', 'de'];
    
    if (!preferences || typeof preferences !== 'object') {
        throw new Error('Preferences must be an object');
    }
    
    for (const field of requiredFields) {
        if (!preferences.hasOwnProperty(field)) {
            throw new Error(`Missing required field: ${field}`);
        }
    }
    
    if (!allowedThemes.includes(preferences.theme)) {
        throw new Error(`Invalid theme. Allowed values: ${allowedThemes.join(', ')}`);
    }
    
    if (!allowedLanguages.includes(preferences.language)) {
        throw new Error(`Invalid language. Allowed values: ${allowedLanguages.join(', ')}`);
    }
    
    if (typeof preferences.notifications !== 'boolean') {
        throw new Error('Notifications must be a boolean value');
    }
    
    if (preferences.hasOwnProperty('timezone')) {
        const timezoneRegex = /^[A-Za-z_]+\/[A-Za-z_]+$/;
        if (!timezoneRegex.test(preferences.timezone)) {
            throw new Error('Invalid timezone format');
        }
    }
    
    return true;
}function validateUserPreferences(preferences) {
    const allowedThemes = ['light', 'dark', 'auto'];
    const allowedLanguages = ['en', 'es', 'fr', 'de'];
    const maxItemsPerPage = 100;

    if (!preferences || typeof preferences !== 'object') {
        throw new Error('Preferences must be an object');
    }

    if (preferences.theme && !allowedThemes.includes(preferences.theme)) {
        throw new Error(`Theme must be one of: ${allowedThemes.join(', ')}`);
    }

    if (preferences.language && !allowedLanguages.includes(preferences.language)) {
        throw new Error(`Language must be one of: ${allowedLanguages.join(', ')}`);
    }

    if (preferences.itemsPerPage) {
        const items = Number(preferences.itemsPerPage);
        if (isNaN(items) || items < 1 || items > maxItemsPerPage) {
            throw new Error(`Items per page must be between 1 and ${maxItemsPerPage}`);
        }
    }

    if (preferences.notifications) {
        if (typeof preferences.notifications !== 'object') {
            throw new Error('Notifications must be an object');
        }
        
        const notificationTypes = ['email', 'push', 'sms'];
        for (const type of notificationTypes) {
            if (preferences.notifications[type] !== undefined && 
                typeof preferences.notifications[type] !== 'boolean') {
                throw new Error(`Notification preference for ${type} must be boolean`);
            }
        }
    }

    return true;
}

module.exports = { validateUserPreferences };function validateUserPreferences(preferences) {
    const requiredFields = ['theme', 'language', 'notifications'];
    const allowedThemes = ['light', 'dark', 'auto'];
    const allowedLanguages = ['en', 'es', 'fr', 'de'];

    for (const field of requiredFields) {
        if (!preferences.hasOwnProperty(field)) {
            throw new Error(`Missing required field: ${field}`);
        }
    }

    if (!allowedThemes.includes(preferences.theme)) {
        throw new Error(`Invalid theme. Allowed values: ${allowedThemes.join(', ')}`);
    }

    if (!allowedLanguages.includes(preferences.language)) {
        throw new Error(`Invalid language. Allowed values: ${allowedLanguages.join(', ')}`);
    }

    if (typeof preferences.notifications !== 'boolean') {
        throw new Error('Notifications must be a boolean value');
    }

    return true;
}function validateUserPreferences(preferences) {
    const validKeys = ['theme', 'language', 'notifications', 'timezone'];
    const requiredKeys = ['theme', 'language'];
    
    if (!preferences || typeof preferences !== 'object') {
        throw new Error('Preferences must be an object');
    }
    
    const preferenceKeys = Object.keys(preferences);
    
    for (const key of preferenceKeys) {
        if (!validKeys.includes(key)) {
            throw new Error(`Invalid preference key: ${key}`);
        }
    }
    
    for (const requiredKey of requiredKeys) {
        if (!preferenceKeys.includes(requiredKey)) {
            throw new Error(`Missing required preference: ${requiredKey}`);
        }
    }
    
    if (preferences.theme && !['light', 'dark', 'auto'].includes(preferences.theme)) {
        throw new Error('Theme must be light, dark, or auto');
    }
    
    if (preferences.language && typeof preferences.language !== 'string') {
        throw new Error('Language must be a string');
    }
    
    if (preferences.notifications !== undefined && typeof preferences.notifications !== 'boolean') {
        throw new Error('Notifications must be a boolean value');
    }
    
    if (preferences.timezone && !/^[A-Za-z_]+\/[A-Za-z_]+$/.test(preferences.timezone)) {
        throw new Error('Timezone must be in format Area/Location');
    }
    
    return true;
}