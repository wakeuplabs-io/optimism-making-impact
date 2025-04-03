# Testing Instructions

## Prerequisites

Before running tests, ensure you have a **PostgreSQL database** running and properly configured. You need to populate your `.env.test` file with the following environment variables:

```ini
DB_URL=<url for your db>
DB_URL_NON_POOLING=<direct url for your db> # Direct connection to the database. Used for migrations.
POSTGRES_PASSWORD=<your-password>
```

## Running Tests

To run tests, simply execute the following command from this directory:

```sh
npm run test
```

This will automatically reset the database, apply migrations, seed the database and execute the test suite.

## Notes

- Make sure your **PostgreSQL instance is running** before executing the tests.
- If using a connection pooler like **PgBouncer**, ensure it's configured correctly.
- The **`DB_URL_NON_POOLING`** variable should be used for migrations to avoid connection issues.

Happy testing! 🚀
