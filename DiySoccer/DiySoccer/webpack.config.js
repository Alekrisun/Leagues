var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        app: __dirname + "/content/entry.js",
		vendor : [
			'jquery',
			'jquery-deferred',
			'backbone.marionette',
			'handlebars',
			'underscore',
			'bootstrap-3-typeahead',
			'jquery-datetimepicker'
		]
	},
    output: {
        path: __dirname + '/content/dist/',
        filename: "[name].bundle.js"
    },
	resolve: {
		modules: ['node_modules'],
		alias: {
			handlebars: 'handlebars/dist/handlebars.min.js',
			$: 'jquery/dist/jquery.min.js'
		}
	}
};