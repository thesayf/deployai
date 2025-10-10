import React from 'react';
import { GetServerSideProps } from 'next';
import AdminLayout from '@/components/admin/layout/AdminLayout';
import AssessmentTable from '@/components/admin/AssessmentTable';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { getTenantFromRequest } from '@/utils/tenant-helpers';

const AdminAssessmentsPage = () => {
  return (
    <ProtectedRoute>
      <AdminLayout title="Assessments">
        <AssessmentTable />
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

export default AdminAssessmentsPage;