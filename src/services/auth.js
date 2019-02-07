import auth0 from "auth0-js";
import history from "./history";

export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: "victory85.auth0.com",
    clientID: "_Vyl5Ht7Xfu85eXhtUoVJEHL6xNkjTb5",
    redirectUri: "http://localhost:3000/callback",
    responseType: "token id_token",
    scope: "openid"
  });
  userProfile;
  constructor() {
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.getAccessToken = this.getAccessToken.bind(this);
    this.getIdToken = this.getIdToken.bind(this);
    this.renewSession = this.renewSession.bind(this);
  }

  handleAuthentication() {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        // Redirect to dashboard
        history.replace("/dashboard");
      } else if (err) {
        history.replace("/");
        console.log(err);
        alert(`Error: ${err.error}. Check the console for further details.`);
      }
    });
  }
  isAuthenticated() {
    let expiresAt = JSON.parse(localStorage.getItem("expires_at"));
    console.log(expiresAt);
    return new Date().getTime() < expiresAt;
  }
  getAccessToken() {
    return this.accessToken;
  }

  getIdToken() {
    return this.idToken;
  }

  setSession(authResult) {
    // Set isLoggedIn flag in localStorage
    localStorage.setItem("isLoggedIn", "true");

    // Set the time that the access token will expire at
    let expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    );
    this.accessToken = authResult.accessToken;
    this.idToken = authResult.idToken;

    // Set user info and tokens in local storage.
    localStorage.setItem("user", authResult.idTokenPayload.sub);
    localStorage.setItem("id_token", this.accessToken);
    localStorage.setItem("access_token", this.accessToken);
    localStorage.setItem("expires_at", expiresAt);
    this.expiresAt = expiresAt;
  }
  renewSession() {
    this.auth0.checkSession({}, (err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
      } else if (err) {
        this.logout();

        console.log(err);

        alert(
          `Could not get a new token (${err.error}: ${err.error_description}).`
        );
      }
    });
  }

  logout() {
    // Remove isLoggedIn flag from localStorage
    localStorage.removeItem("isLoggedIn");
    localStorage.clear();
    // navigate to the home route
    history.replace("/");
  }

  login() {
    this.auth0.authorize();
  }
}
