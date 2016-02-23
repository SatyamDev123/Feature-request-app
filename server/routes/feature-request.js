/**
 * Module dependencies.
 */
var featureRequest = require('./../controller/feature-request');

module.exports = function(router) {

    // user routes
    router.get('/feature-request', featureRequest.getAll);
    router.get('/feature-request/:id', featureRequest.getById);
    router.post('/feature-request', featureRequest.save);
    router.put('/feature-request/:id', featureRequest.update);
    router.delete('/feature-request/:id', featureRequest.remove);
}
