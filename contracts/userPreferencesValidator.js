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
  }

  if (preferences.itemsPerPage) {
    const items = parseInt(preferences.itemsPerPage);
    if (isNaN(items) || items < 5 || items > 100) {
      errors.push('Items per page must be a number between 5 and 100');
    }
  }

  if (preferences.timezone && !Intl.supportedValuesOf('timeZone').includes(preferences.timezone)) {
    errors.push('Timezone must be a valid IANA timezone');
  }

  return errors;
}

function saveUserPreferences(userId, preferences) {
  const validationErrors = validateUserPreferences(preferences);
  
  if (validationErrors.length > 0) {
    console.error('Validation failed:', validationErrors);
    return {
      success: false,
      errors: validationErrors
    };
  }

  console.log(`Saving preferences for user ${userId}`);
  
  return {
    success: true,
    message: 'Preferences saved successfully'
  };
}function validateUserPreferences(preferences) {
    const validations = {
        theme: (value) => ['light', 'dark', 'auto'].includes(value),
        notifications: (value) => typeof value === 'boolean',
        fontSize: (value) => Number.isInteger(value) && value >= 10 && value <= 24,
        language: (value) => /^[a-z]{2}(-[A-Z]{2})?$/.test(value)
    };

    const errors = [];

    Object.keys(validations).forEach(key => {
        if (preferences[key] === undefined) {
            errors.push(`Missing required preference: ${key}`);
        } else if (!validations[key](preferences[key])) {
            errors.push(`Invalid value for ${key}: ${preferences[key]}`);
        }
    });

    return {
        isValid: errors.length === 0,
        errors: errors
    };
}

export { validateUserPreferences };function validateUserPreferences(preferences) {
    const errors = [];

    if (!preferences || typeof preferences !== 'object') {
        return ['Invalid preferences object'];
    }

    if (preferences.theme && !['light', 'dark', 'auto'].includes(preferences.theme)) {
        errors.push('Theme must be one of: light, dark, auto');
    }

    if (preferences.notifications !== undefined && typeof preferences.notifications !== 'boolean') {
        errors.push('Notifications must be a boolean value');
    }

    if (preferences.language && typeof preferences.language !== 'string') {
        errors.push('Language must be a string');
    }

    if (preferences.itemsPerPage !== undefined) {
        if (!Number.isInteger(preferences.itemsPerPage)) {
            errors.push('Items per page must be an integer');
        } else if (preferences.itemsPerPage < 5 || preferences.itemsPerPage > 100) {
            errors.push('Items per page must be between 5 and 100');
        }
    }

    if (preferences.timezone && !/^[A-Za-z_]+\/[A-Za-z_]+$/.test(preferences.timezone)) {
        errors.push('Timezone must be in format: Area/Location');
    }

    return errors;
}