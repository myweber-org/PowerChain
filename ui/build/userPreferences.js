const defaultPreferences = {
  theme: 'light',
  notifications: true,
  language: 'en',
  resultsPerPage: 20
};

function validatePreferences(userPrefs) {
  const validKeys = Object.keys(defaultPreferences);
  const validatedPrefs = { ...defaultPreferences };

  for (const key of validKeys) {
    if (userPrefs.hasOwnProperty(key)) {
      if (typeof userPrefs[key] === typeof defaultPreferences[key]) {
        validatedPrefs[key] = userPrefs[key];
      }
    }
  }

  return validatedPrefs;
}

function mergePreferences(existingPrefs, newPrefs) {
  const validatedNewPrefs = validatePreferences(newPrefs);
  return { ...existingPrefs, ...validatedNewPrefs };
}

function getPreference(key) {
  if (!defaultPreferences.hasOwnProperty(key)) {
    throw new Error(`Invalid preference key: ${key}`);
  }
  
  const stored = localStorage.getItem('userPreferences');
  if (stored) {
    const prefs = JSON.parse(stored);
    return prefs[key] !== undefined ? prefs[key] : defaultPreferences[key];
  }
  
  return defaultPreferences[key];
}

function savePreferences(prefs) {
  const validated = validatePreferences(prefs);
  const current = JSON.parse(localStorage.getItem('userPreferences') || '{}');
  const merged = mergePreferences(current, validated);
  localStorage.setItem('userPreferences', JSON.stringify(merged));
  return merged;
}

export { validatePreferences, mergePreferences, getPreference, savePreferences, defaultPreferences };function validateUserPreferences(preferences) {
    const defaults = {
        theme: 'light',
        notifications: true,
        language: 'en',
        timezone: 'UTC',
        resultsPerPage: 25
    };

    const validated = { ...defaults, ...preferences };

    if (!['light', 'dark', 'auto'].includes(validated.theme)) {
        validated.theme = defaults.theme;
    }

    if (typeof validated.notifications !== 'boolean') {
        validated.notifications = defaults.notifications;
    }

    if (!['en', 'es', 'fr', 'de'].includes(validated.language)) {
        validated.language = defaults.language;
    }

    if (!/^[A-Za-z_]+\/[A-Za-z_]+$/.test(validated.timezone)) {
        validated.timezone = defaults.timezone;
    }

    if (typeof validated.resultsPerPage !== 'number' || 
        validated.resultsPerPage < 10 || 
        validated.resultsPerPage > 100) {
        validated.resultsPerPage = defaults.resultsPerPage;
    }

    return validated;
}

function saveUserPreferences(preferences) {
    const validated = validateUserPreferences(preferences);
    localStorage.setItem('userPreferences', JSON.stringify(validated));
    return validated;
}

function loadUserPreferences() {
    const stored = localStorage.getItem('userPreferences');
    if (stored) {
        try {
            return validateUserPreferences(JSON.parse(stored));
        } catch (error) {
            console.error('Failed to parse stored preferences:', error);
        }
    }
    return validateUserPreferences({});
}

export { validateUserPreferences, saveUserPreferences, loadUserPreferences };function validateUserPreferences(preferences) {
    const defaults = {
        theme: 'light',
        language: 'en',
        notifications: true,
        fontSize: 16,
        autoSave: false
    };

    const validated = { ...defaults, ...preferences };

    if (!['light', 'dark', 'auto'].includes(validated.theme)) {
        validated.theme = defaults.theme;
    }

    if (!['en', 'es', 'fr', 'de'].includes(validated.language)) {
        validated.language = defaults.language;
    }

    if (typeof validated.notifications !== 'boolean') {
        validated.notifications = defaults.notifications;
    }

    if (typeof validated.fontSize !== 'number' || validated.fontSize < 12 || validated.fontSize > 24) {
        validated.fontSize = defaults.fontSize;
    }

    if (typeof validated.autoSave !== 'boolean') {
        validated.autoSave = defaults.autoSave;
    }

    return validated;
}

function saveUserPreferences(preferences) {
    const validatedPrefs = validateUserPreferences(preferences);
    localStorage.setItem('userPreferences', JSON.stringify(validatedPrefs));
    return validatedPrefs;
}

