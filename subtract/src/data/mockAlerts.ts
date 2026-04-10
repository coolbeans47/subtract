// Mock Alerts for Subtract MVP
import { Alert } from '../types';

export const MOCK_ALERTS: Alert[] = [
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
