import React from "react";
import { EmptyScreenShell } from "./EmptyScreenShell";

export const GlobalShipControlDashboard = () => {
  return (
    <EmptyScreenShell
      url="control.globalship.com"
      headerBgColor="bg-blue-600"
      appName="GlobalShip Control Center"
      appSubtitle="Logistics Management Platform"
      statusText="Live Tracking"
      statusColor="bg-green-600"
      platformType="Logistics Control Platform"
      comingSoonIcon="🚢"
      comingSoonText="Control Dashboard"
    />
  );
};