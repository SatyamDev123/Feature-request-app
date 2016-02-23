(function() {
    'use strict';

    angular
        .module('app')
        .factory('FeatureRequestServices', ['API_URL', '$http', featureRequestServices]);

    /* ngInject */
    function featureRequestServices(API_URL, $http) {

        return {
            getAll: function() {
                return $http.get(API_URL + '/feature-request');
            },
            getById: function(id) {
                return $http.get(API_URL + '/feature-request/' + id);
            },
            save: function(data) {
                return $http.post(API_URL + '/feature-request', data);
            },
            update: function(data) {
                return $http.put(API_URL + '/feature-request/' + data._id, data);
            },
            delete: function(id) {
                return $http.delete(API_URL + '/feature-request/' + id);
            }
        };
    }
})();
