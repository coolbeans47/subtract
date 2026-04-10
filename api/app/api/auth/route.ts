// Auth Session API - GET current session, DELETE logout
import { NextRequest, NextResponse } from 'next/server';

// Mock user session
const mockUser = {
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
};

export async function GET(request: NextRequest) {
  // In production: Extract user from JWT/session
  // For MVP: Return mock user
  
  return NextResponse.json({
    success: true,
    data: mockUser,
    isAuthenticated: true,
  });
}

export async function DELETE(request: NextRequest) {
  // Logout - in production: invalidate JWT/clear session
  
  return NextResponse.json({
    success: true,
    message: 'Logged out successfully',
  });
}
