function validateUserPreferences(preferences) {
    const errors = [];

    if (!preferences || typeof preferences !== 'object') {
        return ['Invalid preferences format'];
    }

    if (preferences.theme && !['light', 'dark', 'auto'].includes(preferences.theme)) {
        errors.push('Theme must be light, dark, or auto');
    }

    if (preferences.notifications !== undefined && typeof preferences.notifications !== 'boolean') {
        errors.push('Notifications must be a boolean value');
    }

    if (preferences.itemsPerPage) {
        const items = parseInt(preferences.itemsPerPage);
        if (isNaN(items) || items < 5 || items > 100) {
            errors.push('Items per page must be between 5 and 100');
        }
    }

    if (preferences.language) {
        const validLanguages = ['en', 'es', 'fr', 'de', 'ja'];
        if (!validLanguages.includes(preferences.language)) {
            errors.push(`Language must be one of: ${validLanguages.join(', ')}`);
        }
    }

    if (preferences.timezone) {
        const timezoneRegex = /^[A-Za-z_]+\/[A-Za-z_]+$/;
        if (!timezoneRegex.test(preferences.timezone)) {
            errors.push('Timezone must be in format Area/Location');
        }
    }

    return errors;
}