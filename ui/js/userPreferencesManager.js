class UserPreferencesManager {
  constructor() {
    this.preferences = this.loadPreferences();
    this.defaults = {
      theme: 'light',
      language: 'en',
      notifications: true,
      fontSize: 16,
      autoSave: false
    };
  }

  loadPreferences() {
    try {
      const stored = localStorage.getItem('userPreferences');
      return stored ? JSON.parse(stored) : {};
    } catch (error) {
      console.warn('Failed to load preferences:', error);
      return {};
    }
  }

  savePreferences() {
    try {
      localStorage.setItem('userPreferences', JSON.stringify(this.preferences));
      return true;
    } catch (error) {
      console.error('Failed to save preferences:', error);
      return false;
    }
  }

  getPreference(key) {
    return this.preferences[key] !== undefined 
      ? this.preferences[key] 
      : this.defaults[key];
  }

  setPreference(key, value) {
    if (this.defaults[key] === undefined) {
      throw new Error(`Invalid preference key: ${key}`);
    }

    const oldValue = this.getPreference(key);
    this.preferences[key] = value;
    
    if (this.savePreferences()) {
      this.dispatchPreferenceChange(key, value, oldValue);
      return true;
    }
    
    return false;
  }

  resetPreference(key) {
    if (this.defaults[key] === undefined) {
      throw new Error(`Invalid preference key: ${key}`);
    }

    const oldValue = this.getPreference(key);
    delete this.preferences[key];
    
    if (this.savePreferences()) {
      this.dispatchPreferenceChange(key, this.defaults[key], oldValue);
      return true;
    }
    
    return false;
  }

  resetAllPreferences() {
    const oldPreferences = { ...this.preferences };
    this.preferences = {};
    
    if (this.savePreferences()) {
      Object.keys(this.defaults).forEach(key => {
        this.dispatchPreferenceChange(key, this.defaults[key], oldPreferences[key]);
      });
      return true;
    }
    
    return false;
  }

  getAllPreferences() {
    return Object.keys(this.defaults).reduce((acc, key) => {
      acc[key] = this.getPreference(key);
      return acc;
    }, {});
  }

  dispatchPreferenceChange(key, newValue, oldValue) {
    const event = new CustomEvent('preferencechange', {
      detail: { key, newValue, oldValue }
    });
    window.dispatchEvent(event);
  }
}

const preferenceManager = new UserPreferencesManager();

window.addEventListener('preferencechange', (event) => {
  console.log(`Preference changed: ${event.detail.key}`, {
    from: event.detail.oldValue,
    to: event.detail.newValue
  });
});

export default preferenceManager;