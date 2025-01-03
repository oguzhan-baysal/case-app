import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header'
import Sidebar from './Sidebar'
import MobileDrawer from './MobileDrawer'

const Layout = () => {
  const location = useLocation()
  const isProductDetail = location.pathname.includes('/product/')

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        {!isProductDetail && <Sidebar />}
        <main className={`flex-1 ${!isProductDetail ? 'md:ml-4' : ''}`}>
          <Outlet />
        </main>
      </div>
      {!isProductDetail && <MobileDrawer />}
    </div>
  )
}

export default Layout 