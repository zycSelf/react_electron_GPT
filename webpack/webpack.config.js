/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const EslintWebpackPlugin = require('eslint-webpack-plugin');
const webpack = require('webpack')
require('dotenv').config().parsed;
const envKeys = Object.keys(process.env).reduce((prev, next) => {
	prev[`process.env.${next}`] = JSON.stringify(process.env[next]);
	return prev;
	}, {});
	console.log(envKeys)
module.exports = {
	module: {
		rules: [
			{
				test: /\.scss$/,
				exclude: /node_modules/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							modules: {
							  localIdentName: "[local]--[hash:base64:5]",
							},
						  },
					},
					'sass-loader',
				],
			},
			{
				test: /\.tsx?$/,
				exclude: /node_modules/,
				loader: 'ts-loader',
			},
			{
				test: /\.jsx$/,
				exclude: /node_modules/,
				use: 'babel-loader',
			},
		],
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js', 'jsx'],
	},
	plugins: [
		new EslintWebpackPlugin(),
		new MiniCssExtractPlugin({
			filename: 'css/[name].[hash].css',
		}),
		new webpack.DefinePlugin({
			...envKeys
		}),
	],
};