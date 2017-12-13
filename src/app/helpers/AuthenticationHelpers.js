export function loggedIn() {
    // TODO: Verify token
    return !!localStorage.getItem('token');
}