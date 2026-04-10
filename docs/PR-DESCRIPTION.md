# Pull Request: Phase 1 MVP - Subtract Subscription Discovery App

## PR URL
https://github.com/coolbeans47/subtract/pull/new/main...feature/subtract-phase1

(Opened automatically - use this URL to create the PR if not redirected)

## Title
Phase 1 MVP: Subtract Subscription Discovery App

## Body

## Summary

Phase 1 MVP implementation for **Subtract** - UK Subscription Discovery & Cancellation App.

### Implemented Features

- Dark theme premium financial UI
- Subscription discovery dashboard with waste summary hero
- Bank connection flow (TrueLayer mock/simulated)
- Recurring charge detection algorithm (mock)
- 'Used recently?' yes/no interaction per subscription
- Manual subscription add capability
- Bank account management (connect/disconnect)
- Next.js API routes backend with mock data
- All polished states: empty, loading, error, success

### Project Structure

```
subtract/
├── subtract/     # React Native Expo App
│   └── src/
│       ├── components/   # 8 reusable components
│       ├── screens/      # 4 screens (Dashboard, Banks, Alerts, Settings)
│       ├── navigation/   # Bottom tab navigation
│       ├── store/        # Zustand state management
│       ├── theme/        # Design tokens
│       ├── types/        # TypeScript definitions
│       └── data/         # Mock data
│
├── api/          # Next.js API Routes
│   └── app/api/
│       ├── subscriptions/  # CRUD endpoints
│       ├── transactions/   # Transaction feed
│       ├── banks/          # Bank connection
│       ├── alerts/          # Notifications
│       ├── auth/            # Magic link auth
│       └── services/        # Recurring detection
│
└── docs/         # Documentation
```

### Out of Scope (Phase 2+)

- One-tap cancellation links
- Price increase alerts
- Free trial tracker calendar
- Duplicate service detection
- Human-assisted cancellation
- Annual value report export

### Notes

- FCA AISP authorisation required before production launch
- TrueLayer integration mocked for MVP
- Ready for Prisma + PostgreSQL in production

---

**Ticket**: finance-idea-subtract-2026-04-08
**PRD**: shared/products/finance-idea-subtract-2026-04-08.md
