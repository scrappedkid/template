/* eslint-disable indent */
const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const resolve = require('resolve')
const PnpWebpackPlugin = require('pnp-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
const InlineChunkHtmlPlugin = require('react-dev-utils/InlineChunkHtmlPlugin')
const TerserPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const safePostCssParser = require('postcss-safe-parser')
const ManifestPlugin = require('webpack-manifest-plugin')
const InterpolateHtmlPlugin = require('@nenado/interpolate-html-plugin')
const WorkboxWebpackPlugin = require('workbox-webpack-plugin')
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin')
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin')
const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent')
const ModuleNotFoundPlugin = require('react-dev-utils/ModuleNotFoundPlugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin-alt')
const typescriptFormatter = require('react-dev-utils/typescriptFormatter')

/**
 * !          Additions to makewebpack  life better.
 */

// const autoprefixer = require('autoprefixer')
// const classprefixer = require('postcss-class-prefix')

// ------ For caching build vendor modules ------------- //

var HardSourceWebpackPlugin = require('hard-source-webpack-plugin')

// -----------------------------------------------------//

/** !            ^^^^ Ignore ^^^^                        */
/** !            testing and trials                      */

const chalk = require('chalk')
const Stylish = require('webpack-stylish')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const Happypack = require('happypack')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const Jarvis = require('webpack-jarvis')

/**
 * !          End.
 */

if (!Intl.PluralRules) {
  require('@formatjs/intl-pluralrules/polyfill')
  require('@formatjs/intl-pluralrules/dist/locale-data/en') // Add locale data for de
}

if (!Intl.RelativeTimeFormat) {
  require('@formatjs/intl-relativetimeformat/polyfill')
  require('@formatjs/intl-relativetimeformat/dist/locale-data/en') // Add locale data for de
}

const paths = require('./paths')
const getClientEnvironment = require('./env')
// const happyThreadPool = Happypack.ThreadPool({ size: 8 })

const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false'
const shouldInlineRuntimeChunk = process.env.INLINE_RUNTIME_CHUNK !== 'false'
const useTypeScript = fs.existsSync(paths.appTsConfig)
const cssRegex = /\.css$/
const cssModuleRegex = /\.module\.css$/
const sassRegex = /\.(scss|sass)$/
const sassModuleRegex = /\.module\.(scss|sass)$/

module.exports = function (webpackEnv) {
  const isEnvDevelopment = webpackEnv === 'development'
  const isEnvProduction = webpackEnv === 'production'

  const publicPath = isEnvProduction
    ? paths.servedPath
    : isEnvDevelopment && '/'
  const shouldUseRelativeAssetPaths = publicPath === './'

  const publicUrl = isEnvProduction
    ? publicPath.slice(0, -1)
    : isEnvDevelopment && ''
  const env = getClientEnvironment(publicUrl)

  const getStyleLoaders = (cssOptions, preProcessor) => {
    const loaders = [
      isEnvDevelopment && require.resolve('style-loader'),
      isEnvProduction && {
        loader: MiniCssExtractPlugin.loader,
        options: Object.assign(
          {},
          shouldUseRelativeAssetPaths ? { publicPath: '../../' } : undefined
        )
      },
      {
        loader: require.resolve('css-loader'),
        options: cssOptions
      },
      {
        loader: require.resolve('postcss-loader'),
        options: {
          ident: 'postcss',
          plugins: () => [
            require('postcss-flexbugs-fixes'),
            require('postcss-preset-env')({
              autoprefixer: {
                flexbox: 'no-2009'
              },
              stage: 3
            })
          ],
          sourceMap: isEnvProduction && shouldUseSourceMap
        }
      }
    ].filter(Boolean)
    if (preProcessor) {
      loaders.push({
        loader: require.resolve(preProcessor),
        options: {
          sourceMap: isEnvProduction && shouldUseSourceMap
        }
      })
    }
    return loaders
  }

  return {
    watch: true,
    mode: isEnvProduction ? 'production' : isEnvDevelopment && 'development',
    bail: isEnvProduction,
    devtool: isEnvProduction
      ? shouldUseSourceMap
        ? 'source-map'
        : false
      : isEnvDevelopment && 'cheap-module-source-map',
    entry: [
      isEnvDevelopment &&
        require.resolve('react-dev-utils/webpackHotDevClient'),
      paths.appIndexJs
    ].filter(Boolean),
    output: {
      path: isEnvProduction ? paths.appBuild : undefined,
      pathinfo: isEnvDevelopment,
      filename: isEnvProduction
        ? 'static/js/[name]-chunk.js'
        : isEnvDevelopment && 'static/js/bundle.js',
      chunkFilename: isEnvProduction
        ? 'static/js/[name]-[chunkhash:8].chunk.js'
        : isEnvDevelopment && 'static/js/[name].chunk.js',
      publicPath: publicPath,
      devtoolModuleFilenameTemplate: isEnvProduction
        ? info =>
            path
              .relative(paths.appSrc, info.absoluteResourcePath)
              .replace(/\\/g, '/')
        : isEnvDevelopment &&
          (info => path.resolve(info.absoluteResourcePath).replace(/\\/g, '/'))
    },
    optimization: {
      runtimeChunk: true,
      minimize: isEnvProduction,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            parse: {
              ecma: 8
            },
            compress: {
              ecma: 5,
              warnings: false,
              comparisons: false,
              inline: 2
            },
            mangle: {
              safari10: true
            },
            output: {
              ecma: 5,
              comments: false,
              ascii_only: true
            }
          },
          parallel: 8,
          cache: true,
          sourceMap: shouldUseSourceMap
        }),
        new OptimizeCSSAssetsPlugin({
          cssProcessorOptions: {
            parser: safePostCssParser,
            map: shouldUseSourceMap
              ? {
                  inline: true,
                  annotation: true
                }
              : false
          }
        })
      ],
      splitChunks: {
        chunks: 'all',
        maxInitialRequests: Infinity,
        minSize: 15000,
        maxSize: 50000,
        name: true,
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name (module) {
              const packageName = module.context.match(
                /[\\/]node_modules[\\/](.*?)([\\/]|$)/
              )[1]
              return `npm.${packageName.replace('@', '')}`
            }
          }
        }
      }
    },
    resolve: {
      modules: ['node_modules'].concat(
        process.env.NODE_PATH.split(path.delimiter).filter(Boolean)
      ),
      extensions: paths.moduleFileExtensions
        .map(ext => `.${ext}`)
        .filter(ext => useTypeScript || !ext.includes('ts')),
      alias: {
        '../../theme.config$': path.join(
          __dirname,
          '../src/semantic/theme.config'
        ),
        '@actions': path.resolve(__dirname, '../src/redux/actions'),
        '@admin': path.resolve(__dirname, '../src/admin'),
        '@app': path.resolve(__dirname, '../src/app'),
        '@assets': path.resolve(__dirname, '../src/assets'),
        '@client': path.resolve(__dirname, '../src/client'),
        '@components': path.resolve(__dirname, '../src/components'),
        '@config': path.resolve(__dirname, '../src/config'),
        '@controllers': path.resolve(__dirname, '../src/global/controllers'),
        '@global': path.resolve(__dirname, '../src/global'),
        '@images': path.resolve(__dirname, '../images'),
        '@layout': path.resolve(__dirname, '../src/assets/layout'),
        '@modules': path.resolve(__dirname, '../modules'),
        '@pages': path.resolve(__dirname, '../src/pages'),
        '@reducers': path.resolve(__dirname, '../src/controllers/reducers'),
        '@root': path.resolve(__dirname, '../src'),
        '@router': path.resolve(__dirname, '../src/controllers/router'),
        '@routes': path.resolve(__dirname, '../src/controllers/routes'),
        '@semantic': path.resolve(__dirname, '../src/semantic'),
        '@server': path.resolve(__dirname, '../src/server'),
        '@services': path.resolve(__dirname, '../src/services'),
        '@shared': path.resolve(__dirname, '../src/shared'),
        '@static': path.resolve(__dirname, '../src/static'),
        '@store': path.resolve(__dirname, '../src/controllers/store'),
        '@tests': path.resolve(__dirname, '../src/tests'),
        '@tools': path.resolve(__dirname, '../src/tools'),
        '@utils': path.resolve(__dirname, '../src/shared/utils'),
        '@views': path.resolve(__dirname, '../src/assets/views'),
        '@isomorphic': path.resolve(__dirname, '../src/global/assets/isomorphic'),
        '@Library': path.resolve(__dirname, '../src/global/assets/Library'),
        '@UIviews': path.resolve(__dirname, '../src/global/assets/UIviews'),
        heading: path.resolve(
          __dirname,
          '../src/global/theme/semantic/heading.less'
        )
      },
      plugins: [
        PnpWebpackPlugin,
        new ModuleScopePlugin(paths.appSrc, [paths.appPackageJson])
      ]
    },
    resolveLoader: {
      plugins: [PnpWebpackPlugin.moduleLoader(module)]
    },
    module: {
      strictExportPresence: false,
      rules: [

        /*        {
              test: /\..jsx)$/,
              loader: ['happypack/loader?id=babel'],
              exclude: path.resolve(__dirname, ' ./node_modules')
            },

        {
              test: /\.(scss|css)$/,
              // Mini-css-extract-plugin is used to extract CSS here. If placed on it, there will be an error.
              loader: [MiniCssExtractPlugin.loader, 'happypack/loader?id=css'],
              include: [
                path.resolve(__dirname, 'src')
              ]
            }
            */

        {
          test: /\.less$/,
          loader: 'happypack/loader?id=less',
          include: [path.resolve(__dirname, '../src')]
        },
        {
          parser: {
            requireEnsure: false,
            allowImportExportEverywhere: true
          }
        },
        {
          test: /\.(js|.jsx)$/,
          enforce: 'pre',
          use: [
            {
              loader: require.resolve('eslint-loader'),
              options: {
                formatter: require.resolve('react-dev-utils/eslintFormatter'),
                eslintPath: require.resolve('eslint'),
                allowImportExportEverywhere: true
              }
            }
          ],
          include: paths.appSrc
        },
        {
          test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'file-loader'
        },
        {
          oneOf: [
            {
              test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
              loader: require.resolve('url-loader'),
              options: {
                limit: 10000,
                name: 'static/media/[name].[hash:8].[ext]'
              }
            },
            {
              test: /\.(js|.jsx|ts|tsx)$/,
              include: paths.appSrc,
              loader: require.resolve('babel-loader'),
              options: {
                customize: require.resolve(
                  'babel-preset-react-app/webpack-overrides'
                ),
                plugins: [
                  [
                    require.resolve('babel-plugin-named-asset-import'),
                    {
                      loaderMap: {
                        svg: {
                          ReactComponent:
                            '@svgr/webpack?-prettier,-svgo![path]'
                        }
                      }
                    }
                  ]
                ],
                cacheDirectory: true,
                cacheCompression: isEnvProduction,
                compact: isEnvProduction
              }
            },
            {
              test: /\.(js|mjs)$/,
              exclude: /@babel(?:\/|\\{1,2})runtime/,
              loader: require.resolve('babel-loader'),
              options: {
                babelrc: false,
                configFile: false,
                compact: isEnvProduction,
                presets: [
                  [
                    require.resolve('babel-preset-react-app/dependencies'),
                    { helpers: true }
                  ]
                ],
                cacheDirectory: true,
                cacheCompression: isEnvProduction,
                sourceMaps: true
              }
            },
            {
              test: cssRegex,
              exclude: cssModuleRegex,
              use: getStyleLoaders({
                importLoaders: 1,
                sourceMap: isEnvProduction && shouldUseSourceMap
              }),
              sideEffects: true
            },
            {
              test: cssModuleRegex,
              use: getStyleLoaders({
                importLoaders: 1,
                sourceMap: isEnvProduction && shouldUseSourceMap,
                modules: true,
                getLocalIdent: getCSSModuleLocalIdent
              })
            },
            {
              test: sassRegex,
              exclude: sassModuleRegex,
              use: getStyleLoaders({
                importLoaders: 2,
                sourceMap: isEnvProduction && shouldUseSourceMap
              }),
              sideEffects: true
            },
            {
              test: sassModuleRegex,
              use: getStyleLoaders({
                importLoaders: 2,
                sourceMap: isEnvProduction && shouldUseSourceMap,
                modules: true,
                getLocalIdent: getCSSModuleLocalIdent
              })
            },
            {
              loader: require.resolve('url-loader'),
              exclude: [
                /\.(config|overrides|variables)$/,
                /\.(.jsx)$/,
                /\.(js|.jsx|ts|tsx)$/,
                /\.bmp$/,
                /\.css$/,
                /\.gif$/,
                /\.html$/,
                /\.html$/,
                /\.jpe?g$/,
                /\.json$/,
                /\.less$/,
                /\.png$/,
                /\.scss$/,
                /\.eot$/
              ],
              options: {
                name: 'static/media/[name].[hash:8].[ext]'
              }
            }
          ]
        }
      ]
    },

    plugins: [
      new FriendlyErrorsWebpackPlugin(),
      new Stylish(),
      new Jarvis({
        watchOnly: true,
        port: 3005 // optional: set a port
      }),
      isEnvProduction &&
        new webpack.LoaderOptionsPlugin({
          test: /\.(less|scss)/,
          options: {
            postcss: function (webpack) {
              return [
                require('postcss-less')(),
                require('postcss-import')({ addDependencyTo: webpack }),
                require('postcss-url')(),
                require('postcss-cssnext')({ browsers: 'last 2 version' }),
                require('postcss-browser-reporter')(),
                require('postcss-reporter')()
              ]
            }
          }
        }),

      new Happypack({
        id: 'less',
        loaders: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: isEnvProduction && shouldUseSourceMap,
              modules: false
            }
          },
          {
            loader: 'postcss-loader'
          },
          {
            loader: 'less-loader'
          }
        ]
      }),

      /*
      new Happypack({
        id: 'babel',
        loaders: ['babel-loader'],
        threadPool: happyThreadPool
      }),
      new Happypack({
        id: 'css',
        loaders: ['css-loader', 'postcss-loader', 'sass-loader'],
        threadPool: happyThreadPool
      }),
 */
      new HtmlWebpackPlugin(
        Object.assign(
          {},
          {
            inject: true,
            template: paths.appHtml
          },
          isEnvProduction
            ? {
                minify: {
                  removeComments: true,
                  collapseWhitespace: true,
                  removeRedundantAttributes: true,
                  useShortDoctype: true,
                  removeEmptyAttributes: true,
                  removeStyleLinkTypeAttributes: true,
                  keepClosingSlash: true,
                  minifyJS: true,
                  minifyCSS: true,
                  minifyURLs: false
                }
              }
            : undefined
        )
      ),

      //      For use possibly during hard large compilation cycles in dev..
