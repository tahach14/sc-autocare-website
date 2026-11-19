# SC Autocare — PERN website

Premium responsive multi-page website built with React + Vite and Express + PostgreSQL.

## Pages
- Home
- Services and individual service detail pages
- Packages
- About
- Gallery
- Contact / booking enquiry

## Run frontend
```bash
cd client
npm install
npm run dev
```
Vite runs at http://localhost:5173 and proxies local `/api` requests to Express at port 5000.

## Run backend
```bash
cd server
npm install
```
Create `server/.env` using `.env.example`, set `DATABASE_URL`, create the database and run `server/schema.sql`, then:
```bash
npm run dev
```

## Vercel deployment
Deploy the `client` folder with Root Directory `client`, Build Command `npm run build`, Output Directory `dist`.
Deploy `server` separately to a Node hosting provider and configure `DATABASE_URL`, `CLIENT_ORIGIN`, and `NODE_ENV=production`.
Set `VITE_API_URL` in Vercel to the deployed backend base URL (without a trailing slash), then redeploy. Locally, `/api` uses Vite's proxy.

## Before launch
Replace `YOUR-DOMAIN.com` in `client/public/robots.txt` and `sitemap.xml`. Add the verified business address, phone, opening hours, service area, and social profile URLs before publishing.

The $120 and $140 package prices were retained from the supplied project; confirm them before publishing. Gallery photos are illustrative stock photography and should be replaced with SC Autocare's own completed-work photos. No address, phone, opening hours, or service area was supplied, so none have been invented.
