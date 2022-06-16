export interface Camera {
  cameraId: string;
  name: string;
  brand: string;
  model: string;
  price: string;
  connection: 'WIFI' | 'ETHERNET' | 'IP';
  imageUrl: string;
  createdAt?: string;
}

export type Cameras = Array<Camera>;
export type CameraDTO = Omit<Camera, 'cameraId' | 'imageUrl' | 'createdAt'>;

export interface ContextState {
  token: string;
  cameras: Cameras;
  loading: boolean;
  error: string | null;
}

export type CamerasActions =
  | { type: 'SET_CAMERAS'; payload: Cameras }
  | { type: 'SET_ERROR'; payload: string }
  | { type: 'ADD_CAMERA'; payload: Camera }
  | { type: 'EDIT_CAMERA'; payload: Camera }
  | { type: 'DELETE_CAMERA'; payload: string }
  | { type: 'SET_TOKEN'; payload: string };
