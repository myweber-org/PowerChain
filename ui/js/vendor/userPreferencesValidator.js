function validatePreferences(preferences) {
    const validations = {
        theme: value => ['light', 'dark', 'auto'].includes(value),
        fontSize: value => Number.isInteger(value) && value >= 12 && value <= 24,
        notifications: value => typeof value === 'boolean',
        language: value => /^[a-z]{2}(-[A-Z]{2})?$/.test(value),
        autoSave: value => typeof value === 'boolean' || (Number.isInteger(value) && value >= 1 && value <= 60)
    };

    const errors = {};

    for (const [key, validator] of Object.entries(validations)) {
        if (preferences.hasOwnProperty(key)) {
            if (!validator(preferences[key])) {
                errors[key] = `Invalid value for ${key}`;
            }
        }
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors: errors
    };
}

function sanitizePreferences(preferences) {
    const sanitized = { ...preferences };
    
    if (sanitized.hasOwnProperty('fontSize')) {
        sanitized.fontSize = Math.max(12, Math.min(24, parseInt(sanitized.fontSize) || 16));
    }
    
    if (sanitized.hasOwnProperty('autoSave') && typeof sanitized.autoSave === 'number') {
        sanitized.autoSave = Math.max(1, Math.min(60, sanitized.autoSave));
    }
    
    return sanitized;
}

export { validatePreferences, sanitizePreferences };