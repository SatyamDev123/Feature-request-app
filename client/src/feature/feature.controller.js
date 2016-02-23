(function() {
    'use strict';

    angular
        .module('app')
        .controller('FeatureRequestsCtrl', ['featureRequestsAll', featureRequestsCtrl]);

    /** @ngInject */
    function featureRequestsCtrl(featureRequestsList) {
        var vm = this;
        vm.featureRequestsList = featureRequestsList;
        
    }
})();
