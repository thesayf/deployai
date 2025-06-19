import React from "react";

interface EmptyScreenShellProps {
  url: string;
  headerBgColor: string;
  logoSrc?: string;
  appName: string;
  appSubtitle?: string;
  statusText: string;
  statusColor: string;
  platformType: string;
  comingSoonIcon?: string;
  comingSoonText?: string;
}

export const EmptyScreenShell: React.FC<EmptyScreenShellProps> = ({
  url,
  headerBgColor,
  logoSrc,
  appName,
  appSubtitle,
  statusText,
  statusColor,
  platformType,
  comingSoonIcon = "🔧",
  comingSoonText = "Coming Soon"
}) => {
  return (
    <div className="h-[600px] w-full rounded-2xl border-2 border-zinc-900 shadow-[4px_4px_0px_#18181b] overflow-hidden bg-gradient-to-br from-zinc-900 via-zinc-800 to-black">
      {/* Browser URL Bar */}
      <div className="bg-zinc-100 px-3 py-3 flex items-center gap-2 border-b border-zinc-200">
        <div className="flex gap-1">
          <div className="w-2 h-2 rounded-full bg-red-500"></div>
          <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
          <div className="w-2 h-2 rounded-full bg-green-500"></div>
        </div>
        <div className="flex-1 flex justify-center">
          <div className="bg-white rounded px-3 py-1 text-xs text-zinc-600 border border-zinc-300">
            {url}
          </div>
        </div>
      </div>
      
      {/* App Header */}
      <div className={`${headerBgColor} text-white p-4 flex items-center justify-between`}>
        <div className="flex items-center gap-3">
          {logoSrc ? (
            <img src={logoSrc} alt="Logo" className="h-8 w-auto" />
          ) : (
            <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
              <span className={`${headerBgColor.replace('bg-', 'text-')} font-bold text-sm`}>
                {appName.substring(0, 2).toUpperCase()}
              </span>
            </div>
          )}
          <div>
            <div className="font-semibold text-lg">{appName}</div>
            {appSubtitle && (
              <div className="text-xs opacity-75">{appSubtitle}</div>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-xs ${statusColor} px-2 py-1 rounded-full`}>{statusText}</span>
        </div>
      </div>
      
      {/* Main Content - Coming Soon Placeholder */}
      <div className="h-[480px] overflow-hidden bg-zinc-50 pointer-events-none flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">{comingSoonIcon}</div>
          <div className="text-xl font-semibold text-zinc-700 mb-2">{comingSoonText}</div>
          <div className="text-sm text-zinc-500">Screen implementation in progress</div>
        </div>
      </div>

      {/* App Footer */}
      <div className="border-t border-zinc-200 p-4 bg-white text-center">
        <div className="text-xs text-zinc-500">
          Powered by deployAI • {platformType}
        </div>
      </div>
    </div>
  );
};