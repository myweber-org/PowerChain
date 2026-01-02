function formatDateToISOWithOffset(date) {
    const pad = num => (num < 10 ? '0' : '') + num;
    const offset = -date.getTimezoneOffset();
    const sign = offset >= 0 ? '+' : '-';
    const absOffset = Math.abs(offset);
    const hours = Math.floor(absOffset / 60);
    const minutes = absOffset % 60;

    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1);
    const day = pad(date.getDate());
    const hour = pad(date.getHours());
    const minute = pad(date.getMinutes());
    const second = pad(date.getSeconds());

    return `${year}-${month}-${day}T${hour}:${minute}:${second}${sign}${pad(hours)}:${pad(minutes)}`;
}

function getCurrentFormattedDate() {
    return formatDateToISOWithOffset(new Date());
}

export { formatDateToISOWithOffset, getCurrentFormattedDate };