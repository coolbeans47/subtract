# Subtract - UK Subscription Discovery & Cancellation App

**Phase 1 MVP** - Subscription Discovery Dashboard

## Overview

Subtract is a UK-focused subscription discovery and cancellation app built on Open Banking. It connects to the user's bank feeds, automatically identifies recurring charges using AI pattern matching, surfaces them in a clean premium dashboard, and provides one-tap cancellation links where available.

## Project Structure

```
subtract/
├── subtract/                 # React Native Expo App (Mobile)
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── screens/         # App screens (Dashboard, Banks, Alerts, Settings)
│   │   ├── navigation/      # React Navigation setup
│   │   ├── store/           # Zustand state management
│   │   ├── theme/           # Design tokens and styling
│   │   ├── types/           # TypeScript type definitions
│   │   ├── data/            # Mock data for MVP
│   │   ├── hooks/           # Custom React hooks
│   │   └── services/        # Business logic services
│   ├── assets/              # App icons and splash screens
│   └── App.tsx              # Entry point
│
├── api/                     # Next.js API Routes (Backend)
│   └── app/
│       └── api/
│           ├── subscriptions/   # Subscription CRUD endpoints
│           ├── transactions/     # Transaction feed endpoints
│           ├── banks/            # Bank connection endpoints
│           ├── alerts/           # Notification endpoints
│           ├── auth/             # Authentication (magic link)
│           └── services/         # Business logic (recurring detection)
│
└── docs/                    # Documentation
```

## Features (Phase 1 MVP)

### Implemented
- ✅ Dark theme premium financial UI
- ✅ Subscription discovery dashboard with waste summary hero
- ✅ Bank connection flow (TrueLayer mock/simulated)
- ✅ Recurring charge detection algorithm (mock)
- ✅ "Used recently?" yes/no interaction per subscription
- ✅ Manual subscription add capability
- ✅ Bank account management (connect/disconnect)
- ✅ Polished states: empty, loading, error, success
- ✅ Next.js API routes backend with mock data

### Out of Scope (Phase 2+)
- One-tap cancellation links
- Price increase alerts
- Free trial tracker calendar
- Duplicate service detection
- Human-assisted cancellation
- Annual value report export

## Tech Stack

### Mobile (Expo)
- React Native 0.81
- Expo SDK 54
- TypeScript
- Zustand (state management)
- React Navigation (bottom tabs + stack)
- react-native-reanimated (animations)
- react-native-mmkv (fast storage)

### Backend (Next.js)
- Next.js 14 (App Router)
- TypeScript
- Mock data for MVP
- Ready for Prisma + PostgreSQL in production

### Integrations (Mocked for MVP)
- TrueLayer (Open Banking)
- Finexer (Transaction enrichment)
- Clearbit (Merchant logos)

## Design System

### Colors
| Role | Color | Hex |
|------|-------|-----|
| Background | Near-black | #0D0D0F |
| Surface | Dark charcoal | #1A1A1F |
| Primary | Emerald green | #00C896 |
| Accent | Warm amber | #F5A623 |
| Danger | Coral red | #FF6B6B |
| Text Primary | Off-white | #F5F5F7 |
| Text Secondary | Muted grey | #8E8E93 |

### Typography
- Headlines: Bold, large, tight tracking
- Body: Regular weight, comfortable reading
- Numerals: Tabular figures throughout

## Running the App

### Mobile App
```bash
cd subtract/subtract
npm install
npm start
```

### Backend API
```bash
cd subtract/api
npm install
npm run dev
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api` | Health check |
| GET | `/api/subscriptions` | List all subscriptions |
| POST | `/api/subscriptions` | Add manual subscription |
| GET | `/api/subscriptions/[id]` | Get subscription details |
| PATCH | `/api/subscriptions/[id]` | Update subscription |
| DELETE | `/api/subscriptions/[id]` | Cancel subscription |
| GET | `/api/transactions` | List transactions (90-day window) |
| GET | `/api/banks` | List connected banks |
| POST | `/api/banks` | Connect new bank |
| DELETE | `/api/banks/[id]` | Disconnect bank |
| GET | `/api/alerts` | List alerts |
| PATCH | `/api/alerts/[id]` | Mark alert read |
| DELETE | `/api/alerts/[id]` | Dismiss alert |
| POST | `/api/auth/magic` | Send magic link |
| GET | `/api/auth` | Get current session |

## Notes

- **FCA Compliance**: This is a Phase 1 MVP. FCA AISP authorisation is required before production launch.
- **Bank Coverage**: Legacy banks (HSBC, Barclays, Lloyds) may return inconsistent data. Monzo, Starling, Revolut have excellent feeds.
- **Confidence Threshold**: Only surface subscriptions where confidence >= 80%.

## Status

- [x] Phase 1 MVP Implementation Complete
- [ ] Phase 2: Alerts & Cancellation Links (pending)
- [ ] Phase 3: Human Assistance & Reporting (pending)
- [ ] Phase 4: Scale & Optimisation (pending)
