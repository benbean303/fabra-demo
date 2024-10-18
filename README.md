# Fabra Demo

This project is a short demo that allows users to modify the colours of different sections of a hoodie. They can also login using a standard OAuth flow to save their designs to a db. The project runs a Next.js application with a PostgreSQL database. The project also uses Docker and Docker Compose for easy setup and deployment. Follow the steps below to run the project locally.

## Prerequisites

Before you can run this project locally, make sure you have the following installed:

- **Docker**: [Get Docker](https://docs.docker.com/get-docker/)
- **Docker Compose**: [Get Docker Compose](https://docs.docker.com/compose/install/)
- **Git** (optional for cloning the repository): [Get Git](https://git-scm.com/)

## Setup Instructions

Follow these steps to run the project locally.

### 1. Clone the Repository

If you haven't already cloned the repository, do so by running:

```bash
git clone https://github.com/your-username/fabra-demo.git
cd fabra-demo
```

### 2. Set Up Environment Variables

The project requires several environment variables to run properly.

Create a .env file with the following content:

```bash
POSTGRES_USER=username
POSTGRES_PASSWORD=password
POSTGRES_DB=dbname
NODE_ENV=production

DATABASE_URL="postgresql://address"
JWT_SECRET="jwtsecret"

# Auth0 configuration
AUTH0_SECRET='your_auth0_secret'
AUTH0_BASE_URL='http://localhost:3000'
AUTH0_ISSUER_BASE_URL='https://your-auth0-domain'
AUTH0_CLIENT_ID='your_auth0_client_id'
AUTH0_CLIENT_SECRET='your_auth0_client_secret'
```

Replace the placeholder values (e.g., your_jwt_secret, your_auth0_domain) with your actual secrets and values.

### 3. Build and Run the Containers

Once you have Docker and Docker Compose installed, and the .env file is configured, you can run the following command to pull the necessary Docker images, build the project, and start the containers:

```bash
docker-compose up --build -d
```

This command will:

•	Build the frontend container (Next.js app).
•	Set up the db container (PostgreSQL).
•	Start the application in detached mode.

### 4. Verify the Containers Are Running

To check that the containers are up and running, use:

```bash
docker-compose ps
```

You should see output showing the frontend and db containers running. For example:

```bash
        Name                       Command               State                     Ports                  
----------------------------------------------------------------------------------------------------------
fabra-demo_db_1         docker-entrypoint.sh postgres    Up       0.0.0.0:5432->5432/tcp,:::5432->5432/tcp
fabra-demo_frontend_1   docker-entrypoint.sh sh -c ...   Up       0.0.0.0:3000->3000/tcp,:::3000->3000/tcp
```

### 5. Access the Application

Once the containers are running, the app should be accessible at:

```
http://localhost:3000
```

### 6. Stopping the Containers

To stop and remove the running containers, you can use:

```bash
docker-compose down
```

### Additional Notes
•	The project uses Prisma for database schema and migrations. Ensure Prisma commands like npx prisma migrate deploy are run when needed (this is automatically handled in the Dockerfile).
•	If you are using a different Auth0 configuration or environment, update the values in the .env file accordingly.