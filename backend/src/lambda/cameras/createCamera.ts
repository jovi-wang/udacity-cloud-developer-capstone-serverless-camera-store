import 'source-map-support/register';

import {
  APIGatewayProxyEvent,
  APIGatewayProxyHandler,
  APIGatewayProxyResult,
} from 'aws-lambda';
import { getUserId } from '../../utils/auth';
import { createLogger } from '../../utils/logger';

import { createCamera } from '../../businessLogic/cameras';
import { CameraRequestParam } from '../../models/Camera';

const logger = createLogger('createCamera');

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  logger.info('create camera handler', event);

  const userId = getUserId(event);
  const newCamera: CameraRequestParam = JSON.parse(event.body!);

  const cameraItem = await createCamera(userId, newCamera);
  return {
    statusCode: 201,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify(cameraItem),
  };
};
