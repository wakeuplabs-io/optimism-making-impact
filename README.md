# Optimism Retro Impact Guidelines - WakeUp Labs

Welcome to the [WakeUp Labs](https://www.wakeuplabs.io/) Optimism Retro Impact Guidelines web application. This project aims to update and expand the **Optimism Impact Evaluation Framework** to make it more user-friendly and accessible to the community.

For more details about the application's requirements, check out the [Mission Request](https://gov.optimism.io/t/ready-to-vote-making-impact-evaluation-accessible/7489).

## Application Links

Staging: https://retroimpactguidelines.wakeuplabs.link

Production: https://retroimpactguidelines.xyz

## Introduction

The application streamlines the evaluation of project proposals by presenting evaluation criteria in a clear and intuitive interface. It guides users through the evaluation process, ensuring they understand the criteria for each project category and the key factors to consider during assessment. Additionally, it allows users to review past evaluation criteria.

For administrators, the application offers an in-place editor that enables them to create, update, and delete evaluation criteria while visualizing changes in real time.

This project is fully open source and licensed under MIT.

## Key Concepts

### Round

A round represents a specific time period during which evaluation criteria are applied. Each round contains a set of criteria that evaluators use to assess projects. When a new round is created, the system can copy data from a previous round to maintain consistency.

### Category

A project category defines a type of project under evaluation. Each category groups similar projects and determines the criteria used for assessment within that category.

### Steps

Evaluation steps define the structured criteria for assessing a project within a specific category. Each step represents a different aspect of the evaluation process and helps guide users through the assessment.

## How It Works

### Creating Evaluation Criteria as an Administrator

1. **Log In as an Admin** – Only whitelisted users from our database can access the admin mode.
2. **Create a Round** – Administrators create a round, which sets the evaluation criteria for a specific time period. If a previous round exists, the application copies its data into the new round.
3. **Create a Project Category** – Once a round is created, administrators must define a project category.
4. **Create Evaluation Steps** – Within each category, administrators can add one or more steps, each containing specific evaluation criteria to guide users through the assessment process.

### Process diagram

```mermaid
sequenceDiagram
    User->>+Frontend App : login
    Frontend App->>+Cognito : authenticate
    Cognito-->>-Frontend App : user data
    Frontend App->>+Backend Service : check whitelisted user
    Backend Service->>+Database : get whitelisted users
    Database-->>-Backend Service : whitelisted users
    alt Is a whitelisted admin user
    User->>+Frontend App : create Round
    alt A previous Round exists
    Frontend App->>+Backend Service : create Round
    Backend Service->>+Database : insert Round
    Database-->>-Backend Service : new round
    Backend Service->>+Database : duplicate Categories from last round
    Backend Service->>+Database : duplicate each Category Steps from last round
    Backend Service-->>-Frontend App: new Round
    else
    Frontend App->>+Backend Service : Create empty Round
    Backend Service->>+Database : insert Round
    Database-->>-Backend Service : new round
    Backend Service-->>-Frontend App: new Round
    end
    User->>+Frontend App : create Category for new Round
    Frontend App->>+Backend Service : create Category
    Backend Service->>+Database : insert Category
    Database-->>-Backend Service : new Category
    Backend Service-->>-Frontend App: new Category
    User->>+Frontend App : create Step for new Category
    Frontend App->>+Backend Service : create Step
    Backend Service->>+Database : insert Step
    Database-->>-Backend Service : new Step
    Backend Service-->>-Frontend App: new Step
    end
```

## Database Diagram

![Database Diagram](./assets/db_diagram.svg)

## How to Run Locally

### System Requirements

- Node.js: v20.18
- npm: v10.7.0
- PostgreSQL: v17

### Setup Steps

1. **Create a Database** – Set up an empty database in your local PostgreSQL instance.
2. **Configure Environment Variables**
   - Add a `.env` file in the `prisma` package with the following variables:
     ```
     DB_URL=<local_postgresql_db_url>
     DB_URL_NON_POOLING=<local_postgresql_db_url_non_polling>
     ```
   - Add a `.env` file in the `api` package with the following variables:
     ```
     NODE_ENV=development
     PORT=<api_port>
     DB_URL=<local_postgresql_db_url>
     DB_URL_NON_POOLING=<local_postgresql_db_url_non_polling>
     ```
   - Add a `.env` file in the `web` package with the following variables:
     ```
     VITE_API_URL=http://localhost:<api_port>/api
     ```
3. **Install Dependencies** – Run the following command in the root of the project:
   ```
   npm i
   ```
4. **Run Database Migrations** – Apply database migrations using:
   ```
   npm run db:migrate
   ```
5. **Start the Application** – Launch the application with:
   ```
   npm run dev
   ```
   By default, the application will start on port 5173.

## Deployment

The application is deployed using GitHub Actions. The deployment process is triggered by pushing to the `main` branch. The deployment is handled by the `production.yml` workflow.

The deployment process involves the following steps:

1. **Install Dependencies** – Installs all necessary dependencies.
2. **Build the Application** – Builds the application for production.
3. **Backup the Database** – Creates a backup of the current database.
4. **Migrate the Database** – Applies any necessary database migrations.
5. **Deploy the Application** – Deploys the application to the production environment.

### Deployment Plan

1. **Backup Database** – Before any deployment a `backup` of the database must be taken to ensure data integrity in case of any issues.
   - Stored in the `optimism-making-impact-production-db-backups` s3 bucket.
   - Named with the version and current date and time. e.g. `backup_v1.0.0-2023-09-15T12:34:56Z.sql`
2. **Open PR from `main` to `develop`** – This step is for reviewing changes before deployment.
3. **Merge PR from `main` to `develop`** – This step triggers the deployment process.
4. **Publish new Release from `main`** – This step is optional but recommended for versioning and tracking changes.

---

<div align="center">
  <a href='https://www.wakeuplabs.io/' target='_blank' rel='noreferrer'>
    Made with love ❤️ by WakeUp Labs
  </a>
</div>
