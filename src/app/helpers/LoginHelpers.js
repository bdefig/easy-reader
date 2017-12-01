export function validateSignup (name, email, password) {
    // Name cannot be blank
    // Email cannot be blank
    // Password must have at least 6 characters
    const toReturn = {
        isValid: true,
        nameError: '',
        emailError: '',
        passwordError: ''
    };
    if (!name.trim()) {
        toReturn.isValid = false;
        toReturn.nameError = 'Please enter your name';
    }
    if (!email) {
        // Note: The form is doing email format validation. Here we just need to make sure it's not blank
        toReturn.isValid = false;
        toReturn.emailError = 'Please enter an email address';
    }
    if (password.length < 6) {
        toReturn.isValid = false;
        toReturn.passwordError = 'Password must be at least 6 characters long';
    }
    return toReturn;
}

export function validateLogin (email, password) {
    // Email cannot be blank
    // Password cannot be blank
}