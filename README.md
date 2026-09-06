# UniFlow

A productivity app for students to manage their calendar, tasks, and workflow in one place.

## Status

Version 2.0.0 — authentication and calendar management are working.

## What works right now

**Auth**
- Register with email verification
- Login with JWT
- Password reset, strength check, bcrypt hashing
- User preferences (theme, notifications, timezone)

**Calendar**
- Month/week/day/agenda views
- Create, edit, delete, complete events
- Event types: class, assignment, personal, meeting, study, exam, project, other
- Recurring events (daily/weekly/monthly/yearly)
- Reminders, attendees, priority levels, locations
- Color-coded by event type

## Stack

- React 18 + TypeScript + Vite
- Tailwind + shadcn/ui
- Dexie (IndexedDB) for local storage
- JWT + bcrypt for auth
- React Hook Form + Zod
- React Context for state
- React Router

## Demo account

```
demo@uniflow.com
demo123
```

## Roadmap

- **v3.0**: notes with markdown/syntax highlighting, folders, search, tags, export to PDF/markdown
- **v4.0**: Spotify, MyFitnessPal, Strava integrations; general API integration system
- **v5.0**: 2FA, offline mode, backups, analytics, cross-platform

## Getting started

```
git clone <repository-url>
cd uniflow-new
npm install
npm run dev
```

Then open `http://localhost:5173`.

Scripts: `npm run dev`, `npm run build`, `npm run preview`, `npm run lint`

## Structure

```
src/
├── components/ui/       shadcn components
├── contexts/             AuthContext
├── hooks/                use-toast
├── lib/                  auth, database, demo-setup
├── pages/
│   ├── auth/              login, register, verify, forgot/reset password
│   ├── Dashboard.tsx
│   ├── Index.tsx
│   └── NotFound.tsx
└── App.tsx
```

## Security notes

- Passwords hashed with bcrypt (12 salt rounds)
- Email verification required for account activation
- All data stored locally in IndexedDB, sensitive fields encrypted at rest
- Input validated with Zod, errors don't leak internal info

## Design

- Colors: red `#ef4444`, blue `#3b82f6`
- Font: Inter
- Mobile-first, built on shadcn/ui

## Contributing

Fork it, branch off, commit, push, open a PR.

## License

MIT — see LICENSE.

## Support

Open an issue on the Issues page or reach out to the dev team.
