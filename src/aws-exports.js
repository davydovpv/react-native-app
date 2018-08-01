const config = {
  Auth: {
    identityPoolId: 'us-east-2:683ceb25-aad3-42c0-b247-ff46f68335ac',
    region: 'us-east-2',
    userPoolId: 'us-east-2_NjWHkbxli',
    userPoolWebClientId: '4q6237g0pfvluagtik7tusks24',
  },
  API: {
    'aws_appsync_graphqlEndpoint': 'https://hyhhf2doo5exxohzirc66e4rbe.appsync-api.us-east-2.amazonaws.com/graphql',
    'aws_appsync_region': 'us-east-2',
    'aws_appsync_authenticationType': 'API_KEY',
    'aws_appsync_apiKey': 'da2-q6bvmknht5efjoq2jn3s2o72f4'
  },
  AWSPinpoint: {
    appId: 'fc227622b7874d8c853c757d133672f0',
    region: 'us-east-1',
    bufferSize: 1000,
    flushInterval: 5000,
    flushSize: 100,
    resendLimit: 5
  }
}

export default config
