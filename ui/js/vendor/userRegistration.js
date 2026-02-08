function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    return password.length >= minLength && 
           hasUpperCase && 
           hasLowerCase && 
           hasNumbers && 
           hasSpecialChar;
}

function validateRegistrationForm(email, password, confirmPassword) {
    const errors = [];
    
    if (!validateEmail(email)) {
        errors.push("Invalid email format");
    }
    
    if (!validatePassword(password)) {
        errors.push("Password must be at least 8 characters long and contain uppercase, lowercase, numbers, and special characters");
    }
    
    if (password !== confirmPassword) {
        errors.push("Passwords do not match");
    }
    
    return {
        isValid: errors.length === 0,
        errors: errors
    };
}

function handleRegistrationSubmit(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    const validationResult = validateRegistrationForm(email, password, confirmPassword);
    
    if (validationResult.isValid) {
        console.log("Registration form is valid. Proceeding with registration...");
        return true;
    } else {
        console.log("Validation errors:", validationResult.errors);
        return false;
    }
}function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
    if (password.length < 8) return false;
    if (!/[A-Z]/.test(password)) return false;
    if (!/[a-z]/.test(password)) return false;
    if (!/[0-9]/.test(password)) return false;
    return true;
}

function registerUser(email, password) {
    if (!validateEmail(email)) {
        throw new Error('Invalid email format');
    }
    
    if (!validatePassword(password)) {
        throw new Error('Password must be at least 8 characters with uppercase, lowercase and numbers');
    }
    
    return {
        email: email,
        registeredAt: new Date().toISOString(),
        status: 'active'
    };
}

export { validateEmail, validatePassword, registerUser };function validateRegistrationForm(email, password, confirmPassword) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;

    if (!email || !password || !confirmPassword) {
        return { isValid: false, message: "All fields are required" };
    }

    if (!emailRegex.test(email)) {
        return { isValid: false, message: "Invalid email format" };
    }

    if (!passwordRegex.test(password)) {
        return { isValid: false, message: "Password must be at least 8 characters long and contain both letters and numbers" };
    }

    if (password !== confirmPassword) {
        return { isValid: false, message: "Passwords do not match" };
    }

    return { isValid: true, message: "Registration data is valid" };
}