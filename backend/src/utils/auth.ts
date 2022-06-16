import { decode, JwtHeader } from 'jsonwebtoken';
import { APIGatewayProxyEvent } from 'aws-lambda';

export interface JwtPayload {
  iss: string;
  sub: string;
  iat: number;
  exp: number;
}

/**
 * Interface representing a JWT token
 */
export interface Jwt {
  header: JwtHeader;
  payload: JwtPayload;
}

/**
 * Parse a JWT token and return a user id
 * @param jwtToken JWT token to parse
 * @returns a user id from the JWT token
 */
const parseUserId = (jwtToken: string): string => {
  const decodedJwt = decode(jwtToken) as JwtPayload;
  return decodedJwt.sub;
};

/**
 * Get a user id from an API Gateway event
 * @param event an event from API Gateway
 *
 * @returns a user id from a JWT token
 */
export const getUserId = (event: APIGatewayProxyEvent): string => {
  const authorization = event.headers.Authorization;
  const split = authorization.split(' ');
  const jwtToken = split[1];

  return parseUserId(jwtToken);
};
