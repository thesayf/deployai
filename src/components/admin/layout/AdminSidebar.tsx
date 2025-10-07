import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  Home,
  FileText,
  BarChart3,
  Settings,
  X,
  LogOut
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  tenant: any;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ isOpen, onClose, tenant }) => {
  const router = useRouter();
  const { signOut } = useAuth();
  const subdomain = tenant?.subdomain || '';

  const navigation = [
    {
      name: 'Dashboard',
      href: `/${subdomain}/admin`,
      icon: Home,
      current: router.pathname === '/[tenant]/admin'
    },
    {
      name: 'Assessments',
      href: `/${subdomain}/admin/assessments`,
      icon: FileText,
      current: router.pathname === '/[tenant]/admin/assessments'
    },
    {
      name: 'Analytics',
      href: `/${subdomain}/admin/analytics`,
      icon: BarChart3,
      current: router.pathname === '/[tenant]/admin/analytics'
    },
    {
      name: 'Settings',
      href: `/${subdomain}/admin/settings/billing`,
      icon: Settings,
      current: router.pathname.startsWith('/[tenant]/admin/settings')
    },
  ];

  return (
    <>
      {/* Mobile sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 transform bg-white transition-transform lg:hidden ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-full flex-col border-r border-gray-200">
          {/* Sidebar header */}
          <div className="flex items-center justify-between border-b border-gray-200 p-4">
            <div className="flex items-center">
              <span className="text-xl font-semibold">
                {tenant?.company_name || 'Admin'}
              </span>
            </div>
            <button
              onClick={onClose}
              className="rounded-md border border-gray-200 bg-white p-2 hover:bg-gray-50 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 px-4 py-4">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 border border-transparent px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    item.current
                      ? 'bg-blue-50 text-blue-700 border-blue-200'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Sidebar footer */}
          <div className="border-t border-gray-200 p-4 space-y-3">
            <div className="rounded-md border border-gray-200 bg-gray-50 p-3">
              <p className="text-xs font-medium text-gray-500">Subscription</p>
              <p className="text-sm font-semibold text-gray-900">
                {tenant?.subscription_tier || 'Starter'}
              </p>
              <p className="text-xs text-gray-600">
                {tenant?.assessments_used || 0} of {tenant?.assessments_limit || '∞'} used
              </p>
            </div>
            <button
              onClick={signOut}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex h-full flex-col border-r border-gray-200 bg-white">
          {/* Sidebar header */}
          <div className="flex items-center border-b border-gray-200 p-4">
            <span className="text-2xl font-black uppercase">
              {tenant?.company_name || 'Admin'}
            </span>
          </div>

          {/* Navigation */}
          <nav className="mt-5 flex-1 space-y-1 px-4">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 border border-transparent px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    item.current
                      ? 'bg-blue-50 text-blue-700 border-blue-200'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Sidebar footer */}
          <div className="border-t border-gray-200 p-4 space-y-3">
            <div className="rounded-md border border-gray-200 bg-gray-50 p-3">
              <p className="text-xs font-medium text-gray-500">Subscription</p>
              <p className="text-sm font-semibold text-gray-900">
                {tenant?.subscription_tier || 'Starter'}
              </p>
              <p className="text-xs text-gray-600">
                {tenant?.assessments_used || 0} of {tenant?.assessments_limit || '∞'} used
              </p>
            </div>
            <button
              onClick={signOut}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminSidebar;