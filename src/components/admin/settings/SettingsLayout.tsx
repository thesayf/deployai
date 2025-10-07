import { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { SettingsNav } from './SettingsNav';

interface SettingsLayoutProps {
  currentTab: string;
  children: ReactNode;
  showActions?: boolean;
  onCancel?: () => void;
  onSave?: () => void;
  isSaving?: boolean;
}

export function SettingsLayout({
  currentTab,
  children,
  showActions = false,
  onCancel,
  onSave,
  isSaving = false,
}: SettingsLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Actions */}
      {showActions && (
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-end py-4">
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  onClick={onCancel}
                  disabled={isSaving}
                >
                  Cancel
                </Button>
                <Button
                  onClick={onSave}
                  disabled={isSaving}
                >
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Tabs */}
      <SettingsNav currentTab={currentTab} />

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </div>
    </div>
  );
}
