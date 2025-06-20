
export interface Client {
  id: string;
  name: string;
  email: string;
  type: 'member' | 'customer';
  createdAt: string;
  totalHunts: number;
  totalRevenue: number;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  clientId: string;
  clientName: string;
  clientType: 'member' | 'customer';
  status: 'paid' | 'unpaid' | 'overdue';
  dueDate: string;
  invoiceDate: string;
  balanceDue: number;
  remainingBalance: number;
  items: InvoiceItem[];
  billingAddress: string;
  term: string;
  currency: string;
}

export interface InvoiceItem {
  id: string;
  serviceProduct: string;
  description: string;
  amount: number;
}

export interface DashboardStats {
  totalClients: number;
  newClients: number;
  newClientsGrowth: number;
  topClient: string;
  totalHunts: number;
  activeHunts: number;
  participants: number;
  avgCompletion: number;
  clientDistribution: {
    members: number;
    customers: number;
  };
  monthlyActivity: Array<{
    month: string;
    value: number;
  }>;
  recentClients: Array<{
    name: string;
    hunts: number;
    revenue: number;
  }>;
}