import { Outlet } from 'react-router-dom';

export default function Root() {
  return (
    <div id="route-root">
      <Outlet />
    </div>
  );
}
