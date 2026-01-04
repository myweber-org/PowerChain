function validateForm() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailPattern.test(email)) {
        alert('Please enter a valid email address.');
        return false;
    }
    
    if (password.length < 8) {
        alert('Password must be at least 8 characters long.');
        return false;
    }
    
    if (!/[A-Z]/.test(password)) {
        alert('Password must contain at least one uppercase letter.');
        return false;
    }
    
    if (!/[0-9]/.test(password)) {
        alert('Password must contain at least one number.');
        return false;
    }
    
    return true;
}