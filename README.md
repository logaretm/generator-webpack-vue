# generator-webpack-vue
This is a simple yeoman generator to build a Webpack dev environment.

#### Install

You need yeoman to make this generator work.

`npm install -g yo`

Then install the generator

`npm install -g generator-logaretm-webpack`

#### Setup
My setup is using VueJS and Webpack along with Babel.js and Stylus for frontend things.

I use Laravel as a backend framework, so some configurations may be opinionated towards it, like the resources paths.

I also like to use webpack-merge to split webpack configuration into multiple files and strategies.
and then validate them using webpack-validator.

basically there is the `webpack.config.js` which will be outputted to the root of the current directory.
and there are those files inside `./build`:

* `base.config.js`: contains the base config for the application, loaders and vendor definitions.
* `dev.config.js`: contains some dev-specific configuration like the dev server.
* `prod.config.js`: contains the production config and optimizations.

below is the complete list of stuff included.

#### Update Frequency
Most of my work is backend, so some stuff may not be "best practice" this is simply what works for me.

Having said that, I will update this whenever I learn something new, so if you have any suggestions feel free to provide them.

#### Loaders
* babel-loader
* css-loader
* file-loader
* url-loader
* stylus-loader
* vue-html-loader
* vue-loader
* vue-style-loader

#### Plugins
* extract-text-webpack-plugin
* purifycss-webpack-plugin
* clean-webpack-plugin
* webpack-manifest-plugin

#### Utilities
* eslint
* cross-env
* webpack-merge
* webpack-validator
