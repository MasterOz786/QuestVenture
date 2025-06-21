import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Eye, Edit, Send, FileText, DollarSign, Trash2, CheckCircle, Clock } from 'lucide-react';
import { useAdminContext } from '../../context/AdminContext';

export default function InvoiceList() {
  const { state, setCurrentView, updateInvoice, deleteInvoice, createCustomerFromInvoice } = useAdminContext();
  const { invoices } = state;
  const [openActionId, setOpenActionId] = useState<string | null>(null);
  const [showAccessModal, setShowAccessModal] = useState(false);
  const [accessInfo, setAccessInfo] = useState<{
    customerName: string;
    huntTitle: string;
    accessCode: string;
    huntLink: string;
  } | null>(null);

  const handleAction = (action: string, invoiceId: string) => {
    switch (action) {
      case 'receive-payment':
        updateInvoice(invoiceId, { status: 'pending_approval' });
        break;
      case 'approve-payment':
        updateInvoice(invoiceId, { status: 'paid' });
        // Automatically create customer when payment is approved
        createCustomerFromInvoice(invoiceId);
        
        // Show access information modal
        const approvedInvoice = invoices.find(inv => inv.id === invoiceId);
        if (approvedInvoice && approvedInvoice.huntTitle) {
          const accessCode = Math.random().toString(36).substring(2, 8).toUpperCase();
          const hunt = state.scavengerHunts.find(h => h.id === approvedInvoice.huntId);
          setAccessInfo({
            customerName: approvedInvoice.clientName,
            huntTitle: approvedInvoice.huntTitle,
            accessCode,
            huntLink: hunt?.webLink || ''
          });
          setShowAccessModal(true);
        }
        break;
      case 'reject-payment':
        updateInvoice(invoiceId, { status: 'unpaid' });
        break;
      case 'send-access':
        // Send hunt access information to customer
        const invoice = invoices.find(inv => inv.id === invoiceId);
        if (invoice && invoice.huntTitle) {
          alert(`Sending hunt access to ${invoice.clientName} for ${invoice.huntTitle}`);
        }
        break;
      case 'update':
        // Handle update logic
        break;
      case 'send':
        // Handle send logic
        break;
      case 'view-pdf':
        // Handle PDF view
        break;
      case 'paid':
        updateInvoice(invoiceId, { status: 'paid' });
        break;
      case 'void':
        updateInvoice(invoiceId, { status: 'unpaid' });
        break;
      case 'remind':
        // Handle reminder logic
        break;
      case 'delete':
        deleteInvoice(invoiceId);
        break;
    }
    setOpenActionId(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'text-green-600 bg-green-50';
      case 'unpaid':
        return 'text-red-600 bg-red-50';
      case 'overdue':
        return 'text-orange-600 bg-orange-50';
      case 'pending_approval':
        return 'text-yellow-600 bg-yellow-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusDisplay = (status: string) => {
    switch (status) {
      case 'unpaid':
        return 'Un Paid';
      case 'pending_approval':
        return 'Pending Approval';
      default:
        return status;
    }
  };

  const formatCurrency = (amount: number, currency: string) => {
    if (currency === 'USD') {
      return `$${amount.toLocaleString()}`;
    }
    return `${currency}${amount.toLocaleString()}`;
  };

  const renderActionButtons = (invoice: any) => {
    const baseActions = [
      {
        action: 'update',
        icon: Edit,
        label: 'Update Invoice'
      },
      {
        action: 'send',
        icon: Send,
        label: 'Send'
      },
      {
        action: 'view-pdf',
        icon: FileText,
        label: 'View PDF'
      },
      {
        action: 'remind',
        icon: Clock,
        label: 'Remind'
      },
      {
        action: 'delete',
        icon: Trash2,
        label: 'Delete'
      }
    ];

    // Add status-specific actions
    if (invoice.status === 'unpaid') {
      baseActions.unshift({
        action: 'receive-payment',
        icon: DollarSign,
        label: 'Mark as Paid'
      });
    } else if (invoice.status === 'pending_approval') {
      baseActions.unshift(
        {
          action: 'approve-payment',
          icon: CheckCircle,
          label: 'Approve Payment'
        },
        {
          action: 'reject-payment',
          icon: Trash2,
          label: 'Reject Payment'
        }
      );
    } else if (invoice.status === 'paid') {
      baseActions.unshift({
        action: 'send-access',
        icon: Send,
        label: 'Send Hunt Access'
      });
    }

    return baseActions;
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Regular Invoices</h1>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>FINANCIAL MANAGER</span>
              <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-xs">👤</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex gap-4 mb-6"
      >
        <button
          onClick={() => setCurrentView('create-invoice')}
          className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
        >
          ADD MEMBER INVOICE
        </button>
        <button
          onClick={() => setCurrentView('create-invoice')}
          className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
        >
          ADD CUSTOMER INVOICE
        </button>
      </motion.div>

      {/* Invoice Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-lg shadow-sm overflow-hidden"
      >
        {/* Table Header */}
        <div className="bg-red-500 text-white p-4">
          <h2 className="text-lg font-semibold">All Regular Invoices</h2>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left p-4 font-semibold text-gray-900">Action</th>
                <th className="text-left p-4 font-semibold text-gray-900">Invoice Number</th>
                <th className="text-left p-4 font-semibold text-gray-900">Status</th>
                <th className="text-left p-4 font-semibold text-gray-900">Client Name</th>
                <th className="text-left p-4 font-semibold text-gray-900">Hunt</th>
                <th className="text-left p-4 font-semibold text-gray-900">Client Type</th>
                <th className="text-left p-4 font-semibold text-gray-900">Due Date</th>
                <th className="text-left p-4 font-semibold text-gray-900">Balance Due</th>
                <th className="text-left p-4 font-semibold text-gray-900">Remaining Balance</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice, index) => (
                <motion.tr
                  key={invoice.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="p-4">
                    <div className="relative">
                      <button
                        onClick={() => setOpenActionId(openActionId === invoice.id ? null : invoice.id)}
                        className="bg-black text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-gray-800 transition-colors"
                      >
                        ACTION
                        <ChevronDown className="w-4 h-4" />
                      </button>
                      
                      <AnimatePresence>
                        {openActionId === invoice.id && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="absolute top-full left-0 mt-2 bg-white border rounded-lg shadow-lg z-10 min-w-[200px]"
                          >
                            <div className="py-2">
                              {renderActionButtons(invoice).map((action, idx) => (
                                <button
                                  key={idx}
                                  onClick={() => handleAction(action.action, invoice.id)}
                                  className={`w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-2 ${
                                    action.action === 'reject-payment' ? 'text-red-600' : ''
                                  }`}
                                >
                                  <action.icon className="w-4 h-4" />
                                  {action.label}
                                </button>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="text-red-500 font-medium">{invoice.invoiceNumber}</span>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(invoice.status)}`}>
                      {getStatusDisplay(invoice.status)}
                    </span>
                  </td>
                  <td className="p-4 text-gray-900">{invoice.clientName}</td>
                  <td className="p-4 text-gray-600">{invoice.huntTitle || 'N/A'}</td>
                  <td className="p-4 text-gray-600">{invoice.clientType}</td>
                  <td className="p-4 text-gray-600">{invoice.dueDate}</td>
                  <td className="p-4 text-gray-900 font-medium">
                    {formatCurrency(invoice.balanceDue, invoice.currency)}
                  </td>
                  <td className="p-4 text-gray-900 font-medium">
                    {formatCurrency(invoice.remainingBalance, invoice.currency)}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Customer Access Modal */}
      {showAccessModal && accessInfo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-lg p-6 max-w-md w-full mx-4"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Access Created!</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700">Customer</label>
                <p className="text-gray-900">{accessInfo.customerName}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Hunt</label>
                <p className="text-gray-900">{accessInfo.huntTitle}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Access Code</label>
                <div className="flex items-center gap-2">
                  <p className="text-red-500 font-mono text-lg">{accessInfo.accessCode}</p>
                  <button
                    onClick={() => navigator.clipboard.writeText(accessInfo.accessCode)}
                    className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-sm hover:bg-gray-200 transition-colors"
                  >
                    Copy
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Hunt Link</label>
                <div className="flex items-center gap-2">
                  <p className="text-blue-500 break-all text-sm">{accessInfo.huntLink}</p>
                  <button
                    onClick={() => navigator.clipboard.writeText(accessInfo.huntLink)}
                    className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-sm hover:bg-gray-200 transition-colors"
                  >
                    Copy
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowAccessModal(false)}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
