// Subscriptions API - GET all, POST create
import { NextRequest, NextResponse } from 'next/server';

// Mock subscriptions data
const subscriptions = [
  {
    id: 'sub_netflix',
    userId: 'user_1',
    merchantName: 'Netflix',
    merchantLogo: 'https://logo.clearbit.com/netflix.com',
    amount: 15.99,
    billingCycle: 'monthly',
    firstChargeDate: '2024-01-15',
    lastChargeDate: '2026-04-15',
    status: 'active',
    usedRecently: true,
    source: 'auto-detected',
    category: 'Streaming',
    confidence: 95,
    createdAt: '2026-03-01T00:00:00Z',
    updatedAt: '2026-04-15T00:00:00Z',
  },
  {
    id: 'sub_spotify',
    userId: 'user_1',
    merchantName: 'Spotify',
    merchantLogo: 'https://logo.clearbit.com/spotify.com',
    amount: 10.99,
    billingCycle: 'monthly',
    firstChargeDate: '2023-06-01',
    lastChargeDate: '2026-04-01',
    status: 'active',
    usedRecently: true,
    source: 'auto-detected',
    category: 'Music',
    confidence: 92,
    createdAt: '2026-03-01T00:00:00Z',
    updatedAt: '2026-04-01T00:00:00Z',
  },
  {
    id: 'sub_gym',
    userId: 'user_1',
    merchantName: 'PureGym',
    merchantLogo: 'https://logo.clearbit.com/puregym.com',
    amount: 24.99,
    billingCycle: 'monthly',
    firstChargeDate: '2025-01-01',
    lastChargeDate: '2026-04-01',
    status: 'active',
    usedRecently: false,
    source: 'auto-detected',
    category: 'Fitness',
    confidence: 85,
    createdAt: '2026-03-01T00:00:00Z',
    updatedAt: '2026-04-01T00:00:00Z',
  },
];

export async function GET(request: NextRequest) {
  // In production: Extract userId from auth token
  const userId = 'user_1';
  
  const userSubscriptions = subscriptions.filter(s => s.userId === userId);
  
  return NextResponse.json({
    success: true,
    data: userSubscriptions,
    meta: {
      total: userSubscriptions.length,
      unusedCount: userSubscriptions.filter(s => s.usedRecently === false).length,
      monthlySpend: userSubscriptions.reduce((sum, s) => sum + s.amount, 0),
    },
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { merchantName, amount, billingCycle, category } = body;
    
    // Validate required fields
    if (!merchantName || !amount || !billingCycle) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Create new subscription
    const newSubscription = {
      id: `sub_${Date.now()}`,
      userId: 'user_1',
      merchantName,
      amount: parseFloat(amount),
      billingCycle,
      category: category || 'Other',
      firstChargeDate: new Date().toISOString(),
      status: 'active',
      usedRecently: true,
      source: 'manual',
      confidence: 100,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    subscriptions.push(newSubscription);
    
    return NextResponse.json({
      success: true,
      data: newSubscription,
    }, { status: 201 });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Invalid request body' },
      { status: 400 }
    );
  }
}
