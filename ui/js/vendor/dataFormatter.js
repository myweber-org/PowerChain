function formatDateWithTimezone(date, includeTime = true) {
    if (!(date instanceof Date) || isNaN(date)) {
        throw new TypeError('Invalid Date object provided');
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

    const timezoneOffset = -date.getTimezoneOffset();
    const offsetHours = Math.floor(Math.abs(timezoneOffset) / 60);
    const offsetMinutes = Math.abs(timezoneOffset) % 60;
    const offsetSign = timezoneOffset >= 0 ? '+' : '-';

    const formattedOffset = `${offsetSign}${String(offsetHours).padStart(2, '0')}:${String(offsetMinutes).padStart(2, '0')}`;

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}${formattedOffset}`;
}

function parseFormattedDate(dateString) {
    const isoRegex = /^(\d{4})-(\d{2})-(\d{2})(T(\d{2}):(\d{2}):(\d{2})([+-]\d{2}:\d{2})?)?$/;
    const match = dateString.match(isoRegex);

    if (!match) {
        throw new Error('Invalid date format. Expected YYYY-MM-DD or ISO 8601 with timezone.');
    }

    const [, year, month, day, , hours, minutes, seconds, offset] = match;
    const date = new Date(Date.UTC(year, month - 1, day, hours || 0, minutes || 0, seconds || 0));

    if (offset) {
        const offsetSign = offset[0] === '+' ? 1 : -1;
        const [offsetHours, offsetMinutes] = offset.slice(1).split(':').map(Number);
        const totalOffsetMinutes = offsetSign * (offsetHours * 60 + offsetMinutes);
        date.setMinutes(date.getMinutes() - totalOffsetMinutes);
    }

    return date;
}

export { formatDateWithTimezone, parseFormattedDate };