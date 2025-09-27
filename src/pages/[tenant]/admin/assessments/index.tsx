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
  const tenantContext = await getTenantFromRequest(context.req);

  if (!tenantContext) {
    return {
      notFound: true,
    };
  }

  // TODO: Add authentication check here in Phase 3

  return {
    props: {},
  };
};

export default AdminAssessmentsPage;