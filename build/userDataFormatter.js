function formatUserData(users) {
    if (!Array.isArray(users)) {
        throw new TypeError('Input must be an array of user objects');
    }

    return users.map(user => {
        const formatted = {};

        if (user.name) {
            formatted.fullName = user.name.trim()
                .split(' ')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                .join(' ');
        }

        if (user.email) {
            formatted.email = user.email.toLowerCase().trim();
        }

        if (user.joinedDate) {
            const date = new Date(user.joinedDate);
            if (!isNaN(date)) {
                formatted.joinedDate = date.toISOString().split('T')[0];
            }
        }

        if (user.active !== undefined) {
            formatted.status = user.active ? 'active' : 'inactive';
        }

        return { ...user, ...formatted };
    });
}