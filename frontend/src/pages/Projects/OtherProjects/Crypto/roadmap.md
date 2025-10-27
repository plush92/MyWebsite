# 🧭 MacroEdge Dashboard — 90-Day Roadmap

**Goal:** Build a full-stack macro & market data dashboard (Python + React) that visualizes economic trends, market signals, and insights — and evolve it into a professional or monetizable product.

## 🗓️ Phase 1 — Core Foundation (Weeks 1–4)

**Goal:** Connect real APIs, get your first charts live, deploy a working prototype.

### ✅ Week 1 — Setup & Architecture

- [ ] Create GitHub repo: `macroedge-dashboard`
- [ ] Set up backend (FastAPI) and frontend (Next.js)
- [ ] Install dependencies:
  ```bash
  pip install pandas requests fastapi uvicorn yfinance
  npm create next-app@latest macroedge-frontend
  ```
- [ ] Define project structure (`/backend`, `/frontend`, `/data`)
- [ ] Deploy "Hello world" backend + frontend (Render + Vercel)

**📦 Deliverable:** Minimal connected FastAPI + React app running online.

### ✅ Week 2 — Economic Data Integration

- [ ] Create FRED API key and test endpoints
- [ ] Fetch and store GDP, CPI, unemployment, Fed Funds Rate
- [ ] Add backend routes:
  - `/api/macro/gdp`
  - `/api/macro/cpi`
- [ ] Save results in CSV/SQLite for quick testing

**📦 Deliverable:** Backend returns real economic data as JSON.

### ✅ Week 3 — Market Data Integration

- [ ] Add yfinance for S&P 500, NASDAQ, DXY
- [ ] Add CoinGecko API for BTC & ETH
- [ ] Store 90-day historical data
- [ ] Frontend displays live market prices with React hooks

**📦 Deliverable:** Live cards showing S&P 500 & BTC prices.

### ✅ Week 4 — Initial Visualization

- [ ] Install recharts or plotly.js
- [ ] Create charts for:
  - GDP growth
  - CPI trend
  - S&P 500 vs BTC
- [ ] Add Tailwind styling for layout

**📦 Deliverable:** MVP dashboard with 3–4 charts.

## 🧠 Phase 2 — Analytics & Insight Layer (Weeks 5–8)

**Goal:** Add real analysis — not just charts, but correlations, insights, and summaries.

### ✅ Week 5 — Historical Analysis

- [ ] Add rolling averages, YoY changes, correlations
- [ ] New endpoint: `/api/analytics/correlation`
- [ ] Display correlation heatmap or table

**📦 Deliverable:** Backend computes real macro relationships.

### ✅ Week 6 — Market Sentiment Summary

- [ ] Create logic for automatic summary:
  ```python
  if inflation_down and rates_flat:
      outlook = "Risk-on"
  ```
- [ ] Return this summary in `/api/summary`
- [ ] Add color-coded outlook panel (bullish / neutral / bearish)

**📦 Deliverable:** Dynamic "Market Conditions" summary panel.

### ✅ Week 7 — Economic Calendar

- [ ] Integrate EconDB API or Trading Economics API
- [ ] Show next 7 days of macro events
- [ ] Highlight high-impact releases (CPI, FOMC, Jobs)

**📦 Deliverable:** Economic calendar dashboard section.

### ✅ Week 8 — UI / UX Polish

- [ ] Add navigation tabs: Macro | Markets | Crypto | Calendar
- [ ] Improve layout, padding, and typography
- [ ] Add dark/light mode toggle

**📦 Deliverable:** Professional-looking, intuitive dashboard.

## 💡 Phase 3 — Monetization & Professionalization (Weeks 9–12)

**Goal:** Turn it into a real product or professional showcase.

### ✅ Week 9 — Portfolio Module

- [ ] Add input for user tickers (e.g., "AAPL, TSLA, BTC")
- [ ] Calculate basic portfolio correlation to macro signals
- [ ] Display "Portfolio Risk Snapshot"

**📦 Deliverable:** Personalized portfolio insights.

### ✅ Week 10 — Narrative / AI Summary (Optional)

- [ ] Use OpenAI API (or local logic) to summarize key trends
- [ ] Auto-generate daily/weekly insights:
  > "CPI fell again this month; equities recovering after Fed comments."

**📦 Deliverable:** Market narrative panel or "AI summary box."

### ✅ Week 11 — Deployment & Demo

- [ ] Deploy backend (Render)
- [ ] Deploy frontend (Vercel)
- [ ] Write a README with setup instructions
- [ ] Record a Loom demo walkthrough

**📦 Deliverable:** Public live app + GitHub + demo video.

### ✅ Week 12 — Outreach & Monetization

- [ ] Write a Medium/LinkedIn post describing the project
- [ ] Share in r/fintech, Indie Hackers, dev/finance Discords
- [ ] Gather feedback: "Which features would you pay for?"
- [ ] Identify 1–2 possible paid add-ons (alerts, premium analytics)

**📦 Deliverable:** Public launch + first user feedback.

## 🧩 Stretch Ideas (Optional)

- [ ] Add authentication (Supabase / Auth0)
- [ ] Save favorite indicators per user
- [ ] Add crypto on-chain data (Glassnode, Santiment)
- [ ] Generate PDF "macro snapshot" reports
- [ ] Offer paid API access or dashboard tiers

## 🧱 Core Tech Stack

| Layer           | Tools                                                   |
| --------------- | ------------------------------------------------------- |
| **Backend**     | FastAPI, pandas, requests, yfinance                     |
| **Frontend**    | Next.js (React + TypeScript), Tailwind, recharts/plotly |
| **Deployment**  | Render (API) + Vercel (Frontend)                        |
| **Data APIs**   | FRED, CoinGecko, EconDB/TradingEconomics                |
| **Optional AI** | OpenAI API for summaries                                |
