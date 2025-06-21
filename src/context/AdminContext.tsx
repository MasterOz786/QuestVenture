import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Client, Invoice, DashboardStats, InvoiceItem, ScavengerHuntEvent, Participant, Question, Advertisement } from '../types/admin';

interface AdminState {
  currentView: 'dashboard' | 'invoices' | 'create-invoice' | 'scavenger-hunts' | 'participants' | 'add-participant' | 'add-question' | 'add-event' | 'add-ads';
  clients: Client[];
  invoices: Invoice[];
  scavengerHunts: ScavengerHuntEvent[];
  participants: Participant[];
  questions: Question[];
  advertisements: Advertisement[];
  dashboardStats: DashboardStats;
  selectedInvoice: Invoice | null;
  selectedHunt: ScavengerHuntEvent | null;
  invoiceForm: Partial<Invoice>;
}

interface AdminContextType {
  state: AdminState;
  updateState: (updates: Partial<AdminState>) => void;
  setCurrentView: (view: AdminState['currentView']) => void;
  setSelectedHunt: (hunt: ScavengerHuntEvent | null) => void;
  createInvoice: (invoice: Omit<Invoice, 'id' | 'invoiceNumber'>) => void;
  updateInvoice: (id: string, updates: Partial<Invoice>) => void;
  deleteInvoice: (id: string) => void;
  addInvoiceItem: (item: Omit<InvoiceItem, 'id'>) => void;
  removeInvoiceItem: (itemId: string) => void;
  addParticipant: (participant: Omit<Participant, 'id' | 'joinedAt'>) => void;
  deleteParticipant: (id: string) => void;
  addQuestion: (question: Omit<Question, 'id' | 'createdAt'>) => void;
  deleteQuestion: (id: string) => void;
  addScavengerHunt: (hunt: Omit<ScavengerHuntEvent, 'id' | 'createdAt' | 'participantCount' | 'questionCount'>) => void;
  deleteScavengerHunt: (id: string) => void;
  addAdvertisement: (ad: Omit<Advertisement, 'id' | 'createdAt'>) => void;
  deleteAdvertisement: (id: string) => void;
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

const mockScavengerHunts: ScavengerHuntEvent[] = [
  {
    id: '1',
    title: 'Ian Rossen Birthday',
    webLink: 'https://velitt.digital/event/ian-rossen-birthday',
    createdAt: '2024-01-15',
    participantCount: 6,
    questionCount: 5,
    groupNames: ['Team Alpha', 'Team Beta']
  },
  {
    id: '2',
    title: 't',
    webLink: 'https://velitt.digital/event/t',
    createdAt: '2024-02-01',
    participantCount: 0,
    questionCount: 0,
    groupNames: []
  },
  {
    id: '3',
    title: 'Test 1234',
    webLink: 'https://velitt.digital/event/test-1234',
    createdAt: '2024-02-15',
    participantCount: 0,
    questionCount: 0,
    groupNames: []
  },
  {
    id: '4',
    title: 'Punda',
    webLink: 'https://velitt.digital/event/punda',
    createdAt: '2024-03-01',
    participantCount: 0,
    questionCount: 0,
    groupNames: []
  },
  {
    id: '5',
    title: 'Marian',
    webLink: 'https://velitt.digital/event/marian',
    createdAt: '2024-03-10',
    participantCount: 0,
    questionCount: 0,
    groupNames: []
  },
  {
    id: '6',
    title: 'CWM TEAMDAY',
    webLink: 'https://velitt.digital/event/cwm-teamday',
    createdAt: '2024-03-20',
    participantCount: 0,
    questionCount: 0,
    groupNames: []
  }
];

const mockParticipants: Participant[] = [
  {
    id: '1',
    eventId: '1',
    firstName: 'Tyler',
    lastName: 'Singer',
    email: 'tyler@example.com',
    phoneNumber: '+1234567890',
    pointsEarned: 0,
    joinedAt: '2024-01-16'
  },
  {
    id: '2',
    eventId: '1',
    firstName: 'Maelynn',
    lastName: 'Tjongayong',
    email: 'maelynn@example.com',
    phoneNumber: '+1234567891',
    pointsEarned: 0,
    joinedAt: '2024-01-17'
  },
  {
    id: '3',
    eventId: '1',
    firstName: 'Gior',
    lastName: 'Bonela',
    email: 'gior@example.com',
    phoneNumber: '+1234567892',
    pointsEarned: 0,
    joinedAt: '2024-01-18'
  },
  {
    id: '4',
    eventId: '1',
    firstName: 'Jada',
    lastName: 'Pieternelle',
    email: 'jada@example.com',
    phoneNumber: '+1234567893',
    pointsEarned: 0,
    joinedAt: '2024-01-19'
  },
  {
    id: '5',
    eventId: '1',
    firstName: 'Kaysan',
    lastName: 'Garmers',
    email: 'kaysan@example.com',
    phoneNumber: '+1234567894',
    pointsEarned: 0,
    joinedAt: '2024-01-20'
  },
  {
    id: '6',
    eventId: '1',
    firstName: 't',
    lastName: 'e',
    email: 'te@example.com',
    phoneNumber: '+1234567895',
    pointsEarned: 0,
    joinedAt: '2024-01-21'
  }
];

const mockQuestions: Question[] = [
  {
    id: '1',
    eventId: '1',
    type: 'multiple-choice',
    title: {
      english: 'Bo ta kla?',
      spanish: '¿Estás listo?',
      papiamentu: 'Bo ta kla?',
      dutch: 'Zijn jullie er klaar voor?'
    },
    content: {
      english: 'Are you ready?',
      spanish: '¿Estás listo?',
      papiamentu: 'Bo ta kla?',
      dutch: 'Zijn jullie er klaar voor?'
    },
    correctAnswer: {
      english: 'Yes',
      spanish: 'Sí',
      papiamentu: 'Si',
      dutch: 'Ja'
    },
    points: 1,
    createdAt: '2024-01-15',
    sequence: 1,
    location: 'https://maps.app.goo.gl/VaV2SBxggv2RMZnL8'
  }
];

const mockAdvertisements: Advertisement[] = [];

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
  scavengerHunts: mockScavengerHunts,
  participants: mockParticipants,
  questions: mockQuestions,
  advertisements: mockAdvertisements,
  dashboardStats: mockDashboardStats,
  selectedInvoice: null,
  selectedHunt: null,
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

