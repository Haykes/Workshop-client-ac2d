# Workshop Client

Full-stack workspace combining the Symfony backend API and the Next.js frontend. Docker compose files are provided to run everything quickly for local development or demos.

## Quick start (frontend + backend)

From the repository root:

```bash
# Optional: override default ports
BACKEND_PORT=8075 FRONTEND_PORT=3000 docker compose up -d
```

- Backend API will be available on `http://localhost:${BACKEND_PORT:-8075}`.
- Frontend will be available on `http://localhost:${FRONTEND_PORT:-3000}`.
- Containers share the `workshop-client.network` network. The frontend reaches the API through the internal hostname `http://backend-apache`.

## Run only the frontend in Docker

```bash
cd frontend
# Optional: override API URL or exposed port
FRONTEND_PORT=3000 NEXT_PUBLIC_API_URL=http://localhost:8075 docker compose up -d frontend
```

By default the frontend expects the API at `http://localhost:8075` when accessed from your machine.

## Local frontend development (no Docker)

```bash
cd frontend
npm install
npm run dev
```

Set `NEXT_PUBLIC_API_URL` in your shell or `.env.local` so the app can reach the backend.

## Linting

```bash
npm run lint --prefix frontend
```

Run this command from the repository root to check the frontend code style.
