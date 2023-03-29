/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const build = require('./webpack.build');
const BundleAnalyzer = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
if (build.plugins) {
	build.plugins.push(new BundleAnalyzer());
} else {
	build.plugins = [new BundleAnalyzer()];
}

module.exports = build;
