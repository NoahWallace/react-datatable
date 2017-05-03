let path = require('path');
let ExtractTextPlugin = require("extract-text-webpack-plugin");
let HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	devtool:   "source-map",
	entry:     './src/example/index.tsx',
	output:    {
		path:     path.resolve(__dirname, "example"),
		filename: 'example.bundle.js'
	},
	resolve:   {
		extensions: [".ts", ".tsx", ".js"]
	},
	module:    {
		rules: [
			{
				test: /\.tsx?$/,
				use:  "ts-loader"
			},
			{
				test: /\.scss$/,
				use:  [
					{loader: "style-loader"},
					{
						loader:  "css-loader",
						options: {
							sourceMap: true
						}
					},
					{
						loader:  "sass-loader",
						options: {
							sourceMap: true
						}
					}
				]
			}
		]
	},
	plugins:   [
		new HtmlWebpackPlugin({template: './src/example/index.html'})
	],
	devServer: {
		port:               8000,
		historyApiFallback: {
			index: './example/index.html'
		}
	}
}