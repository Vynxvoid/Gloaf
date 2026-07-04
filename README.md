# Gloaf

A two-sided food-ordering platform with a **Customer** app and a **Restaurant Partner** dashboard.
Built as a monorepo: a React + Vite frontend and an Express backend that combines **Prisma (PostgreSQL)** for relational data with **MongoDB (Mongoose)** for profile, cart, and geo-indexed documents.

---

## Table of Contents
1. [Architecture Overview](#architecture-overview)
2. [Repository Layout](#repository-layout)
3. [Tech Stack](#tech-stack)
4. [Data Model](#data-model)
5. [Authentication Flow](#authentication-flow)
6. [API Surface](#api-surface)
7. [Frontend Routes](#frontend-routes)
8. [Local Setup](#local-setup)
9. [Environment Variables](#environment-variables)
10. [Scripts & Deployment](#scripts--deployment)
11. [Project Status / Known Gaps](#project-status--known-gaps)

---

## Architecture Overview

```
┌──────────────────────┐        HTTPS / cookies        ┌──────────────────────────┐
│  React + Vite SPA    │  ───────────────────────────▶ │   Express API (Node)     │
│  (Customer / Partner)│  ◀───── JWT (access)  ─────── │   /api/*                 │
└──────────────────────┘                                │                          │
                                                        │   ┌────────────────┐    │
                                                        │   │ Prisma client  │──▶ PostgreSQL
                                                        │   └────────────────┘    │   (users, restaurants,
                                                        │   ┌────────────────┐    │    menu, orders, payments)
                                                        │   │ Mongoose       │──▶ MongoDB
                                                        │   └────────────────┘    │   (carts, profiles,
                                                        │   ┌────────────────┐    │    geo-indexed locations)
                                                        │   │ Passport+Google│    │
                                                        │   └────────────────┘    │
                                                        └──────────────────────────┘
```

**Why the hybrid DB?** Relational data with strict shape (users, restaurants, menu items, orders, payments) lives in Postgres via Prisma. Flexible, frequently-updated documents — shopping carts, multiple addresses per user, restaurant menu snapshots with 2dsphere geo-indexes — live in MongoDB.

In production the Express server also serves the built frontend (`FrontEnd/dist`) and falls back to `index.html` for SPA routing — see [BackEnd/src/app.js:32-37](BackEnd/src/app.js#L32-L37).

---

## Repository Layout

```
Gloaf/
├── package.json              # Root orchestrator (concurrent dev, fullstack build)
├── BackEnd/
│   ├── package.json
│   └── src/
│       ├── index.js          # Boot: connect Mongo, start Express
│       ├── app.js            # Express app, CORS, routers, prod static fallback
│       ├── constants.js      # Shared cookie `options`
│       ├── config/
│       │   └── cloudinary.js # Cloudinary SDK init (image uploads)
│       ├── controllers/
│       │   ├── login.controllers.js     # /login/sso
│       │   ├── signup.controllers.js    # /signup/sso (+ deleteAll)
│       │   ├── oAuth.controllers.js     # Google OAuth callback
│       │   ├── user.controllers.js      # Customer CRUD (Prisma + Mongo profile)
│       │   ├── partner.controllers.js   # Restaurant CRUD
│       │   ├── search.controllers.js    # (stub)
│       │   ├── Customer/                # (empty — scaffolded)
│       │   └── Restaurant/              # (empty — scaffolded)
│       ├── routes/
│       │   ├── login.routes.js
│       │   ├── signup.routes.js
│       │   ├── oAuth.routes.js
│       │   ├── user.routes.js           # (empty router — scaffolded)
│       │   └── partner.routes.js        # (empty router — scaffolded)
│       ├── middlewares/
│       │   ├── oauth.js                 # jwtsign / jwtVerifyAccess / jwtVerifyRefresh
│       │   ├── googleOAuth.js           # Passport Google strategy
│       │   └── multer.js                # File-upload middleware
│       ├── db/
│       │   ├── prisma/
│       │   │   ├── schema.prisma        # Postgres schema
│       │   │   └── migrations/
│       │   └── MongoDB/
│       │       └── index.js             # Mongoose models + connect()
│       └── utils/
│           └── bcryptor.js              # hashing / dehashing
└── FrontEnd/
    ├── package.json
    ├── vite.config.js                   # Vite + React + Tailwind v4
    ├── index.html
    └── src/
        ├── main.jsx                     # Root, Suspense, RouterProvider
        ├── router.jsx                   # All routes
        ├── Pages/
        │   ├── login.jsx, signup.jsx
        │   ├── Loading.jsx
        │   ├── Home/                    # Public landing + about
        │   ├── Layouts/                 # HomeLayout / CustomerLayout / PartnerLayout
        │   ├── customer/                # Home, Search, Orders, Cart, Checkout,
        │   │                            # Chef, Profile, Address, Restaurant detail
        │   ├── restaurant/              # Home, Menu, Orders, Review, Settings,
        │   │                            # Analytics, Notifications
        │   ├── Profile Pages/           # UserProfile / PartnerProfile
        │   └── Error Pages/             # ErrorPage
        ├── Components/
        │   ├── Headers/                 # HomePageHeader, CustomerHeader, PartnerHeader
        │   ├── Footer/, SideBar/
        │   └── Utilities/               # Cards, BasicUtils, ImageSlider, AnimatedBackground
        ├── Api/
        │   ├── PostApi.jsx              # loginPost / signupPost / checkToken
        │   ├── UserApi.jsx, PartnerApi.jsx
        ├── Functions/
        │   └── TokenAuthorizer.jsx      # AuthProvider + useAuth (token persistence)
        ├── utils/
        │   └── constants.jsx            # axios `api` instance, restaurantCatalog, banners
        └── assets/                      # Images
```

---

## Tech Stack

**Frontend** — see [FrontEnd/package.json](FrontEnd/package.json)
- React **19**, React Router **v7**, Vite **7**
- Tailwind CSS **v4** (via `@tailwindcss/vite`)
- Axios, react-cookie, react-icons, react-bootstrap, framer-motion

**Backend** — see [BackEnd/package.json](BackEnd/package.json)
- Node + Express **5** (CommonJS)
- Prisma **5** (PostgreSQL)
- Mongoose **9** (MongoDB)
- Passport + `passport-google-oauth20`
- `jsonwebtoken`, `bcrypt`, `cookie-parser`, `cors`, `dotenv`
- Cloudinary + `multer-storage-cloudinary` for image uploads

**Tooling** — Nodemon, Prettier, ESLint, `concurrently` (root dev script).

---

## Data Model

### Prisma / PostgreSQL — [BackEnd/src/db/prisma/schema.prisma](BackEnd/src/db/prisma/schema.prisma)

| Model | Purpose | Key fields |
|---|---|---|
| `User` | Customers | `UserID`, `Email` (unique), `accType` (`GOOGLE` \| `EMAIL`), `Password?`, `externalRef?` |
| `Restaurant` | Partners | `RestaurantID`, `Email` (unique), `Password`, `Phone`, `status` (`OPEN`/`CLOSED`) |
| `MenuItem` | Per-restaurant menu | `ItemID`, `RestaurantID`, `Tag`, `ItemName`, `ItemPrice`, `isAvailable` (`YES`/`NO`) |
| `Order` | A placed order | `OrderID`, `UserID`, `RestaurantID`, `Amount`, `status` (PLACED→DELIVERED/CANCELLED) |
| `OrderItem` | Line items | `OrderID`, `MenuItemID`, `ItemName`, `ItemPrice`, `Quantity` |
| `Payment` | 1:1 with `Order` | `Method` (UPI/CARD/NETBANKING/COD), `Status`, `Transaction_reff` |

Enums: `AccType`, `RestaurantStatus`, `Availability`, `OrderStatus`, `PaymentStatus`, `PaymentMethod`.
Datasource uses `env("DIRECT_URL")` — set `DIRECT_URL` (not `DATABASE_URL`) for Prisma migrations.

### MongoDB / Mongoose — [BackEnd/src/db/MongoDB/index.js](BackEnd/src/db/MongoDB/index.js)

| Collection | Shape |
|---|---|
| `Cart` | `{ userID, restaurantID, items: [{ menuItemID, quantity }] }` (timestamped) |
| `userProfile` | `{ userID, Phone: [Number], address: [{ label, street, City, Pincode, geoLocation: GeoJSON Point }] }` — `2dsphere` index on `coordinates` |
| `restaurantProfile` | `{ restaurantID, menu: [{ menuItemID, name, price, imageURL, tag }], rating: { average, count }, geoLocation: GeoJSON Point }` — `2dsphere` index |

Customer/restaurant rows are created in both stores at signup ([user.controllers.js:16-27](BackEnd/src/controllers/user.controllers.js#L16-L27), [partner.controllers.js:13-23](BackEnd/src/controllers/partner.controllers.js#L13-L23)).

---

## Authentication Flow

There are two entry points:

**1. Email/password** — [BackEnd/src/controllers/login.controllers.js](BackEnd/src/controllers/login.controllers.js)
- `POST /api/signup/sso` and `POST /api/login/sso` accept `{ type: "Customer" | "Partner", ... }`.
- The controller dispatches to `userLoginSearch` / `partnerLoginSearch` (Prisma + bcrypt compare).
- On success, two tokens are minted via [middlewares/oauth.js:10](BackEnd/src/middlewares/oauth.js#L10):
  - **Refresh token** (10 days) → `refreshToken` cookie (httpOnly).
  - **Access token** (1 day) → returned in the JSON body, also stashed in `localStorage` by the frontend.
- An `accountType` cookie records `Customer` vs `Partner`.

**2. Google OAuth** — [BackEnd/src/controllers/oAuth.controllers.js](BackEnd/src/controllers/oAuth.controllers.js)
- `GET /api/auth/google` → `passport.authenticate('google', { scope: ['email','profile'] })`.
- `GET /api/auth/google/callback` → on success, mints both tokens and **302-redirects** to `${FRONTEND_URL}/customer/home?accessToken=...`.
- The frontend `AuthProvider` picks the token off the URL query, stores it in `localStorage`, sets the `Authorization: Bearer ...` header on the shared axios instance, and strips the query string ([TokenAuthorizer.jsx:12-41](FrontEnd/src/Functions/TokenAuthorizer.jsx#L12-L41)).

**Token verification** — `jwtVerifyAccess` reads `Authorization: Bearer <token>`. If access verification fails it falls through to `jwtVerifyRefresh`, mints a new access token, and returns it via the `Authorization` response header. Two secrets are used: `JWT_SECRET_ACCESS` and `JWT_SECRET_REFRESH`.

---

## API Surface

Mounted in [BackEnd/src/app.js:24-28](BackEnd/src/app.js#L24-L28):

| Method | Path | Handler | Notes |
|---|---|---|---|
| `POST` | `/api/signup/sso` | `signupSSO` | Body: `{ type, Name, Email, accType, Password?, Phone? }` |
| `DELETE` | `/api/signup/sso/deleteAll` | `deleteAllSSO` | Wipes users & partners — **dev only** |
| `POST` | `/api/login/sso` | `loginSSO` | Body: `{ type, Email, Password }` |
| `GET` | `/api/auth/google` | `signupGoogle()` | Starts Google OAuth |
| `GET` | `/api/auth/google/callback` | `signupGoogleCallback` | Redirects to frontend with `accessToken` |
| `POST` | `/api/auth/` | `jwtVerifyAccess` | Token validation endpoint used by `checkToken()` |
| `*` | `/api/user/*` | — | Router currently empty (scaffolded) |
| `*` | `/api/partner/*` | — | Router currently empty (scaffolded) |

CORS is locked to `process.env.CORS_ORIGIN` with `credentials: true`.

---

## Frontend Routes

Defined in [FrontEnd/src/router.jsx](FrontEnd/src/router.jsx):

| Path | Layout | Component |
|---|---|---|
| `/` | `HomeLayout` | `Home` |
| `/about` | `HomeLayout` | `About` |
| `/login`, `/signup` | — | `Login`, `Signup` |
| `/customer/home` | `CustomerLayout` | `CustomerHome` |
| `/customer/collection` | `CustomerLayout` | `SearchPage` |
| `/customer/orders` | `CustomerLayout` | `OrderPage` |
| `/customer/chef` | `CustomerLayout` | `ChefPage` |
| `/customer/cart` | `CustomerLayout` | `CartPage` |
| `/customer/checkout` | `CustomerLayout` | `CheckOut` |
| `/customer/profile` | `CustomerLayout` | `Profile` |
| `/customer/address` | `CustomerLayout` | `AddressPage` |
| `/customer/settings` | `CustomerLayout` | `UserProfile` |
| `/customer/restaurant/:restaurantSlug` | `CustomerLayout` | `Restaurant` |
| `/partner/home` | `PartnerLayout` | `DashboardHome` |
| `/partner/menu` | `PartnerLayout` | `Menu` |
| `/partner/order` | `PartnerLayout` | `Order` |
| `/partner/review` | `PartnerLayout` | `Review` |
| `/partner/info` | `PartnerLayout` | `Info` (Analytics) |
| `/partner/alert` | `PartnerLayout` | `Notifications` |
| `/partner/settings` | `PartnerLayout` | `Setting` / `PartnerProfile` |

> Note: the `<AuthProvider>` wrapper around the `/customer` subtree is currently commented out — routes are not yet protected client-side.

---

## Local Setup

**Prerequisites:** Node.js 18+ (16 may work), npm, a reachable PostgreSQL instance, a reachable MongoDB instance, and (for image uploads) a Cloudinary account.

```bash
# 1. Clone
git clone https://github.com/Vynxvoid/Gloaf.git
cd Gloaf

# 2. Install everything (backend + frontend) and generate Prisma client
npm run install-all
npm run prisma-generate

# 3. Apply Prisma migrations to your Postgres DB
cd BackEnd
npx prisma migrate dev --schema=src/db/prisma/schema.prisma

# 4. Run both apps concurrently from the repo root
cd ..
npm run dev
```

- Frontend dev server: http://localhost:5173 (Vite default)
- Backend dev server: http://localhost:8000 (the frontend's `baseServerURL` expects this — [FrontEnd/src/utils/constants.jsx:34](FrontEnd/src/utils/constants.jsx#L34))

If you change Prisma `schema.prisma`, run `npx prisma generate` then `npx prisma migrate dev --name <change>`.

---

## Environment Variables

Create `BackEnd/.env`:

```
# Server
PORT=8000
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
FRONTEND_URL=http://localhost:5173

# Prisma / Postgres
DIRECT_URL=postgresql://user:pass@host:5432/gloaf

# MongoDB
MONGODB_URL_DEV=mongodb://localhost:27017/gloaf

# JWT (two separate secrets — see middlewares/oauth.js)
JWT_SECRET_ACCESS=replace-me-access
JWT_SECRET_REFRESH=replace-me-refresh

# Google OAuth
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
GOOGLE_CALLBACK_URL=http://localhost:8000/api/auth/google/callback

# Cloudinary (image uploads)
CLOUDINARY_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_SECRET_KEY=...
```

> The cookie `options` in [BackEnd/src/constants.js](BackEnd/src/constants.js) use `secure: false` and `sameSite: "lax"` for local dev. Flip `secure` to `true` and revisit `sameSite` before deploying behind HTTPS.

---

## Scripts & Deployment

**Root** ([package.json](package.json)):
- `npm run install-all` — install both workspaces
- `npm run prisma-generate` — generate Prisma client
- `npm run build-frontend` — `vite build` into `FrontEnd/dist`
- `npm run build` — install + Prisma generate + frontend build (the full deploy build)
- `npm run start` — start the backend in prod mode
- `npm run dev` — run backend (`nodemon`) and frontend (`vite`) concurrently

**Backend** ([BackEnd/package.json](BackEnd/package.json)):
- `npm run dev` → `nodemon src/index.js`
- `npm start` → `node src/index.js`
- `npm run build` → install + `prisma generate`

**Frontend** ([FrontEnd/package.json](FrontEnd/package.json)):
- `npm run dev`, `npm run build`, `npm run preview`, `npm run lint`

**Production model:** the deploy is a single-process Express app. `npm run build` produces `FrontEnd/dist`; `npm start` runs the API and (when `NODE_ENV=production`) statically serves the SPA from the same origin, with `index.html` fallback for client-side routes — [BackEnd/src/app.js:32-37](BackEnd/src/app.js#L32-L37).

---

## Project Status / Known Gaps

This is an in-progress codebase. As of the current branch:

- **Empty route files** — `routes/user.routes.js`, `routes/partner.routes.js`, and the `routes/Customer/` & `routes/Restaurant/` folders are scaffolded but not wired up. No `/api/user` or `/api/partner` endpoints exist yet.
- **Search not implemented** — [search.controllers.js](BackEnd/src/controllers/search.controllers.js) exports a stub.
- **`userFinder`** in [user.controllers.js:92-107](BackEnd/src/controllers/user.controllers.js#L92-L107) has a latent bug: it calls `prisma.findUnique(...)` (missing the `.user` model) and is not exported.
- **`partnerLoginSearch`** calls `dehashing` without importing it — see [partner.controllers.js:46](BackEnd/src/controllers/partner.controllers.js#L46).
- **Auth guard is disabled** — the customer subtree in [router.jsx:62-66](FrontEnd/src/router.jsx#L62-L66) wraps `<AuthProvider>` in a comment.
- **Cloudinary** — `connectCloudinary` is defined but never invoked at boot; multer disk storage is configured but no upload route exists yet.
- **Mixed module systems** — most backend files are CommonJS (`require`), but `multer.js`, `cloudinary.js`, and `search.controllers.js` use ESM `import`/`export`. These will fail to load under the current `"type": "commonjs"` setting and need converting.
- **Mongoose deserializer** — [googleOAuth.js:27-29](BackEnd/src/middlewares/googleOAuth.js#L27-L29) references an undefined `id`; Passport sessions are disabled (`session: false`) so this isn't currently exercised, but it should be fixed.

---

## Contact

Maintainer: **Vynxvoid** — https://github.com/Vynxvoid/Gloaf