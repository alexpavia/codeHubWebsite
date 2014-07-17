'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Student Schema
 */
var StudentSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Student name',
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

    linkedIn: {
        type: String,
        default: ''
    },

    gitHub: {
        type: String,
        default: ''
    },

    profilePic: {
        type: String

    },

    bio: {
        type: String,
        default: ''
    }
});

mongoose.model('Student', StudentSchema);