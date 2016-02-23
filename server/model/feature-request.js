/**
 * Module dependencies.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var FeatureRequestSchema = new Schema({
    title: {
        type: String,
        required: 'Title is required!'
    },
    description: {
        type: String,
        required: 'Description is required!'
    },
    client: {
        type: String,
        required: 'client name is required!'
    },
    client_priority: {
        type: Number,
        required: 'client priority is required!'
    },
    target_date: {
        type: Date,
        required: 'target date is required!'
    },
    ticket_url: {
        type: String,
        required: 'ticket url is required!'
    },
    product_area: {
        type: String,
        required: 'product area is required!'
    },
    created_date: {
        type: Date,
        default: new Date()
    }
});
mongoose.model('FeatureRequest', FeatureRequestSchema);
