import 'source-map-support/register';
import * as AWS from 'aws-sdk';

const AWSXRay = require('aws-xray-sdk');
const XAWS = AWSXRay.captureAWS(AWS);

import { DocumentClient } from 'aws-sdk/clients/dynamodb';

import { CameraItem, CameraRequestParam } from '../models/Camera';
import { createLogger } from '../utils/logger';

const s3 = new XAWS.S3({
  signatureVersion: 'v4',
});
const dynamoDocument = new XAWS.DynamoDB.DocumentClient();

const urlExpiration = process.env.SIGNED_URL_EXPIRATION;
const logger = createLogger('cameraDataLayer');

export class CameraData {
  constructor(
    private readonly docClient: DocumentClient = dynamoDocument,
    private readonly camerasTable = process.env.CAMERAS_TABLE,
    private readonly camerasTableUserIndex = process.env
      .CAMERAS_TABLE_INDEX_NAME,
    private readonly bucketName = process.env.IMAGES_S3_BUCKET
  ) {}

  async queryCamerasByUserId(userId: string): Promise<CameraItem[]> {
    logger.info(`Query all camera for user ${userId}`);

    const result = await this.docClient
      .query({
        TableName: this.camerasTable,
        IndexName: this.camerasTableUserIndex,
        KeyConditionExpression: 'userId = :userId',
        ExpressionAttributeValues: {
          ':userId': userId,
        },
      })
      .promise();

    return result.Items as CameraItem[];
  }

  async createCameraItem(cameraItem: CameraItem): Promise<void> {
    logger.info(
      `Put new camera ${cameraItem.cameraId} with param: `,
      cameraItem
    );
    const imageUrl = `https://${this.bucketName}.s3.amazonaws.com/${cameraItem.cameraId}`;
    await this.docClient
      .put({
        TableName: this.camerasTable,
        Item: { ...cameraItem, imageUrl },
      })
      .promise();
  }

  async updateCameraItem(
    userId: string,
    cameraId: string,
    updateCameraParam: CameraRequestParam
  ): Promise<void> {
    logger.info(
      `Update camera item ${cameraId} with param: `,
      updateCameraParam
    );

    await this.docClient
      .update({
        TableName: this.camerasTable,
        Key: {
          cameraId,
          userId,
        },
        UpdateExpression:
          'set #name = :name, #brand = :brand, #connection = :connection, #price = :price, #model = :model',
        ExpressionAttributeNames: {
          '#name': 'name',
          '#brand': 'brand',
          '#connection': 'connection',
          '#model': 'model',
          '#price': 'price',
        },
        ExpressionAttributeValues: {
          ':name': updateCameraParam.name,
          ':brand': updateCameraParam.brand,
          ':price': updateCameraParam.price,
          ':model': updateCameraParam.model,
          ':connection': updateCameraParam.connection,
        },
      })
      .promise();
  }

  async deleteCameraItem(userId: string, cameraId: string): Promise<void> {
    logger.info(`Delete camera item ${cameraId}`);
    await this.docClient
      .delete({
        TableName: this.camerasTable,
        Key: {
          cameraId,
          userId,
        },
      })
      .promise();
  }

  async getCamera(userId: string, cameraId: string): Promise<CameraItem> {
    logger.info(`Get camera by id: ${cameraId}`);

    const result = await this.docClient
      .get({
        TableName: this.camerasTable,
        Key: {
          cameraId,
          userId,
        },
      })
      .promise();

    return result.Item as CameraItem;
  }

  generateUploadUrl(cameraId: string): string {
    const uploadUrl = s3.getSignedUrl('putObject', {
      Bucket: this.bucketName,
      Key: cameraId,
      Expires: parseInt(urlExpiration),
    });

    return uploadUrl;
  }
}
