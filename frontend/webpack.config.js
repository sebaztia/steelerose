const path = require('path');
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin }  = require('clean-webpack-plugin');
const { readdirSync, existsSync } = require('fs');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = env => {

    const rootPath = __dirname;
    let watch = false;

    if(env==="development") {
        watch = true;
    }

    const patternsSrcDir = __dirname + "/src/patterns";
    const pagesSrcDir = __dirname + "/src/pages";

    const pages = readdirSync(pagesSrcDir).map(entryName => {
        return new HtmlWebpackPlugin({
            filename: "pages/" + entryName
                .replace('.twig', '') + '.html',
            template: pagesSrcDir + `/${entryName}`,
            inject: true
        });
    });

    const indexHtml = new HtmlWebpackPlugin({
            filename: "index.html",
            template: patternsSrcDir + `/../index.twig`,
            inject : true
        });

    return {
        entry: {main: './src/index.js'},
        mode: env,
        devtool: 'source-map',
        watch,
        watchOptions: {
            ignored: /node_modules/
        },
        output: {
            path: path.resolve(__dirname, 'dist'),
            publicPath : "/",
            filename: '[name].[chunkhash].js',
            chunkFilename: '[name].[chunkhash].js'
        },
        devServer: {
            contentBase: path.resolve(__dirname, 'dist'),
            watchContentBase: true,
            compress: true,
            port: 9001,
            open: true,
            liveReload: true
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader"
                    }
                },
                {
                    test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                    loader: 'url-loader?limit=100000'
                },
                {
                    test: /\.s[ac]ss$/i,
                    use: [
                        "style-loader",
                        MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 1
                            }
                        },
                        {
                            loader : "sass-loader",
                            options: {
                                sassOptions: {
                                    includePaths: [__dirname + '/**/*.scss']
                                }
                            }
                        },
                    ],
                },
                {
                    test: /\.twig$/,
                    use: [
                        'raw-loader',
                        {
                            loader : 'twig-html-loader',
                            options: {
                                data: (context) => {
                                    const name = context.resourcePath.split('.')[0];
                                    const data = path.join(name + '.json');
                                    if(existsSync(data)) {
                                        context.addDependency(data);
                                        return context.fs.readJsonSync(data, {throws: false}) || {};
                                    }

                                    return {};
                                },
                                namespaces: {
                                    'templates': rootPath + '/src/templates',
                                    'patterns' : rootPath + '/src/patterns'
                                }
                            }
                        }
                    ]
                }
            ]
        },
        plugins: [
            new CleanWebpackPlugin({
                dry: false,
                verbose: true,
                cleanStaleWebpackAssets: true,
                protectWebpackAssets: false,
                cleanOnceBeforeBuildPatterns: ['**/*']
            }),
            new MiniCssExtractPlugin({
                filename: "style.[contenthash].css"
            }),
            new webpack.WatchIgnorePlugin([
                path.join(__dirname, "node_modules")
            ]),
            new CopyPlugin([
                { from: 'src/public', to: 'public' },
            ]),
        ]
            .concat(pages)
            .concat(indexHtml)
    }
};