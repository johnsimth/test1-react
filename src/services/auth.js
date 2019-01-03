import auth0 from 'auth0-js';
import history from './history';

export default class Auth {
    accessToken;
    idToken;
    expiresAt;

    auth0 = new auth0.WebAuth({
        domain: 'victory85.auth0.com',
        clientID: '_Vyl5Ht7Xfu85eXhtUoVJEHL6xNkjTb5',
        redirectUri: 'http://localhost:3000/callback',
        responseType: 'token id_token',
        scope: 'openid'
    });

    constructor() {
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.handleAuthentication = this.handleAuthentication.bind(this);
        // this.isAuthenticated = this.isAuthenticated.bind(this);
        this.getAccessToken = this.getAccessToken.bind(this);
        this.getIdToken = this.getIdToken.bind(this);
        // this.renewSession = this.renewSession.bind(this);
    }

    handleAuthentication() {
        this.auth0.parseHash((err, authResult) => {
            console.log(authResult);
            if (authResult && authResult.accessToken && authResult.idToken) {
                this.setSession(authResult);
                // Redirect to dashboard
                history.replace('/dashboard');
            } else if (err) {
                history.replace('/');
                console.log(err);
                alert(`Error: ${err.error}. Check the console for further details.`);
            }
        });
    }

    getAccessToken() {
        return this.accessToken;
    }

    getIdToken() {
        return this.idToken;
    }

    setSession(authResult) {
        // Set isLoggedIn flag in localStorage
        localStorage.setItem('isLoggedIn', 'true');

        // Set the time that the access token will expire at
        let expiresAt = (authResult.expiresIn * 1000) + new Date().getTime();
        this.accessToken = authResult.accessToken;
        this.idToken = authResult.idToken;

        // Set user info and tokens in local storage.
        localStorage.setItem('user',authResult.idTokenPayload.sub);
        localStorage.setItem('id_token',this.accessToken);
        localStorage.setItem('access_token',this.accessToken);
        this.expiresAt = expiresAt;

    }

    logout() {
        // Remove tokens and expiry time
        this.accessToken = null;
        this.idToken = null;
        this.expiresAt = 0;

        // Remove isLoggedIn flag from localStorage
        localStorage.removeItem('isLoggedIn');

        // navigate to the home route
        history.replace('/');
    }

    login() {
        this.auth0.authorize();
    }
}