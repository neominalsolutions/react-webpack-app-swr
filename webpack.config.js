const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// COMMONJS MODULE SYSTEM

module.exports = {
	entry: './src/index.tsx',
	mode: 'development',
	devServer: {
		historyApiFallback: true, // component güncelleme yapınca yada browserdan refresh yapınca sayfa cannot find hatası vermesin diye yazdık. sadece development için bu ayarı kullanıyoruz.
	},
	output: {
		filename: 'index.js',
		path: path.resolve(__dirname, 'dist'),
	},
	module: {
		rules: [
			{
				test: /\.(ts|tsx)$/,
				exclude: /node_modules/,
				use: 'babel-loader',
			},
			{
				test: /\.(s(a|c)ss)$/,
				use: ['style-loader', 'css-loader', 'sass-loader', 'postcss-loader'],
			},
			{
				test: /\.(woff|woff2|eot|ttf|svg)$/,
				use: {
					loader: 'url-loader',
				},
			},
			{
				test: /\.(png|jpe?g|gif)$/i,
				use: [
					{
						loader: 'file-loader',
					},
				],
			},
		],
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js', '.jsx'],
		fallback: {
			fs: false,
		},
	},
	plugins: [new HtmlWebpackPlugin({ template: './src/index.html' })],
};
