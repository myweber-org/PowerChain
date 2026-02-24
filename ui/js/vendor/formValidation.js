function validateForm() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    
    let isValid = true;
    let errorMessage = '';
    
    if (!emailPattern.test(email)) {
        isValid = false;
        errorMessage += 'Please enter a valid email address.\n';
    }
    
    if (!passwordPattern.test(password)) {
        isValid = false;
        errorMessage += 'Password must be at least 8 characters long and contain both letters and numbers.\n';
    }
    
    if (!isValid) {
        alert(errorMessage);
        return false;
    }
    
    return true;
}

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('loginForm');
    if (form) {
        form.addEventListener('submit', function(event) {
            if (!validateForm()) {
                event.preventDefault();
            }
        });
    }
});