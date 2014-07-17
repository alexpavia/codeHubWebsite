'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Codehubblog Schema
 */
var CodehubblogSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Codehubblog name',
		trim: true
	},
    contents: {
        type: String,
        default: '',
        required: 'Contents are required',
        trim: true
    },
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	},
    icon: {
        type: String,
        default: 'modules/codehubblogs/images/logo.jpg'
    }
});

mongoose.model('Codehubblog', CodehubblogSchema);