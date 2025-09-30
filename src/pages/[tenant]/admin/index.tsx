import React from 'react';
import { GetServerSideProps } from 'next';
import AdminLayout from '@/components/admin/layout/AdminLayout';
import Dashboard from '@/components/admin/Dashboard';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

const AdminDashboardPage = () => {
  return (
    <ProtectedRoute>
      <AdminLayout title="Dashboard">
        <Dashboard />
      </AdminLayout>
    </ProtectedRoute>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  // Get tenant from URL path parameter
  const { tenant: tenantSlug } = context.params as { tenant: string };

  // Import tenant service
  const { tenantService } = await import('@/services/tenant');

  // Get tenant context
  const tenantContext = await tenantService.getTenantContext(tenantSlug);

  if (!tenantContext) {
    return {
      notFound: true,
    };
  }

  return {
    props: {},
  };
};

export default AdminDashboardPage;