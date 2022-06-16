import 'source-map-support/register';

import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  APIGatewayProxyHandler,
} from 'aws-lambda';
import { getUserId } from '../../utils/auth';
import { createLogger } from '../../utils/logger';

import { getCameras } from '../../businessLogic/cameras';

const logger = createLogger('getCameras');

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  logger.info('get cameras handler', event);
  const userId = getUserId(event);
  const items = await getCameras(userId);

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify(items),
  };
};
