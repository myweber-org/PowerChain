const userPreferences = {
  theme: 'light',
  language: 'en',
  notifications: true,
  fontSize: 16
};

const UserPreferencesManager = {
  storageKey: 'user_preferences',

  load() {
    const saved = localStorage.getItem(this.storageKey);
    if (saved) {
      Object.assign(userPreferences, JSON.parse(saved));
    }
    return userPreferences;
  },

  save() {
    localStorage.setItem(this.storageKey, JSON.stringify(userPreferences));
    return true;
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
    return defaults;
  },

  getAll() {
    return { ...userPreferences };
  }
};

export default UserPreferencesManager;