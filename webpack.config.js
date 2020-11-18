const path = require('path');

module.exports = {
  mode: 'production',
  entry: './build/src/main.js',
  target: 'node',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  }
};