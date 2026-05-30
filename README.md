# MoodyFoodz 🍜

MoodyFoodz is an AI-powered restaurant recommendation platform that analyzes a user's mood and preferences to suggest the best nearby dining options. Using location services and restaurant data, it provides personalized recommendations, menu previews, ratings, and route guidance based on how far the user is willing to travel.

## How It Works

1. User describes their mood and sets their preferences (dietary restrictions, cuisine type, max travel time)
2. The app geocodes their location and searches nearby restaurants via Google Places
3. Claude AI ranks the results based on mood and preferences, explaining why each restaurant is a good fit
4. User picks a restaurant and gets directions via Google Maps

## Tech Stack

**Frontend**
- React + Tailwind CSS + shadcn/ui
- Framer Motion
- TanStack Query
- Google Maps (directions via URL)

**Backend**
- Node.js + Express
- Anthropic Claude API
- Google Maps Platform (Places API, Geocoding API, Distance Matrix API)

**Infrastructure**
- Backend: Google Cloud Run
- Frontend: Cloudflare Pages

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/recommendations` | Get ranked restaurant recommendations |
| GET | `/api/restaurant/:id` | Get details for a specific restaurant |
| GET | `/api/restaurant/:id/route` | Get route to a restaurant |

### POST `/api/recommendations` Request Body

```json
{
  "userMood": "tired and want something cozy",
  "userCurrentAddress": "123 Main St, New York, NY",
  "distance": 15,
  "dietary": "halal",
  "cuisinePreference": "italian"
}
```

## Getting Started

### Prerequisites
- Node.js 18+
- Google Maps API Key
- Anthropic API Key

### Installation

```bash
git clone https://github.com/yourusername/moodyfoodz.git
cd moodyfoodz/backend
npm install
```

### Environment Variables

Create a `.env` file in the backend folder:

```
ANTHKEY=your_anthropic_api_key
GOOGLEAPI=your_google_maps_api_key
PORT=8080
```

### Running Locally

```bash
npm run dev
```

## Deployment

Backend is containerized with Docker and deployed to Google Cloud Run. Frontend is hosted on Cloudflare Pages.
