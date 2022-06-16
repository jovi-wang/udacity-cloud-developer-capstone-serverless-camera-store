export interface CameraRequestParam {
  name: string;
  brand: string;
  price: string;
  model: string;
  connection: string;
  imageUrl: string;
  imageUploadUrl?: string;
}
export interface CameraItem extends CameraRequestParam {
  userId: string;
  cameraId: string;
  createdAt: string;
}
