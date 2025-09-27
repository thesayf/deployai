import React from 'react';
import { GetServerSideProps } from 'next';
import AdminLayout from '@/components/admin/layout/AdminLayout';
import Dashboard from '@/components/admin/Dashboard';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { getTenantFromRequest } from '@/utils/tenant-helpers';

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
  const tenantContext = await getTenantFromRequest(context.req);

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