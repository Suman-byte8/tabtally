# 🍽️ TabTally Backend

> REST API server for **TabTally**, a mobile-first app for splitting restaurant bills.

![Node](https://img.shields.io/badge/node-v26.13.1-green) ![Express](https://img.shields.io/badge/express-5.3.0-black) ![PostgreSQL](https://img.shields.io/badge/postgresql-18.7-blue)

### 🧰 Tech Stack

| Package | Version | Purpose |
|---------|---------|---------|
| [express](https://www.npmjs.com/package/express) | ^5.3.0 | HTTP server and routing |
| [body-parser](https://www.npmjs.com/package/body-parser) | ^2.4.0 | Parses JSON and URL-encoded request bodies |
| [cors](https://www.npmjs.com/package/cors) | ^2.8.6 | Enables Cross-Origin Resource Sharing |
| [dotenv](https://www.npmjs.com/package/dotenv) | ^18.0.10 | Loads environment variables from `.env.*` files |
| [postgres](https://www.npmjs.com/package/postgres) | ^4.1.1 | PostgreSQL client (installed, **currently unused**) |
| [nodemon](https://www.npmjs.com/package/nodemon) | ^3.1.14 | Auto-restarts the server on file changes (dev) |
| [pg](https://www.npmjs.com/package/pg) | ^8.23.1 | PostgreSQL client used by `src/config/db.js` (⚠️ declared in the **repo root** `package.json`, not in `backend/package.json`) |

---

## 📑 Table of Contents

1. [Prerequisites](#-prerequisites)
2. [Installation & Setup](#-installation--setup)
3. [Project Folder Structure](#-project-folder-structure)
4. [Environment Variables](#-environment-variables)
5. [Database Architecture](#-database-architecture)
6. [API Documentation](#-api-documentation)
   - [GET /](#1-get-)
   - [GET /health](#2-get-health)
   - [GET /test-db](#3-get-test-db)
7. [Middleware Used](#-middleware-used)
8. [Error Handling](#-error-handling)
9. [Scripts](#-scripts)
10. [Status Codes Used](#-status-codes-used)
11. [Future Improvements / TODOs](#-future-improvements--todos)
12. [Change Log](#-change-log)

---

## ✅ Prerequisites

| Tool | Version | Notes |
|------|---------|-------|
| Node.js | v26.13.1 (tested) | Any recent LTS should work |
| npm | Bundled with Node | Package manager |
| PostgreSQL | 18.x (tested on 18.7) | Must be running locally on port `5432` |
| Bruno *(optional)* | Latest | API collection lives in `../tabtally-bruno-api-docs/` |

---

## ⚙️ Installation & Setup

```bash
# 1. Clone the repository
git clone https://github.com/Suman-byte8/tabtally.git
cd tabtally

# 2. Install root dependencies (provides `pg`)
npm install

# 3. Install backend dependencies
cd backend
npm install

# 4. Create the database (in psql or pgAdmin)
#    CREATE DATABASE tabtally_db;

# 5. Create the environment file
#    backend/.env.development (see below)

# 6. Start the dev server
npm run dev
```

The server loads `.env.${NODE_ENV}` (defaults to `.env.development`). The path is resolved relative to the current working directory, so **run the server from the `backend/` folder**.

### `.env.development` structure

```env
PORT = 8000
DATABASE_URL = postgres://postgres:********@localhost:5432/tabtally_db
NODE_ENV = development
```

> 🔒 `.env`, `.env.development` and `.env.production` are git-ignored. Never commit them.

---

## 📂 Project Folder Structure

```
backend/
├── .env.development      # Local development environment variables (git-ignored)
├── .env.production       # Production environment variables (git-ignored)
├── .gitignore            # Ignores node_modules and env files
├── package.json          # Backend metadata, scripts and dependencies
├── package-lock.json     # Locked dependency tree
├── README.md             # This documentation
└── src/
    ├── index.js          # Entry point: loads env file and starts the HTTP server
    ├── server.js         # Express app: middleware + route definitions
    ├── config/
    │   └── db.js         # PostgreSQL connection pool (pg) and query helper
    ├── controller/       # Route controllers (empty, reserved)
    ├── middlewares/      # Custom middleware (empty, reserved)
    ├── routes/           # Route modules (empty, reserved)
    └── utils/            # Utility helpers (empty, reserved)
```

---

## 🔐 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Port the HTTP server listens on (falls back to `3000` if unset) | `8000` |
| `DATABASE_URL` | PostgreSQL connection string used by the `pg` pool | `postgres://postgres:****@localhost:5432/tabtally_db` |
| `NODE_ENV` | Selects which env file is loaded (`.env.<NODE_ENV>`); defaults to `development` | `development` |

---

## 🗄️ Database Architecture

- **Database:** `tabtally_db` (PostgreSQL)
- **Connection:** `pg.Pool` created in `src/config/db.js` from `DATABASE_URL`
- **Exports:** `{ pool, query }` where `query(text, params)` runs a parameterized query
- **Idle client errors** are logged and the process exits with code `-1`

### Tables

_No tables have been created yet._ This section will document every table (columns, constraints, relationships, `CREATE TABLE` SQL and ER description) as they are added.

---

## 📡 API Documentation

Base URL (development): `http://localhost:8000`

No route requires authentication yet. No route takes path, query or body parameters yet.

---

### 1. `GET /`

| Field | Value |
|-------|-------|
| Method | `GET` |
| Endpoint | `/` |
| Description | Welcome message for the API |
| Auth Required | No |
| Content-Type | `text/html; charset=utf-8` (response) |

**Headers:** None required.

**Path / Query Parameters:** None. **Request Body:** None.

✅ **Success Response — `200 OK`**

```text
Welcome to the TabTally API!
```

---

### 2. `GET /health`

| Field | Value |
|-------|-------|
| Method | `GET` |
| Endpoint | `/health` |
| Description | Health check confirming the server is up |
| Auth Required | No |
| Content-Type | `application/json` (response) |

**Headers:** None required.

**Path / Query Parameters:** None. **Request Body:** None.

✅ **Success Response — `200 OK`**

```json
{
  "status": "OK",
  "message": "Server is running!"
}
```

---

### 3. `GET /test-db`

| Field | Value |
|-------|-------|
| Method | `GET` |
| Endpoint | `/test-db` |
| Description | Runs `SELECT NOW()` to verify the PostgreSQL connection |
| Auth Required | No |
| Content-Type | `application/json` (response) |

**Headers:** None required.

**Path / Query Parameters:** None. **Request Body:** None.

✅ **Success Response — `200 OK`**

```json
{
  "message": "Database connection successful!",
  "time": "2026-11-16T18:00:52.116Z"
}
```

❌ **Error Response — `500 Internal Server Error`** (e.g. database down or wrong credentials)

```json
{
  "message": "Database connection failed.",
  "error": "connect ECONNREFUSED 127.0.0.1:5432"
}
```

---

### ❌ Unknown routes — `404 Not Found`

No custom 404 handler exists; Express returns its default HTML response:

```text
Cannot GET /unknown-route
```

---

## 🧩 Middleware Used

| Middleware | Purpose | Scope |
|------------|---------|-------|
| `cors()` | Allows cross-origin requests from any origin | Global |
| `bodyParser.json()` | Parses `application/json` request bodies into `req.body` | Global |
| `bodyParser.urlencoded({ extended: true })` | Parses `application/x-www-form-urlencoded` bodies | Global |

---

## 🚨 Error Handling

- **No global error handler** or custom error classes exist yet.
- `/test-db` wraps its query in `try/catch`, logs the error to the console and responds with `500` and `{ message, error }`.
- Unhandled routes fall through to Express's default `404` response.
- The `pg` pool listens for `error` on idle clients, logs it and calls `process.exit(-1)`.

---

## 📜 Scripts

| Script | Command | Description |
|--------|---------|-------------|
| `dev` | `nodemon src/index.js` | Starts the server with auto-reload |
| `test` | `echo "Error: no test specified" && exit 1` | Placeholder; no tests yet |

---

## 🔢 Status Codes Used

| Code | Meaning | Used In |
|------|---------|---------|
| `200` | OK | `GET /`, `GET /health`, `GET /test-db` |
| `404` | Not Found | Any undefined route (Express default) |
| `500` | Internal Server Error | `GET /test-db` on database failure |

---

## 📝 Future Improvements / TODOs

- [ ] Add `pg` to `backend/package.json` (currently only in the repo root `package.json`)
- [ ] Remove the unused `postgres` package, or switch `db.js` to it
- [ ] Add a `start` script for production (`node src/index.js`)
- [ ] Resolve the env file path relative to the backend folder instead of the working directory
- [ ] Create database tables and migrations
- [ ] Move routes into `src/routes` and logic into `src/controller`
- [ ] Add a global error handler and a JSON 404 handler
- [ ] Add authentication
- [ ] Add tests

---

## 📅 Change Log

| Version | Date | Changes Made |
|---------|------|--------------|
| 1.0.0 | 2026-11-16 | Initial Express server with PostgreSQL (`pg`) connection; `/`, `/health` and `/test-db` routes; env file selected by `NODE_ENV`; README added |
