const path = require('path');
module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@app': path.resolve(__dirname, 'src', 'app'),
      '@components': path.resolve(__dirname, 'src', 'components'),
      '@modules': path.resolve(__dirname, 'src', 'modules'),
      '@image': path.resolve(__dirname, 'src', 'image'),
    },
  },
};
