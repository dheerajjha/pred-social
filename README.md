# Pred-Social: Stock Prediction Social Platform

A transparent scoreboard for stock market opinions where retail investors can make public predictions with automatic verification.

## 🎯 Core Features

- **Public Predictions**: Make structured predictions about stock prices with automatic deadline-based verification
- **Stock Accounts**: Follow stocks like $HDFCBANK to see all related news and predictions
- **Social Feed**: Personalized timeline combining followed stocks, users, and communities
- **Auto-Verification**: Cron-based scoring engine that automatically marks predictions as HIT/MISS
- **Communities**: Join topic-based groups like #OptionsIndia for focused discussions

## 🏗️ Architecture

### Tech Stack
- **Frontend**: React + Next.js for web, React Native (Expo) for mobile
- **Backend**: NestJS microservices with TypeScript
- **Database**: PostgreSQL (main), Redis (cache/queues), ClickHouse (analytics)
- **Message Bus**: Redis Streams (MVP), upgrade to Kafka for scale
- **Market Data**: Upstox WebSocket API v3 for live prices
- **Auth**: Kite Connect OAuth 2.0 + email/OTP fallback

### Microservices

| Service | Port | Description | Status |
|---------|------|-------------|---------|
| gateway | 5010 | GraphQL API Gateway with auth guards | ✅ Implemented |
| auth-svc | 5011 | Authentication & JWT management | 🚧 Pending |
| user-svc | 5012 | User profiles & follow graph | 🚧 Pending |
| prediction-svc | 5013 | Prediction CRUD & validation | 🚧 Pending |
| scoring-worker | 5014 | Auto-verification engine | 🚧 Pending |
| feed-svc | 5015 | Timeline generation & caching | 🚧 Pending |
| market-ingest | 5016 | Market data WebSocket ingestion | 🚧 Pending |
| news-ingest | 5017 | News & corporate actions ingestion | 🚧 Pending |
| notify-svc | 5018 | Push/email notifications | 🚧 Pending |
| comm-svc | 5019 | Communities & hashtags | 🚧 Pending |

## 🚀 Getting Started

### Prerequisites
- Node.js >= 18
- pnpm >= 8
- Docker & Docker Compose

### Setup

1. Clone the repository:
```bash
git clone https://github.com/dheerajjha/pred-social.git
cd pred-social
```

2. Install dependencies:
```bash
pnpm install
```

3. Create environment file:
```bash
cp env.example .env
# Edit .env with your API keys (JWT_SECRET, Kite Connect, Upstox credentials)
```

4. Start infrastructure (PostgreSQL & Redis):
```bash
docker compose -f docker/docker-compose.yml up -d
```

5. Run database migrations:
```bash
cd packages/prisma-schema
npx prisma migrate dev
```

6. Seed the database (optional):
```bash
npx prisma db seed
```

7. Start development:
```bash
cd ../..
pnpm dev
```

### Accessing Services

- **GraphQL Playground**: http://localhost:5010/graphql
- **pgAdmin**: http://localhost:5050 (admin@pred-social.com / admin_password)
- **Redis Commander**: http://localhost:8081
- **Prisma Studio**: Run `cd packages/prisma-schema && npx prisma studio`

### Demo Credentials

After running the seed script, you can login with:
- **Email**: demo@pred-social.com
- **Password**: demo123

## 📦 Project Structure

```
pred-social/
├── apps/                    # Microservice applications
│   ├── gateway/            # GraphQL API Gateway (implemented)
│   ├── auth-svc/          # Authentication service (pending)
│   ├── user-svc/          # User management (pending)
│   ├── prediction-svc/    # Predictions service (pending)
│   ├── scoring-worker/    # Verification worker (pending)
│   ├── feed-svc/         # Feed generation (pending)
│   ├── market-ingest/    # Market data ingestion (pending)
│   ├── news-ingest/      # News ingestion (pending)
│   ├── notify-svc/       # Notifications (pending)
│   └── comm-svc/         # Communities (pending)
├── packages/              # Shared packages
│   ├── common/           # Shared DTOs, utils, guards (partial)
│   ├── prisma-schema/    # Database schema (implemented)
│   └── ui/              # React component library (pending)
├── docker/               # Docker configurations
└── env.example          # Environment variables template
```

## 🗄️ Database Schema

The database schema includes the following main entities:

- **User**: User accounts with authentication and profile information
- **Stock**: Tradable assets (stocks, indices, ETFs)
- **Prediction**: User predictions with automatic verification
- **Community**: Topic-based discussion groups
- **Follow/StockFollow**: Social graph for users and stocks
- **NewsArticle**: News and corporate actions
- **PriceHistory**: Historical price data for backtesting
- **Notification**: Multi-channel notification system

### Seed Data

The database comes pre-populated with:
- Demo users (demo@pred-social.com, johndoe)
- Popular Indian stocks (RELIANCE, TCS, HDFCBANK, INFY, NIFTY)
- Sample predictions
- Communities (Options India, Value Investing)

## 🔄 Event Flow

### Prediction Creation & Scoring
```
1. User creates prediction via Gateway
2. prediction-svc validates & stores in PostgreSQL
3. Emits `prediction.created` to Redis Stream
4. scoring-worker schedules verification job
5. On deadline, fetches market price
6. Updates prediction status (HIT/MISS)
7. Emits `prediction.scored` event
8. notify-svc sends push notification
```

## 🗓️ Development Roadmap

### Phase 1: MVP (12-16 weeks)
- [x] Project setup & architecture
- [x] Database schema design
- [x] Gateway service with GraphQL
- [x] Basic auth module structure
- [x] Database migrations
- [x] Seed data setup
- [ ] Complete auth microservice
- [ ] User service implementation
- [ ] Basic prediction CRUD
- [ ] Manual verification
- [ ] Stock account pages
- [ ] Simple feed algorithm
- [ ] Auto-verification engine

### Phase 2: Enhancement
- [ ] Mobile apps
- [ ] Advanced feed ranking
- [ ] Gamification (badges, leaderboards)
- [ ] Options & crypto predictions

### Phase 3: Monetization
- [ ] Premium analytics
- [ ] Sponsored communities
- [ ] Real-time feed upgrades
- [ ] Brokerage partnerships

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Upstox for market data APIs
- Kite Connect for OAuth integration
- NestJS community for the excellent framework