# Journey360 – Deep Analysis: Frontend Flow & Architecture

This document details the frontend architecture, screen-wise flows, component structure, and backend integration for Journey360.

## 1. Frontend System Overview

*   **Architecture Pattern**: Component-driven SPA
*   **Framework**: React + Vite (implied structure)
*   **Styling**: Tailwind CSS
*   **Routing**: React Router
*   **State Management**: Context API + Hooks
*   **Authentication**: Firebase Client SDK
*   **API Communication**: Axios

## 2. Global Frontend Architecture
```
frontend/
 ├── src/
 │   ├── components/
 │   │   ├── common/         # Buttons, loaders, modals
 │   │   ├── layout/         # Navbar, Sidebar, Footer
 │   │   ├── auth/           # Login, Signup UI
 │   │   ├── dashboard/      # Trip creator UI
 │   │   ├── itinerary/      # Timeline + map
 │   │   ├── assistant/      # AI chat UI
 │   │   ├── safety/         # Risk & alerts UI
 │   │   └── summary/        # Post-trip view
 │   ├── pages/              # Route-level screens
 │   ├── context/            # AuthContext, TripContext
 │   ├── services/           # API wrappers
 │   ├── hooks/              # Custom hooks
 │   ├── utils/              # Helpers
 │   └── App.jsx
```

## 3. Screen-by-Screen Frontend Flow

### 🖥️ SCREEN 1: Login / Signup
*   **Goal**: Authenticate user and initialize session.
*   **Flow**:
    1.  User logs in via Firebase Auth.
    2.  Firebase returns ID Token.
    3.  Frontend calls backend `POST /auth/verify-token`.
    4.  Stores profile in `AuthContext`.
    5.  Redirects to `/dashboard`.

### 🖥️ SCREEN 2: Dashboard / AI Trip Creator
*   **Goal**: Collect trip intent.
*   **Flow**:
    1.  User fills input (Destination, Dates, Budget, etc.).
    2.  Clicks "Generate Itinerary".
    3.  API: `POST /trip/create` -> `POST /ai/itinerary/generate`.
    4.  Redirect to `/trip/{tripId}/itinerary`.

### 🖥️ SCREEN 3: Itinerary Details + Map
*   **Goal**: Visualize plan.
*   **Flow**:
    1.  Fetch `GET /trip/{tripId}/itinerary`.
    2.  Render Timeline & Map.
    3.  User clicks "Regenerate".
    4.  API `POST /ai/itinerary/regenerate`.
    5.  Update UI.

### 🖥️ SCREEN 4: AI Travel Assistant (Chat)
*   **Goal**: RAG Chat.
*   **Flow**:
    1.  User sends message.
    2.  API `POST /ai/chat`.
    3.  Backend returns response.
    4.  Chat history updates.

### 🖥️ SCREEN 5: Safety Center
*   **Goal**: Real-time safety.
*   **Flow**:
    1.  Poll `GET /ai/safety/risk`.
    2.  Render alerts/map.
    3.  SOS Trigger `POST /sos/trigger`.

### 🖥️ SCREEN 6: Post-Trip Summary
*   **Goal**: Analytics/Memories.
*   **Flow**:
    1.  Fetch `GET /trip/{tripId}/summary`.
    2.  Show stats and narrative.

## 4. integration Pattern
`User Action` -> `React Component` -> `Service Layer` -> `Backend API` -> `Response` -> `UI Update`
