// Single Alert API - PATCH (mark read), DELETE
import { NextRequest, NextResponse } from 'next/server';

interface RouteParams {
  params: Promise<{ id: string }>;
}

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

export async function PATCH(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  const index = alerts.findIndex(a => a.id === id);
  
  if (index === -1) {
    return NextResponse.json(
      { success: false, error: 'Alert not found' },
      { status: 404 }
    );
  }
  
  const body = await request.json();
  alerts[index] = { ...alerts[index], ...body };
  
  return NextResponse.json({
    success: true,
    data: alerts[index],
  });
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  const index = alerts.findIndex(a => a.id === id);
  
  if (index === -1) {
    return NextResponse.json(
      { success: false, error: 'Alert not found' },
      { status: 404 }
    );
  }
  
  alerts.splice(index, 1);
  
  return NextResponse.json({
    success: true,
    message: 'Alert dismissed',
  });
}
