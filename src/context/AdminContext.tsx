import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Client, Invoice, DashboardStats, InvoiceItem } from '../types/admin';

interface AdminState {
  currentView: 'dashboard' | 'invoices' | 'create-invoice';
  clients: Client[];
  invoices: Invoice[];
  dashboardStats: DashboardStats;
  selectedInvoice: Invoice | null;
  invoiceForm: Partial<Invoice>;
}

interface AdminContextType {
  state: AdminState;
  updateState: (updates: Partial<AdminState>) => void;
  setCurrentView: (view: AdminState['currentView']) => void;
  createInvoice: (invoice: Omit<Invoice, 'id' | 'invoiceNumber'>) => void;
  updateInvoice: (id: string, updates: Partial<Invoice>) => void;
  deleteInvoice: (id: string) => void;
  addInvoiceItem: (item: Omit<InvoiceItem, 'id'>) => void;
  removeInvoiceItem: (itemId: string) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

// Mock data
const mockClients: Client[] = [
  {
    id: '1',
    name: 'TeamBuilding BV',
    email: 'contact@teambuilding.com',
    type: 'member',
    createdAt: '2024-01-15',
    totalHunts: 8,
    totalRevenue: 15000
  },
  {
    id: '2',
    name: 'FunYou Events',
    email: 'info@funyou.com',
    type: 'customer',
    createdAt: '2024-02-20',
    totalHunts: 3,
    totalRevenue: 6920
  },
  {
    id: '3',
    name: 'CityScape NL',
    email: 'hello@cityscape.nl',
    type: 'customer',
    createdAt: '2024-03-10',
    totalHunts: 2,
    totalRevenue: 7800
  }
];

const mockInvoices: Invoice[] = [
  {
    id: '1',
    invoiceNumber: 'BOTC-25-591',
    clientId: '1',
    clientName: 'RCN',
    clientType: 'customer',
    status: 'unpaid',
    dueDate: '2025-05-27',
    invoiceDate: '2025-04-27',
    balanceDue: 33600,
    remainingBalance: 33600,
    items: [],
    billingAddress: '',
    term: '30 days',
    currency: 'USD'
  },
  {
    id: '2',
    invoiceNumber: 'BOTC-25-590',
    clientId: '2',
    clientName: 'CWM',
    clientType: 'customer',
    status: 'unpaid',
    dueDate: '2025-04-12',
    invoiceDate: '2025-03-12',
    balanceDue: 591.95,
    remainingBalance: 591.95,
    items: [],
    billingAddress: '',
    term: '30 days',
    currency: 'XCG'
  }
];

const mockDashboardStats: DashboardStats = {
  totalClients: 245,
  newClients: 18,
  newClientsGrowth: 20,
  topClient: 'Acme Corp',
  totalHunts: 132,
  activeHunts: 8,
  participants: 3840,
  avgCompletion: 76,
  clientDistribution: {
    members: 35,
    customers: 65
  },
  monthlyActivity: [
    { month: 'Jan', value: 5 },
    { month: 'Feb', value: 12 },
    { month: 'Mar', value: 18 },
    { month: 'Apr', value: 25 },
    { month: 'May', value: 28 },
    { month: 'Jun', value: 32 }
  ],
  recentClients: [
    { name: 'TeamBuilding BV', hunts: 8, revenue: 15000 },
    { name: 'FunYou Events', hunts: 3, revenue: 6920 },
    { name: 'CityScape NL', hunts: 2, revenue: 7800 }
  ]
};

const initialState: AdminState = {
  currentView: 'dashboard',
  clients: mockClients,
  invoices: mockInvoices,
  dashboardStats: mockDashboardStats,
  selectedInvoice: null,
  invoiceForm: {
    invoiceDate: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    term: '2 weeks',
    currency: 'USD',
    items: [],
    status: 'unpaid'
  }
};

export function AdminProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AdminState>(initialState);

  const updateState = (updates: Partial<AdminState>) => {
    setState(prev => ({ ...prev, ...updates }));
  };

  const setCurrentView = (view: AdminState['currentView']) => {
    updateState({ currentView: view });
  };

  const createInvoice = (invoice: Omit<Invoice, 'id' | 'invoiceNumber'>) => {
    const newInvoice: Invoice = {
      ...invoice,
      id: Date.now().toString(),
      invoiceNumber: `VELITT-25-${Math.floor(Math.random() * 1000)}`
    };
    updateState({ 
      invoices: [...state.invoices, newInvoice],
      currentView: 'invoices'
    });
  };

  const updateInvoice = (id: string, updates: Partial<Invoice>) => {
    const updatedInvoices = state.invoices.map(invoice =>
      invoice.id === id ? { ...invoice, ...updates } : invoice
    );
    updateState({ invoices: updatedInvoices });
  };

  const deleteInvoice = (id: string) => {
    const filteredInvoices = state.invoices.filter(invoice => invoice.id !== id);
    updateState({ invoices: filteredInvoices });
  };

  const addInvoiceItem = (item: Omit<InvoiceItem, 'id'>) => {
    const newItem: InvoiceItem = {
      ...item,
      id: Date.now().toString()
    };
    const currentItems = state.invoiceForm.items || [];
    updateState({
      invoiceForm: {
        ...state.invoiceForm,
        items: [...currentItems, newItem]
      }
    });
  };

  const removeInvoiceItem = (itemId: string) => {
    const currentItems = state.invoiceForm.items || [];
    const filteredItems = currentItems.filter(item => item.id !== itemId);
    updateState({
      invoiceForm: {
        ...state.invoiceForm,
        items: filteredItems
      }
    });
  };

  return (
    <AdminContext.Provider value={{
      state,
      updateState,
      setCurrentView,
      createInvoice,
      updateInvoice,
      deleteInvoice,
      addInvoiceItem,
      removeInvoiceItem
    }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdminContext() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdminContext must be used within an AdminProvider');
  }
  return context;
}
