import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import webpack from 'webpack';

module.exports = {
    entry: {
        index: [
            './src/js/client/index.js',
            './src/css/main.scss',
        ],
    },
    output: {
        path: `${__dirname}/dist`,
        filename: 'bundle.js',
    },
    module: {
        rules: [
            { test: /\.html$/, use: 'html-loader' },
            { test: /\.json$/, use: 'json-loader' },
            { test: /\.(njk|nunjucks)$/, use: 'nunjucks-loader' },
            { test: /\.jsx?$/, use: 'babel-loader', exclude: /node_modules/ },
            { test: /\.less$/, use: ExtractTextPlugin.extract({ fallback: 'style-loader', use: ['css-loader', 'less-loader'] }) },
            { test: /\.s?css$/, use: ExtractTextPlugin.extract({ fallback: 'style-loader', use: ['css-loader', 'sass-loader'] }) },
            {
                test: /\.(png|jpg|gif|svg|woff2?|eot|ttf)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    name: '[name]-[hash:7].[ext]',
                },
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: `${__dirname}/src/index.html`,
            hash: true,
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
        }),
        new ExtractTextPlugin({ filename: '[name].css', allChunks: false }),
        new webpack.optimize.UglifyJsPlugin(),
    ],
};
