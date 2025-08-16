# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js SaaS starter kit being adapted into a VoIP web calling application with contact management. The project combines authentication, payments (Stripe), and database functionality (Supabase) with planned VoIP calling capabilities through WebRTC and SIP.js integration.

## Development Commands

```bash
# Development server (runs on port 3000 by default)
npm run dev
# Or with custom port
npm run dev -- --port 3003

# Build and deployment
npm run build
npm run start

# Code quality
npm run lint
npm run lint:ts

# Email development
npm run email

# Stripe webhook testing (requires Stripe CLI)
npm run stripe:listen
```

## Architecture Overview

### Authentication System
- **NextAuth.js v5** with Supabase adapter for session management
- **Multi-provider support**: Google OAuth, email magic links (Nodemailer)
- **Important**: Uses `SUPABASE_SECRET_KEY` (not `SUPABASE_SERVICE_ROLE_KEY`) for adapter configuration
- **No JWT tokens**: Modern approach without deprecated SUPABASE_JWT_SECRET

### Database Architecture (Supabase)
- **NextAuth tables**: Located in `next_auth` schema (auto-created by adapter)
- **Application tables**: In `public` schema (users, notes, stripe_customers, etc.)
- **Row Level Security**: Enabled with user-scoped access policies
- **Real-time**: Supabase subscriptions for live data updates

### Key Authentication Files
- `lib/auth.config.ts` - Base NextAuth configuration with callbacks
- `lib/auth.ts` - Extended config with Nodemailer email provider
- `app/api/auth/[...nextauth]/route.ts` - API route with `runtime = 'nodejs'` for Nodemailer
- `utils/supabase/server.ts` - Server-side Supabase client with admin privileges
- `utils/supabase/client.ts` - Client-side Supabase client

### Supabase Client Patterns

#### Server-side (API routes, server components)
```typescript
import { getSupabaseClient } from '@/utils/supabase/server'
const supabase = await getSupabaseClient() // Uses admin client with SUPABASE_SECRET_KEY
```

#### Client-side (React components)
```typescript
import { createSupabaseClient } from '@/utils/supabase/client'
const supabase = createSupabaseClient() // Uses anon key
```

### Project Structure

```
app/
├── api/                 # Next.js API routes
│   ├── auth/           # NextAuth.js endpoints
│   ├── profile/        # User profile data
│   └── webhook/        # Stripe webhooks
├── app/                # Main application pages
│   ├── notes/          # Note-taking feature
│   └── profile/        # User profile & billing
├── layout.tsx          # Root layout
└── page.tsx            # Landing page

components/
├── app/                # Application-specific components
│   ├── Header.tsx      # Navigation header
│   ├── Sidebar.tsx     # Application sidebar
│   └── billing/        # Billing management
├── email/              # Email templates (React Email)
├── stripe/             # Stripe integration components
└── ui/                 # Reusable UI components

lib/
├── auth.ts             # NextAuth configuration
├── auth.config.ts      # Base auth config
└── hooks/              # Custom React hooks

utils/
├── stripe.ts           # Stripe configuration
└── supabase/           # Supabase client utilities

docs/specs/voip-web-calling-app/
├── design.md           # Comprehensive VoIP app design document
├── requirements.md     # Functional requirements
└── tasks/              # Implementation task breakdown
```

### Configuration Management

#### Central Configuration (`config.ts`)
- Application metadata and SEO settings
- Stripe plan configuration with price IDs
- Theme colors and styling constants
- Social links and branding

#### Environment Variables Required
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SECRET_KEY=

# NextAuth
AUTH_SECRET=
AUTH_GOOGLE_ID=
AUTH_GOOGLE_SECRET=

# Email (Nodemailer)
EMAIL_SERVER_HOST=smtp.gmail.com
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER=
EMAIL_SERVER_PASSWORD=
EMAIL_FROM=

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
```

### Stripe Integration
- **Payment plans**: Free, Basic ($9.9/month), Pro ($29.9/month)
- **Webhook handling**: `app/api/webhook/stripe/route.ts`
- **Customer management**: `stripe_customers` table tracks subscriptions
- **Components**: Checkout, portal, and refund functionality

### VoIP Development Notes (Planned Features)

Based on the design document in `docs/specs/voip-web-calling-app/`:

#### Planned VoIP Architecture
- **WebRTC + SIP.js**: Browser-based calling through VoIP.ms
- **Contact Management**: Enhanced contact system with phone number validation
- **Call Tracking**: Session management with quality metrics
- **Timezone Awareness**: Optimal calling time calculations

#### Database Extensions (Planned)
```sql
-- VoIP-specific tables to be added:
voip_credentials     # Encrypted VoIP.ms credentials
contacts            # Enhanced contact management
phone_numbers       # Validated phone number storage
call_sessions       # Call history and quality tracking
tasks              # Contact-related task management
```

### Common Development Patterns

#### Error Handling
- API routes return standardized error responses
- Frontend error boundaries for component-level error handling
- Supabase error mapping to user-friendly messages

#### Data Fetching
- Server components for initial data loading
- React Query patterns for client-side data management
- Real-time subscriptions for live updates

#### Type Safety
- `types/database.types.ts` - Auto-generated Supabase types
- `types/next-auth.d.ts` - NextAuth session type extensions
- Strict TypeScript configuration

### Testing Considerations

#### Current Testing Setup
- No test framework currently configured
- Consider adding: Jest, React Testing Library, Playwright for E2E
- Mock Supabase and Stripe services for testing

#### VoIP Testing Requirements (Future)
- SIP.js connection mocking
- WebRTC media stream simulation
- Call quality metric validation
- Cross-browser compatibility testing

### Security Considerations

#### Current Security Measures
- Row Level Security (RLS) on all Supabase tables
- NextAuth.js session management with secure cookies
- Stripe webhook signature verification
- HTTPS enforcement in production

#### VoIP Security Requirements (Future)
- Encrypted VoIP credential storage
- DTLS/SRTP for WebRTC communications
- SIP authentication security
- Call data privacy compliance

### Deployment Architecture

#### Current Setup
- **Frontend**: Vercel deployment (recommended)
- **Database**: Supabase managed PostgreSQL
- **Email**: SMTP through Gmail/custom provider
- **Payments**: Stripe webhooks and API

#### VoIP Deployment Considerations (Future)
- WebRTC-SIP gateway server requirements
- Real-time communication infrastructure
- Geographic distribution for call quality
- Compliance with telecommunications regulations

### Troubleshooting Common Issues

#### Authentication Issues
- Ensure `runtime = 'nodejs'` in auth API route for Nodemailer
- Verify `SUPABASE_SECRET_KEY` (not SERVICE_ROLE_KEY) in environment
- Check NextAuth session callback configuration

#### Database Connection Issues
- Verify Supabase environment variables
- Check Row Level Security policies
- Ensure proper user context in server-side operations

#### Stripe Integration Issues
- Validate webhook endpoints and signatures
- Ensure proper price ID configuration in `config.ts`
- Check customer-user relationship in `stripe_customers` table