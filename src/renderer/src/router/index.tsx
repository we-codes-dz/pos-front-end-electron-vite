import { ReactNode, useEffect, useState } from 'react'
import Login from '../pages/login'
import { useNavigate, useRoutes } from 'react-router-dom'
import TopBar from '@renderer/components/TopBar'
import SellerWorkSpace from '@renderer/pages/SellerWorkspace'
import CategoriesManagement from '@renderer/pages/category-management'
import { useBoundStore } from '@renderer/stores/store'
import RequireAuth, { decodeToken } from '@renderer/layouts/RequireAuth'
import ErrorPage from '@renderer/pages/ErrorPage/ErrorPage'

export type TPath =
  | '/'
  | '*'
  | '/work-space'
  | '/work-space/categories-management'
  | '/work-space/products-management'
  | '/work-space/table-management'
  | '/work-space/payment-management'

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
