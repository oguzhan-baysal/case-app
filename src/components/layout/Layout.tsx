import { Outlet } from 'react-router-dom'
import Header from './Header'
import Sidebar from './Sidebar'
import MobileDrawer from './MobileDrawer'

const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 max-w-[1920px]">
        <div className="flex gap-8">
          {/* Sol Sidebar */}
          <div className="w-56 flex-shrink-0 hidden md:block">
            <Sidebar />
          </div>
          
          {/* Ana İçerik */}
          <div className="flex-1 min-w-0">
            <Outlet />
          </div>
        </div>
      </div>
      
      <MobileDrawer />
    </div>
  )
}

export default Layout 