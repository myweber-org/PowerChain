function formatDateWithTimezone(date, includeTime = true) {
    if (!(date instanceof Date)) {
        throw new TypeError('Input must be a Date object');
    }

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    if (!includeTime) {
        return `${year}-${month}-${day}`;
    }

    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    const tzOffset = -date.getTimezoneOffset();
    const sign = tzOffset >= 0 ? '+' : '-';
    const absOffset = Math.abs(tzOffset);
    const offsetHours = String(Math.floor(absOffset / 60)).padStart(2, '0');
    const offsetMinutes = String(absOffset % 60).padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}${sign}${offsetHours}:${offsetMinutes}`;
}

function parseFormattedDate(dateString) {
    const isoRegex = /^(\d{4})-(\d{2})-(\d{2})(T(\d{2}):(\d{2}):(\d{2})([+-]\d{2}:\d{2})?)?$/;
    const match = dateString.match(isoRegex);

    if (!match) {
        throw new Error('Invalid date format');
    }

    const [, year, month, day, , hours, minutes, seconds, offset] = match;
    const date = new Date(Date.UTC(year, month - 1, day, hours || 0, minutes || 0, seconds || 0));

    if (offset) {
        const [_, sign, offsetHours, offsetMinutes] = offset.match(/([+-])(\d{2}):(\d{2})/);
        const offsetTotalMinutes = parseInt(offsetHours) * 60 + parseInt(offsetMinutes);
        const adjustment = sign === '+' ? -offsetTotalMinutes : offsetTotalMinutes;
        date.setMinutes(date.getMinutes() + adjustment);
    }

    return date;
}

export { formatDateWithTimezone, parseFormattedDate };function formatDate(dateString, locale = 'en-US') {
  const date = new Date(dateString);
  
  if (isNaN(date.getTime())) {
    throw new Error('Invalid date string provided');
  }
  
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: 'short'
  };
  
  return date.toLocaleDateString(locale, options);
}

function calculateTimeDifference(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    throw new Error('Invalid date string provided');
  }
  
  const difference = Math.abs(end - start);
  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);
  
  return {
    totalMilliseconds: difference,
    days: days,
    hours: hours,
    minutes: minutes,
    seconds: seconds
  };
}

export { formatDate, calculateTimeDifference };function formatDate(dateString, locale = 'en-US') {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
        throw new Error('Invalid date string provided');
    }
    
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZoneName: 'short'
    };
    
    return date.toLocaleString(locale, options);
}

function calculateTimeAgo(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) return 'just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;
    
    return formatDate(dateString);
}

function isValidDate(dateString) {
    const date = new Date(dateString);
    return !isNaN(date.getTime()) && dateString.trim() !== '';
}

export { formatDate, calculateTimeAgo, isValidDate };