// Subtract Store - Global State Management
import { create } from 'zustand';
import { Subscription, BankAccount, Alert, User, NotificationPreferences } from '../types';
import { MOCK_SUBSCRIPTIONS } from '../data/mockSubscriptions';
import { MOCK_BANKS } from '../data/mockBanks';
import { MOCK_ALERTS } from '../data/mockAlerts';

interface SubtractState {
  // User
  user: User | null;
  isAuthenticated: boolean;
  
  // Subscriptions
  subscriptions: Subscription[];
  isLoadingSubscriptions: boolean;
  isRefreshing: boolean;
  
  // Banks
  connectedBanks: BankAccount[];
  isConnectingBank: boolean;
  
  // Alerts
  alerts: Alert[];
  unreadAlertCount: number;
  
  // UI State
  isInitialized: boolean;
  
  // Actions - Auth
  login: (email: string) => Promise<void>;
  logout: () => Promise<void>;
  
  // Actions - Subscriptions
  loadSubscriptions: () => Promise<void>;
  refreshSubscriptions: () => Promise<void>;
  updateUsedRecently: (subscriptionId: string, used: boolean) => void;
  addManualSubscription: (subscription: Omit<Subscription, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => void;
  markSubscriptionCancelled: (subscriptionId: string) => void;
  
  // Actions - Banks
  connectBank: (bankId: string) => Promise<void>;
  disconnectBank: (bankId: string) => Promise<void>;
  
  // Actions - Alerts
  markAlertRead: (alertId: string) => void;
  dismissAlert: (alertId: string) => void;
  
  // Actions - Notifications
  updateNotificationPreferences: (prefs: Partial<NotificationPreferences>) => void;
  
  // Computed
  getWasteTotal: () => number;
  getActiveSubscriptions: () => Subscription[];
  getUnusedSubscriptions: () => Subscription[];
  getMonthlySpend: () => number;
}

export const useSubtractStore = create<SubtractState>((set, get) => ({
  // Initial State
  user: {
    id: 'user_1',
    email: 'demo@subtract.app',
    createdAt: '2026-03-01T00:00:00Z',
    notificationPreferences: {
      newSubscriptionAlert: true,
      priceIncreaseAlert: true,
      trialEndingAlert: true,
      weeklyDigest: false,
    },
    connectedBanks: ['bank_monzo', 'bank_starling'],
  },
  isAuthenticated: true, // Auto-authenticated for MVP
  subscriptions: [],
  isLoadingSubscriptions: true,
  isRefreshing: false,
  connectedBanks: [],
  isConnectingBank: false,
  alerts: [],
  unreadAlertCount: 0,
  isInitialized: false,
  
  // Auth Actions
  login: async (email: string) => {
    // Mock login - in production would call auth API
    await new Promise(resolve => setTimeout(resolve, 800));
    set({
      user: {
        id: 'user_1',
        email,
        createdAt: new Date().toISOString(),
        notificationPreferences: {
          newSubscriptionAlert: true,
          priceIncreaseAlert: true,
          trialEndingAlert: true,
          weeklyDigest: false,
        },
        connectedBanks: [],
      },
      isAuthenticated: true,
    });
  },
  
  logout: async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    set({
      user: null,
      isAuthenticated: false,
      subscriptions: [],
      connectedBanks: [],
      alerts: [],
    });
  },
  
  // Subscription Actions
  loadSubscriptions: async () => {
    set({ isLoadingSubscriptions: true });
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    set({
      subscriptions: MOCK_SUBSCRIPTIONS,
      connectedBanks: MOCK_BANKS,
      alerts: MOCK_ALERTS,
      unreadAlertCount: MOCK_ALERTS.filter(a => !a.read).length,
      isLoadingSubscriptions: false,
      isInitialized: true,
    });
  },
  
  refreshSubscriptions: async () => {
    set({ isRefreshing: true });
    await new Promise(resolve => setTimeout(resolve, 1200));
    // Simulate finding a new subscription
    set({ isRefreshing: false });
  },
  
  updateUsedRecently: (subscriptionId: string, used: boolean) => {
    set(state => ({
      subscriptions: state.subscriptions.map(sub =>
        sub.id === subscriptionId
          ? { ...sub, usedRecently: used, updatedAt: new Date().toISOString() }
          : sub
      ),
    }));
  },
  
  addManualSubscription: (subscription) => {
    const newSub: Subscription = {
      ...subscription,
      id: `sub_manual_${Date.now()}`,
      userId: 'user_1',
      source: 'manual',
      confidence: 100,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    set(state => ({
      subscriptions: [...state.subscriptions, newSub],
    }));
  },
  
  markSubscriptionCancelled: (subscriptionId: string) => {
    set(state => ({
      subscriptions: state.subscriptions.map(sub =>
        sub.id === subscriptionId
          ? { ...sub, status: 'cancelled', updatedAt: new Date().toISOString() }
          : sub
      ),
    }));
  },
  
  // Bank Actions
  connectBank: async (bankId: string) => {
    set({ isConnectingBank: true });
    // Simulate TrueLayer OAuth flow
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const newBank: BankAccount = {
      id: `bank_${bankId}_${Date.now()}`,
      userId: 'user_1',
      provider: 'truelayer',
      institutionName: bankId.charAt(0).toUpperCase() + bankId.slice(1),
      accountType: 'current',
      accountMask: String(Math.floor(1000 + Math.random() * 9000)),
      status: 'connected',
      lastSynced: new Date().toISOString(),
      balance: Math.floor(Math.random() * 5000),
      connectedAt: new Date().toISOString(),
    };
    
    set(state => ({
      connectedBanks: [...state.connectedBanks, newBank],
      isConnectingBank: false,
    }));
  },
  
  disconnectBank: async (bankId: string) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    set(state => ({
      connectedBanks: state.connectedBanks.map(bank =>
        bank.id === bankId ? { ...bank, status: 'disconnected' } : bank
      ),
    }));
  },
  
  // Alert Actions
  markAlertRead: (alertId: string) => {
    set(state => ({
      alerts: state.alerts.map(alert =>
        alert.id === alertId ? { ...alert, read: true } : alert
      ),
      unreadAlertCount: Math.max(0, state.unreadAlertCount - 1),
    }));
  },
  
  dismissAlert: (alertId: string) => {
    set(state => ({
      alerts: state.alerts.filter(alert => alert.id !== alertId),
      unreadAlertCount: state.alerts.find(a => a.id === alertId && !a.read)
        ? state.unreadAlertCount - 1
        : state.unreadAlertCount,
    }));
  },
  
  // Notification Actions
  updateNotificationPreferences: (prefs) => {
    set(state => ({
      user: state.user
        ? { ...state.user, notificationPreferences: { ...state.user.notificationPreferences, ...prefs } }
        : null,
    }));
  },
  
  // Computed Values
  getWasteTotal: () => {
    const { subscriptions } = get();
    const unused = subscriptions.filter(sub => 
      sub.status === 'active' && sub.usedRecently === false
    );
    return unused.reduce((total, sub) => {
      // Annualize the amount
      switch (sub.billingCycle) {
        case 'weekly': return total + (sub.amount * 52);
        case 'biweekly': return total + (sub.amount * 26);
        case 'monthly': return total + (sub.amount * 12);
        case 'quarterly': return total + (sub.amount * 4);
        case 'annual': return total + sub.amount;
        default: return total + (sub.amount * 12);
      }
    }, 0);
  },
  
  getActiveSubscriptions: () => {
    return get().subscriptions.filter(sub => sub.status === 'active');
  },
  
  getUnusedSubscriptions: () => {
    return get().subscriptions.filter(sub =>
      sub.status === 'active' && sub.usedRecently === false
    );
  },
  
  getMonthlySpend: () => {
    const { subscriptions } = get();
    return subscriptions
      .filter(sub => sub.status === 'active')
      .reduce((total, sub) => {
        switch (sub.billingCycle) {
          case 'weekly': return total + (sub.amount * 4.33);
          case 'biweekly': return total + (sub.amount * 2.17);
          case 'monthly': return total + sub.amount;
          case 'quarterly': return total + (sub.amount / 3);
          case 'annual': return total + (sub.amount / 12);
          default: return total + sub.amount;
        }
      }, 0);
  },
}));
