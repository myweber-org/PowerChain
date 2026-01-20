function validateUserPreferences(preferences) {
  const requiredFields = ['theme', 'language', 'notifications'];
  const allowedThemes = ['light', 'dark', 'auto'];
  const allowedLanguages = ['en', 'es', 'fr', 'de'];

  if (!preferences || typeof preferences !== 'object') {
    throw new Error('Preferences must be an object');
  }

  for (const field of requiredFields) {
    if (!preferences.hasOwnProperty(field)) {
      throw new Error(`Missing required field: ${field}`);
    }
  }

  if (!allowedThemes.includes(preferences.theme)) {
    throw new Error(`Invalid theme. Allowed values: ${allowedThemes.join(', ')}`);
  }

  if (!allowedLanguages.includes(preferences.language)) {
    throw new Error(`Invalid language. Allowed values: ${allowedLanguages.join(', ')}`);
  }

  if (typeof preferences.notifications !== 'boolean') {
    throw new Error('Notifications must be a boolean value');
  }

  return {
    isValid: true,
    message: 'User preferences are valid'
  };
}

module.exports = validateUserPreferences;