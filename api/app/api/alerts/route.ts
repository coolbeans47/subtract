// Alerts API - GET all alerts
import { NextRequest, NextResponse } from 'next/server';

// Mock alerts
const alerts = [
  {
    id: 'alert_1',
    userId: 'user_1',
    type: 'new_subscription',
    subscriptionId: 'sub_disney',
    title: 'New subscription detected',
    message: 'We spotted Disney+ on your statement. Are you still using it?',
    read: false,
    createdAt: '2026-04-15T10:00:00Z',
  },
  {
    id: 'alert_2',
    userId: 'user_1',
    type: 'new_subscription',
    subscriptionId: 'sub_adobe',
    title: 'Adobe Creative Cloud detected',
    message: 'Adobe Creative Cloud has been active for 8 months. Still worth it?',
    read: true,
    createdAt: '2026-04-20T10:00:00Z',
  },
];

export async function GET(request: NextRequest) {
  const userId = 'user_1';
  const userAlerts = alerts.filter(a => a.userId === userId);
  
  return NextResponse.json({
    success: true,
    data: userAlerts,
    meta: {
      total: userAlerts.length,
      unreadCount: userAlerts.filter(a => !a.read).length,
    },
  });
}
