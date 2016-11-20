(function(){
  angular.modular('Statvey')
    .controller('MainCtrl', MainCtrl);

  function MainCtrl($http, $state, Flash){
    var self = this;
    var rootUrl = 'localhost:3000';

    this.signup = function(user){
      self.signed = user;
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
    }

    this.login = function(user){
      return $http({
        url: `${rootUrl}/users/login`,
        method: 'POST',
        data: {user: user}
      })
      .then(function(response){
        if (response.data.status != 200){
          failAlert('Login failed! Check your username and password!')
          self.user.password = '';
        }
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
  }; //end of controller


})()
