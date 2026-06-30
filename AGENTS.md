# AGENTS.md — QuickSum.AI

This file gives AI coding agents a concise project map and the conventions they should follow.

---

## Project overview

QuickSum.AI is a three-service application:
- Frontend: React + Vite + Tailwind
- Node backend: Express.js + Sequelize (MySQL/MariaDB)
- AI backend: FastAPI + z.ai GLM-4.5-Air

User flow:
- browser → frontend
- frontend → `POST /api/summary` on node backend
- node backend → `POST /summarize` on AI backend
- AI backend → z.ai API

---

## Current status

- Frontend is the main gap: UI exists, but validation, backend integration, and user feedback need polish.
- Node backend exists and should be consumed by the frontend through the existing contract.
- AI backend should only be modified through `backend/ai-backend/app/` routing and service code.

---

## Essential files

### Frontend
- `vite.config.js`
- `package.json`
- `frontend/index.html`
- `frontend/src/main.jsx`
- `frontend/src/App.jsx`
- `frontend/src/services/api.js`
- `frontend/src/hooks/useSummarize.js`
- `frontend/src/hooks/useClipboard.js`
- `frontend/src/components/SummarizeForm.jsx`
- `frontend/src/components/FileUpload.jsx`
- `frontend/src/components/OutputArea.jsx`
- `frontend/src/components/LoadingSpinner.jsx`
- `frontend/src/components/ToastNotification.jsx`
- `frontend/src/components/ThemeToggle.jsx`
- `frontend/src/styles/index.css`
- `frontend/src/styles/App.css`

### Node backend
- `backend/node-backend/server.js`
- `backend/node-backend/routes/summaryRoutes.js`
- `backend/node-backend/controllers/summaryController.js`
- `backend/node-backend/services/aiService.js`
- `backend/node-backend/middlewares/validateMiddleware.js`
- `backend/node-backend/utils/responseHandler.js`

### AI backend
- `backend/ai-backend/run.py`
- `backend/ai-backend/app/main.py`
- `backend/ai-backend/app/routes/summarize.py`
- `backend/ai-backend/app/services/ai_service.py`
- `backend/ai-backend/app/core/config.py`

---

## API contract

- Frontend should POST to `/api/summary` with JSON body:
  - `text` (string)
  - `length` (string or number)
- Keep frontend requests in `frontend/src/services/api.js`.
- Do not change the request/response schema without coordination.

---

## Environment variables

- Frontend: `VITE_API_BASE_URL`
- Node backend: `AI_BACKEND_URL`, `MONGODB_URI`, `JWT_SECRET`
- AI backend: `GLM_API_KEY`

> Do not hardcode secrets or API keys in source code.

---

## Conventions

### Frontend
- Use React functional components.
- Keep reusable behavior in `src/hooks/`.
- Keep UI in components and network/business logic in hooks/services.
- Use CSS variables and tokens from `design-system/quicksum.ai/MASTER.md`.
- Keep the UI responsive and accessible.

### Node backend
- Keep business logic in `services/`, not in `routes/`.
- Use centralized error handling in `middlewares/errorMiddleware.js`.
- Use `utils/responseHandler.js` for consistent API responses.

### AI backend
- Keep routing in `app/routes/` and AI logic in `app/services/ai_service.py`.
- Read config from `app/core/config.py`.

---

## Development commands

- Frontend: `npm install` then `npm run dev` from repo root.
- Node backend: `cd backend/node-backend && npm install && npm run dev`
- AI backend: `cd backend/ai-backend && pip install -r requirements.txt && python run.py`

---

## Design system reference

- Use `design-system/quicksum.ai/MASTER.md` as the authoritative UI guide.
- Do not duplicate design system rules in code; follow them.

---

## Key constraints

- Do not change endpoint contracts without coordination.
- Do not hardcode environment values or API keys.
- Do not add business logic to route definitions.
- Keep frontend updates responsive and preserve file upload UX.
- Keep frontend HTTP requests centralized in `frontend/src/services/api.js`.

---

## Notes for AI agents

- Treat `AGENTS.md` as the canonical project guide.
- The root `README.md` is primarily the default Vite template and should not be treated as the product spec.
- Only rely on `design-system/quicksum.ai/MASTER.md` for styling rules.
