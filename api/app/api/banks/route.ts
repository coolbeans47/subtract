// Banks API - GET connected banks, POST connect new bank
import { NextRequest, NextResponse } from 'next/server';

// Mock connected banks
const connectedBanks = [
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

export async function GET(request: NextRequest) {
  const userId = 'user_1'; // Would come from auth
  const banks = connectedBanks.filter(b => b.userId === userId && b.status === 'connected');
  
  return NextResponse.json({
    success: true,
    data: banks,
    meta: { total: banks.length },
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { bankId, provider = 'truelayer' } = body;
    
    if (!bankId) {
      return NextResponse.json(
        { success: false, error: 'Bank ID is required' },
        { status: 400 }
      );
    }
    
    // In production: Initiate TrueLayer OAuth flow
    // For MVP: Simulate successful connection
    const newBank = {
      id: `bank_${bankId}_${Date.now()}`,
      userId: 'user_1',
      provider,
      institutionName: bankId.charAt(0).toUpperCase() + bankId.slice(1),
      accountType: 'current',
      accountMask: String(Math.floor(1000 + Math.random() * 9000)),
      status: 'connected',
      lastSynced: new Date().toISOString(),
      balance: Math.floor(Math.random() * 5000),
      connectedAt: new Date().toISOString(),
    };
    
    connectedBanks.push(newBank);
    
    return NextResponse.json({
      success: true,
      data: newBank,
      message: 'Bank connected successfully',
    }, { status: 201 });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Invalid request body' },
      { status: 400 }
    );
  }
}
