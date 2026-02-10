function validatePreferences(preferences) {
    const errors = {};

    if (!preferences.username || preferences.username.trim().length < 3) {
        errors.username = 'Username must be at least 3 characters long';
    }

    if (preferences.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(preferences.email)) {
        errors.email = 'Please enter a valid email address';
    }

    if (preferences.age && (preferences.age < 0 || preferences.age > 150)) {
        errors.age = 'Age must be between 0 and 150';
    }

    if (preferences.theme && !['light', 'dark', 'auto'].includes(preferences.theme)) {
        errors.theme = 'Theme must be light, dark, or auto';
    }

    if (preferences.notificationInterval && (preferences.notificationInterval < 1 || preferences.notificationInterval > 1440)) {
        errors.notificationInterval = 'Notification interval must be between 1 and 1440 minutes';
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors: errors
    };
}function validateUserPreferences(preferences) {
    const validations = {
        theme: (value) => ['light', 'dark', 'auto'].includes(value),
        notifications: (value) => typeof value === 'boolean',
        language: (value) => /^[a-z]{2}(-[A-Z]{2})?$/.test(value),
        timezone: (value) => Intl.supportedValuesOf('timeZone').includes(value),
        itemsPerPage: (value) => Number.isInteger(value) && value >= 5 && value <= 100
    };

    const errors = [];

    for (const [key, validator] of Object.entries(validations)) {
        if (preferences.hasOwnProperty(key)) {
            if (!validator(preferences[key])) {
                errors.push(`Invalid value for ${key}: ${preferences[key]}`);
            }
        }
    }

    if (preferences.hasOwnProperty('customColors')) {
        if (!Array.isArray(preferences.customColors)) {
            errors.push('customColors must be an array');
        } else {
            preferences.customColors.forEach((color, index) => {
                if (!/^#[0-9A-F]{6}$/i.test(color)) {
                    errors.push(`Invalid hex color at index ${index}: ${color}`);
                }
            });
        }
    }

    return {
        isValid: errors.length === 0,
        errors: errors
    };
}

export default validateUserPreferences;