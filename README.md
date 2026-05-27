# Carvery

Carvery is an online wood carving simulator, or so I dream.

## Tech Stack

- Frontend: Next.js 16, React 19, TypeScript
- API: .NET 10, ASP.NET Core, EF Core 10
- Database: SQL Server 2022 (Docker)
- ThreeJS

## Prerequisites

- Node.js 20+
- npm 10+
- .NET SDK 10
- Docker Desktop

# Getting Started

## 1. Install Required Tools

### Install Docker
https://www.docker.com/products/docker-desktop/

### Install mise
Follow instructions at https://mise.jdx.dev/getting-started.html

**Windows users with Scoop:** https://scoop.sh/
```
scoop install mise
```



In root, run:
```powershell
  mise install
```

mise will automatically install:
- Node.js 24
- .NET SDK 10


## 2. Configure Environment Variables

### Root Directory (For Docker)
From repository root:

  copy .env.example .env

Edit `.env` and set a strong password for `MSSQL_SA_PASSWORD`.

### Frontend (Next.js)
From apps/carvery:

  copy .env.example .env.local

The defaults should work for local development.

### API (ASP.NET Core)
From apps/Carvery.Api:

  copy appsettings.Development.json.example appsettings.Development.json

Edit `appsettings.Development.json` and update the `DefaultConnection` password to match your `MSSQL_SA_PASSWORD` from root `.env`.

## 3. Install All Dependencies

From repo root:

```
  mise run install
  ```

This installs both API (.NET) and frontend (npm) dependencies automatically.

## 4. Start Docker Database (SQL Server)

Configure root `.env` first (step 2). Then from repo root:

```
  mise run docker:compose
```

This runs `docker compose up -d` and starts the `carvery-sql` container on port 1433.

You can skip this step when using `mise run dev` or `mise run api:watch` — those tasks depend on `docker:compose` and start Docker automatically before the app.

Check container status:

```
  mise run docker:status
```

Stop containers:

```
  mise run docker:down
```

## 5. Create Database Schema

From repository root:

```
  mise run db:update
```

## 6. Run Everything

From root:

```
  mise run dev
```

This starts Docker Compose (if not already running), then the API (http://localhost:5027) and frontend (http://localhost:3000) with hot reload enabled.

## 7. Local Development

Open http://localhost:3000


## Common mise Tasks

View all available tasks:

```
  mise tasks
```

Useful commands:
- `mise run dev` - Start Docker Compose, then API and frontend
- `mise run install` - Install all dependencies
- `mise run test` - Run all tests
- `mise run clean` - Clean build artifacts
- `mise run docker:compose` - Start SQL Server via Docker Compose
- `mise run docker:up` - Alias for `docker:compose`
- `mise run docker:down` - Stop Docker containers
- `mise run docker:status` - Check Docker container status
- `mise run db:update` - Apply database migrations
- `mise run db:list` - List all migrations
- `mise run api:watch` - Start Docker Compose, then run only the API
- `mise run api:test` - Run only API tests
- `mise run web:dev` - Run only the frontend
