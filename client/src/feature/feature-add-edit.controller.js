(function() {
    'use strict';

    angular
        .module('app')
        .controller('FeatureRequestsAddEditCtrl', ['featureRequest', '$stateParams', '$state', 'FeatureRequestServices', 'toastr', featureRequestsAddEditCtrl]);

    /** @ngInject */
    function featureRequestsAddEditCtrl(featureRequest, $stateParams, $state, FeatureRequestServices, toastr) {
        var vm = this;
        vm.isEdit = function() {
            return $stateParams && $stateParams.id;
        };
        if (vm.isEdit()) {
            vm.featureRequest = featureRequest;
            // converting string date type to Date object
            if (!!vm.featureRequest.target_date) {
                vm.featureRequest.target_date = new Date(vm.featureRequest.target_date);
            }
        } else {
            vm.featureRequest = {};
        }

        vm.addOrUpdate = function(form) {
            if (form.$valid) {
                if (vm.isEdit()) {
                    FeatureRequestServices.update(vm.featureRequest).then(function() {
                        $state.go('featureRequest');
                        toastr.success('Feature request upated SUccessfully!');
                    }, function(err) {
                        toastr.error('Please try again', 'Server Error');
                    })
                } else {
                    FeatureRequestServices.save(vm.featureRequest).then(function() {
                        $state.go('featureRequest');
                        toastr.success('Feature request save SUccessfully!');
                    }, function(err) {
                        toastr.error('Please try again', 'Server Error');
                    })
                }
            } else {
                toastr.error('Please fill Feature Request Form control', 'Form Validation');
            }
        };

    }
})();
