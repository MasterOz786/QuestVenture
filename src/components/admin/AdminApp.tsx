import React from 'react';
import { AdminProvider, useAdminContext } from '../../context/AdminContext';
import AdminLayout from './AdminLayout';
import AdminDashboard from './AdminDashboard';
import InvoiceList from './InvoiceList';
import CreateInvoice from './CreateInvoice';

function AdminContent() {
  const { state } = useAdminContext();
  const { currentView } = state;

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <AdminDashboard />;
      case 'invoices':
        return <InvoiceList />;
      case 'create-invoice':
        return <CreateInvoice />;
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <AdminLayout>
      {renderContent()}
    </AdminLayout>
  );
}

export default function AdminApp() {
  return (
    <AdminProvider>
      <AdminContent />
    </AdminProvider>
  );
}
