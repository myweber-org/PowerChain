const userPreferencesManager = (() => {
  const PREF_KEY = 'app_preferences';
  const defaultPreferences = {
    theme: 'light',
    language: 'en',
    notifications: true,
    fontSize: 16,
    autoSave: false
  };

  function getPreferences() {
    const stored = localStorage.getItem(PREF_KEY);
    return stored ? { ...defaultPreferences, ...JSON.parse(stored) } : { ...defaultPreferences };
  }

  function updatePreferences(newPreferences) {
    const current = getPreferences();
    const updated = { ...current, ...newPreferences };
    localStorage.setItem(PREF_KEY, JSON.stringify(updated));
    dispatchPreferenceChange(updated);
    return updated;
  }

  function resetPreferences() {
    localStorage.removeItem(PREF_KEY);
    dispatchPreferenceChange({ ...defaultPreferences });
    return { ...defaultPreferences };
  }

  function dispatchPreferenceChange(preferences) {
    window.dispatchEvent(new CustomEvent('preferencesChanged', {
      detail: preferences
    }));
  }

  function subscribe(callback) {
    window.addEventListener('preferencesChanged', (event) => callback(event.detail));
    return () => window.removeEventListener('preferencesChanged', (event) => callback(event.detail));
  }

  function validatePreference(key, value) {
    const validators = {
      theme: (val) => ['light', 'dark', 'auto'].includes(val),
      language: (val) => /^[a-z]{2}(-[A-Z]{2})?$/.test(val),
      notifications: (val) => typeof val === 'boolean',
      fontSize: (val) => Number.isInteger(val) && val >= 12 && val <= 24,
      autoSave: (val) => typeof val === 'boolean'
    };
    return validators[key] ? validators[key](value) : false;
  }

  return {
    get: getPreferences,
    update: updatePreferences,
    reset: resetPreferences,
    subscribe: subscribe,
    validate: validatePreference
  };
})();

export default userPreferencesManager;