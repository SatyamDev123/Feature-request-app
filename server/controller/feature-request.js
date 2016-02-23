/**
 * Module dependencies.
 */
var mongoose = require('mongoose');
var FeatureRequest = mongoose.model('FeatureRequest');
var _ = require('lodash');

// get all FeatureRequest data
exports.getAll = function(req, res, next) {
    FeatureRequest.find({}).exec(function(err, data) {
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
    new FeatureRequest(req.body).save(function(err, data, count) {
        if (err) return next(err);
        res.send(data);
    });
}


/**
 * update FeatureRequest data
 */
exports.update = function(req, res, next) {
    FeatureRequest.findById(req.params.id, function(getErr, data) {
        if (getErr) {
            next(getErr);
        } else {
            _.assign(data, req.body);
            data.save(function(saveErr, data) {
                if (saveErr) return next(saveErr);
                res.send(data);
            });
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
