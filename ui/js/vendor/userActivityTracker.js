class UserActivityTracker {
  constructor(timeoutMinutes = 15) {
    this.timeout = timeoutMinutes * 60 * 1000;
    this.lastActivity = Date.now();
    this.sessionId = this.generateSessionId();
    this.events = [];
    this.initTracking();
  }

  generateSessionId() {
    return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  initTracking() {
    ['mousedown', 'keydown', 'scroll', 'touchstart'].forEach(event => {
      document.addEventListener(event, () => this.recordActivity(), { passive: true });
    });

    this.checkInactivity();
    this.logEvent('session_started', { sessionId: this.sessionId });
  }

  recordActivity() {
    this.lastActivity = Date.now();
  }

  checkInactivity() {
    setInterval(() => {
      const inactiveTime = Date.now() - this.lastActivity;
      if (inactiveTime > this.timeout) {
        this.logEvent('session_timeout', { inactiveTime });
        this.handleTimeout();
      }
    }, 60000);
  }

  logEvent(eventType, data = {}) {
    const event = {
      type: eventType,
      timestamp: new Date().toISOString(),
      sessionId: this.sessionId,
      data: data
    };
    this.events.push(event);
    this.sendToAnalytics(event);
  }

  sendToAnalytics(event) {
    if (navigator.sendBeacon) {
      const blob = new Blob([JSON.stringify(event)], { type: 'application/json' });
      navigator.sendBeacon('/api/analytics', blob);
    } else {
      fetch('/api/analytics', {
        method: 'POST',
        body: JSON.stringify(event),
        headers: { 'Content-Type': 'application/json' },
        keepalive: true
      });
    }
  }

  handleTimeout() {
    this.logEvent('user_inactive', { message: 'User session expired due to inactivity' });
    alert('Your session has expired due to inactivity. Please refresh the page.');
  }

  getSessionSummary() {
    return {
      sessionId: this.sessionId,
      startTime: this.events[0]?.timestamp,
      eventCount: this.events.length,
      lastActivity: new Date(this.lastActivity).toISOString()
    };
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = UserActivityTracker;
}