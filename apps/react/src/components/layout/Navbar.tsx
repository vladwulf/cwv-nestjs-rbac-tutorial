import { LogOut, User, LayoutDashboard } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { ReactComponent as LogoSvg } from '~/assets/svg/logo.svg'
import { Avatar, AvatarFallback, AvatarImage } from '../ui'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem
} from '../ui/Menu'

import mask from '~/assets/image/mask.png'

export const Navbar = () => {
  const navigate = useNavigate()
  return (
    <nav className="h-20 bg-white w-full">
      <div className="container px-4 h-full max-w-screen-xl mx-auto flex items-center">
        {/* LOGO */}
        <Link to="/" className="flex items-center h-full">
          <LogoSvg className="h-10 w-10 mr-2" />
          <span className="text-2xl font-medium">E Corp</span>
        </Link>

        {/* MENU */}
        <div className="ml-auto">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage src={mask} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate('/')}>
                <LayoutDashboard className="mr-2 h-4 w-4" />
                <span>Dashboard</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/profile')}>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/logout')}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  )
}
