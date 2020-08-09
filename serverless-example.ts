import { Serverless } from 'serverless/aws';

const serverlessConfiguration: Serverless = {
  service: {
    name: 'dailydoggo',
    // app and org for use with dashboard.serverless.com
    // app: your-app-name,
    // org: your-org-name,
  },
  frameworkVersion: '>=1.72.0',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true
    }
  },
  // Add the serverless-webpack plugin
  plugins: ['serverless-webpack'],
  provider: {
    name: 'aws',
    runtime: 'nodejs12.x',
    apiGateway: {
      minimumCompressionSize: 1024,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      FLICKR_API_KEY: '',
      TWITTER_CONSUMER_KEY: '',
      TWITTER_CONSUMER_SECRET: '',
      TWITTER_ACCESS_TOKEN: '',
      TWITTER_ACCESS_SECRET: '',
    },
  },
  functions: {
    dailydoggo: {
      handler: 'handler.dailydoggo',
      events: [
        {
          schedule: 'rate(1 day)'
        }
      ]
    }
  }
}

module.exports = serverlessConfiguration;
