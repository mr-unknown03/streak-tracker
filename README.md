# Daily Learning Streak Tracker

A full-stack web application built with Next.js (App Router), TypeScript, and Tailwind CSS designed to help students maintain consistent daily study habits by tracking their learning streaks.

## Features

- Dashboard: Real-time overview showing current streak, total active study days, and the last recorded session.
- Streak Tracking: Visual streak counter with progression messaging based on consecutive activity.
- Session Logging: Single-click mechanism to record daily study activity, with built-in duplicate prevention.
- Study History: Chronological log of all historical study sessions.
- Dark Theme: Fully responsive UI optimized for dark mode environments.
- Toast Notifications: Real-time feedback for user actions.

## Project Structure

```
app/
├── page.tsx              - Redirects to /dashboard
├── layout.tsx            - Root layout (Navbar, Toaster, global wrappers)
├── globals.css           - Global styling and Tailwind directives
├── dashboard/
│   └── page.tsx          - Main dashboard view
├── history/
│   └── page.tsx          - Study history tabular view
└── api/
    ├── study/route.ts    - POST /api/study (record session)
    ├── streak/route.ts   - GET  /api/streak (fetch streak info)
    └── history/route.ts  - GET  /api/history (fetch dates)

components/
├── Navbar.tsx            - Navigation component
├── StreakCard.tsx        - Statistics display cards
├── StudyButton.tsx       - Interactive logging component
└── HistoryList.tsx       - List view for past sessions

hooks/
└── useStudyData.ts       - State management for local data and API sync

lib/
├── streakLogic.ts        - Core business logic for streak calculations
└── store.ts              - Server-side validation store
```

## Setup and Installation

### Prerequisites

- Node.js 18 or higher
- npm or yarn package manager

### Installation Steps

```bash
# Clone the repository
git clone <repository-url>
cd streak-tracker

# Install dependencies
npm install

# Start the development server
npm run dev
```

The application will be available at http://localhost:3000.

## Streak Calculation Logic

The application calculates the user's active streak based on consecutive daily entries. The rules are structured as follows:

| Condition | Outcome |
|---|---|
| Active session logged today | Streak increments (or initializes at 1) |
| Active session yesterday + today | Streak increments |
| Gap day (no session logged) | Streak resets |
| No historical data | Streak is 0 |

**Calculation Example:**
```
March 10: Session Logged -> Streak: 1
March 11: Session Logged -> Streak: 2
March 12: Session Logged -> Streak: 3
March 13: No Session Logged
March 14: Session Logged -> Streak: 1
```

The core implementation is maintained in `lib/streakLogic.ts`:
- `todayString()`: Normalizes local dates to `YYYY-MM-DD` string format.
- `calculateStreak(dates)`: Processes chronological arrays to determine `{ currentStreak, totalDays, lastStudyDate }`.
- `formatDate(dateStr)`: Handles presentational date formatting.

## Storage Architecture

Study dates are persisted client-side using browser `localStorage` under the `streak_tracker_dates` key, structured as a JSON array of ISO date strings.

The backend API routes (`/api/study`, `/api/streak`, `/api/history`) provide a validation layer. They process incoming arrays, execute business logic (such as duplicate checks and streak derivation), and return the validated state. This architecture is designed to easily accommodate a migration to a persistent database layer in the future.

## Deployment

This application is ready for deployment on Vercel.

1. Push the local repository to GitHub.
2. Import the repository in the Vercel dashboard.
3. Keep default build settings (Vercel automatically detects Next.js configurations).
4. Deploy the application.

## Technical Stack

Framework - Next.js 14 (App Router)
Language - TypeScript
Styling - Tailwind CSS
Persistence - LocalStorage
Icons - lucide-react
Notifications - react-hot-toast

I chose LocalStorage for persistence to keep the app lightweight and ensure user data never leaves the browser. Using react-hot-toast helped me create a more interactive user experience for streak updates.

## License

This project is licensed under the [MIT License](LICENSE).
