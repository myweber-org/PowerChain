function validateUserPreferences(preferences) {
    const errors = [];

    if (!preferences || typeof preferences !== 'object') {
        errors.push('Preferences must be an object');
        return errors;
    }

    if (preferences.theme && !['light', 'dark', 'auto'].includes(preferences.theme)) {
        errors.push('Theme must be light, dark, or auto');
    }

    if (preferences.language && typeof preferences.language !== 'string') {
        errors.push('Language must be a string');
    }

    if (preferences.notifications !== undefined && typeof preferences.notifications !== 'boolean') {
        errors.push('Notifications must be a boolean value');
    }

    if (preferences.itemsPerPage && (typeof preferences.itemsPerPage !== 'number' || preferences.itemsPerPage < 5 || preferences.itemsPerPage > 100)) {
        errors.push('Items per page must be a number between 5 and 100');
    }

    if (preferences.timezone && !/^[A-Za-z_]+\/[A-Za-z_]+$/.test(preferences.timezone)) {
        errors.push('Timezone must be in format Area/Location');
    }

    return errors;
}