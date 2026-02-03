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
}