function loadUserPreferences() {
    const stored = localStorage.getItem('userPreferences');
    if (stored) {
        try {
            return validateUserPreferences(JSON.parse(stored));
        } catch (error) {
            console.error('Failed to parse stored preferences:', error);
        }
    }
    return validateUserPreferences({});
}

export { validateUserPreferences, saveUserPreferences, loadUserPreferences };function validateUserPreferences(preferences) {
    const defaults = {
        theme: 'light',
        notifications: true,
        language: 'en',
        resultsPerPage: 25
    };

    const validated = { ...defaults };

    if (preferences && typeof preferences === 'object') {
        if (['light', 'dark', 'auto'].includes(preferences.theme)) {
            validated.theme = preferences.theme;
        }

        if (typeof preferences.notifications === 'boolean') {
            validated.notifications = preferences.notifications;
        }

        if (['en', 'es', 'fr', 'de'].includes(preferences.language)) {
            validated.language = preferences.language;
        }

        if (Number.isInteger(preferences.resultsPerPage) && preferences.resultsPerPage >= 10 && preferences.resultsPerPage <= 100) {
            validated.resultsPerPage = preferences.resultsPerPage;
        }
    }

    return validated;
}

function initializeUserPreferences() {
    try {
        const stored = localStorage.getItem('userPreferences');
        const parsed = stored ? JSON.parse(stored) : {};
        const preferences = validateUserPreferences(parsed);
        localStorage.setItem('userPreferences', JSON.stringify(preferences));
        return preferences;
    } catch (error) {
        console.error('Failed to initialize user preferences:', error);
        return validateUserPreferences({});
    }
}

function updateUserPreference(key, value) {
    const current = initializeUserPreferences();
    const updated = { ...current, [key]: value };
    const validated = validateUserPreferences(updated);
    localStorage.setItem('userPreferences', JSON.stringify(validated));
    return validated;
}

function resetUserPreferences() {
    const defaults = validateUserPreferences({});
    localStorage.setItem('userPreferences', JSON.stringify(defaults));
    return defaults;
}

export { validateUserPreferences, initializeUserPreferences, updateUserPreference, resetUserPreferences };
const userPreferences = {
  theme: 'light',
  fontSize: 16,
  notifications: true,
  
  init() {
    this.loadPreferences();
    this.applyPreferences();
    this.setupEventListeners();
  },
  
  loadPreferences() {
    const saved = localStorage.getItem('userPreferences');
    if (saved) {
      const preferences = JSON.parse(saved);
      this.theme = preferences.theme || this.theme;
      this.fontSize = preferences.fontSize || this.fontSize;
      this.notifications = preferences.notifications !== undefined ? preferences.notifications : this.notifications;
    }
  },
  
  savePreferences() {
    const preferences = {
      theme: this.theme,
      fontSize: this.fontSize,
      notifications: this.notifications
    };
    localStorage.setItem('userPreferences', JSON.stringify(preferences));
  },
  
  applyPreferences() {
    document.documentElement.setAttribute('data-theme', this.theme);
    document.documentElement.style.fontSize = `${this.fontSize}px`;
    
    const notificationElement = document.getElementById('notificationToggle');
    if (notificationElement) {
      notificationElement.checked = this.notifications;
    }
  },
  
  toggleTheme() {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
    this.applyPreferences();
    this.savePreferences();
  },
  
  updateFontSize(newSize) {
    if (newSize >= 12 && newSize <= 24) {
      this.fontSize = newSize;
      this.applyPreferences();
      this.savePreferences();
    }
  },
  
  toggleNotifications() {
    this.notifications = !this.notifications;
    this.savePreferences();
  },
  
  setupEventListeners() {
    const themeToggle = document.getElementById('themeToggle');
    const fontSizeInput = document.getElementById('fontSizeInput');
    const notificationToggle = document.getElementById('notificationToggle');
    
    if (themeToggle) {
      themeToggle.addEventListener('click', () => this.toggleTheme());
    }
    
    if (fontSizeInput) {
      fontSizeInput.addEventListener('input', (e) => {
        this.updateFontSize(parseInt(e.target.value));
      });
    }
    
    if (notificationToggle) {
      notificationToggle.addEventListener('change', () => this.toggleNotifications());
    }
  },
  
  resetToDefaults() {
    this.theme = 'light';
    this.fontSize = 16;
    this.notifications = true;
    this.savePreferences();
    this.applyPreferences();
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = userPreferences;
} else {
  window.userPreferences = userPreferences;
}