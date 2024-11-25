import { Suspense, lazy } from 'react';
import { Navigate, createBrowserRouter } from 'react-router-dom';
import SuspenseLoading from 'views/components/SuspenseLoading';
import DisputeSuccess from 'views/features/bookings/incidentReport/Guest/DisputeSuccess';
import PaymentProcess from 'views/features/bookings/incidentReport/Guest/PaymentProcess';
import PaymentSuccess from 'views/features/bookings/incidentReport/Guest/PaymentSuccess';
import ViewDisputeSummary from 'views/features/bookings/incidentReport/Guest/ViewDisputeSummary';
import ViewIncidentReport from 'views/features/bookings/incidentReport/Guest/ViewIncidentReport';
import DamageWaiverReport from 'views/features/bookings/incidentReport/Host/DamageWaiverReport';
import DamageWaiverTable from 'views/features/bookings/incidentReport/Host/DamageWaiverTable';
import FinalReport from 'views/features/bookings/incidentReport/Host/FinalReport';
import IncidentReportClaim from 'views/features/bookings/incidentReport/Host/IncidentReportClaim';
import RatingReport from 'views/features/bookings/incidentReport/Host/RatingReport';
import SecurityDepositReport from 'views/features/bookings/incidentReport/Host/SecurityDepositReport';
import GuestOtpForm from 'views/features/setPassword/EmailOtpForm';
import GuestPasswordForm from 'views/features/setPassword/GuestPasswordForm';
import AgreeTermsAndConditions from 'views/pages/AgreeTermsAndConditions';
import BookingVerification from 'views/pages/BookingVerfication';
import EmailVerification from 'views/pages/EmailVerification';
import GuestDashboard from 'views/pages/GuestDashboard';
import GuestProfile from 'views/pages/GuestProfile';
import GuestViewPreviousDetails from 'views/pages/GuestViewPreviousDetails';
import GuestViewUpcomingDetails from 'views/pages/GuestViewUpcomingDetails';
import PaymentHistory from 'views/pages/PaymentHistory';
import ProfileComplete from 'views/pages/ProfileComplete';
import ResetGuestPassword from 'views/pages/ResetGuestPassword';
import SignUpTermsAndConditions from 'views/pages/SignupTermsAndConditions';
import Stays from 'views/pages/Stays';
import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';
import RouteByMode from './RouteByMode';

// Lazy load the components
const PageNotFound = lazy(() => import('views/pages/PageNotFound'));
const ErrorPage = lazy(() => import('views/pages/ErrorPage'));
const Root = lazy(() => import('views/pages/Root'));
const HomePage = lazy(() => import('views/pages/HomePageRoot'));
const Profile = lazy(() => import('views/pages/Profile'));
const Dashboard = lazy(() => import('views/pages/HostDashboard/Dashboard'));
const Bookings = lazy(() => import('views/pages/Bookings'));
const BookingIncidentReport = lazy(
  () => import('views/pages/BookingIncidentReport'),
);
const DocumentsLinks = lazy(() => import('views/pages/DocumentsLinks'));
const PlatformConnections = lazy(
  () => import('views/pages/PlatformConnections'),
);
const Properties = lazy(() => import('views/pages/Properties'));
const Login = lazy(() => import('views/pages/Login'));
const SignUp = lazy(() => import('views/pages/SignUp'));
const ForgotPassword = lazy(() => import('views/pages/ForgotPassword'));
const ResetPassword = lazy(() => import('views/pages/ResetPassword'));
const GuestLogin = lazy(() => import('views/pages/GuestSetPassword'));

