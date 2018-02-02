export function loggedIn() {
    // TODO: Verify token (maybe)
    return !!localStorage.getItem('refreshToken');
}