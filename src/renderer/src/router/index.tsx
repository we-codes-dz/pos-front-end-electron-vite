import { ReactNode } from 'react'
import Login from '../pages/login'
import { useRoutes } from 'react-router-dom'
import TopBar from '@renderer/components/TopBar'
import SellerWorkSpace from '@renderer/pages/SellerWorkpace'

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
  const routes: TRoute[] = [
    {
      path: '/',
      element: <Login />
    },
    {
      path: '/work-space',
      element: <TopBar />,
      children: [
        {
          path: '/work-space',
          element: <SellerWorkSpace />
        }
      ]
    }
  ]

  return useRoutes(routes)
}

export default Router
