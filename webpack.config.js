var path = require('path');
var autoprefixer = require('autoprefixer');
var px2rem = require('postcss-px2rem');
var webpack = require('webpack');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

function NamedModulesPlugin(options) {
	this.options = options || {};
}
NamedModulesPlugin.prototype.apply = function(compiler) {
	compiler.plugin('compilation', function(compilation) {
		compilation.plugin('before-module-ids', function(modules) {
			modules.forEach(function(module) {
				if (module.id === null && module.libIdent) {
					module.id = module.libIdent({
						context: this.options.context || compiler.options.context
					});
				}
			}, this);
		}.bind(this));
	}.bind(this));
};

var argv = require('yargs').argv;
var plugins = []; // 开发环境和生成环境不同的插件
var appPath = path.resolve(__dirname, 'src/containers'); // js文件路径
var distPath = path.join(__dirname, '/dist'); // 打包路径
var indexEntries = [appPath];
var devServer = {}; // 采用服务方式时相关信息的配置
var devtool = false;
// 区分生产环境 开发环境
if (process.env.NODE_ENV && process.env.NODE_ENV === 'production') {
	plugins.push(new webpack.optimize.DedupePlugin());
	plugins.push(new webpack.optimize.MinChunkSizePlugin({ minChunkSize: 10000 }));
	plugins.push(new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
      compress: {
        sequences: true,
        dead_code: true,
        conditionals: true,
        booleans: true,
        unused: true,
        if_return: true,
        join_vars: true,
        drop_console: true,
				warnings: false
      },
      mangle: {
        except: [ 'exports', 'require' ]
      },
      output: {
        comments: false
      }
    }));
} else {
	devtool = 'inline-source-map';
	distPath = path.join(__dirname, '/static');
	plugins.push(new webpack.HotModuleReplacementPlugin());
	// plugins.push(new webpack.NoErrorsPlugin());
	// 起服务的方式
	if (argv.e && argv.e === 'server') {
		indexEntries.push('webpack-dev-server/client?http://localhost:5000/');
		indexEntries.push('webpack/hot/dev-server');
		devServer = {
			contentBase: distPath,
			port: 5000,
			inline: true,
			historyApiFallback: false,
			colors: true,
			stats: 'normal'
		};
	}
}

module.exports = {
  entry: {
    index: indexEntries,
    vendor: [ 'react', 'react-dom', 'redux', 'react-redux'],
  },
  output: {
    path: distPath,
    filename: 'js/[name]-[chunkhash].js',
    chunkFilename: 'js/[chunkhash].chunk.js',
    // publicPath: "/",
  },
  devtool: devtool,
  module: {
    preLoaders: [{
      test: /\.js$/,
      loader: 'eslint',
      exclude: /node_modules/
    }],
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel'
    }, {
      test: /\.scss$/,
      exclude: /node_modules/,
      loader: 'style!css?sourceMap&modules&importLoaders=1&localIdentName=[local]_[hash:base64:5]!postcss!sass'
    }, {
      test: /\.(png|jpg|gif)$/,
      exclude: /node_modules/,
      loader: 'url?limit=8192&name=images/[name]-[hash:8].[ext]'
    }, {
      test: /\.(woff|svg|eot|ttf)$/,
      exclude: /node_modules/,
      loader: 'url?limit=10000&name=fonts/[name]-[hash:8].[ext]'
    }, {
      test: /\.html$/,
      loader: 'html'
    }]
  },
  postcss: [autoprefixer({ browsers: [ '> 5%', 'last 2 versions' ] }), px2rem({remUnit: 75})],
  eslint: {
    configFile: '.eslintrc',
    emitWarning: false,
    emitError: true,
    formatter: require('eslint-friendly-formatter'),
    quiet: true
  },
	devServer: devServer,
  plugins: [
		...plugins,
		new webpack.optimize.OccurrenceOrderPlugin(true),
		new NamedModulesPlugin(),
    new webpack.DefinePlugin({
        __DEVELOPMENT__: true,
        'process.env': {
            'NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
        }
    }),
		new CleanWebpackPlugin(distPath, {
      root: __dirname,
      verbose: true,
      dry: false
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
			minify: {
        minifyJS: true,
        collapseWhitespace: true,
        removeComments: true
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: Infinity,
        filename: 'js/lib-[hash:8].js'
    })
  ]
};
