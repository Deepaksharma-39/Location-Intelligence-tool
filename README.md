# Location Intelligence Platform (India-Focused)

Full-stack JavaScript starter with authentication, MongoDB, map intelligence, and AI advisory workflows.

## Projects
- `backend/`: Node.js + Express + MongoDB + JWT auth
- `frontend/`: React + Vite + Leaflet map UI

## Key Features Implemented
- User authentication: register, login, profile (`/api/auth/*`)
- MongoDB integration with Mongoose user model
- Map intelligence:
  - geocode location search
  - nearby place discovery by category (cafe, restaurant, hotel, theatre, gym)
  - city-wide listing queries (e.g., all listed cafes in Delhi)
- AI workflow:
  - ask AI questions using map-derived place datasets
  - examples: footfall strategy, nearby business mix opportunities

## API Endpoints
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `GET /api/map/geocode?query=Delhi`
- `POST /api/map/nearby`
- `POST /api/map/city`
- `POST /api/intelligence/ask`
- Existing location endpoints remain under `/api/location/*`

## Quick Start
```bash
npm install --prefix backend
npm install --prefix frontend

npm run dev --prefix backend
npm run dev --prefix frontend
```

## Example Flows
1. Register/Login.
2. Open **Map Intelligence** page.
3. Search/pin location on map.
4. Request nearby `cafe`/`gym`/`hotel` etc.
5. Ask AI: "Give me footfall details and nearby opportunity insights."
6. Query city lists: "All listed restaurants in Delhi" using city mode.
