let path = require('path');
let ExtractTextPlugin = require("extract-text-webpack-plugin");
let HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	devtool:   "source-map",
	entry:     './src/Components/index.ts',
	output:    {
		path:     path.resolve(__dirname),
		filename: 'dist/ceh-react-components.bundle.js',
		publicPath:'/'
	},
	resolve:   {
		extensions: [".ts", ".tsx", ".js"]
	},
	module:    {
		rules: [
			{
				test: /\.tsx?$/,
				use:  [{
					loader:"ts-loader",
					options:{
						"configFileName":"tsconfig.package.json"
					}}]
			},
			{
				test: /\.s?css$/,
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
	}
}