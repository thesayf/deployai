import React from "react";
import { EmptyScreenShell } from "./EmptyScreenShell";

export const GlobalShipRouteOptimizerShell = () => {
  return (
    <EmptyScreenShell
      url="routes.globalship.com"
      headerBgColor="bg-blue-600"
      appName="Route Optimizer"
      appSubtitle="AI-Powered Route Planning"
      statusText="Optimizing"
      statusColor="bg-green-600"
      platformType="Route Optimization Platform"
      comingSoonIcon="🗺️"
      comingSoonText="Route Optimization Engine"
    />
  );
};