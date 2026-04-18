# Location Intelligence Platform (India-Focused)

Professional full-stack starter for an AI-enabled location intelligence product.

## Monorepo Structure

- `frontend/` – React + Vite UI (modern glassmorphism dashboard)
- `backend/` – Node.js + Express API with modular architecture and AI advisor endpoint
- `.env.example` – Detailed in-house environment template covering AI, geospatial, mobility, analytics, and ops.

## Tech Stack

### Frontend
- React 18 + Vite
- React Router
- Recharts for dashboard visualizations
- Axios client
- Lucide icons

### Backend
- Node.js + Express
- Zod validation
- OpenAI integration (optional with fallback)
- Helmet, CORS, Morgan

## Quick Start

```bash
# install dependencies
npm install --prefix backend
npm install --prefix frontend

# run backend
npm run dev --prefix backend

# run frontend
npm run dev --prefix frontend
```

## Core API Endpoints

- `GET /health` – service health
- `GET /api/location/dashboard` – KPI + hotspot dashboard payload
- `POST /api/location/analyze` – location scoring + recommendations
- `POST /api/location/advisor` – AI strategy response

## Product Coverage in this Scaffold

- Location analysis
- Opportunity and growth scoring
- AI business advisor workflow
- Dashboard with hotspots and operational KPIs
- Professional folder structure for scale-out modules (risk, migration, ads intelligence, reports)

## Environment Setup

1. Copy `.env.example` to `.env`
2. Fill keys for providers you plan to use first (OpenAI + maps + data providers)
3. Configure frontend `VITE_*` keys and backend runtime/security keys

> This scaffold uses mock/synthetic data by default where no external keys are configured.
