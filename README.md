# Optimism - Making Impact

## About env files

- Use `.env` for **shareble** environment variables
- Use `.env.local` for **private and local** environment variables

> See: [This link](https://vite.dev/guide/env-and-mode#env-files) for env conventions on this project

## Setting up the project

Get a database to use locally, as for example, this docker compose file spins up a postgres instance and exposes it on port 5434
It should be placed on the api folder as it uses environment variables from the .env.local file

```bash
name: making-impact-optimism

services:
  dev-db:
    image: postgres:16
    ports:
      - '5434:5432'
    env_file:
      - .env.local
    networks:
      - making-impact-optimism

networks:
  making-impact-optimism:
```

Now that the db is ready, run migrations on it from the api scripts using `pnpm prisma:migrate:deploy` or execute something that also executes it as it is
`pnpm dev`

Finally, you can populate the local db with data from the seed using the api script `pnpm prisma:db:seed`

If you had already run `pnpm dev` on another instance, refresh and data should be now shown!

Your project should be all setup, running `pnpm dev` from the root should spin up api and frontend gracefully

## Activating GitHub Workflow

The GitHub workflow is currently deactivated. To enable it, rename the `.github/workflows-off` folder to `.github/workflows`.
