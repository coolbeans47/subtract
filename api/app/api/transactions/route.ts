// Transactions API - GET all transactions (for recurring charge detection)
import { NextRequest, NextResponse } from 'next/server';

// Mock transactions data
const transactions = [
  { id: 'txn_1', merchant: 'NETFLIX', amount: -15.99, date: '2026-04-15', category: 'Streaming', accountId: 'bank_monzo' },
  { id: 'txn_2', merchant: 'NETFLIX', amount: -15.99, date: '2026-03-15', category: 'Streaming', accountId: 'bank_monzo' },
  { id: 'txn_3', merchant: 'NETFLIX', amount: -15.99, date: '2026-02-15', category: 'Streaming', accountId: 'bank_monzo' },
  { id: 'txn_4', merchant: 'SPOTIFY', amount: -10.99, date: '2026-04-01', category: 'Music', accountId: 'bank_monzo' },
  { id: 'txn_5', merchant: 'SPOTIFY', amount: -10.99, date: '2026-03-01', category: 'Music', accountId: 'bank_monzo' },
  { id: 'txn_6', merchant: 'PUREGYM', amount: -24.99, date: '2026-04-01', category: 'Fitness', accountId: 'bank_starling' },
  { id: 'txn_7', merchant: 'PUREGYM', amount: -24.99, date: '2026-03-01', category: 'Fitness', accountId: 'bank_starling' },
  { id: 'txn_8', merchant: 'TESCO', amount: -45.20, date: '2026-04-18', category: 'Groceries', accountId: 'bank_monzo' },
  { id: 'txn_9', merchant: 'SHELL', amount: -35.00, date: '2026-04-17', category: 'Transport', accountId: 'bank_starling' },
];

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const days = searchParams.get('days') || '90'; // Default 90-day window
  const accountId = searchParams.get('accountId');
  
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - parseInt(days));
  
  let filtered = transactions.filter(t => new Date(t.date) >= cutoffDate);
  
  if (accountId) {
    filtered = filtered.filter(t => t.accountId === accountId);
  }
  
  return NextResponse.json({
    success: true,
    data: filtered,
    meta: {
      total: filtered.length,
      days: parseInt(days),
      accountId,
    },
  });
}
