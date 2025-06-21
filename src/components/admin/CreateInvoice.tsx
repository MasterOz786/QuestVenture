import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, X } from 'lucide-react';
import { useAdminContext } from '../../context/AdminContext';
import { InvoiceItem } from '../../types/admin';

export default function CreateInvoice() {
  const { state, updateState, setCurrentView, createInvoice, addInvoiceItem, removeInvoiceItem } = useAdminContext();
  const { invoiceForm, scavengerHunts } = state;
  
  const [newItem, setNewItem] = useState<Omit<InvoiceItem, 'id'>>({
    serviceProduct: '',
    description: '',
    amount: 0
  });

  const [selectedHuntId, setSelectedHuntId] = useState('');

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
    if (!selectedHuntId || !invoiceForm.items?.length) return;

    const selectedHunt = scavengerHunts.find(h => h.id === selectedHuntId);
    if (!selectedHunt) return;

    const total = calculateTotal();
    createInvoice({
      clientId: `hunt-${selectedHuntId}`, // Link to hunt
      clientName: selectedHunt.title, // Use hunt title as client name
      clientType: 'customer',
      status: 'unpaid', // Start as unpaid, then pending_approval when payment received
      dueDate: invoiceForm.dueDate || '',
      invoiceDate: invoiceForm.invoiceDate || '',
      balanceDue: total,
      remainingBalance: total,
      items: invoiceForm.items,
      billingAddress: invoiceForm.billingAddress || '',
      term: invoiceForm.term || '2 weeks',
      currency: invoiceForm.currency || 'USD',
      huntId: selectedHuntId, // Track hunt for analytics
      huntTitle: selectedHunt.title // Hunt title for display
    });
  };

  const getCurrencySymbol = (currency: string) => {
    switch (currency) {
      case 'USD': return '$';
      case 'EUR': return '€';
      case 'XCG': return 'XCG';
      default: return '$';
    }
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
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Hunt</label>
              <select
                value={selectedHuntId}
                onChange={(e) => setSelectedHuntId(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              >
                <option value="">Select a Scavenger Hunt</option>
                {scavengerHunts.map(hunt => (
                  <option key={hunt.id} value={hunt.id}>{hunt.title}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Customer Name</label>
              <input
                type="text"
                value={selectedHuntId ? scavengerHunts.find(h => h.id === selectedHuntId)?.title || '' : ''}
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
              <select
                value={invoiceForm.currency || 'USD'}
                onChange={(e) => handleInputChange('currency', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              >
                <option value="USD">$ USD</option>
                <option value="EUR">€ EUR</option>
                <option value="XCG">XCG</option>
              </select>
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
                  <div className="font-medium">{getCurrencySymbol(invoiceForm.currency || 'USD')}{item.amount}</div>
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
                    <span className="font-bold">{getCurrencySymbol(invoiceForm.currency || 'USD')}{calculateTotal()}</span>
                  </div>
                  <div className="flex justify-between py-2 border-t">
                    <span className="font-medium">Balance Due</span>
                    <span className="font-bold">{getCurrencySymbol(invoiceForm.currency || 'USD')}{calculateTotal()}</span>
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
              disabled={!selectedHuntId || !invoiceForm.items?.length}
              className={`px-6 py-3 rounded-lg transition-colors ${
                selectedHuntId && invoiceForm.items?.length
                  ? 'bg-red-500 text-white hover:bg-red-600'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              SEND & MAIL
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
