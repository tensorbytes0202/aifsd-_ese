import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  UserPlus,
  BarChart3,
  Brain,
  UserCircle,
} from 'lucide-react';

const Sidebar = ({ isOpen }) => {
  const navItems = [
    { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/employees', icon: Users, label: 'Employees' },
    { to: '/employees/new', icon: UserPlus, label: 'Add Employee' },
    { to: '/analytics', icon: BarChart3, label: 'Analytics' },
    { to: '/ai-recommendations', icon: Brain, label: 'AI Insights' },
    { to: '/profile', icon: UserCircle, label: 'Profile' },
  ];

  return (
    <aside
      className={`fixed left-0 top-[4.5rem] h-[calc(100vh-4.5rem)] bg-white dark:bg-[#1a1a1a] shadow-lg transition-all duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } w-64 z-30 overflow-y-auto`}
    >
      <nav className="p-4 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) =>
              `flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-primary-600 text-white shadow-md'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#2a2a2a]'
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
