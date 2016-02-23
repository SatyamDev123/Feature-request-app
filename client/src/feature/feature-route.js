(function() {
    'use strict';

    angular
        .module('app')
        .config(['$stateProvider', ['$stateProvider', featureRequestRoutes]])
        .when('','/feature-request');
    
    // set the  feature Request route for lists, create/Update 
    function featureRequestRoutes($stateProvider) {
        $stateProvider
            .state('featureRequest', {
                url: '/feature-request',
                templateUrl: 'feature/feature.html',
                controller: 'FeatureRequestsCtrl',
                controllerAs: 'featureRequest',
                resolve: {
                    featureRequestsList: ['$q', 'FeatureRequestServices', getFeatureRequestsList]
                }
            })
            .state('featureRequestAdd', {
                url: '/feature-request/add',
                templateUrl: 'feature/feature-add-edit.html',
                controller: 'FeatureRequestsAddEditCtrl',
                controllerAs: 'featureRequestsAddEditCtrl',
                resolve: {
                    featureRequest: ['$q', 'FeatureRequestServices', getFeatureRequests]
                }
            });
    }
    // get all feature requests
    function getFeatureRequestsList($q, FeatureRequestServices) {
        var deferred = $q.defer();
        FeatureRequestServices.getAll().then(function(response) {
            deferred.resolve(response.data);
        }).catch(function(err) {
            deferred.reject(err.data);
        });
        return deferred.promise;
    }

    // get single feature requests
    function getFeatureRequests($q, FeatureRequestServices,$stateParams) {
        var deferred = $q.defer();
        FeatureRequestServices.getById($stateParams.id).then(function(response) {
            deferred.resolve(response.data);
        }).catch(function(err) {
            deferred.reject(err.data);
        });
        return deferred.promise;
    }

})();
