import { Outlet } from 'react-router-dom'
import Header from './Header'
import Sidebar from './Sidebar'
import Cart from './Cart'

const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="flex">
        <Sidebar className="w-64 hidden md:block" />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
        <Cart className="w-80 hidden lg:block" />
      </div>
    </div>
  )
}

export default Layout 