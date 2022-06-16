import { FC, useReducer, useEffect } from 'react';
import axios from 'axios';
import CamerasContext from './CamerasContext';
import CamerasReducer from '../reducers/CamerasReducer';
import { Camera, ContextState } from '../interfaces';
import { API_URL } from '../config';
import { useAuth0 } from '@auth0/auth0-react';

const INIT_STATE: ContextState = {
  cameras: [],
  loading: false,
  error: null,
  token: '',
};

const CamerasProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(CamerasReducer, INIT_STATE);

  const { isAuthenticated, getIdTokenClaims, getAccessTokenSilently } =
    useAuth0();
  const getCameras = async () => {
    try {
      await getAccessTokenSilently();
      const token = await getIdTokenClaims();
      dispatch({ type: 'SET_TOKEN', payload: token!.__raw });
      const { data } = await axios.get(API_URL, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token!.__raw}`,
        },
      });
      dispatch({
        type: 'SET_CAMERAS',
        payload: data.sort((a: Camera, b: Camera) =>
          a.createdAt!.localeCompare(b.createdAt!)
        ),
      });
    } catch (e) {
      dispatch({ type: 'SET_ERROR', payload: 'Something went wrong.' });
      console.error(e);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      getCameras();
    }
  }, [isAuthenticated]);

  return (
    <CamerasContext.Provider value={{ state, dispatch }}>
      {children}
    </CamerasContext.Provider>
  );
};

export default CamerasProvider;
