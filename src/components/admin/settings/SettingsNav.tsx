import { useRouter } from 'next/router';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface SettingsNavProps {
  currentTab: string;
}

const SETTINGS_TABS = [
  { id: 'billing', label: 'Billing & Subscription', href: '/admin/billing' },
];

export function SettingsNav({ currentTab }: SettingsNavProps) {
  const router = useRouter();
  const { tenant } = router.query;

  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-8 overflow-x-auto">
          {SETTINGS_TABS.map((tab) => {
            const isActive = currentTab === tab.id;
            const href = `/${tenant}${tab.href}`;

            return (
              <Link
                key={tab.id}
                href={href}
                className={cn(
                  'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors',
                  isActive
                    ? 'border-gray-900 text-gray-900'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                )}
              >
                {tab.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
