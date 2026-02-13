const defaultPreferences = {
  theme: 'light',
  language: 'en',
  notifications: true,
  fontSize: 16
};

class UserPreferences {
  constructor(preferences = {}) {
    this.preferences = this.validatePreferences(preferences);
  }

  validatePreferences(preferences) {
    const validated = { ...defaultPreferences };
    
    for (const key in preferences) {
      if (key in defaultPreferences) {
        const value = preferences[key];
        
        switch (key) {
          case 'theme':
            if (['light', 'dark', 'auto'].includes(value)) {
              validated[key] = value;
            }
            break;
          case 'language':
            if (typeof value === 'string' && value.length === 2) {
              validated[key] = value;
            }
            break;
          case 'notifications':
            if (typeof value === 'boolean') {
              validated[key] = value;
            }
            break;
          case 'fontSize':
            if (Number.isInteger(value) && value >= 12 && value <= 24) {
              validated[key] = value;
            }
            break;
        }
      }
    }
    
    return validated;
  }

  getPreference(key) {
    return this.preferences[key] || defaultPreferences[key];
  }

  setPreference(key, value) {
    const temp = { ...this.preferences, [key]: value };
    this.preferences = this.validatePreferences(temp);
    return this.preferences[key];
  }

  resetToDefaults() {
    this.preferences = { ...defaultPreferences };
    return this.preferences;
  }

  exportPreferences() {
    return JSON.stringify(this.preferences);
  }

  static importPreferences(jsonString) {
    try {
      const parsed = JSON.parse(jsonString);
      return new UserPreferences(parsed);
    } catch (error) {
      return new UserPreferences();
    }
  }
}

export default UserPreferences;