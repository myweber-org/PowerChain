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

export { formatDateWithTimezone, parseFormattedDate };