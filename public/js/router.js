(function(){
  angular.module('Statvey')
    .config(MainRouter);

    MainRouter.$inject = ['$stateProvider', '$urlRouterProvider',
  '$locationProvider'];

  function MainRouter($stateProvider, $urlRouterProvider, $locationProvider) {

    $urlRouterProvider.otherwise("/main");

    $stateProvider
      .state('main', {
        url: '/main',
        templateUrl: 'main.html'
      })
      .state('landing', {
        url: '/landing',
        templateUrl: 'landing.html'
      })
      .state('survey', {
        url: '/survey',
        templateUrl: 'survey.html'
      })
      
      $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
      });
  }
})()