  const setSelectedHunt = (hunt: ScavengerHuntEvent | null) => {
    updateState({ selectedHunt: hunt });
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

  const addParticipant = (participant: Omit<Participant, 'id' | 'joinedAt'>) => {
    const newParticipant: Participant = {
      ...participant,
      id: Date.now().toString(),
      joinedAt: new Date().toISOString()
    };
    updateState({ participants: [...state.participants, newParticipant] });
  };

  const deleteParticipant = (id: string) => {
    const filteredParticipants = state.participants.filter(participant => participant.id !== id);
    updateState({ participants: filteredParticipants });
  };

  const addQuestion = (question: Omit<Question, 'id' | 'createdAt'>) => {
    const newQuestion: Question = {
      ...question,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    updateState({ questions: [...state.questions, newQuestion] });
  };

  const deleteQuestion = (id: string) => {
    const filteredQuestions = state.questions.filter(question => question.id !== id);
    updateState({ questions: filteredQuestions });
  };

  const addScavengerHunt = (hunt: Omit<ScavengerHuntEvent, 'id' | 'createdAt' | 'participantCount' | 'questionCount'>) => {
    const newHunt: ScavengerHuntEvent = {
      ...hunt,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      participantCount: 0,
      questionCount: 0
    };
    updateState({ scavengerHunts: [...state.scavengerHunts, newHunt] });
  };

  const deleteScavengerHunt = (id: string) => {
    const filteredHunts = state.scavengerHunts.filter(hunt => hunt.id !== id);
    updateState({ scavengerHunts: filteredHunts });
  };

  const addAdvertisement = (ad: Omit<Advertisement, 'id' | 'createdAt'>) => {
    const newAd: Advertisement = {
      ...ad,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    updateState({ advertisements: [...state.advertisements, newAd] });
  };

  const deleteAdvertisement = (id: string) => {
    const filteredAds = state.advertisements.filter(ad => ad.id !== id);
    updateState({ advertisements: filteredAds });
  };

  return (
    <AdminContext.Provider value={{
      state,
      updateState,
      setCurrentView,
      setSelectedHunt,
      createInvoice,
      updateInvoice,
      deleteInvoice,
      addInvoiceItem,
      removeInvoiceItem,
      addParticipant,
      deleteParticipant,
      addQuestion,
      deleteQuestion,
      addScavengerHunt,
      deleteScavengerHunt,
      addAdvertisement,
      deleteAdvertisement
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
