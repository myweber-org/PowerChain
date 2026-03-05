function validateUserPreferences(preferences) {
    const requiredFields = ['theme', 'notifications', 'language'];
    const fieldTypes = {
        theme: 'string',
        notifications: 'boolean',
        language: 'string'
    };

    for (const field of requiredFields) {
        if (!preferences.hasOwnProperty(field)) {
            throw new Error(`Missing required field: ${field}`);
        }
        if (typeof preferences[field] !== fieldTypes[field]) {
            throw new Error(`Invalid type for field ${field}. Expected ${fieldTypes[field]}, got ${typeof preferences[field]}`);
        }
    }

    const validThemes = ['light', 'dark', 'auto'];
    if (!validThemes.includes(preferences.theme)) {
        throw new Error(`Invalid theme value. Must be one of: ${validThemes.join(', ')}`);
    }

    const validLanguages = ['en', 'es', 'fr', 'de'];
    if (!validLanguages.includes(preferences.language)) {
        throw new Error(`Invalid language value. Must be one of: ${validLanguages.join(', ')}`);
    }

    return true;
}