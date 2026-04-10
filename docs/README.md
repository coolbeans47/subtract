# Subtract - Phase 1 MVP Implementation Notes

## Implementation Summary

This Phase 1 MVP implements the subscription discovery dashboard as specified in the PRD. All core features are functional with mock data.

## Key Components

### Mobile App (`subtract/subtract`)

1. **Dashboard Screen** (`src/screens/DashboardScreen.tsx`)
   - Hero card showing waste total and unused subscription count
   - List of active subscriptions with merchant info, amount, billing cycle
   - "Used recently?" interaction for each subscription
   - Pull-to-refresh functionality
   - FAB for adding manual subscriptions

2. **Banks Screen** (`src/screens/BanksScreen.tsx`)
   - Trust indicators (encryption, read-only, GDPR)
   - List of connected banks with sync status
   - Bank selector for connecting new accounts (TrueLayer mock)
   - Disconnect functionality with GDPR compliance

3. **Alerts Screen** (`src/screens/AlertsScreen.tsx`)
   - Unread/read sections
   - New subscription detection alerts
   - Mark as read and dismiss functionality

4. **Settings Screen** (`src/screens/SettingsScreen.tsx`)
   - Account info
   - Notification preferences toggles
   - Privacy/Terms links
   - Data export/delete options
   - Sign out

### Backend API (`subtract/api`)

All endpoints return JSON with `{ success, data?, error? }` structure.

## Mock Data

The MVP uses hardcoded mock data in:
- `subtract/subtract/src/data/mockSubscriptions.ts`
- `subtract/subtract/src/data/mockBanks.ts`
- `subtract/subtract/src/data/mockAlerts.ts`

## State Management

Uses Zustand store (`useSubtractStore`) with:
- Subscriptions state
- Bank accounts state
- Alerts state
- User preferences
- Computed values (wasteTotal, monthlySpend, etc.)

## TODO Before Production

1. **FCA AISP Authorisation** - Hard blocker before launch
2. **Real TrueLayer Integration** - Replace mock OAuth flow
3. **Database Setup** - Prisma + PostgreSQL/Supabase
4. **Real Authentication** - Implement magic link properly
5. **Transaction Enrichment** - Integrate Finexer API
6. **Push Notifications** - Expo Notifications or OneSignal

## Testing

The MVP can be tested by:
1. Running the Expo app with `npm start`
2. Running the API with `npm run dev`
3. Viewing the dashboard with mock subscription data
4. Testing "Used recently?" interactions
5. Testing add manual subscription flow
6. Testing bank connection mock flow

## Git Workflow

This implementation follows the standard git workflow:
- Branch from main/master
- Commit changes
- Push and create PR
- Do NOT merge (PR created for review)
