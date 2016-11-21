(function(){
  angular.module('Statvey', ['ngFlash', 'ui.router'])
    .controller('MainCtrl', MainCtrl);

  function MainCtrl($http, $state, Flash){
    var self = this;
    var rootUrl = 'http://localhost:3000';

    this.signup = function(user){
      console.log(user);
      self.signed = {username: user.password, password: user.username};
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
          $state.go('landing', {url: '/landing', user: response.data.user});
        }
      })
    } //end login

    this.getBusinesses = function(id){
      return $http({
        url: `${rootUrl}/users/${id}/businesses`,
        method: 'GET'
      })
      .then(function(response){
        console.log(response);
      })
    }

    this.makeBusiness = function(busInfo, id){
      return $http({
        url: `${rootUrl}/users/${id}/businesses`,
        method: 'POST'
      })
      .then(function(response){
        console.log(response);
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
