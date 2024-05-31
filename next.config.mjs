import path from 'path';

const nextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/styles')]
  },
};

export default nextConfig;
