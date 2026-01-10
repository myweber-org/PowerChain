const UserPreferences = {
  storageKey: 'user_preferences',

  defaults: {
    theme: 'light',
    language: 'en',
    fontSize: 16,
    notifications: true
  },

  getPreferences() {
    const stored = localStorage.getItem(this.storageKey);
    return stored ? { ...this.defaults, ...JSON.parse(stored) } : { ...this.defaults };
  },

  updatePreferences(newPrefs) {
    const current = this.getPreferences();
    const updated = { ...current, ...newPrefs };
    localStorage.setItem(this.storageKey, JSON.stringify(updated));
    this.dispatchChangeEvent(updated);
    return updated;
  },

  resetPreferences() {
    localStorage.removeItem(this.storageKey);
    this.dispatchChangeEvent(this.defaults);
    return { ...this.defaults };
  },

  dispatchChangeEvent(preferences) {
    const event = new CustomEvent('preferencesChanged', { detail: preferences });
    window.dispatchEvent(event);
  },

  getTheme() {
    return this.getPreferences().theme;
  },

  setTheme(theme) {
    return this.updatePreferences({ theme });
  },

  getLanguage() {
    return this.getPreferences().language;
  },

  setLanguage(lang) {
    return this.updatePreferences({ language: lang });
  }
};

window.UserPreferences = UserPreferences;