import React from "react";

interface CaseStudyScreenShellProps {
  url: string;
  headerBgColor: string;
  logoSrc: string;
  appName: string;
  statusText: string;
  statusColor: string;
  footerText: string;
  children: React.ReactNode;
  useFlexLayout?: boolean;
}

export const CaseStudyScreenShell = ({
  url,
  headerBgColor,
  logoSrc,
  appName,
  statusText,
  statusColor,
  footerText,
  children,
  useFlexLayout = false
}: CaseStudyScreenShellProps) => {
  return (
    <div className={`w-full ${useFlexLayout ? 'h-full' : ''} bg-white rounded-lg overflow-hidden ${useFlexLayout ? 'flex flex-col' : ''}`}>
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
          <img src={logoSrc} alt="Logo" className="h-8 w-auto" />
          <div>
            <div className="font-semibold text-lg">{appName}</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-xs ${statusColor} px-2 py-1 rounded-full`}>{statusText}</span>
        </div>
      </div>
      
      {/* Content Area */}
      <div className={useFlexLayout ? 'flex-1 overflow-hidden' : ''}>
        {children}
      </div>
      
      {/* Footer */}
      <div className="border-t border-zinc-200 p-4 bg-white text-center">
        <p className="text-xs text-zinc-500">
          Powered by deployAI • {footerText}
        </p>
      </div>
    </div>
  );
};