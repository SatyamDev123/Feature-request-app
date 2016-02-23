(function() {
    'use strict';

    angular
        .module('app')
        .controller('FeatureRequestsAddEditCtrl', ['featureRequests', featureRequestsAddEditCtrl]);

    /** @ngInject */
    function featureRequestsAddEditCtrl(featureRequests) {
        var vm = this;
    }
})();
