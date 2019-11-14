const path = require('path')

module.exports = {
    entry: './src/index.ts',
    devtool: 'source-map',
    module: {
        rules: [{
                test: /\.(vert|frag)$/,
                use: 'raw-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.tsx?$/,
                use: {
                    loader: "ts-loader",
                    options: {
                        configFile: "tsconfig.webpack.json"
                    }
                },
                exclude: /node_modules/,
            }
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: 'flat-land-gl.js',
        path: path.resolve(__dirname, 'dist'),
    }
}
