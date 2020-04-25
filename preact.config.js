const RemoveServiceWorkerPlugin = require('webpack-remove-serviceworker-plugin');

module.exports = function(config, env, helpers) {
  config.plugins.push(new RemoveServiceWorkerPlugin());
};
