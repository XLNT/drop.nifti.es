module.exports = {
  async redirects() {
    return [
      {
        source: '/code/:code',
        destination: '/:code',
        permanent: true,
      },
    ];
  },
};
