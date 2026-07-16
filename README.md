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
2. Angular app is built and served on port 4200
3. Playwright runs all 6 tests (3 pass, 3 fail)
4. **Even though tests fail**, the workflow uploads:
   - `playwright-traces-*` — traces, screenshots, videos from `test-results/`
   - `playwright-report-*` — HTML report (if generated)

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

## Trace artifacts

After a run, traces are stored in `e2e/test-results/`.  
Open them with:

```bash
npx playwright show-trace e2e/test-results/<path>/trace.zip
```

In the GitHub Actions pipeline, download the `playwright-traces-*` artifact from the run summary and inspect failed test traces locally.
