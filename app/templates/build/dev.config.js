const webpack = require("webpack");

module.exports = function(options) {
    return {
        watchOptions: {
            aggregateTimeout: 300,
            poll: 1000
        },
        devServer: {
            historyApiFallback: true,
            hot: true,
            inline: true,
            stats: "errors-only",
            contentBase: "/public",
            proxy: { "*": "http://egymarco.dev" },
            host: options.host || "0.0.0.0",
            port: options.port || "8080"
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin({
                multiStep: true
            })
        ]
    };
};
