const ExtractTextPlugin = require("extract-text-webpack-plugin");
const production = process.env.NODE_ENV === "production";
const webpack = require("webpack");
const merge = require("webpack-merge");
const util = require("./util");

// Base config.
module.exports = function (paths) {
    var conf = {
        debug: ! production,
        devtool: production ? "source-map" : "eval",
        entry: {
            "front.app": paths.front.app,
            "front.style": paths.front.style,
            "front.vendor": paths.front.vendor,
            "back.app": paths.back.app,
            "back.vendor": paths.back.vendor
        },
        output: {
            path: paths.build,
            filename: production ? "[name]-[hash].js" : "[name].js",
            chunkFilename: production ? "[name]-[chunkhash].js" : "[name].js",
            publicPath: "/build/"
        },
        plugins: [
            new webpack.DefinePlugin({
                __SERVER__: ! production,
                __DEVELOPMENT__: ! production,
                __DEVTOOLS__: ! production,
                "process.env": {
                    BABEL_ENV: JSON.stringify(process.env.NODE_ENV),
                    NODE_ENV: JSON.stringify(process.env.NODE_ENV)
                }
            })
        ],
        module: {
            loaders: [
                {
                    test: /\.js$/,
                    loader: "babel",
                    exclude: /(node_modules|bower_components)/,
                    query: {
                        presets: ['es2015'],
                        plugins: ['transform-runtime']
                    }
                },
                {
                    test: /\.css$/,
                    loader: ExtractTextPlugin.extract("style", "css")
                },
                {
                    test: /\.vue$/,
                    loader: "vue"
                },
                {
                    test: /\.html$/,
                    loader: "vue-html"
                },
                {
                    test: /\.(png|gif|jpe?g)$/i,
                    loader: "url",
                    query: {
                        limit: 10000,
                        name: "img/[name].[ext]"
                    }
                },
                {
                    test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/i,
                    loader: "url",
                    query: {
                        limit: 10000,
                        mimetype: "application/font-woff",
                        name: "fonts/[name].[ext]"
                    }
                },
                {
                    test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                    loader: "file-loader",
                    query: {
                        name: "fonts/[name].[ext]"
                    }
                }
            ]
        },
        vue: {
            autoprefixer: {
                browsers: ["last 2 versions"]
            },
            loaders: {
                css: ExtractTextPlugin.extract("css"),
                stylus: ExtractTextPlugin.extract("css!stylus")
            },
            plugins: [
                new ExtractTextPlugin(production ? "[name]-[chunkhash].css" : "[name].css")
            ]
        }
    };

    return merge(
        conf,
        util.clean(paths.build),
        util.extractChunk({
            name: "vendor",
            entries: ["vue"]
        }),
        util.extractStylus(paths.front.style)
    );
};
