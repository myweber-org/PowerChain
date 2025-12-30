function validateUserPreferences(preferences) {
    const errors = [];

    if (!preferences || typeof preferences !== 'object') {
        errors.push('Preferences must be a valid object');
        return errors;
    }

    if (preferences.theme && !['light', 'dark', 'auto'].includes(preferences.theme)) {
        errors.push('Theme must be one of: light, dark, auto');
    }

    if (preferences.notifications !== undefined && typeof preferences.notifications !== 'boolean') {
        errors.push('Notifications must be a boolean value');
    }

    if (preferences.language && typeof preferences.language !== 'string') {
        errors.push('Language must be a string');
    } else if (preferences.language && preferences.language.length !== 2) {
        errors.push('Language must be a 2-letter code');
    }

    if (preferences.timezone !== undefined) {
        const timezoneRegex = /^[A-Za-z_]+\/[A-Za-z_]+$/;
        if (typeof preferences.timezone !== 'string' || !timezoneRegex.test(preferences.timezone)) {
            errors.push('Timezone must be in format: Area/Location');
        }
    }

    if (preferences.itemsPerPage !== undefined) {
        if (!Number.isInteger(preferences.itemsPerPage)) {
            errors.push('Items per page must be an integer');
        } else if (preferences.itemsPerPage < 5 || preferences.itemsPerPage > 100) {
            errors.push('Items per page must be between 5 and 100');
        }
    }

    return errors;
}function validatePreferences(preferences) {
    const errors = [];

    if (!preferences || typeof preferences !== 'object') {
        errors.push('Preferences must be a valid object');
        return errors;
    }

    if (preferences.theme && !['light', 'dark', 'auto'].includes(preferences.theme)) {
        errors.push('Theme must be light, dark, or auto');
    }

    if (preferences.notifications !== undefined && typeof preferences.notifications !== 'boolean') {
        errors.push('Notifications must be a boolean value');
    }

    if (preferences.language && typeof preferences.language !== 'string') {
        errors.push('Language must be a string');
    }

    if (preferences.itemsPerPage) {
        const items = Number(preferences.itemsPerPage);
        if (isNaN(items) || items < 5 || items > 100) {
            errors.push('Items per page must be a number between 5 and 100');
        }
    }

    if (preferences.timezone && !Intl.supportedValuesOf('timeZone').includes(preferences.timezone)) {
        errors.push('Timezone must be a valid IANA timezone');
    }

    return errors;
}

module.exports = { validatePreferences };