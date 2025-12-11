# Frontend AC2D (Next.js)

## Lancer uniquement le frontend en Docker (production)

```bash
# Depuis le dossier frontend
cp .env.docker.example .env.docker # optionnel si vous voulez surcharger l'URL API ou le port
docker compose up -d frontend
```

- Le conteneur expose le port 3000 par défaut.
- `NEXT_PUBLIC_API_URL` pointe par défaut vers `http://localhost:8075` (le backend via Apache en local).

## Lancer le frontend en mode développement (hot reload)

```bash
# Depuis le dossier frontend
cp .env.docker.example .env.docker
docker compose -f docker-compose.dev.yml up
```

- Monte le code source local dans le conteneur et relance automatiquement lors des modifications.
- Le réseau Docker `workshop-client.network` doit exister (il est créé automatiquement lorsque vous lancez le docker-compose racine ou peut être créé via `docker network create workshop-client.network`).

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
