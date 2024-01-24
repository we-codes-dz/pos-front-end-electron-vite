import { ReactNode, useEffect, useState } from 'react'
import Login from '../pages/login'
import { useNavigate, useRoutes } from 'react-router-dom'
import TopBar from '@renderer/components/TopBar'
import SellerWorkSpace from '@renderer/pages/SellerWorkspace'
import { useBoundStore } from '@renderer/stores/store'
import RequireAuth, { decodeToken } from '@renderer/layouts/RequireAuth'
import ErrorPage from '@renderer/pages/ErrorPage/ErrorPage'
import CategoriesManagement from '@renderer/pages/category-management'
import ProductsManagement from '@renderer/pages/products-management'
import SalesManagement from '@renderer/pages/sales-management'
import OrdersManagement from '@renderer/pages/orders-management'
import TablesManagement from '@renderer/pages/table-management'
import ServersManagement from '@renderer/pages/servers-management'

export type TPath =
  | '/'
  | '*'
  | '/work-space'
  | '/work-space/categories-management'
  | '/work-space/products-management'
  | '/work-space/sales-management'
  | '/work-space/orders-management'
  | '/work-space/tables-management'
  | '/work-space/servers-management'

export type TRoute = {
  path: TPath
  element: ReactNode
  children?: TRoute[]
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function Router() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(true);
  const { accessToken } = useBoundStore((state) => state);
  const isAccessTokenValid = () => {
    if (!accessToken) {
      return false;
    }
    const decodedToken = accessToken ? decodeToken(accessToken) : null;

    if (!decodedToken) {
      return false;
    }
    const currentTimestamp = Math.floor(Date.now() / 1000);

    return decodedToken.exp > currentTimestamp ? true : false;
  };

  useEffect(() => {
    // Check if the user is not logged in (no accessToken) and is on the "/" route

    const isTokenValid = isAccessTokenValid();
    setLoading(false);
    if (!isTokenValid && window.location.pathname === "/") {
      // Redirect the user to the login page
      navigate("/");
    } else if (isTokenValid && window.location.pathname === "/") {
      // Redirect the user to the work-space page
      navigate("/work-space");
    }
  }, [accessToken]);
  const routes: TRoute[] = [
    {
      path: '/',
      element: isLoading ? (
        <span className="loading loading-spinner loading-lg"></span>
      ) : (
        <Login />
      )
    },
    {
      path: '/work-space',
      element: <RequireAuth><TopBar /></RequireAuth>,
      children: [
        {
          path: '/work-space',
          element: <SellerWorkSpace />
        },
        {
          path: '/work-space/categories-management',
          element: <CategoriesManagement />
        },
        {
          path: '/work-space/products-management',
          element: <ProductsManagement />
        },
        {
          path: '/work-space/sales-management',
          element: <SalesManagement />
        },
        {
          path: '/work-space/orders-management',
          element: <OrdersManagement />
        },
        {
          path: '/work-space/tables-management',
          element: <TablesManagement />
        },
        {
          path: '/work-space/servers-management',
          element: <ServersManagement />
        }
      ]
    },
    {
      path: "*",
      element: <ErrorPage />,
    },
  ]

  return useRoutes(routes)
}

export default Router
