(function(){
  angular.module('Statvey', ['ngFlash', 'ui.router'])
    .controller('MainCtrl', MainCtrl);

  function MainCtrl($http, $state, Flash){
    var self = this;
    var rootUrl = 'http://localhost:3000';
    this.allUserBus = null;

    // if (localStorage.token){
    //   $http.get(`${rootUrl}/users/dec`)
    //   .then(function(response){
    //     self.user = response.data.message;
    //   })
    // }

    this.signup = function(user){
      console.log(user);
      self.signed = {username: user.username, password: user.password};
      return $http({
        url: `${rootUrl}/users`,
        method: 'POST',
        data: {user: user}
      })
      .then(function(response){
        console.log(response);
        if(response.data.status === 200) {
          console.log('successful signup');
          self.login(self.signed);
        } else {
          console.log("it failed --->", response);
          failAlert('Registration Failed! Check Username or Email!');
        }
      });
    } //end signup

    this.login = function(user){
      console.log(user)
      return $http({
        url: `${rootUrl}/users/login`,
        method: 'POST',
        data: {user: user}
      })
      .then(function(response){
        if (response.data.status != 201){
          failAlert('Login failed! Check your username and password!');
          self.reginfo = '';
        } else {
          passAlert('<strong>Logged in!</strong> Hello ' + response.data.user.username);
          localStorage.setItem('token', JSON.stringify(response.data.token))
          self.user = response.data.user;
          self.getIndivid();
          $state.go('landing', {url: '/landing', user: response.data.user});
        }
      })
    } //end login

    this.logout = function(){
      localStorage.removeItem('token');
      self.user = null;
      warnAlert('You have been logged out.')
      $state.go('main', {url: '/main'});
    }

    this.getIndivid = function(){
      $http.get(`${rootUrl}/users/${self.user.id}/businesses`)
      .then(function(response){
        self.currentUserBus = response.data.businesses;
        console.log(self.currentUserBus);
      });
    }

    this.delete = function(id, uid){
      return $http({
        url: `${rootUrl}/users/${uid}/businesses/${id}`,
        method: 'DELETE'
      })
      .then(function(response){
        self.getIndivid();
      })
    }

    this.getBusinesses = function(id){
      return $http({
        url: `${rootUrl}/users/${id}/businesses`,
        method: 'GET'
      })
      .then(function(response){
        console.log(response);
      })
    }

    $http.get(`${rootUrl}/businesses/all`)
    .then(function(response){
      self.allBus = response.data.all
    })

    this.singleBusiness = function(id){
      return $http({
        url: `${rootUrl}/businesses/${id}`,
        method: 'GET'
      })
    }

    this.makeBusiness = function(busInfo, id){
      console.log(busInfo);
      return $http({
        url: `${rootUrl}/users/${id}/businesses`,
        method: 'POST',
        data: {business: busInfo}
      })
      .then(function(response){
        self.getIndivid();
        console.log(response);
      })
    }

    this.finishSurvey = function(bus, score){
      console.log(score);
      console.log(bus)
      total = ((Number(score.prod) + Number(score.emp) + Number(score.store) + Number(score.over))/4);
      complete = {overall_score: total}
      return $http({
        url: `${rootUrl}/businesses/${bus}`,
        method: 'PATCH',
        data: {business: complete}
      })
    }

    this.takeSurvey = function(id){
      console.log(id);
      self.singleBusiness(id)
      .then(function(response){
        console.log(response);
        self.beingTaken = response.data.business
        $state.go('survey', {url: '/survey'});
      })
    }

    //Flash stuff here
    function passAlert(msg){
      var id = Flash.create('success', msg, 7000, {class: 'flashAlert'}, true);
    }

    function failAlert(msg){
      var id = Flash.create('danger', msg, 7000, {class: 'flashAlert'}, true);
    }

    function infoAlert(msg){
      var id = Flash.create('info', msg, 7000, {class: 'flashAlert'}, true);
    }

    function warnAlert(msg){
      var id = Flash.create('warning', msg, 7000, {class: 'flashAlert'}, true);
    }
    //end flash stuff
  }; //end of controller


})()
