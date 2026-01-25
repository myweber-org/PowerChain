const UserPreferencesManager = (() => {
    const STORAGE_KEY = 'app_user_preferences';

    const defaultPreferences = {
        theme: 'light',
        language: 'en',
        notifications: true,
        fontSize: 16,
        autoSave: false,
        lastUpdated: null
    };

    const getPreferences = () => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (!stored) return { ...defaultPreferences };

            const parsed = JSON.parse(stored);
            return {
                ...defaultPreferences,
                ...parsed,
                lastUpdated: parsed.lastUpdated || null
            };
        } catch (error) {
            console.error('Failed to retrieve preferences:', error);
            return { ...defaultPreferences };
        }
    };

    const updatePreferences = (updates) => {
        try {
            const current = getPreferences();
            const updated = {
                ...current,
                ...updates,
                lastUpdated: new Date().toISOString()
            };

            localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
            return updated;
        } catch (error) {
            console.error('Failed to update preferences:', error);
            return null;
        }
    };

    const resetPreferences = () => {
        try {
            localStorage.removeItem(STORAGE_KEY);
            return { ...defaultPreferences };
        } catch (error) {
            console.error('Failed to reset preferences:', error);
            return null;
        }
    };

    const subscribe = (callback) => {
        const handler = (event) => {
            if (event.key === STORAGE_KEY) {
                callback(getPreferences());
            }
        };
        window.addEventListener('storage', handler);
        return () => window.removeEventListener('storage', handler);
    };

    return {
        getPreferences,
        updatePreferences,
        resetPreferences,
        subscribe
    };
})();

export default UserPreferencesManager;const userPreferences = {
  theme: 'light',
  language: 'en',
  notifications: true,
  fontSize: 16
};

const PREFERENCES_KEY = 'app_preferences';

function savePreferences(preferences) {
  try {
    const serialized = JSON.stringify(preferences);
    localStorage.setItem(PREFERENCES_KEY, serialized);
    return true;
  } catch (error) {
    console.error('Failed to save preferences:', error);
    return false;
  }
}

function loadPreferences() {
  try {
    const stored = localStorage.getItem(PREFERENCES_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Failed to load preferences:', error);
  }
  return { ...userPreferences };
}

function updatePreference(key, value) {
  if (userPreferences.hasOwnProperty(key)) {
    userPreferences[key] = value;
    savePreferences(userPreferences);
    return true;
  }
  return false;
}

function resetPreferences() {
  Object.keys(userPreferences).forEach(key => {
    userPreferences[key] = userPreferences.constructor.prototype[key];
  });
  localStorage.removeItem(PREFERENCES_KEY);
}

function applyPreferences() {
  const prefs = loadPreferences();
  Object.assign(userPreferences, prefs);
  
  document.documentElement.setAttribute('data-theme', userPreferences.theme);
  document.documentElement.style.fontSize = `${userPreferences.fontSize}px`;
  
  if (!userPreferences.notifications) {
    console.log('Notifications disabled');
  }
}

export {
  userPreferences,
  savePreferences,
  loadPreferences,
  updatePreference,
  resetPreferences,
  applyPreferences
};