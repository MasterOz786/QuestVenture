import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, X } from 'lucide-react';
import { useAdminContext } from '../../context/AdminContext';
import { InvoiceItem } from '../../types/admin';

export default function CreateInvoice() {
  const { state, updateState, setCurrentView, createInvoice, addInvoiceItem, removeInvoiceItem } = useAdminContext();
  const { invoiceForm, clients } = state;
  
  const [newItem, setNewItem] = useState<Omit<InvoiceItem, 'id'>>({
    serviceProduct: '',
    description: '',
    amount: 0
  });

  const handleInputChange = (field: string, value: any) => {
    updateState({
      invoiceForm: {
        ...invoiceForm,
        [field]: value
      }
    });
  };

  const handleAddItem = () => {
    if (newItem.serviceProduct && newItem.description && newItem.amount > 0) {
      addInvoiceItem(newItem);
      setNewItem({
        serviceProduct: '',
        description: '',
        amount: 0
      });
    }
  };

  const calculateTotal = () => {
    return (invoiceForm.items || []).reduce((sum, item) => sum + item.amount, 0);
  };

  const handleSubmit = () => {
    const selectedClient = clients.find(c => c.id === invoiceForm.clientId);
    if (!selectedClient || !invoiceForm.items?.length) return;

    const total = calculateTotal();
    createInvoice({
      clientId: selectedClient.id,
      clientName: selectedClient.name,
      clientType: selectedClient.type,
      status: 'unpaid',
      dueDate: invoiceForm.dueDate || '',
      invoiceDate: invoiceForm.invoiceDate || '',
      balanceDue: total,
      remainingBalance: total,
      items: invoiceForm.items,
      billingAddress: invoiceForm.billingAddress || '',
      term: invoiceForm.term || '2 weeks',
      currency: invoiceForm.currency || 'USD'
    });
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
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Create New Invoice</h1>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>FINANCIAL MANAGER</span>
              <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-xs">👤</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Invoice Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-lg shadow-sm overflow-hidden"
      >
        {/* Form Header */}
        <div className="bg-red-500 text-white p-4">
          <h2 className="text-lg font-semibold">Create Invoice</h2>
        </div>

        <div className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Invoice No.</label>
              <input
                type="text"
                value="VELITT-25-592"
                disabled
                className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Customer</label>
              <select
                value={invoiceForm.clientId || ''}
                onChange={(e) => handleInputChange('clientId', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              >
                <option value="">Nothing Selected</option>
                {clients.map(client => (
                  <option key={client.id} value={client.id}>{client.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={invoiceForm.clientId ? clients.find(c => c.id === invoiceForm.clientId)?.email || '' : ''}
                disabled
                className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
              />
            </div>
          </div>

          {/* Billing Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Billing Address</label>
            <textarea
              value={invoiceForm.billingAddress || ''}
              onChange={(e) => handleInputChange('billingAddress', e.target.value)}
              rows={3}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
          </div>

          {/* Terms and Dates */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Term</label>
              <input
                type="text"
                value={invoiceForm.term || '2 weeks'}
                onChange={(e) => handleInputChange('term', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Invoice Date</label>
              <input
                type="date"
                value={invoiceForm.invoiceDate || ''}
                onChange={(e) => handleInputChange('invoiceDate', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Due Date</label>
              <input
                type="date"
                value={invoiceForm.dueDate || ''}
                onChange={(e) => handleInputChange('dueDate', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>
          </div>

          {/* Currency */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
              <input
                type="text"
                value={invoiceForm.currency || 'USD'}
                onChange={(e) => handleInputChange('currency', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>
          </div>

          {/* Line Items */}
          <div>
            <div className="bg-red-500 text-white p-3 rounded-t-lg">
              <h3 className="font-semibold">LINE ITEMS</h3>
            </div>
            
            {/* Add New Item */}
            <div className="border border-gray-300 p-4 bg-gray-50">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Service/Product</label>
                  <input
                    type="text"
                    value={newItem.serviceProduct}
                    onChange={(e) => setNewItem({...newItem, serviceProduct: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <input
                    type="text"
                    value={newItem.description}
                    onChange={(e) => setNewItem({...newItem, description: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
                  <input
                    type="number"
                    value={newItem.amount}
                    onChange={(e) => setNewItem({...newItem, amount: parseFloat(e.target.value) || 0})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
                </div>
                <button
                  onClick={handleAddItem}
                  className="p-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Existing Items */}
            {(invoiceForm.items || []).map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="border-l border-r border-b border-gray-300 p-4 bg-white"
              >
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                  <div className="font-medium">{item.serviceProduct}</div>
                  <div className="text-gray-600">{item.description}</div>
                  <div className="font-medium">${item.amount}</div>
                  <button
                    onClick={() => removeInvoiceItem(item.id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}

            {/* Totals */}
            <div className="border-l border-r border-b border-gray-300 p-4 bg-gray-50">
              <div className="flex justify-end space-y-2">
                <div className="w-64">
                  <div className="flex justify-between py-2">
                    <span className="font-medium">Total</span>
                    <span className="font-bold">${calculateTotal()}</span>
                  </div>
                  <div className="flex justify-between py-2 border-t">
                    <span className="font-medium">Balance Due</span>
                    <span className="font-bold">${calculateTotal()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 pt-6">
            <button
              onClick={() => setCurrentView('invoices')}
              className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              CLOSE
            </button>
            <button
              onClick={handleSubmit}
              className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              SEND & MAIL
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
