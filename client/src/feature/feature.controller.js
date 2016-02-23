(function() {
    'use strict';

    angular
        .module('app')
        .controller('FeatureRequestsCtrl', ['featureRequestsList', 'toastr', 'FeatureRequestServices', featureRequestsCtrl]);

    function featureRequestsCtrl(featureRequestsList, toastr, FeatureRequestServices) {
        var vm = this;
        vm.featureRequestsList = featureRequestsList;
        // remove feature Requests from list
        vm.remove = function(id) {
            if (!!id) {
                FeatureRequestServices.delete(id).then(function(response) {
                    toastr.success('Feature request deleted SUccessfully!');
                    // remove feature Request from list instead reload
                    vm.featureRequestsList.forEach(function(v, i) {
                        if (v._id === response.data._id) {
                            vm.featureRequestsList.splice(i, 1);
                        }
                    });
                }, function() {
                    toastr.error('Please try again', 'Server Error');
                });
            } else {
                toastr.error('Please pass id to delete Feature request');
            }
        }
    }
})();
