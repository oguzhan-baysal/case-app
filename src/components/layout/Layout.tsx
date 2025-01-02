import { Outlet } from 'react-router-dom'
import Header from './Header'
import Sidebar from './Sidebar'
import Cart from './Cart'

const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Sol Sidebar */}
          <div className="w-64 flex-shrink-0 hidden md:block">
            <Sidebar />
          </div>
          
          {/* Ana İçerik */}
          <div className="flex-1">
            <Outlet />
          </div>
          
          {/* Sağ Sepet */}
          <div className="w-80 flex-shrink-0 hidden lg:block">
            <Cart />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Layout 