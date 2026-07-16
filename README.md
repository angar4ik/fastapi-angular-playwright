# FastAPI + Angular + Playwright — E2E Trace Artifact Demo

A minimal project demonstrating **Playwright trace artifacts** being uploaded to a **GitHub Actions pipeline run**, even when tests fail.

## Project structure

```
├── backend/          FastAPI REST API (Python)
│   ├── app/
│   │   ├── main.py
│   │   ├── models.py
│   │   └── routers/items.py
│   └── requirements.txt
├── frontend/         Angular 18 SPA (TypeScript)
│   └── src/app/
│       ├── items/    Items component + service
│       └── ...
├── e2e/              Playwright E2E tests
│   ├── tests/
│   │   ├── passing.spec.ts    ✅ 3 tests that pass
│   │   └── failing.spec.ts    ❌ 3 tests that fail (on purpose)
│   └── playwright.config.ts
└── .github/
    └── workflows/
        └── e2e-tests.yml      CI pipeline with artifact upload
```

## What happens in CI

1. FastAPI backend starts on port 8000
2. Angular dev server starts on port 4200 (with API proxy to backend)
3. Playwright runs all 6 tests (3 pass, 3 fail)
4. **Even though tests fail**, the workflow:
   - Deploys the HTML report to **GitHub Pages** (traces ✅, screenshots ✅, videos ❌ — see below)
   - Uploads `playwright-report-*` as a downloadable artifact (everything works locally)

## Run locally

```bash
# Terminal 1 — Backend
cd backend
pip install -r requirements.txt
uvicorn app.main:app --port 8000 --reload

# Terminal 2 — Frontend
cd frontend
npm install
npx ng serve --port 4200

# Terminal 3 — E2E tests
cd e2e
npm install
npx playwright install chromium --with-deps
npx playwright test --trace on
```

## Viewing reports

### GitHub Pages (quick preview)
After each push, the report is deployed to:
```
https://angar4ik.github.io/fastapi-angular-playwright/
```
Traces and screenshots work. **Videos don't play** — GitHub Pages serves `.webm` files with the wrong MIME type (a known limitation).

### Local (everything works)
Download the `playwright-report-*` artifact from the run summary, extract, then serve locally:

```bash
npx playwright show-report ~/Downloads/playwright-report-12345678-1
```

This opens at `http://localhost:9323` — traces, screenshots, **and videos** all work.
