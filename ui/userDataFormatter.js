function formatUserData(users) {
    return users.map(user => ({
        id: user.id,
        fullName: `${user.firstName} ${user.lastName}`.trim(),
        email: user.email.toLowerCase(),
        age: user.age || 'N/A',
        isActive: user.status === 'active',
        lastLogin: user.lastLogin ? new Date(user.lastLogin).toISOString().split('T')[0] : 'Never'
    }));
}