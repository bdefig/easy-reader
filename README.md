# Easy Reader

A light reader built in React that makes reading books as easy as reading articles on Facebook

## To Do

### User
- [ ] Add settings

### Authentication
- Server
    - [x] Add middleware to protect routes
    - [x] On login, issue refresh token and access token
    - [ ] Store whitelisted refresh tokens  
        - Not sure that I want to do this
    - [x] When requests are made, verify access token
    - [x] If access token has expired, verify refresh token
    - [x] If refresh token has expired, return 401 and log user out
    - [x] If refresh token is valid, issue new access token
- Client
    - [x] Store refresh token and access token
        - [x] Store in both local storage and redux state
    - [x] If a 401 is returned, log the user out
    - [x] If a new access token is returned, replace the existing access token with it

### Documents

### Reader
- [ ] Fit heading text to available size (use React-FitText)
- [ ] Jump to location

### Admin
- [ ] Admin portal
    - [ ] Add books
    - [ ] Edit books

### General Code Stuff
- [ ] When requesting resources (in thunks), make sure to turn isFetching to false if there's an error