const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FileSystem = require('fs');

module.exports = env => {
    let plugins = [
        new webpack.NoEmitOnErrorsPlugin(),
        new ExtractTextPlugin('[name].css'),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['app', 'vendor', 'polyfills']
        }),
        new HtmlWebpackPlugin({
            template: 'dev/index.html'
        }),
        new webpack.DefinePlugin({
            PRODUCTION: JSON.stringify(env.type == 'prod')
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        })
    ];

    return {
        devServer: {
            contentBase: __dirname  + '/app/res/',
            hot: true
        },
        

        entry: {
            polyfills: './dev/polyfills.ts',
            vendor: './dev/vendor.ts',
            app: './dev/main.ts'
        },
        node: { fs: "empty" },
        resolve: {
            extensions: ['*', '.ts', '.js', '.less']
        },

        module: {
            loaders: [
                {
                    test: /\.ts$/,
                    loader: 'ts-loader'
                },            {
                    test: /\.css$/,
                    loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' })
                },
                {
                    test: /\.html$/,
                    loader: 'html-loader'
                },
                {
                    test: /\.(png|jpe?g|gif|svg)$/,
                    exclude: /node_modules/,
                    loader: 'file-loader?name=img/[name].[ext]'
                }, {
                    test: /\.(eot|svg|ttf|woff|woff2)$/,
                    loader: 'file-loader?name=fonts/[name].[ext]'
                }, 
                {
                    test: /\.less$/,
                    loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader!less-loader' })
                }
            ]
        },

        devtool: 'source-map',

        output: {
            path: __dirname  + '/app/res/',
            publicPath: env.type == 'dev' ? '/' : './',
            filename: '[name].js',
            chunkFilename: '[id].chunk.js'
        },

        plugins: env.type == 'dev' ? plugins.concat([
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NamedModulesPlugin()
        ]) : plugins.concat([
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false
                },
                mangle: {
                    keep_fnames: true
                }
            })
        ]),

        watch: (env.type == 'dev')
    };
};
