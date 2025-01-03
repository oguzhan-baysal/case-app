import { Outlet } from 'react-router-dom'
import Header from './Header'
import MobileDrawer from './MobileDrawer'

const DetailLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex-1 min-w-0">
          <Outlet />
        </div>
      </div>
      <MobileDrawer />
    </div>
  )
}

export default DetailLayout 