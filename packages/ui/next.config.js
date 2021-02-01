/* eslint-disable */
const dotenv = require('dotenv');
dotenv.config({ path: '../../.env' });

const { withPlugins } = require('next-compose-plugins');

module.exports = withPlugins([], {
  // target: 'experimental-serverless-trace',
  // no free advertising on my watch
  poweredByHeader: false,
  env: {
    // env variables to propagate to the client (public info)
  },
});
