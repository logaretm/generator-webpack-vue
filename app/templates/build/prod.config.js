const webpack = require("webpack");
const ManifestPlugin = require("webpack-manifest-plugin");

module.exports = {
    plugins: [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.MinChunkSizePlugin({
            minChunkSize: 51200
        }),
        new webpack.optimize.UglifyJsPlugin({
            mangle: true,
            compress: {
                warnings: false
            }
        }),
        new ManifestPlugin({
            fileName: "rev-manifest.json"
        })
    ]
};
