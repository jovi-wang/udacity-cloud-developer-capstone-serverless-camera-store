import { useState } from 'react';
import { useCameras } from '../hooks/useCameras';
import { Button } from './Button';
import { CamerasItem } from './CamerasItem';
import { Modal } from './Modal';
import { Spinner } from './Spinner';
import { Table } from './Table';
import { useAuth0 } from '@auth0/auth0-react';

export const CamerasList = () => {
  const {
    isLoading: authLoading,
    isAuthenticated,
    error: authError,
    user,
    loginWithRedirect,
    logout,
  } = useAuth0();

  const { cameras, loading: apiLoading, error: apiError } = useCameras();
  const [showModal, setShowModal] = useState(false);

  if (authLoading || apiLoading) {
    return <Spinner />;
  }
  if (apiError || authError) {
    return (
      <div className='flex items-center justify-center h-89v'>
        <p className='font-bold text-red-500 text-xl'>
          Opps, something went wrong 😢
        </p>
      </div>
    );
  }

  return (
    <>
      <div className='flex flex-col items-end mt-5'>
        <div className='flex flex-row'>
          {isAuthenticated && (
            <Button label='New camera' click={() => setShowModal(!showModal)} />
          )}
          {!isAuthenticated && (
            <Button label='Login' click={loginWithRedirect} />
          )}
          {isAuthenticated && (
            <Button solid label={`Logout ${user?.name}`} click={logout} />
          )}
        </div>
      </div>
      {isAuthenticated && (
        <Table>
          {cameras.map((item) => (
            <CamerasItem key={item.cameraId} camera={item} />
          ))}

          {!cameras.length && (
            <tr className='bg-white'>
              <td colSpan={7} className='py-4 px-6 text-sm text-center'>
                <p className='font-semibold'>There are no cameras. 😢</p>
              </td>
            </tr>
          )}
        </Table>
      )}
      {!isAuthenticated && (
        <div className='flex items-center justify-center h-89v'>
          <p className='font-bold text-red-500 text-xl'>
            Please login first 🔒
          </p>
        </div>
      )}
      {showModal && <Modal onClose={() => setShowModal(!showModal)} />}
    </>
  );
};
