import React from 'react';
import { AdminProvider, useAdminContext } from '../../context/AdminContext';
import AdminLayout from './AdminLayout';
import AdminDashboard from './AdminDashboard';
import InvoiceList from './InvoiceList';
import CreateInvoice from './CreateInvoice';
import ScavengerHuntList from './ScavengerHuntList';
import ParticipantsList from './ParticipantsList';
import AddParticipant from './AddParticipant';
import AddQuestion from './AddQuestion';
import AddEvent from './AddEvent';
<<<<<<< HEAD
=======
import AddAds from './AddAds';
>>>>>>> scav

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
      case 'scavenger-hunts':
        return <ScavengerHuntList />;
      case 'participants':
        return <ParticipantsList />;
      case 'add-participant':
        return <AddParticipant />;
      case 'add-question':
        return <AddQuestion />;
      case 'add-event':
        return <AddEvent />;
<<<<<<< HEAD
=======
      case 'add-ads':
        return <AddAds />;
>>>>>>> scav
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
