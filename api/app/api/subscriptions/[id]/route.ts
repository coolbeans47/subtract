// Single Subscription API - GET, PATCH, DELETE
import { NextRequest, NextResponse } from 'next/server';

interface RouteParams {
  params: Promise<{ id: string }>;
}

// Mock subscriptions data (in-memory for MVP)
let subscriptions = [
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

export async function GET(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  const subscription = subscriptions.find(s => s.id === id);
  
  if (!subscription) {
    return NextResponse.json(
      { success: false, error: 'Subscription not found' },
      { status: 404 }
    );
  }
  
  return NextResponse.json({
    success: true,
    data: subscription,
  });
}

export async function PATCH(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  const index = subscriptions.findIndex(s => s.id === id);
  
  if (index === -1) {
    return NextResponse.json(
      { success: false, error: 'Subscription not found' },
      { status: 404 }
    );
  }
  
  try {
    const body = await request.json();
    subscriptions[index] = {
      ...subscriptions[index],
      ...body,
      updatedAt: new Date().toISOString(),
    };
    
    return NextResponse.json({
      success: true,
      data: subscriptions[index],
    });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Invalid request body' },
      { status: 400 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  const index = subscriptions.findIndex(s => s.id === id);
  
  if (index === -1) {
    return NextResponse.json(
      { success: false, error: 'Subscription not found' },
      { status: 404 }
    );
  }
  
  // Mark as cancelled instead of deleting (GDPR compliance)
  subscriptions[index].status = 'cancelled';
  subscriptions[index].updatedAt = new Date().toISOString();
  
  return NextResponse.json({
    success: true,
    message: 'Subscription cancelled',
  });
}
