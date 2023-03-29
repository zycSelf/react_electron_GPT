/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const { merge } = require('webpack-merge');
const config = require('./webpack.config');
const HtmlWebpackConfig = require('html-webpack-plugin');
module.exports = merge(config, {
	mode: 'development',
	devtool: 'inline-source-map',
	entry: path.join(__dirname, '../src/react/index.tsx'),
	devServer: {
		port: 3000,
		hot: true,
		open: '/#',
	},
	plugins: [
		new HtmlWebpackConfig({
			template: path.join(__dirname, '../index.html'),
			filename: 'index.html',
		}),
	],
});
