import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Eye, Edit, Send, FileText, DollarSign, Trash2 } from 'lucide-react';
import { useAdminContext } from '../../context/AdminContext';

export default function InvoiceList() {
  const { state, setCurrentView, updateInvoice, deleteInvoice } = useAdminContext();
  const { invoices } = state;
  const [openActionId, setOpenActionId] = useState<string | null>(null);

  const handleAction = (action: string, invoiceId: string) => {
    switch (action) {
      case 'receive-payment':
        updateInvoice(invoiceId, { status: 'paid' });
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
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const formatCurrency = (amount: number, currency: string) => {
    if (currency === 'USD') {
      return `$${amount.toLocaleString()}`;
    }
    return `${currency}${amount.toLocaleString()}`;
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
                              <button
                                onClick={() => handleAction('receive-payment', invoice.id)}
                                className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-2"
                              >
                                <DollarSign className="w-4 h-4" />
                                Receive Payment
                              </button>
                              <button
                                onClick={() => handleAction('update', invoice.id)}
                                className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-2"
                              >
                                <Edit className="w-4 h-4" />
                                Update Invoice
                              </button>
                              <button
                                onClick={() => handleAction('send', invoice.id)}
                                className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-2"
                              >
                                <Send className="w-4 h-4" />
                                Send
                              </button>
                              <button
                                onClick={() => handleAction('view-pdf', invoice.id)}
                                className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-2"
                              >
                                <FileText className="w-4 h-4" />
                                View PDF
                              </button>
                              <button
                                onClick={() => handleAction('paid', invoice.id)}
                                className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-2"
                              >
                                <Eye className="w-4 h-4" />
                                Paid
                              </button>
                              <button
                                onClick={() => handleAction('void', invoice.id)}
                                className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-2"
                              >
                                <Trash2 className="w-4 h-4" />
                                Void
                              </button>
                              <button
                                onClick={() => handleAction('remind', invoice.id)}
                                className="w-full text-left px-4 py-2 hover:bg-gray-50"
                              >
                                Remind
                              </button>
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
                      {invoice.status === 'unpaid' ? 'Un Paid' : invoice.status}
                    </span>
                  </td>
                  <td className="p-4 text-gray-900">{invoice.clientName}</td>
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
    </div>
  );
}
