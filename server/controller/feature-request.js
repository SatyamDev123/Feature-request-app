/**
 * Module dependencies.
 */
var mongoose = require('mongoose');
var FeatureRequest = mongoose.model('FeatureRequest');
var _ = require('lodash');

// get all FeatureRequest data
exports.getAll = function(req, res, next) {
    FeatureRequest.find({}).sort({ 'created_date': 'desc' }).exec(function(err, data) {
        if (!err) {
            res.send(data);
        } else {
            res.send(err);
        }
    });
}

// get FeatureRequest data by Id
exports.getById = function(req, res, next) {
    FeatureRequest.findById(req.params.id, function(err, data) {
        if (err) return next(err);
        res.send(data);
    });
}

// save FeatureRequest data
exports.save = function(req, res, next) {
    // update and reorder the feature request data by client priority
    reorderFeatureRequestPriority(req.body, function() {
        new FeatureRequest(req.body).save(function(err, data, count) {
            if (err) return next(err);
            res.send(data);
        });
    }, next);
}


/**
 * update FeatureRequest
 */
exports.update = function(req, res, next) {
    FeatureRequest.findById(req.params.id, function(getErr, data) {
        if (getErr) {
            next(getErr);
        } else {
            _.assign(data, req.body);
            // update and reorder the feature request data by client priority
            reorderFeatureRequestPriority(data, function() {
                data.save(function(saveErr, data) {
                    if (saveErr) return next(saveErr);
                    res.send(data);
                });
            }, next);
        }
    });
}

/**
 * reorder Feature Request data 
 */
function reorderFeatureRequestPriority(req_body, cb, next) {
    // get saveing client request priority
    FeatureRequest.find({ client: req_body.client }).exec(function(err, data) {
        if (!err) {
            // get all feature request for same client   
            var sameFeaturePriority = data.filter(function(v, i) {
                return v.client_priority === req_body.client_priority;
            });
            // check feature request length
            // on update time don't reorder feature when user has not changed there client priority
            if (sameFeaturePriority.length && (!req_body._id && req_body.client_priority !== sameFeaturePriority[0].client_priority)) {
                // sort feature request by client priority
                var sortedFeaturePriority = data.sort(function(a, b) {
                    return a.client_priority - b.client_priority;
                });
                // get indexOf of same feature request by id
                var indexPos = sortedFeaturePriority.map(function(x) {
                    return x._id;
                }).indexOf(sameFeaturePriority[0]._id);

                // update and reorder all feature request by increasing there client priority 
                // compare to current one
                sortedFeaturePriority.slice(Number(indexPos)).forEach(function(priorityReorder, i) {
                    priorityReorder.client_priority++;
                    priorityReorder.save(function(saveErr, data) {
                        if (saveErr) return next(saveErr);
                    });
                });
            }
            cb();
        } else {
            return next(err);
        }
    });
}


/**
 * delete FeatureRequest data by Id
 */
exports.remove = function(req, res, next) {
    FeatureRequest.findById(req.params.id, function(getErr, data) {
        if (getErr) {
            next(getErr);
        }
        data.remove(function(removeErr, delted_data) {
            if (removeErr) return next(removeErr);
            res.send(delted_data)
        })
    });
}
