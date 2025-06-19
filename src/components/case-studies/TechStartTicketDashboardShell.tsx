import React from "react";
import { EmptyScreenShell } from "./EmptyScreenShell";

export const TechStartTicketDashboardShell = () => {
  return (
    <EmptyScreenShell
      url="admin.techstart.io"
      headerBgColor="bg-indigo-600"
      appName="TechStart Admin Dashboard"
      appSubtitle="Ticket Management System"
      statusText="Active"
      statusColor="bg-green-500"
      platformType="Admin Dashboard Platform"
      comingSoonIcon="📊"
      comingSoonText="Ticket Dashboard"
    />
  );
};