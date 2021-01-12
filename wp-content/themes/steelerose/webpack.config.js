const webpack = require('webpack');
const path = require('path');
const {
    readdirSync,
    existsSync,
    closeSync,
    openSync
} = require('fs');


// name : path
let assetPaths = {};

// Set block paths for asset compilation
const pathBlocks = "./theme/blocks/types";
readdirSync(pathBlocks, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => {
        const path =
            pathBlocks + '/' + dirent.name + '/' + dirent.name;

        if(existsSync(path + '.js')) {
            assetPaths[path] =
                path + '.js';
        }

        if(existsSync(path + '.jsx')) {
            assetPaths[path] =
                path + '.jsx';
        }
    });

module.exports = env => {
    let watch;
    if(env==='development') {
        watch = true;
    }

    // If no assetPaths, create dummy script file
    if(
        Object.keys(assetPaths).length === 0 &&
        assetPaths.constructor === Object
    ) {
        try {
            const scriptFile = __dirname + '/blocks.js';
            if (!existsSync(scriptFile)) {
                closeSync(openSync(scriptFile, 'w'));
                assetPaths = Object.assign(
                    {"blocks": scriptFile},
                    assetPaths
                );
            }
        } catch(err) {
            console.error(err)
        }
    }

    return {
        entry: assetPaths,
        mode: env,
        devtool: 'source-map',
        watch,
        output: {
            filename: '[name].[hash].js',
            path: path.resolve(__dirname)
        },
        resolve: {
            alias: {
                'react': 'preact-compat',
                'react-dom': 'preact-compat'
            }
        },
        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    exclude: path.resolve(__dirname),
                    enforce: 'pre',
                    use: 'source-map-loader'
                },
                {
                    test: /\.jsx?$/,
                    exclude: /node_modules/,
                    use: 'babel-loader'
                }
            ]
        }
    }
};