//
//      new HardSourceWebpackPlugin({
//        // Either an absolute path or relative to webpack's options.context.
//        cacheDirectory: '/node_modules/.cache/hard-source/[confighash]',
//        // Either a string of object hash function given a webpack config.
//        configHash: function (webpackConfig) {
//          // node-object-hash on npm can be used to build this.
//          return require('node-object-hash')({ sort: true }).hash(webpackConfig)
//        },
//        // Either false, a string, an object, or a project hashing function.
//        environmentHash: {
//          root: process.cwd(),
//          directories: [],
//          files: ['package-lock.json', 'yarn.lock']
//        },
//        // An object.
//        info: {
//          // 'none' or 'test'.
//          mode: 'test',
//          // 'debug', 'log', 'info', 'warn', or 'error'.
//          level: 'warn'
//        },
//        // Clean up large, old caches automatically.
//        cachePrune: {
//          // Caches younger than `maxAge` are not considered for deletion. They must
//          // be at least this (set to 10 minutes) old in milliseconds.
//          maxAge: 1 * 1 * 10 * 60 * 1000,
//          // All caches together must be larger than `sizeThreshold` before any
//          // caches will be deleted. Together they must be at least this
//          // (default: 200 MB) big in bytes.
//          sizeThreshold: 200 * 1024 * 1024
//        }
//      }),
//
      isEnvProduction && new webpack.AutomaticPrefetchPlugin(),
      new webpack.HashedModuleIdsPlugin(),
      isEnvProduction &&
        shouldInlineRuntimeChunk &&
        new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/runtime~.+[.]js/]),
      new InterpolateHtmlPlugin(HtmlWebpackPlugin, env.raw),
      new ModuleNotFoundPlugin(paths.appPath),
      new webpack.DefinePlugin(env.stringified),
      isEnvDevelopment && new webpack.HotModuleReplacementPlugin(),
      isEnvDevelopment && new CaseSensitivePathsPlugin(),
      isEnvDevelopment &&
        new WatchMissingNodeModulesPlugin(paths.appNodeModules),
      isEnvProduction &&
        new MiniCssExtractPlugin({
          filename: 'static/css/[name].[contenthash:8].css',
          chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
          devtool: 'source-map'
        }),
      new ProgressBarPlugin({
        format:
          chalk.blue(' building-') +
          '[' +
          chalk.cyan(':bar') +
          ']' +
          chalk.green.bold(':percent') +
          ' (:elapsed seconds) ' +
          chalk.blue.bold('-:msg'),
        clear: false
      }),
      new ManifestPlugin({
        fileName: 'asset-manifest.json',
        publicPath: publicPath
      }),
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      isEnvProduction &&
        new WorkboxWebpackPlugin.GenerateSW({
          clientsClaim: true,
          exclude: [/\.map$/, /asset-manifest\.json$/],
          importWorkboxFrom: 'cdn',
          navigateFallback: publicUrl + '/index.html',
          navigateFallbackBlacklist: [
            new RegExp('^/_'),
            new RegExp('/[^/]+\\.[^/]+$')
          ]
        }),
      useTypeScript &&
        new ForkTsCheckerWebpackPlugin({
          typescript: resolve.sync('typescript', {
            basedir: paths.appNodeModules
          }),
          async: false,
          checkSyntacticErrors: true,
          tsconfig: paths.appTsConfig,
          compilerOptions: {
            module: 'esnext',
            moduleResolution: 'node',
            resolveJsonModule: true,
            isolatedModules: true,
            noEmit: true,
            jsx: 'preserve'
          },
          reportFiles: [
            '**',
            '!**/*.json',
            '!**/__tests__/**',
            '!**/?(*.)(spec|test).*',
            '!**/src/setupProxy.*',
            '!**/src/setupTests.*'
          ],
          watch: paths.appSrc,
          silent: true,
          formatter: typescriptFormatter
        })
    ].filter(Boolean),
    node: {
      dgram: 'empty',
      fs: 'empty',
      net: 'empty',
      tls: 'empty',
      child_process: 'empty'
    },
    performance: false
  }
}
