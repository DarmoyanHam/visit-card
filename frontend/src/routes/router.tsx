import { createBrowserRouter } from "react-router-dom";
import { 
    HOME_PATH, 
    CARD_PATH, 
    LOGIN_PATH, 
    ABOUT_PATH, 
    ORDER_PATH,
    PARTNERS_PATH, 
    ADMIN_HOME_PATH,
    ADMIN_CONTACTS_PATH, 
    ADMIN_SPONSORS_PATH, 
    ADMIN_APPOINTMENTS_PATH, 
    ADMIN_STATISTICS_PATH,
    ADMIN_PATH,
} from "../consts/paths";
import { PublicLayout } from "../layouts/PublicLayout";
import VisitCard from "../components/VisitCard";
import { LoginLayout } from "../layouts/LoginLayout";
import { LoginPage } from "../pages/LoginPage";
import { AboutCardsPage } from "../pages/AboutCardsPage";
import { OrderPage } from "../pages/OrderPage";
import { PartnersPage } from "../pages/PartnersPage";
import { ProtectedRoute } from "../components/ProtectedRoute";
import { AdminLayout } from "../layouts/AdminLayout";
import { HomePage } from "../pages/HomePage";
import { ContactsPage } from "../pages/ContactsPage";
import { SponsorsPage } from "../pages/SponsorsPage";
import { AppointmentPage } from "../pages/AppointmentPage";
import { StatisticsPage } from "../pages/StatisticsPage";


{/* <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute> */}

export const router = createBrowserRouter([
  {
    path: CARD_PATH,
    element: <PublicLayout />,
    children: [
      {
        index: true,
        element: <VisitCard />
      },
    ],
  },
  {
    path: HOME_PATH,
    element: <LoginLayout />,
    children: [
      {
        path: LOGIN_PATH,
        element: <LoginPage />
      },
      {
        path: ABOUT_PATH,
        element: <AboutCardsPage />
      },
      {
        path: ORDER_PATH,
        element: <OrderPage />
      },
      {
        path: PARTNERS_PATH,
        element: <PartnersPage />
      },
    ],
  },
  {
    path: ADMIN_PATH,
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute> 
    ),
    children: [
      {
        path: ADMIN_HOME_PATH,
        index: true,
        element: <HomePage />
      },
      {
        path: ADMIN_CONTACTS_PATH,
        element: <ContactsPage />
      },
      {
        path: ADMIN_SPONSORS_PATH,
        element: <SponsorsPage />
      },
      {
        path: ADMIN_APPOINTMENTS_PATH,
        element: <AppointmentPage />
      },
      {
        path: ADMIN_STATISTICS_PATH,
        element: <StatisticsPage />
      },
    ],
  },
]);
