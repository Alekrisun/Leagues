const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	mode: 'development',
	watch: true,
	entry: "./src/js/index.js",
	output: {
		filename: "main.js",
		path: path.resolve(__dirname, "dist"),
	},
	plugins: [	
		new HtmlWebpackPlugin({
			template: path.join(__dirname, "src", "index.html"),
		}),
		new HtmlWebpackPlugin({
			filename: 'styles.bundle.css',
			template: 'src/css/styles.bundle.css'
		})
	],
	module: {
		// exclude node_modules
		rules: [
		  {
			test: /\.(js|jsx)$/,
			exclude: /node_modules/,
			use: ["babel-loader"],
		  },
		],
	},
	// pass all js files through Babel
	resolve: {
		extensions: ["*", ".js", ".jsx"],
	}
};
