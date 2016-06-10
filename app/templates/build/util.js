const webpack = require("webpack");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const PurifyCSSPlugin = require("purifycss-webpack-plugin");
const production = process.env.NODE_ENV === "production";

exports.clean = function (path) {
    return {
        plugins: [
            new CleanWebpackPlugin([path], {
                root: process.cwd()
            })
        ]
    };
};

exports.extractChunk = function (options) {
    const entry = {};
    entry[options.name] = options.entries;

    return {
        entry: entry,
        plugins: [
            new webpack.optimize.CommonsChunkPlugin({
                names: [options.name, "manifest"],
                children: true,
                minChunks: Infinity
            })
        ]
    };
};

exports.extractStylus = function (paths) {
    return {
        module: {
            loaders: [
                {
                    test: /\.styl$/,
                    loader: ExtractTextPlugin.extract("style", "css!stylus"),
                    include: paths
                }
            ]
        },
        plugins: [
            new ExtractTextPlugin(production ? "[name]-[chunkhash].css" : "[name].css")
        ]
    };
};

exports.purifyCSS = function (paths) {
    return {
        plugins: [
            new PurifyCSSPlugin({
                basePath: process.cwd(),
                paths: paths
            })
        ]
    };
};
