import { useAppSelector } from './redux';

export const useAuth = () => {
  const auth = useAppSelector((state) => state.auth);
  const authenticated = auth.token && auth.token?.length > 0;
  const userId = auth.userId;
  const userMode = auth.mode;
  return {
    authenticated,
    userId,
    mode: userMode,
  };
};
