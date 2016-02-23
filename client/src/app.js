(function() {
    'use strict';

    angular
        .module('app', ['ui.router', 'ngMessages', 'toastr'])
        .constant('API_URL', 'http://localhost:8888');
})();
