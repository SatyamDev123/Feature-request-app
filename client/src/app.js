(function() {
    'use strict';

    angular
        .module('app', ['ui.router', 'ngMessages', 'toastr', 'angular-loading-bar'])
        .constant('API_URL', 'http://localhost:8888');
})();
