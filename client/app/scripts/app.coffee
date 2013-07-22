angular
  .module('app', [])
  .config(['$routeProvider', ($router) ->
    $router.when '/',
      controller:   'homeController'
      templateUrl:  'app/templates/home.html'

    $router.when '/signup',
      controller: 'userController'
      templateUrl: 'app/templates/users/signup.html'
  ])
