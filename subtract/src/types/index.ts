// Subtract Type Definitions

export type BillingCycle = 'weekly' | 'biweekly' | 'monthly' | 'quarterly' | 'annual';
export type SubscriptionStatus = 'active' | 'cancelled' | 'paused';
export type SubscriptionSource = 'auto-detected' | 'manual';
export type BankProvider = 'truelayer' | 'mock';

export interface Subscription {
  id: string;
  userId: string;
  merchantName: string;
  merchantLogo?: string;
  amount: number;
  billingCycle: BillingCycle;
  firstChargeDate: string;
  lastChargeDate?: string;
  status: SubscriptionStatus;
  usedRecently: boolean | null; // null = not answered yet
  source: SubscriptionSource;
  category: string;
  confidence: number; // 0-100, only show if >= 80
  createdAt: string;
  updatedAt: string;
}

export interface Transaction {
  id: string;
  userId: string;
  bankAccountId: string;
  merchantName: string;
  amount: number;
  date: string;
  enrichedCategory?: string;
  isSubscription: boolean;
  subscriptionId?: string;
}

export interface BankAccount {
  id: string;
  userId: string;
  provider: BankProvider;
  institutionName: string;
  institutionLogo?: string;
  accountType: 'current' | 'savings' | 'credit';
  accountMask: string;
  status: 'connected' | 'needs_reauth' | 'error' | 'disconnected';
  lastSynced?: string;
  balance?: number;
  connectedAt: string;
}

export interface User {
  id: string;
  email: string;
  createdAt: string;
  notificationPreferences: NotificationPreferences;
  connectedBanks: string[];
}

export interface NotificationPreferences {
  newSubscriptionAlert: boolean;
  priceIncreaseAlert: boolean;
  trialEndingAlert: boolean;
  weeklyDigest: boolean;
}

export interface Alert {
  id: string;
  userId: string;
  type: 'new_subscription' | 'price_increase' | 'trial_ending';
  subscriptionId?: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}
