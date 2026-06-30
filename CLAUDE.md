# Confluence Scraper

## What this is

A Node.js service that periodically scrapes all spaces, pages, and attachments from a Confluence Cloud instance and exposes them via a REST API. The data is consumed by a web app that renders a space→page hierarchy with page content.

**Confluence instance:** `https://clover-exercise.atlassian.net/wiki`  
**Auth:** HTTP Basic — credentials live in an `.env` file (not committed).  
**API:** Confluence REST API v2 (`/api/v2/`)

## Requirements

- Periodically scrape Confluence spaces and pages
- Persist data behind a Data Access Layer (SQLite via `better-sqlite3`)
- Scrape and store page attachments
- REST endpoint: `GET /api/pages/recent` — 10 last modified pages

## Planned structure

```
src/
  confluence/   # API client + types
  dal/          # Data Access Layer (repositories + DB init)
  scraper/      # Scrape orchestration + cron scheduler
  api/          # Express routes
  index.ts      # Entry point
data/           # SQLite DB + attachment files (git-ignored)
```

## Stack

- **Runtime:** Node.js + TypeScript (strict mode)
- **Server:** Express
- **HTTP client:** axios
- **Database:** SQLite via better-sqlite3
- **Scheduler:** node-cron

## Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | ts-node + nodemon (hot reload) |
| `npm run build` | Compile to `dist/` |
| `npm start` | Run compiled output |
| `npm run type-check` | Type-check without emitting |

## Code standards

- Strict TypeScript — no `any`, explicit return types on public functions
- No comments unless the *why* is non-obvious
- All DB access through the DAL repositories — no raw SQL outside `dal/`
- Upserts everywhere — the scraper must be idempotent
- Log errors with a `[module]` prefix; never swallow silently
