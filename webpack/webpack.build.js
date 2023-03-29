/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const { merge } = require('webpack-merge');
const config = require('./webpack.config');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackConfig = require('html-webpack-plugin');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const SFTPPlugin = require('./plugin/sftpPlugin');
module.exports = merge(config, {
	mode: 'production',
	// devtool:"inline-source-map",
	entry: path.join(__dirname, '../src/react/index.tsx'),

	output: {
		path: path.join(__dirname, '../dist'),
		filename: '[name]/[name].[hash].bundle.js',
	},
	optimization: {
		splitChunks: {
			chunks: 'all',
			minSize: 1024 * 1024,
			minChunks: 1,
			cacheGroups: {
				vendors: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vendors',
					chunks: 'all',
				},
				common: {
					test: /[\\/]src[\\/]/,
					name: 'common',
					chunks: 'all',
				},
				async: {
					name: 'common',
					chunks: 'async',
				},
			},
		},
		minimizer: [new CssMinimizerWebpackPlugin()],
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackConfig({
			template: path.join(__dirname, '../index.html'),
			filename: 'index.html',
		}),
		// new SFTPPlugin({
		// 	config: {
		// 	},
		// 	to: '/var/data',
		// }),
	],
});
