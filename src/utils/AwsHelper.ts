const AWS = require('aws-sdk');
import { Injectable } from '@nestjs/common';

import { AwsConfig } from '../config/aws.config';

@Injectable()
export class AwsHelper {
  private S3: any;
  constructor() {
    AWS.config.credentials = AwsConfig;
    this.S3 = new AWS.S3();
  }

  async CREATE_BUCKET(): Promise<any> {
    const bucketParams = {
      Bucket: 'ganety',
      ACL: 'private',
      CreateBucketConfiguration: {
        LocationConstraint: 'ap-south-1',
      },
    };

    await this.S3.createBucket(bucketParams, function(err, data) {
      if (err) {
        console.log('Error', err);
      } else {
        console.log('Success', data.Location);
      }
    });
    return 1;
  }

  async UPLOAD_VIDEO(video: any, folderPath: string): Promise<any> {
    const params = {
      Bucket: 'ganety',
      Key: folderPath,
      Body: video.buffer,
    };
    const options = { partSize: video.size, queueSize: 1 };
    const data = await this.S3.upload(params, options).promise();
    return data;
  }

  async UPLOAD_IMAGE(image: any, folderPath: string): Promise<any> {
    const params = {
      Bucket: 'ganety',
      Key: folderPath,
      Body: image.buffer,
    };
    const data = await this.S3.upload(params).promise();
    return data;
  }
}
