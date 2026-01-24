function formatDateWithTimezone(date) {
    if (!(date instanceof Date)) {
        throw new TypeError('Input must be a Date object');
    }

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    const timezoneOffset = -date.getTimezoneOffset();
    const offsetSign = timezoneOffset >= 0 ? '+' : '-';
    const offsetHours = String(Math.floor(Math.abs(timezoneOffset) / 60)).padStart(2, '0');
    const offsetMinutes = String(Math.abs(timezoneOffset) % 60).padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}${offsetSign}${offsetHours}:${offsetMinutes}`;
}

function parseFormattedDate(dateString) {
    const regex = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})([+-])(\d{2}):(\d{2})$/;
    const match = dateString.match(regex);

    if (!match) {
        throw new Error('Invalid date format. Expected YYYY-MM-DDTHH:mm:ss±HH:mm');
    }

    const [, year, month, day, hours, minutes, seconds, sign, offsetHours, offsetMinutes] = match;
    const date = new Date(Date.UTC(year, month - 1, day, hours, minutes, seconds));

    const offset = (sign === '+' ? 1 : -1) * (parseInt(offsetHours) * 60 + parseInt(offsetMinutes));
    date.setMinutes(date.getMinutes() - offset);

    return date;
}

export { formatDateWithTimezone, parseFormattedDate };