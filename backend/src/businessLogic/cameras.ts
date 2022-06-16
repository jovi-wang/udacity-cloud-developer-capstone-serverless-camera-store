import 'source-map-support/register';
import * as uuid from 'uuid';

import { CameraItem, CameraRequestParam } from '../models/Camera';
import { CameraData } from '../dataLayer/cameraData';

const cameraData = new CameraData();

export const getCameras = async (userId: string): Promise<CameraItem[]> => {
  return await cameraData.queryCamerasByUserId(userId);
};

export const getCamera = async (
  userId: string,
  cameraId: string
): Promise<CameraItem> => {
  return await cameraData.getCamera(userId, cameraId);
};

export const createCamera = async (
  userId: string,
  createCameraParam: CameraRequestParam
): Promise<CameraItem> => {
  const cameraId = uuid.v4();

  const newCameraItem: CameraItem = {
    userId: userId,
    cameraId: cameraId,
    createdAt: new Date().toISOString(),
    ...createCameraParam,
  };

  await cameraData.createCameraItem(newCameraItem);

  newCameraItem.imageUploadUrl = cameraData.generateUploadUrl(cameraId);

  return newCameraItem;
};

export const updateCamera = async (
  userId: string,
  cameraId: string,
  updateCameraParam: CameraRequestParam
): Promise<void> => {
  const newCameraItem = {
    userId,
    cameraId,
    ...updateCameraParam,
    createdAt: new Date().toISOString(),
  };
  await cameraData.updateCameraItem(userId, cameraId, newCameraItem);
};

export const deleteCamera = async (
  userId: string,
  cameraId: string
): Promise<void> => {
  await cameraData.deleteCameraItem(userId, cameraId);
};

export const generateUploadUrl = (cameraId: string): string => {
  return cameraData.generateUploadUrl(cameraId);
};
