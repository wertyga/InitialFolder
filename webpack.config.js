const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');


const browserConfig = {
    entry: {
        bundle: path.join(__dirname, 'client/index.js')
    },

    output: {
        path: path.join(__dirname, 'production/client/static'),
        publicPath:  '/',
        filename: '[name].js'
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                loaders: ['style-loader', 'css-loader']
            },

            {
                test: /\.sass$/,
                loaders: ['style-loader', 'css-loader', 'sass-loader']

            },

            {
                test: /(.woff2|.woff|.eot|.ttf|.otf)$/,
                loader: 'url-loader',
                query: {
                    limit: 10000
                }
            },

            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loaders: 'babel-loader'
            },

            {
                test: /\.(gif|png|jpeg|jpg|svg)$/i,
                loaders: [ {
                    loader: 'url-loader',
                    query: {
                        limit: 10000
                    }
                     },

                    {
                        loader: 'image-webpack-loader',
                        query: {
                            progressive: true,
                            optimizationLevel: 7,
                            interlaced: false,

                            mozjpeg: {
                                quality: 65
                            },

                            pngquant:{
                                quality: "65-90",
                                speed: 4
                            },

                            svgo:{
                                plugins: [
                                    {
                                        removeViewBox: false
                                    },
                                    {
                                        removeEmptyAttrs: false
                                    }
                                ]
                            },
                        },
                    }
                ]
            },

        ]
    },

    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.ProvidePlugin({
            'React': 'react',
            "PropTypes": "prop-types"
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        })
    ],

    resolve: {
        extensions: ['.js', '.jsx']
    }
};

const serverConfig = {
    entry: {
        index: path.join(__dirname, 'server/index.js')
    },

    target: 'node',
    externals: [nodeExternals()],

    output: {
        path: path.join(__dirname, 'production/server'),
        publicPath:  '/',
        filename: '[name].js'
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                loaders: ['style-loader', 'css-loader']
            },

            {
                test: /\.sass$/,
                loaders: ['style-loader', 'css-loader', 'sass-loader']

            },

            {
                test: /(.woff2|.woff|.eot|.ttf|.otf)$/,
                loader: 'url-loader',
                query: {
                    limit: 10000
                }
            },

            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loaders: 'babel-loader'
            },

            {
                test: /\.(gif|png|jpeg|jpg|svg)$/i,
                loaders: [ {
                    loader: 'url-loader',
                    query: {
                        limit: 10000
                    }
                },

                    {
                        loader: 'image-webpack-loader',
                        query: {
                            progressive: true,
                            optimizationLevel: 7,
                            interlaced: false,

                            mozjpeg: {
                                quality: 65
                            },

                            pngquant:{
                                quality: "65-90",
                                speed: 4
                            },

                            svgo:{
                                plugins: [
                                    {
                                        removeViewBox: false
                                    },
                                    {
                                        removeEmptyAttrs: false
                                    }
                                ]
                            },
                        },
                    }
                ]
            },

        ]
    },

    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.ProvidePlugin({
            'React': 'react',
            "PropTypes": "prop-types"
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        })
    ],

    resolve: {
        extensions: ['.js', '.jsx']
    }
};

module.exports = [browserConfig, serverConfig]

// module.exports = {
//
//     entry: {
//         bundle: path.join(__dirname, 'client/index.js')
//     },
//
//     output: {
//         path: path.join(__dirname, 'production/client/static'),
//         publicPath:  '/',
//         filename: '[name].js'
//     },
//
//     module: {
//         rules: [
//             {
//                 test: /\.css$/,
//                 loaders: ['style-loader', 'css-loader']
//             },
//
//             {
//                 test: /\.sass$/,
//                 loaders: ['style-loader', 'css-loader', 'sass-loader']
//
//             },
//
//             {
//                 test: /(.woff2|.woff|.eot|.ttf|.otf)$/,
//                 loader: 'url-loader',
//                 query: {
//                     limit: 10000
//                 }
//             },
//
//             {
//                 test: /\.(js|jsx)$/,
//                 include: [
//                     path.join(__dirname, 'client'),
//                     path.join(__dirname, 'Admin/client'),
//                 ],
//                 loaders: 'babel-loader'
//             },
//
//             {
//                 test: /\.(gif|png|jpeg|jpg|svg)$/i,
//                 loaders: [ {
//                     loader: 'url-loader',
//                     query: {
//                         limit: 10000
//                     }
//                 },
//
//                     {
//                         loader: 'image-webpack-loader',
//                         query: {
//                             progressive: true,
//                             optimizationLevel: 7,
//                             interlaced: false,
//
//                             mozjpeg: {
//                                 quality: 65
//                             },
//
//                             pngquant:{
//                                 quality: "65-90",
//                                 speed: 4
//                             },
//
//                             svgo:{
//                                 plugins: [
//                                     {
//                                         removeViewBox: false
//                                     },
//                                     {
//                                         removeEmptyAttrs: false
//                                     }
//                                 ]
//                             },
//
//
//
//                         },
//                     }
//                 ]
//             },
//
//         ]
//     },
//
//     plugins: [
//         new webpack.optimize.OccurrenceOrderPlugin(),
//         new webpack.NoEmitOnErrorsPlugin(),
//         new webpack.ProvidePlugin({
//             'React': 'react',
//             "PropTypes":"prop-types"
//         }),
//         new webpack.DefinePlugin({
//             'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
//         })
//     ],
//
//     resolve: {
//         extensions: ['.js', '.jsx']
//     }
// }