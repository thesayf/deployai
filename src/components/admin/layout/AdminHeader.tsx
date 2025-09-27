import React from 'react';
import { Menu, Bell, UserCircle } from 'lucide-react';

interface AdminHeaderProps {
  title?: string;
  tenant: any;
  onMenuClick: () => void;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ title, tenant, onMenuClick }) => {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Mobile menu button */}
          <button
            onClick={onMenuClick}
            className="lg:hidden rounded-md border border-gray-200 bg-white p-2 hover:bg-gray-50 transition-colors"
          >
            <Menu className="h-5 w-5" />
          </button>

          {/* Page title */}
          <div className="flex items-center flex-1">
            <h1 className="text-xl font-semibold text-gray-900">
              {title || 'Dashboard'}
            </h1>
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-3">
            {/* Notifications */}
            <button className="relative flex items-center justify-center h-10 w-10 rounded-md border border-gray-200 bg-white hover:bg-gray-50 transition-colors">
              <Bell className="h-5 w-5 text-gray-600" />
              {/* Notification badge */}
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center bg-red-500 text-xs font-medium text-white rounded-full">
                3
              </span>
            </button>

            {/* User menu */}
            <div className="flex items-center h-10 gap-2 border border-gray-200 bg-gray-50 px-3 rounded-lg">
              <UserCircle className="h-6 w-6 text-gray-600 flex-shrink-0" />
              <div className="hidden sm:flex sm:flex-col sm:justify-center">
                <p className="text-sm font-medium text-gray-900 leading-tight">
                  {tenant?.admin_name || 'Admin User'}
                </p>
                <p className="text-xs text-gray-500 leading-tight">
                  {tenant?.admin_email || tenant?.subdomain + '@deployai.studio'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;