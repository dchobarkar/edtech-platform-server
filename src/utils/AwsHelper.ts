import { Injectable } from '@nestjs/common';
const AWS = require('aws-sdk');
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
      Bucket: 'ganety-lectures-private-data',
      ACL: 'private',
      CreateBucketConfiguration: {
        LocationConstraint: "ap-south-1"
      }
    };

    await this.S3.createBucket(bucketParams, function (err, data) {
      if (err) {
        console.log("Error", err);
      } else {
        console.log("Success", data.Location);
      }
    });
    return 1;
  }

  async UPLOAD_VIDEO(video: any, folderPath: string): Promise<any> {
    const params = {
      Bucket: 'ganety-lectures-private-data'
      , Key: folderPath, Body: video.buffer
    };
    const options = { partSize: video.size, queueSize: 1 };
    const data = await this.S3.upload(params, options).promise();
    return data;
  }

}
