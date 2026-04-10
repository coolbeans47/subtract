// Single Transaction API
import { NextRequest, NextResponse } from 'next/server';

interface RouteParams {
  params: Promise<{ id: string }>;
}

const transactions = [
  { id: 'txn_1', merchant: 'NETFLIX', amount: -15.99, date: '2026-04-15', category: 'Streaming', accountId: 'bank_monzo' },
  { id: 'txn_2', merchant: 'NETFLIX', amount: -15.99, date: '2026-03-15', category: 'Streaming', accountId: 'bank_monzo' },
  { id: 'txn_3', merchant: 'SPOTIFY', amount: -10.99, date: '2026-04-01', category: 'Music', accountId: 'bank_monzo' },
];

export async function GET(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  const transaction = transactions.find(t => t.id === id);
  
  if (!transaction) {
    return NextResponse.json(
      { success: false, error: 'Transaction not found' },
      { status: 404 }
    );
  }
  
  return NextResponse.json({
    success: true,
    data: transaction,
  });
}
