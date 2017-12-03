export function validateSignupForm (form) {
    // Pass in event.target
    const toReturn = {
        isValid: true,
        nameError: '',
        emailError: '',
        passwordError: ''
    }
    if (!form[0].validity.valid) {
        toReturn.isValid = false;
        toReturn.nameError = 'Please enter your name';
    }
    if (!form[1].validity.valid) {
        toReturn.isValid = false;
        toReturn.emailError = 'Please enter a valid email address';
    }
    if (!form[2].validity.valid) {
        toReturn.isValid = false;
        toReturn.passwordError = 'Password must be at least 6 characters long';
    }
    return toReturn;
}

export function validateLoginForm (form) {
    // Pass in event.target
    const toReturn = {
        isValid: true,
        emailError: '',
        passwordError: ''
    }
    if (!form[0].validity.valid) {
        toReturn.isValid = false;
        toReturn.emailError = 'Please enter a valid email address';
    }
    if (!form[1].validity.valid) {
        toReturn.isValid = false;
        toReturn.passwordError = 'Please enter a password';
    }
    return toReturn;
}