export class App {

  apiKey;
  userID;

  async init() {
    this.initFacebookLogin();
    this.initLoginState();

    this.getSvatek();
    this.getBirthdays();
  }

  getSvatek() {
    fetch('https://api.abalin.net/today?country=cz').then(res => res.json()).then(json => {
      console.log(json, json.data.namedays.cz);

      if (json.data && json.data.namedays && json.data.namedays.cz) {
        const today = new Date();
        const container = document.querySelector('[data-js-selector=\'name-day\']');
        container.innerHTML = `Today is <strong>${today.getDate()}.${today.getMonth() + 1}.</strong><br>Name of the day is <strong>${json.data.namedays.cz}</strong>`;
      }
    });
  }

  getBirthdays() {
    fetch('https://birthday-reminder-api.herokuapp.com/birthdays').then(res => res.json()).then(json => {
      const birthdays = json.birthdays;
      if (birthdays && birthdays.length) {
        const container = document.querySelector('[data-js-selector=\'birthdays\']');
        for (const b of birthdays) {
          container.insertAdjacentHTML('beforeend', `<li class="list-group-item"><span>${b.name}</span><strong>${b.birthday.day}.${b.birthday.month}.</strong></li>`);
        }
      }
    });
  }

  initLoginState() {
    window.checkLoginState = function () {
      FB.getLoginStatus(function (response) {
        console.log(response, this);
        if (response.authResponse && response.authResponse.accessToken && response.authResponse.userID) {
          const button = document.querySelector('#facebookLogin');
          button.remove();

          this.apiKey = response.authResponse.accessToken;
          this.userID = response.authResponse.userID;
          this.getFbProfile();
        }

      }.bind(this));
    }.bind(this);
  }

  getFbProfile() {
    FB.api(
      '/me/',
      'GET',
      {},
      function (response) {
        console.log('Profile response', response);

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
        console.log('Friends response', response);

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
