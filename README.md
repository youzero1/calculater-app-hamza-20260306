# Calculator App

A modern, fully-functional calculator web application built with Next.js, TypeScript, and SQLite.

## Features

- 🔢 **Full Calculator** - Basic arithmetic, decimals, percentages, sign toggle
- 📜 **History** - All calculations saved to SQLite database
- 🔍 **Search** - Search through your calculation history
- 📤 **Share** - Generate shareable links for calculations
- 🌐 **Public Feed** - Browse publicly shared calculations
- ⌨️ **Keyboard Support** - Full keyboard input support

## Tech Stack

- **Next.js 15** with App Router
- **TypeScript**
- **TypeORM** with **better-sqlite3**
- **CSS Modules** for styling
- **Docker** for containerization

## Getting Started

### Development

```bash
npm i
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Docker

```bash
docker-compose up -d
```

### Environment Variables

| Variable | Default | Description |
|---|---|---|
| `DATABASE_PATH` | `./data/calculator.db` | Path to SQLite database |
| `NEXT_PUBLIC_BASE_URL` | `http://localhost:3000` | Base URL for share links |

## Project Structure

```
src/
├── app/           # Next.js App Router pages and API routes
├── components/    # React components
├── entities/      # TypeORM entities
├── lib/           # Database and calculator utilities
└── types/         # TypeScript type definitions
```
