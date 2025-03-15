# @optimism-making-impact/prisma

## Overview

This package exports the **Prisma Client** to interact with the database.

One of the convenient features of Prisma Client is its ability to **automatically read environment variables directly from the environment where it is being executed, rather than from the environment where it was generated.** This ensures that the database connection configurations can be dynamic, and you don’t need to worry about re-generating Prisma Client for different environments.

## Features

- **Environment Variable Management**: Prisma Client reads environment variables directly from the environment in which it runs, enabling dynamic configuration of database connections.
- **No Need for Regeneration**: The client will work seamlessly across different environments without requiring you to regenerate Prisma Client or adjust configurations manually.

## Environment Variables

Prisma Client relies on specific environment variables for configuring the database connection. The most commonly used environment variable is:

- **`DB_URL`**: Defines the connection string for your database.
- **`DB_URL_NON_POOLING`**: Defines the connection string for your database that is not used for connection pooling.
- **`POSTGRES_PASSWORD`**
