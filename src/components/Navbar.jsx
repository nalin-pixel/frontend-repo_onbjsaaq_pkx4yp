import { Link, NavLink } from 'react-router-dom'
import { Search, PlusCircle, Home } from 'lucide-react'

export default function Navbar({ onSearch }) {
  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-blue-600 text-white grid place-items-center font-bold">A</div>
          <div className="leading-tight">
            <p className="font-bold text-gray-900">Adventist Services</p>
            <p className="text-xs text-gray-500">Community help & outreach</p>
          </div>
        </Link>

        <div className="flex-1" />

        <nav className="hidden md:flex items-center gap-1">
          <NavLink to="/" className={({isActive})=>`px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2 ${isActive? 'bg-gray-100 text-gray-900':'text-gray-600 hover:bg-gray-50'}`}>
            <Home size={16}/> Home
          </NavLink>
          <NavLink to="/add" className={({isActive})=>`px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2 ${isActive? 'bg-gray-100 text-gray-900':'text-gray-600 hover:bg-gray-50'}`}>
            <PlusCircle size={16}/> Add Service
          </NavLink>
          <a href="/test" className="px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-50">System</a>
        </nav>
      </div>
    </header>
  )
}
