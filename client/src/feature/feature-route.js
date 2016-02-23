(function() {
    'use strict';

    angular
        .module('app')
        .config(['$stateProvider', '$urlRouterProvider', featureRequestRoutes]);

    // set the  feature Request route for lists, create/Update 
    function featureRequestRoutes($stateProvider, $urlRouterProvider) {

        // redirect to feature request list
        $urlRouterProvider.otherwise('/feature-request');

        // common property for add & update feature Request
        var commonProperty = {
            templateUrl: './feature/feature-add-edit.html',
            controller: 'FeatureRequestsAddEditCtrl',
            controllerAs: 'featureRequestsAddEdit',
            resolve: {
                featureRequest: ['$q', 'FeatureRequestServices', '$stateParams', getFeatureRequests]
            }
        };

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
            // extend common property with diffrent url
            .state('featureRequestAdd', angular.extend({
                url: '/feature-request/add'
            }, commonProperty))

        .state('featureRequestEdit', angular.extend({
            url: '/feature-request/edit/:id',
        }, commonProperty));
    }
    // get all feature requests
    function getFeatureRequestsList($q, FeatureRequestServices) {
        var deferred = $q.defer();
        FeatureRequestServices.getAll().then(function(response) {
            deferred.resolve(response.data);
        }, function(err) {
            deferred.reject(err.data);
        });
        return deferred.promise;
    }

    // get single feature requests
    function getFeatureRequests($q, FeatureRequestServices, $stateParams) {
        var deferred = $q.defer();
        if ($stateParams && $stateParams.id) {
            FeatureRequestServices.getById($stateParams.id).then(function(response) {
                deferred.resolve(response.data);
            }, function(err) {
                deferred.reject(err.data);
            });
        } else {
            deferred.resolve({});
        }
        return deferred.promise;
    }

})();
