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

// Enhanced types for Scavenger Hunt management
export interface ScavengerHuntEvent {
  id: string;
  title: string;
  webLink: string;
  createdAt: string;
  participantCount: number;
  questionCount: number;
  groupNames?: string[];
}

export interface Participant {
  id: string;
  eventId: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  pointsEarned: number;
  joinedAt: string;
}

export interface Question {
  id: string;
  eventId: string;
  type: 'multiple-choice' | 'question-to-answer' | 'code' | 'url';
  title: string;
  content: string;
  options?: string[];
  correctAnswer?: string;
  points: number;
  createdAt: string;
  mediaType?: 'none' | 'image' | 'video';
  mediaUrl?: string;
}