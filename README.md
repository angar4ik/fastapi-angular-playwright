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
4. **Even though tests fail**, the workflow uploads the HTML report as an artifact:
   - `playwright-report-*` — full HTML report with traces, screenshots, videos

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

## Viewing the HTML report locally

Download the `playwright-report-*` artifact from the GitHub Actions run summary, extract the zip, then serve it with Playwright's built-in server (required — the trace viewer won't work over `file://`):

```bash
npx playwright show-report ~/Downloads/playwright-report-29479285603-1
```

This opens the report in your browser at `http://localhost:9323` — traces, screenshots, and videos all work.
