import { useAuth } from 'hooks/useAuth';
import { Suspense, lazy } from 'react';
import SuspenseLoading from 'views/components/SuspenseLoading';

import type { FC } from 'react';
import { Outlet } from 'react-router-dom';
const PageNotFound = lazy(() => import('views/pages/PageNotFound'));

const RouteByMode: FC<{ allowedMode: 'Guest' | 'Host' }> = ({
  allowedMode,
}) => {
  const { authenticated, mode } = useAuth();
  // If the mode doesn't match the allowed mode, show the error page
  if (!authenticated || mode !== allowedMode) {
    return (
      <Suspense fallback={<SuspenseLoading />}>
        <PageNotFound />
      </Suspense>
    );
  }

  return <Outlet />;
};

export default RouteByMode;
