import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { type FC, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { RouterProvider } from 'react-router-dom';
import {
  fetchGuestInfo,
  fetchHostInfo,
  setAuthInfo,
} from 'stores/slice/authSlice';
import {
  fetchDamageProtection,
  fetchPropertyStatus,
  fetchPropertyType,
} from 'stores/slice/propertiesSlice';
import { getLoginData } from 'utilities/auth.storage';
import SuspenseLoading from './components/SuspenseLoading';
import router from './router';

const App: FC = () => {
  const dispatch = useAppDispatch();
  const status = useAppSelector((state) => state.auth.status);
  const userId = useAppSelector((state) => state.auth.userId);
  const mode = useAppSelector((state) => state.auth.mode);

  // biome-ignore lint/correctness/useExhaustiveDependencies: run this effect only once
  useEffect(() => {
    const retrieveLocalUserInfo = async () => {
      const userInfo = getLoginData();
      if (userInfo) {
        dispatch(
          setAuthInfo({
            userId: userInfo.id,
            token: userInfo.token,
            mode: userInfo.mode as 'Host' | 'Guest',
          }),
        );
      }
    };
    retrieveLocalUserInfo();
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: run this effect only once
  useEffect(() => {
    if (userId) {
      dispatch(fetchPropertyStatus());
      dispatch(fetchDamageProtection());
      dispatch(fetchPropertyType());
    }
  }, [userId]);

  useEffect(() => {
    if (status === 'idle' && userId) {
      if (mode === 'Host') {
        dispatch(fetchHostInfo(userId));
      } else if (mode === 'Guest') {
        dispatch(fetchGuestInfo(userId));
      }
    }
  }, [userId, mode, status, dispatch]);

  if (status === 'loading' || (userId && status === 'idle')) {
    return <SuspenseLoading />;
  }

  return (
    <>
      <RouterProvider router={router} />
      <Toaster position="top-right" />
    </>
  );
};

export default App;
