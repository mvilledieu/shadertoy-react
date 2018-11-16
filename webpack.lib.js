const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: {
        "shadertoyreact" : path.join(__dirname, "src/index.js"),
        "shadertoyreact.min" : path.join(__dirname, "src/index.js"),
    },
    output: {
        path: path.join(__dirname, "lib/"),
        filename: "[name].js",
        libraryTarget: 'commonjs2',
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: "babel-loader",
                exclude: /node_modules/
            },
        ]
    },
    resolve: {
        extensions: [".js", ".jsx"]
    },
    externals: {
        'react': 'react',
        'react-dom': 'react-dom'
    },
    optimization: {
        minimize: true,
        minimizer: [new UglifyJsPlugin({
            include: /\.min\.js$/
        })]
    },
    devServer: {
        port: 3001
    }
};