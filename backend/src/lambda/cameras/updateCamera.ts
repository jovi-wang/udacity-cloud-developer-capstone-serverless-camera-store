import 'source-map-support/register';

import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  APIGatewayProxyHandler,
} from 'aws-lambda';
import { getUserId } from '../../utils/auth';
import { createLogger } from '../../utils/logger';

import { getCamera, updateCamera } from '../../businessLogic/cameras';
import { CameraRequestParam } from '../../models/Camera';

const logger = createLogger('updateCamera');

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  logger.info('update camera handler', event);
  const { cameraId } = event.pathParameters;
  const updateCameraParam: CameraRequestParam = JSON.parse(event.body!);
  const userId = getUserId(event);

  const cameraItem = await getCamera(userId, cameraId);

  if (!cameraItem) {
    logger.error('No camera found with id', cameraId);
    return {
      statusCode: 404,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({
        error: 'Camera item does not exist, please provide a valid cameraId',
      }),
    };
  }

  await updateCamera(userId, cameraId, updateCameraParam);
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: '',
  };
};
