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

module.exports = { validatePreferences };function validateUserPreferences(preferences) {
    const errors = [];

    if (!preferences || typeof preferences !== 'object') {
        return ['Invalid preferences object'];
    }

    if (preferences.theme && !['light', 'dark', 'auto'].includes(preferences.theme)) {
        errors.push('Theme must be light, dark, or auto');
    }

    if (preferences.notifications !== undefined && typeof preferences.notifications !== 'boolean') {
        errors.push('Notifications must be a boolean value');
    }

    if (preferences.itemsPerPage) {
        const items = Number(preferences.itemsPerPage);
        if (isNaN(items) || items < 5 || items > 100) {
            errors.push('Items per page must be between 5 and 100');
        }
    }

    if (preferences.language && !/^[a-z]{2}(-[A-Z]{2})?$/.test(preferences.language)) {
        errors.push('Language must be in format like en or en-US');
    }

    if (preferences.timezone && !Intl.supportedValuesOf('timeZone').includes(preferences.timezone)) {
        errors.push('Invalid timezone specified');
    }

    return errors;
}

module.exports = { validateUserPreferences };