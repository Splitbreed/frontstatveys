(function(){
  angular.module('Statvey')
    .config(MainRouter);

    MainRouter.$inject = ['$stateProvider', '$urlRouterProvider',
  '$locationProvider'];

  function MainRouter($stateProvider, $urlRouterProvider, $locationProvider) {

    $urlRouterProvider.otherwise("/opening");

    $stateProvider
      .state('main', {
        url: '/main',
        templateUrl: 'main.html'
      })
      .state('opening', {
        url: '/opening',
        templateUrl: 'opening.html'
      })
      .state('landing', {
        url: '/landing',
        templateUrl: 'landing.html'
      })
      .state('survey', {
        url: '/survey',
        templateUrl: 'survey.html'
      })
      .state('picking', {
        url: '/choose',
        templateUrl: 'topick.html'
      })

      $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
      });
  }
})()
