# Todo App

Simple application de gestion de tâches construite avec React, TypeScript et TailwindCSS pour le cours de DevOps

## Fonctionnalités

- Authentification utilisateur (inscription, connexion, déconnexion)
- Gestion complète des todos (création, affichage, mise à jour, suppression)
- Interface utilisateur responsive
- Design minimaliste inspiré d'Apple et Instagram
- Tests end-to-end avec Playwright
- Tests unitaires avec Jest

## Prérequis

- Node.js 16+
- npm ou yarn

## Installation

1. Clonez ce dépôt:

   ```
   git clone https://github.com/ottodpc/cicd
   cd cicd/app
   ```

2. Installez les dépendances:

   ```
   npm install
   ```

   ou

   ```
   yarn install
   ```

3. Configurez les variables d'environnement en créant un fichier `.env.local`:
   ```
   REACT_APP_API_URL=http://localhost:3000
   ```

## Exécution

### Développement

```
npm start
```

ou

```
yarn start
```

L'application sera disponible à l'adresse [http://localhost:3000](http://localhost:3000).

### Production

```
npm run build
```

ou

```
yarn build
```

Les fichiers optimisés pour la production seront générés dans le dossier `build`.

## Tests

### Tests unitaires

```
npm test
```

ou

```
yarn test
```

### Tests end-to-end

```
npm run test:e2e
```

ou

```
yarn test:e2e
```

## Docker

### Construire l'image

```
docker build -t cyprienotto/cfainstaclient .
```

### Exécuter le conteneur

```
docker run -p 80:80 cyprienotto/cfainstaclient
```

L'application sera disponible à l'adresse [http://localhost](http://localhost).

## Structure du projet

```
app/
├── public/               # Fichiers statiques
├── src/
│   ├── assets/           # Images, polices, etc.
│   ├── components/       # Composants React réutilisables
│   ├── pages/            # Pages de l'application
│   ├── services/         # Services API et logique métier
│   ├── tests/            # Tests unitaires et end-to-end
│   ├── types/            # Définitions de types TypeScript
│   ├── utils/            # Fonctions utilitaires
│   ├── App.tsx           # Composant principal de l'application
│   ├── index.tsx         # Point d'entrée de l'application
│   └── routes.tsx        # Configuration des routes
├── .dockerignore
├── .gitignore
├── Dockerfile
├── package.json
├── README.md
└── tsconfig.json
```

## API Backend

Cette application frontend communique avec une API backend NestJS. Les principales routes utilisées sont:

- `/v1/users` - Gestion des utilisateurs
- `/v1/todos` - Gestion des todos
- `/health` - Vérification de l'état du service

## Licence :

MIT
