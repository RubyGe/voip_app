# VoIP Web Calling App

A modern web-based VoIP calling application with integrated contact management, built on Next.js and Supabase. Make calls directly from your browser while managing contacts, tasks, and call history in one seamless interface.

## Features

### 🔗 Current Foundation (Phase 1)
- 🔐 **Authentication System** - NextAuth.js v5 with Google OAuth and email magic links
- 💳 **Subscription Management** - Stripe integration with multiple pricing tiers
- 📧 **Email Infrastructure** - Nodemailer integration for transactional emails
- 🗃️ **Database Foundation** - Supabase with real-time capabilities and RLS security
- 📱 **Responsive UI** - Modern design system with Tailwind CSS

### 🚧 Planned VoIP Features (In Development)
- 📞 **Browser-based Calling** - WebRTC + SIP.js integration with VoIP.ms
- 👥 **Contact Management** - Comprehensive contact organization with phone number validation
- 🌍 **Timezone Intelligence** - Optimal calling time calculations for international contacts
- 📊 **Call Tracking** - Session history with quality metrics and call outcomes
- ✅ **Task Management** - Contact-related task automation and follow-up scheduling
- 📁 **CSV Import/Export** - Bulk contact management and data portability
- 🎯 **Batch Calling** - Timezone-aware batch calling workflows for sales teams

## Quick Start

1. **Clone the repository**
```bash
git clone https://github.com/RubyGe/voip_app.git
cd voip_app
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**
```bash
cp .env.example .env.local
```
Edit `.env.local` with your configuration values (see Environment Variables section below)

4. **Start the development server**
```bash
npm run dev
```

5. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000) to access the application

## Environment Variables

### 🗃️ Supabase Configuration
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SECRET_KEY=your_supabase_service_role_key
```

### 🔐 Authentication (NextAuth.js)
```env
AUTH_SECRET=your_nextauth_secret
AUTH_GOOGLE_ID=your_google_oauth_client_id
AUTH_GOOGLE_SECRET=your_google_oauth_client_secret
```

### 📧 Email Configuration (Nodemailer)
```env
EMAIL_SERVER_HOST=smtp.gmail.com
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER=your_gmail_address
EMAIL_SERVER_PASSWORD=your_gmail_app_password
EMAIL_FROM=your_from_email_address
```

### 💳 Stripe Payment Integration
```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
```

### 📞 VoIP Integration (Coming Soon)
```env
# VoIP.ms credentials (to be implemented)
VOIP_MS_USERNAME=your_voipms_username
VOIP_MS_PASSWORD=your_voipms_password
VOIP_MS_SERVER=your_voipms_server
```

## Technology Stack

### 🏗️ **Core Framework**
- **Next.js 15.1.7** - React framework with App Router and server components
- **TypeScript** - Type-safe development with strict configuration
- **Tailwind CSS** - Utility-first CSS framework for responsive design

### 🔙 **Backend Services**
- **Supabase** - PostgreSQL database with real-time subscriptions and authentication
- **NextAuth.js v5** - Authentication with OAuth providers and email magic links
- **Stripe** - Payment processing and subscription management

### 📞 **VoIP Integration (Planned)**
- **SIP.js** - WebRTC signaling for browser-based calling
- **VoIP.ms** - SIP provider for phone number routing and PSTN connectivity
- **WebRTC** - Peer-to-peer audio communication

## Project Structure

```
├── app/                    # Next.js App Router pages and layouts
│   ├── api/               # API routes for authentication, payments, VoIP
│   ├── app/               # Main application pages (contacts, calling interface)
│   └── (auth)/            # Authentication-related pages
├── components/            # Reusable React components
│   ├── ui/               # Base UI components (buttons, forms, modals)
│   ├── app/              # Application-specific components
│   └── voip/             # VoIP calling interface components (planned)
├── lib/                  # Shared utilities and configurations
│   ├── auth.ts           # NextAuth.js configuration
│   └── supabase/         # Supabase client utilities
├── docs/specs/           # Project specifications and task planning
└── types/                # TypeScript type definitions
```

## Development Status

This project is currently in **Phase 1: Foundation** with a solid authentication and payment infrastructure built on the SaaS foundation. The VoIP calling features are planned for subsequent phases.

### ✅ Completed
- Project setup with Next.js 15 and TypeScript
- Supabase integration with authentication
- NextAuth.js with Google OAuth and email authentication
- Stripe payment integration with subscription tiers
- Responsive UI components and design system

### 🔄 In Progress
- VoIP-specific database schema design
- Contact management system architecture
- WebRTC and SIP.js integration planning

### 📋 Upcoming
- Browser-based calling interface
- Contact management with phone number validation
- Call history and quality tracking
- CSV import/export functionality
- Timezone-aware batch calling features

## Contributing

This project follows a structured development approach with detailed specifications in the `docs/specs/` directory. Please refer to the task breakdown and design documents for implementation guidance.

## Support

For questions about the VoIP implementation or project architecture, please refer to:
- `docs/specs/voip-web-calling-app/design.md` - Technical architecture
- `docs/specs/voip-web-calling-app/requirements.md` - Functional requirements
- `CLAUDE.md` - Development guidance for Claude Code

For issues or feature requests, please open an issue in this repository.
