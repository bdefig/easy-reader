export function loggedIn() {
    return !!localStorage.getItem('token');
}