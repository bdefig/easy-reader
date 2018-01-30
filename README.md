# Easy Reader

A light reader built in React that makes reading books as easy as reading articles on Facebook

## To Do

### User
- [ ] Add settings

### Authentication
- Server
    - [ ] Add middleware to protect routes
    - [ ] On login, issue refresh token and access token
    - [ ] Store whitelisted refresh tokens
    - [ ] When requests are made, verify access token
    - [ ] If access token has expired, verify refresh token
    - [ ] If refresh token has expired, return 401 and log user out
    - [ ] If refresh token is valid, issue new access token
- Client
    - [ ] Store refresh token and access token
        - [ ] Refresh token in both local storage and redux state
        - [ ] Access token in redux state only
    - [ ] Send both tokens on each request
    - [ ] If a 401 is returned, log the user out
    - [ ] If a new access token is returned, replace the existing access token with it

### Documents

### Reader
- [ ] Jump to location