const path = require('path');

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/styles')]
  },
  images: {
    domains: ['api.tanki.su'],
    loader: 'custom',
    loaderFile: './src/utils/imageLoader.ts',
  },
};
