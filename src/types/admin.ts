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
  status: 'paid' | 'unpaid' | 'overdue' | 'pending_approval';
  dueDate: string;
  invoiceDate: string;
  balanceDue: number;
  remainingBalance: number;
  items: InvoiceItem[];
  billingAddress: string;
  term: string;
  currency: string;
  huntId?: string;
  huntTitle?: string;
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

export interface Translation {
  english: string;
  spanish: string;
  papiamentu: string;
  dutch: string;
}

export interface Question {
  id: string;
  eventId: string;
  type: 'multiple-choice' | 'question-to-answer' | 'code' | 'url' | 'canvas';
  title: Translation;
  content: Translation;
  options?: Translation[];
  correctAnswer?: Translation;
  points: number;
  createdAt: string;
  mediaType?: 'none' | 'image' | 'video';
  mediaUrl?: string;
  sequence: number;
  location?: string;
}

export interface Advertisement {
  id: string;
  eventId: string;
  statement: string;
  adType: 'banner' | 'video' | 'image' | 'text';
  content: string;
  mediaUrl?: string;
  placement: 'before-question' | 'after-question' | 'between-questions';
  questionNumber?: number;
  createdAt: string;
  isActive: boolean;
}
