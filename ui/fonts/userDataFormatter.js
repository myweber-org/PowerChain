
function formatUserData(users) {
    return users.map(user => ({
        id: user.id,
        fullName: `${user.firstName} ${user.lastName}`.trim(),
        email: user.email.toLowerCase(),
        age: user.age || 'N/A',
        isActive: user.status === 'active',
        joinedDate: new Date(user.joinDate).toLocaleDateString('en-US')
    }));
}
function formatUserData(user) {
    if (!user || typeof user !== 'object') {
        return null;
    }

    const { id, name, email, createdAt, updatedAt } = user;
    
    return {
        id: id || null,
        name: name ? name.trim() : 'Anonymous',
        email: email ? email.toLowerCase() : null,
        created: createdAt ? new Date(createdAt).toISOString() : null,
        updated: updatedAt ? new Date(updatedAt).toISOString() : null,
        profileUrl: id ? `/users/${id}` : null
    };
}

function validateUserData(user) {
    const requiredFields = ['name', 'email'];
    const missingFields = [];
    
    requiredFields.forEach(field => {
        if (!user[field] || user[field].toString().trim() === '') {
            missingFields.push(field);
        }
    });
    
    return {
        isValid: missingFields.length === 0,
        missingFields: missingFields
    };
}

export { formatUserData, validateUserData };