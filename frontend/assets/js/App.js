export class App {

  apiKey;
  userID;

  appId = 400741717660932;
  appSecret = 'd9d88702b63054870e4f1cd8c3283309';
  redirectUrl = 'https://localhost:1234/';

  async init() {

    console.log('Init');

    this.initFacebookLogin();
    this.initLoginState();
  }

  initLoginState() {
    window.checkLoginState = function () {
      FB.getLoginStatus(function (response) {
        console.log(response, this);
        this.apiKey = response.authResponse.accessToken;
        this.userID = response.authResponse.userID;
        this.getFbProfile();
      }.bind(this));
    }.bind(this);
  }

  getFbProfile() {
    FB.api(
      '/me/',
      'GET',
      {},
      function (response) {
        console.log(response);
        // Insert your code here

        const container = document.querySelector('[data-js-selector=\'user-name\']');
        if (response.name && container) {
          container.innerHTML = `Hello, ${response.name}`;
        }
      }
    );
    FB.api(
      '/me/friends',
      'GET',
      {},
      function (response) {
        console.log(response);
        // Insert your code here

        const container = document.querySelector('[data-js-selector=\'user-friends\']');
        if (response.summary && response.summary.total_count && container) {
          container.innerHTML = `You have total of ${response.summary.total_count} friends on Facebook`;
        }
      }
    );
  }

  initFacebookLogin() {
    window.fbAsyncInit = function () {
      FB.init({
        appId: '307250724061619',
        cookie: true,
        xfbml: true,
        version: 'v0.1'
      });

      FB.AppEvents.logPageView();
    };

    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = 'https://connect.facebook.net/en_US/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }
}
