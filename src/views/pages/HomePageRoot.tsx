import { BellOutlined } from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import Logo from 'assets/logo/main_logo.svg';
import { useAppSelector } from 'hooks/redux';
import { Suspense, useEffect, useMemo, useState } from 'react';
import type { IconType } from 'react-icons';
import {
  BsBuildings,
  BsBuildingsFill,
  BsCalendar,
  BsCalendarFill,
  BsFileBarGraph,
  BsFileBarGraphFill,
  BsFileEarmark,
  BsFileEarmarkFill,
  BsGrid,
  BsLink45Deg,
  BsPerson,
  BsPersonFill,
} from 'react-icons/bs';
import { IoIosLogOut } from 'react-icons/io';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { ProfileStatus } from 'types/host';
import { logout } from 'utilities/logout';
import SuspenseLoading from 'views/components/SuspenseLoading';
import BedIcon from 'views/components/icons/BedIcon';
import arrow from '../../assets/profile/arrow.svg';

type MenusData = {
  path: string;
  name: string;
  Icon: IconType;
  IconFilled: IconType;
  key: string;
};

const menuItemsHost: MenusData[] = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    Icon: BsFileBarGraph,
    IconFilled: BsFileBarGraphFill,
    key: '1',
  },
  {
    path: '/bookings',
    name: 'Bookings',
    Icon: BsCalendar,
    IconFilled: BsCalendarFill,
    key: '2',
  },
  {
    path: '/properties',
    name: 'Properties',
    Icon: BsBuildings,
    IconFilled: BsBuildingsFill,
    key: '3',
  },

  {
    path: '/platforms',
    name: 'Platform Connections',
    Icon: BsLink45Deg,
    IconFilled: BsLink45Deg,
    key: '5',
  },
  {
    path: '/documents-links',
    name: 'Add Documents/Links',
    Icon: BsFileEarmark,
    IconFilled: BsFileEarmarkFill,
    key: '4',
  },
  {
    path: '/profile',
    name: 'Profile',
    Icon: BsPerson,
    IconFilled: BsPersonFill,
    key: '6',
  },
];
const menuItemsGuest: MenusData[] = [
  {
    path: '/guest-dashboard',
    name: 'Dashboard',
    Icon: BsGrid,
    IconFilled: BsGrid,
    key: '7',
  },
  {
    path: '/stays',
    name: 'Stays',
    Icon: BedIcon,
    IconFilled: BedIcon,
    key: '8',
  },
  {
    path: '/guest-profile',
    name: 'Profile',
    Icon: BsPerson,
    IconFilled: BsPersonFill,
    key: '9',
  },
];

const bookingMenuItems: MenusData[] = [
  {
    path: '/booking-verification',
    name: 'Booking Verification',
    Icon: BsFileBarGraph,
    IconFilled: BsFileBarGraphFill,
    key: '1',
  },
];

const isActive = (currentRoute: string, route: string) => {
  const [_, active] = route.split('/');
  if (currentRoute === active) return true;
  return false;
};

const HomePage = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const profileStatus = useAppSelector((state) => state.auth.profileStatus);
  const userMode = useAppSelector((state) => state.auth.mode);
  const isPaymentHistoryRoute = location.pathname.includes('payment-history');
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const currentPath = location.pathname;
  const [_, mainRoute] = currentPath.split('/');
  const currentYear = new Date().getFullYear();
  const isBbookingVerificationLayout = mainRoute === 'booking-verification';

  const menuItems = useMemo(() => {
    return userMode === 'Host' ? menuItemsHost : menuItemsGuest;
  }, [userMode]);

  const menuItemsToShow = isBbookingVerificationLayout
    ? bookingMenuItems
    : menuItems;

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (profileStatus === ProfileStatus.INCOMPLETE) {
      navigate('/complete-profile');
    }
  }, [profileStatus]);

  const items = useMemo(
    () =>
      menuItemsToShow.map(({ path, name, Icon, IconFilled, key }) => ({
        key,
        icon: isActive(mainRoute, path) ? (
          <IconFilled className="w-25 h-25" />
        ) : (
          <Icon className="w-25 h-25" />
        ),
        label: <Link to={path}>{name}</Link>,
      })),
    [mainRoute, menuItemsToShow],
  );

  // Since we used Ant Design menu items for the implementation of the active menu, we need to pass the selected keys.
  const selectedKeys = useMemo(
    () =>
      menuItemsToShow
        .filter(({ path }) => isActive(mainRoute, path))
        .map(({ key }) => key),
    [mainRoute, menuItemsToShow],
  );

  const header = menuItemsToShow.find(
    (value) => value.key === selectedKeys[0],
  )?.name;

  return (
    <div id="dashboard-root">
      <Layout className="dashboard-root--layout">
        <Layout.Sider
          breakpoint="lg"
          collapsedWidth={50}
          className={
            isBbookingVerificationLayout
              ? 'hidden'
              : 'dashboard-root--layout-sidebar'
          }
          width={collapsed ? 50 : 230}
          collapsed={collapsed}
          onCollapse={(collapsed) => setCollapsed(collapsed)}
        >
          <div className="demo-logo-vertical">
            <img className="" src={Logo as unknown as string} alt="" />
          </div>
          <div className="flex flex-col justify-between h-[calc(100vh-100px)] overflow-auto">
            <Menu
              selectedKeys={selectedKeys}
              mode="inline"
              className="demo-logo-vertical-menu"
              items={items}
            />
            <Menu
              mode="inline"
              className="demo-logo-vertical-menu"
              items={[
                {
                  label: 'Logout',
                  onClick: logout,
                  key: 'logout',
                  icon: <IoIosLogOut className="w-25 h-25" />,
                },
              ]}
            />
          </div>
        </Layout.Sider>
        <Layout className="content__section">
          <Layout.Header
            className="main_header"
            style={{ padding: 0, background: colorBgContainer }}
          >
            {isBbookingVerificationLayout ? (
              <div className="w-[250px] p-4 br-gray">
                <img
                  className="w51 h48"
                  src={Logo as unknown as string}
                  alt="logo"
                />
              </div>
            ) : null}
            <div className="header">
              <div className="header__left">{header}</div>
              {/* <Button 
                className="toggle-sidebar-btn" 
                onClick={() => setCollapsed(!collapsed)} 
                style={{ marginLeft: 'auto' }}
            >
                {collapsed ? 'Open' : 'Close'} Menu
            </Button> */}
              {!isBbookingVerificationLayout && (
                <div className="header__right">
                  <div className="header__right-notification">
                    <Button className="header__right-notification--btn">
                      <BellOutlined />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </Layout.Header>

          <Layout.Content
            className={
              !isBbookingVerificationLayout
                ? 'main__content'
                : 'booking_content'
            }
          >
            {isPaymentHistoryRoute && (
              <div className="payment-route">
                <p className="route_heading">
                  Profile
                  <img
                    src={arrow as unknown as string}
                    alt="arrow"
                    className="right-arrow mx-2"
                  />
                  Payment History
                </p>
              </div>
            )}
            <div
              className={
                !isBbookingVerificationLayout
                  ? 'main__content-body'
                  : 'booking_content-body'
              }
            >
              <Suspense fallback={<SuspenseLoading />}>
                <Outlet />
              </Suspense>
            </div>
          </Layout.Content>
          <Layout.Footer className="py-4 bg-white">
            <p className="text-center text-[#646464]">
              &copy; {currentYear} Just Be Lekker
            </p>
          </Layout.Footer>
        </Layout>
      </Layout>
    </div>
  );
};

export default HomePage;
