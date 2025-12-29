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
}