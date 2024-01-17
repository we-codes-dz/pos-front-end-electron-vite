import { Outlet } from 'react-router-dom'
import restaurantIcon from '../../assets/images/restaurant-icon.png'
import TopBarHeader from './header/header'
import Logo from './logo'
const TopBar = () => {
  return (
    <div className='flex flex-col items-center py-2 px-6 bg-slate-200 w-full h-screen'>
      <div className='flex justify-between w-full items-center px-6 py-2'>
        <Logo icon={restaurantIcon} />
        <TopBarHeader />
      </div>
      <Outlet />
    </div>
  )
}

export default TopBar