const userPreferences = {
  theme: 'light',
  language: 'en',
  notifications: true,
  fontSize: 16
};

const UserPreferencesManager = {
  storageKey: 'app_user_prefs',

  load() {
    const saved = localStorage.getItem(this.storageKey);
    if (saved) {
      try {
        Object.assign(userPreferences, JSON.parse(saved));
      } catch (error) {
        console.warn('Failed to parse saved preferences:', error);
      }
    }
    return { ...userPreferences };
  },

  save() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(userPreferences));
      return true;
    } catch (error) {
      console.error('Failed to save preferences:', error);
      return false;
    }
  },

  update(key, value) {
    if (userPreferences.hasOwnProperty(key)) {
      userPreferences[key] = value;
      this.save();
      return true;
    }
    return false;
  },

  reset() {
    const defaults = {
      theme: 'light',
      language: 'en',
      notifications: true,
      fontSize: 16
    };
    Object.assign(userPreferences, defaults);
    localStorage.removeItem(this.storageKey);
  },

  getAll() {
    return { ...userPreferences };
  }
};

export default UserPreferencesManager;