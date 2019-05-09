const mix = require('laravel-mix')
const package = require('./package')

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.react('resources/js/app.js', 'public/js')
// mix.react('resources/js/attendance.js', 'public/js')

mix.copyDirectory('resources/images', 'public/images')

mix.webpackConfig({
  devServer: {
    disableHostCheck: true
  },
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom'
    }
  }
})

mix.options({
  hmrOptions: {
    host: 'localhost',
    port: '8080'
  },
  terser: { terserOptions: { parallel: true } }
})

if (mix.inProduction()) {
  mix.extract(Object.keys(package.dependencies)).version()
} else {
  mix.sourceMaps()
}

Mix.listen('configReady', webpackConfig => {
  if (Mix.isUsing('hmr')) {
    webpackConfig.entry = Object.keys(webpackConfig.entry).reduce((entries, entry) => {
      entries[entry.replace(/^\//, '')] = webpackConfig.entry[entry]
      return entries
    }, {})

    webpackConfig.plugins.forEach(plugin => {
      if (plugin.constructor.name === 'ExtractTextPlugin') {
        plugin.filename = plugin.filename.replace(/^\//, '')
      }
    })
  }
})
