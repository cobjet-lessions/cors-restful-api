'use strict';

var app = angular.module('Corsnection', ['ngCookies']);

app.config(function ($routeProvider, $httpProvider, $locationProvider) {

	$locationProvider.html5Mode(true);

	$httpProvider.interceptors.push('AuthenticationInterceptor');
	$httpProvider.defaults.withCredentials = true;

	$routeProvider
		.when('/', {
			templateUrl: 'views/MainView.html',
		})
		.when('/private', {
			templateUrl: 'views/PrivateView.html',
			controller: 'PrivateCtrl',
			requireAuthentication: true
		})
		.when('/signin', {
			templateUrl: 'views/SignInView.html',
			controller: 'AuthenticationCtrl'
		})
		.when('/signinfacebook', {
			templateUrl: 'views/SignInFacebookView.html',
			controller: 'AuthenticationCtrl'
		})
		.when('/signup', {
			templateUrl: 'views/SignUpView.html',
			controller: 'AuthenticationCtrl'
		})
		.when('/signupfacebook', {
			templateUrl: 'views/SignUpFacebookView.html',
			controller: 'AuthenticationCtrl'
		})
		.otherwise({
			redirectTo: '/',
		});

});

app.run(function ($rootScope, $location, AuthenticationModel) {

	// Register listener to watch route changes.
	$rootScope.$on('$routeChangeStart', function (event, next, current) {
		if (!AuthenticationModel.isSignedIn()) {
			if (next.redirectTo === undefined && next.requireAuthentication === true) {
				$location.path('/signin');
			}
		} else {
			if (next.requireAuthentication === undefined) {
				$location.path('/private');
			}
		}
	});

});