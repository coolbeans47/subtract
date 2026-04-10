// Mock Bank Accounts for Subtract MVP
import { BankAccount } from '../types';

export const MOCK_BANKS: BankAccount[] = [
  {
    id: 'bank_monzo',
    userId: 'user_1',
    provider: 'truelayer',
    institutionName: 'Monzo',
    institutionLogo: 'https://logo.clearbit.com/monzo.com',
    accountType: 'current',
    accountMask: '4242',
    status: 'connected',
    lastSynced: '2026-04-10T09:00:00Z',
    balance: 2847.52,
    connectedAt: '2026-03-01T00:00:00Z',
  },
  {
    id: 'bank_starling',
    userId: 'user_1',
    provider: 'truelayer',
    institutionName: 'Starling',
    institutionLogo: 'https://logo.clearbit.com/starlingbank.com',
    accountType: 'current',
    accountMask: '8829',
    status: 'connected',
    lastSynced: '2026-04-10T08:30:00Z',
    balance: 1523.18,
    connectedAt: '2026-03-05T00:00:00Z',
  },
];

// Available banks for connection (TrueLayer supported)
export const AVAILABLE_BANKS = [
  { id: 'monzo', name: 'Monzo', logo: 'https://logo.clearbit.com/monzo.com', color: '#FF6B6B' },
  { id: 'starling', name: 'Starling', logo: 'https://logo.clearbit.com/starlingbank.com', color: '#1E3A5F' },
  { id: 'revolut', name: 'Revolut', logo: 'https://logo.clearbit.com/revolut.com', color: '#222222' },
  { id: 'hsbc', name: 'HSBC', logo: 'https://logo.clearbit.com/hsbc.com', color: '#DB0011' },
  { id: 'barclays', name: 'Barclays', logo: 'https://logo.clearbit.com/barclays.com', color: '#00A9E0' },
  { id: 'lloyds', name: 'Lloyds', logo: 'https://logo.clearbit.com/lloydsbank.com', color: '#008C4A' },
  { id: 'natwest', name: 'NatWest', logo: 'https://logo.clearbit.com/natwest.com', color: '#00547F' },
];
