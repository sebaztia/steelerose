const path = require('path');
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin }  = require('clean-webpack-plugin');
const { readdirSync, existsSync } = require('fs');
const CopyPlugin = require('copy-webpack-plugin');
const ReplaceHashInFileWebpackPlugin = require('replace-hash-in-file-webpack-plugin');
const jsonImporter = require('node-sass-json-importer');

function findPara(param) {
    let result = '';
    process.argv.forEach((argv)=>{
        if(argv.indexOf('--' + param) === -1) return;
        result = argv.split('=')[1];
    });
    return  result;
}

module.exports = env => {

    let watch =
        false;
    let publicPath =
        '/';
    let devServerBase =
        path.resolve(__dirname, 'dist');

    if(env==='development') {
        watch = true;
    }

    const cms =
        findPara('cms');
    const theme =
        findPara('theme');
    const rootPath =
        __dirname;
    const patternsSrcDir =
        __dirname + "/src/patterns";
    /*const pagesSrcDir =
        __dirname + "/src/pages"; */

    if(cms==='wp') {
        publicPath = '/wp-content/themes/' + theme + '/frontend/dist/';
        devServerBase = path.resolve(__dirname);
    }

    /*const pages = readdirSync(pagesSrcDir).map(entryName => {
        return new HtmlWebpackPlugin({
            filename: "pages/" + entryName
                .replace('.twig', '') + '.html',
            template: pagesSrcDir + `/${entryName}`
        });
    });*/

    const indexHtml = new HtmlWebpackPlugin({
        filename: "index.html",
        template: patternsSrcDir + `/../index.twig`
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
            publicPath,
            filename: '[name].[hash].js',
            chunkFilename: '[name].[hash].js'
        },
        devServer: {
            contentBase: devServerBase,
            watchContentBase: true,
            writeToDisk: true,
            compress: true,
            port: 9001,
            open: true,
            liveReload: true
        },
        "resolve": {
            "alias": {
                "react": "preact/compat",
                "react-dom": "preact/compat"
            }
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    enforce: 'pre',
                    use: {
                        loader: "babel-loader"
                    }
                },
                {
                    test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                    loader: 'url-loader?limit=100000'
                },
                {
                    test: /\.(s[ac]ss|css)$/i,
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
                                    includePaths: [__dirname + '/**/*.scss'],
                                    importer: jsonImporter()
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
                filename: "main.[hash].css"
            }),
            new webpack.WatchIgnorePlugin([
                path.join(__dirname, "node_modules")
            ]),
            new ReplaceHashInFileWebpackPlugin([{
                dir: __dirname + '/../theme',
                files: ['scripts.php', 'scripts-dev.php'],
                rules: [
                    {
                        search: /\main\.(\w+|\[\w+\]).js/g,
                        replace: 'main.[hash].js'
                    },
                    {
                        search: /\main\.(\w+|\[\w+\]).css/g,
                        replace: 'main.[hash].css'
                    }
                ]
            }]),
            new CopyPlugin([
                { from: 'src/public', to: 'public' },
            ])
        ]
         //   .concat(pages)
            .concat(indexHtml)
    }
};