import * as config from 'config';

// Get env values
const AWS_CONFIG = config.get('aws');

export const AwsConfig: any = {
  accessKeyId: AWS_CONFIG.id,
  secretAccessKey: AWS_CONFIG.key,
  region: AWS_CONFIG.region,
};
