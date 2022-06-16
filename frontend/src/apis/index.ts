import axios from 'axios';
import { Camera, Cameras, CameraDTO } from '../interfaces';
import { API_URL } from '../config';

export const getCameras = async (token: string) => {
  const result = { dataCamera: [] as Cameras, error: false };
  try {
    const { data } = await axios.get(API_URL, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    result.dataCamera = data.items;
  } catch (e) {
    result.error = true;
    console.error(e);
  }
};

export const addCamera = async (
  newCamera: CameraDTO,
  image: File,
  token: string
) => {
  const result = { dataCamera: {} as Camera, error: false };

  const body = JSON.stringify(newCamera);
  try {
    const { data } = await axios.post(API_URL, body, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    await axios.put(data.imageUploadUrl, image);
    result.dataCamera = {
      ...data,
      imageUrl: data.imageUploadUrl.split('?')[0],
    };
  } catch (e) {
    result.error = true;
    console.error(e);
  }

  return result;
};

export const editCamera = async (
  cameraId: string,
  cameraEdited: CameraDTO,
  token: string,
  imageUrl: string,
  image?: File
) => {
  const result = { dataCamera: {} as Camera, error: false };

  try {
    if (image instanceof File) {
      const response = await axios.get(`${API_URL}/${cameraId}/image-url`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const { uploadUrl } = response.data;
      await axios.put(uploadUrl, image);
    }

    const body = JSON.stringify(cameraEdited);
    await axios.put(`${API_URL}/${cameraId}`, body, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    result.dataCamera = { ...cameraEdited } as Camera;
  } catch (e) {
    result.error = true;
    console.error(e);
  }

  return result;
};

export const deleteCamera = async (cameraId: string, token: string) => {
  const result = { error: false };

  try {
    await axios.delete(`${API_URL}/${cameraId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (e) {
    result.error = true;
    console.error(e);
  }

  return result;
};
