# Frontend AC2D (Next.js)

## Lancer uniquement le frontend en Docker

```bash
# Depuis le dossier frontend
cp .env.docker.example .env.docker # optionnel si vous voulez surcharger l'URL API
cd frontend
FRONTEND_PORT=3000 NEXT_PUBLIC_API_URL=http://localhost:8075 docker compose up -d frontend
```

- Le conteneur expose le port 3000 par défaut.
- `NEXT_PUBLIC_API_URL` pointe par défaut vers `http://localhost:8075` (le backend via Apache).

## Lancer le frontend + backend avec le docker-compose racine

```bash
# À la racine du dépôt
BACKEND_PORT=8075 FRONTEND_PORT=3000 docker compose up -d
```

- Tous les services partagent le réseau `workshop-client.network`.
- Le frontend consomme l'API via `http://backend-apache` dans le réseau Docker (alias par défaut) ; depuis votre machine, utilisez `http://localhost:${BACKEND_PORT}`.

## Développement local (hors Docker)

```bash
npm install
npm run dev
```

Assurez-vous que `NEXT_PUBLIC_API_URL` est défini dans votre environnement ou un fichier `.env.local`.
