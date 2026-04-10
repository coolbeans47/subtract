// Single Bank API - GET, DELETE (disconnect)
import { NextRequest, NextResponse } from 'next/server';

interface RouteParams {
  params: Promise<{ id: string }>;
}

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

export async function GET(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  const bank = connectedBanks.find(b => b.id === id);
  
  if (!bank) {
    return NextResponse.json(
      { success: false, error: 'Bank not found' },
      { status: 404 }
    );
  }
  
  return NextResponse.json({
    success: true,
    data: bank,
  });
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  const index = connectedBanks.findIndex(b => b.id === id);
  
  if (index === -1) {
    return NextResponse.json(
      { success: false, error: 'Bank not found' },
      { status: 404 }
    );
  }
  
  // Mark as disconnected (GDPR: don't delete immediately, allow 48h recovery window)
  connectedBanks[index].status = 'disconnected';
  connectedBanks[index].disconnectedAt = new Date().toISOString();
  
  return NextResponse.json({
    success: true,
    message: 'Bank disconnected. Your data will be deleted within 48 hours per GDPR requirements.',
  });
}