// Fallback component for lazy loading
const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={<SuspenseLoading />}>
        <Root />
      </Suspense>
    ),
    errorElement: (
      <Suspense fallback={<SuspenseLoading />}>
        <ErrorPage />
      </Suspense>
    ),
    children: [
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: '/',
            element: <HomePage />,
            children: [
              {
                element: (
                  <Suspense fallback={<SuspenseLoading />}>
                    <RouteByMode allowedMode="Host" />
                  </Suspense>
                ),
                children: [
                  {
                    path: '*',
                    element: (
                      <Suspense fallback={<SuspenseLoading />}>
                        <PageNotFound />
                      </Suspense>
                    ),
                  },
                  {
                    path: '/',
                    element: <Navigate to="/dashboard" />,
                  },
                  {
                    path: '/dashboard',
                    element: <Dashboard />,
                  },
                  {
                    path: '/bookings',
                    element: <Bookings />,
                  },
                  {
                    path: '/bookings/incident-report/:id',
                    element: <BookingIncidentReport />,
                  },
                  {
                    path: '/documents-links',
                    element: <DocumentsLinks />,
                  },
                  {
                    path: '/platforms',
                    element: <PlatformConnections />,
                  },
                  {
                    path: '/profile',
                    element: <Profile />,
                  },
                  {
                    path: '/properties',
                    element: <Properties />,
                  },
                  {
                    path: '/final-report',
                    element: <FinalReport />,
                  },
                  {
                    path: '/incident-report-claim/:id',
                    element: <IncidentReportClaim id={''} />,
                  },
                  {
                    path: ' /bookings/incident-report/addclaim',
                    element: <DamageWaiverTable />,
                  },

                  {
                    path: '/security-deposit-report',
                    element: <SecurityDepositReport />,
                  },
                  {
                    path: '/damage-waiver-report',
                    element: <DamageWaiverReport />,
                  },
                  {
                    path: '/rating-report',
                    element: <RatingReport />,
                  },
                  {
                    path: '/payment-process',
                    element: <PaymentProcess />,
                  },
                  {
                    path: '/payment-success',
                    element: <PaymentSuccess />,
                  },
                  {
                    path: '/dispute-success',
                    element: <DisputeSuccess />,
                  },
                  {
                    path: '/view-incident-report',
                    element: <ViewIncidentReport />,
                  },
                  {
                    path: '/view-dispute-summary',
                    element: <ViewDisputeSummary />,
                  },
                ],
              },
              {
                element: (
                  <Suspense fallback={<SuspenseLoading />}>
                    <RouteByMode allowedMode="Guest" />
                  </Suspense>
                ),
                children: [
                  {
                    path: '*',
                    element: (
                      <Suspense fallback={<SuspenseLoading />}>
                        <PageNotFound />
                      </Suspense>
                    ),
                  },
                  {
                    path: '/',
                    element: <Navigate to="/guest-dashboard" />,
                  },
                  {
                    path: '/guest-dashboard',
                    element: <GuestDashboard />,
                  },
                  {
                    path: '/stays',
                    element: <Stays />,
                  },
                  {
                    path: '/guest-profile',
                    element: <GuestProfile />,
                  },
                  {
                    path: '/GuestViewUpcomingDetails',
                    element: <GuestViewUpcomingDetails />,
                  },
                  {
                    path: '/GuestViewPreviousDetails',
                    element: <GuestViewPreviousDetails />,
                  },
                ],
              },
            ],
          },
          {
            path: '/complete-profile',
            element: <ProfileComplete />,
          },
          {
            path: '/terms-and-conditions',
            element: <AgreeTermsAndConditions />,
          },
        ],
      },
      {
        element: <PublicRoute />,
        children: [
          {
            path: '*',
            element: (
              <Suspense fallback={<SuspenseLoading />}>
                <ErrorPage />
              </Suspense>
            ),
          },
          {
            path: '/login',
            element: <Login />,
          },
          {
            path: '/sign-up',
            element: <SignUp />,
          },
          {
            path: '/forgot-password',
            element: <ForgotPassword />,
          },
          {
            path: '/reset-password',
            element: <ResetPassword />,
          },
          {
            path: '/guest-reset-password',
            element: <ResetGuestPassword />,
          },
          {
            path: '/guest-set-password',
            element: <GuestLogin />,
          },
          {
            path: '/verifymail',
            element: <EmailVerification />,
          },
          {
            path: '/sign-up-terms-and-conditions',
            element: <SignUpTermsAndConditions />,
          },
          {
            path: '/payment-history',
            element: <PaymentHistory />,
          },
          {
            path: '/guest/update-guest?',
            element: <BookingVerification />,
          },
          {
            path: '/email-otp-form/:identificationNumber',
            element: <GuestOtpForm />,
          },
          {
            path: '/guest-password-form',
            element: <GuestPasswordForm />,
          },
        ],
      },
      {
        path: '*',
        element: <p>404 Error - page not found...</p>,
      },
    ],
  },
]);
export default router;
