# Wame Sports Challenge

### Description

Technical challenge proposed by Wame Sports. [Details and requirements](/docs/technical-interview-project.pdf)

### Functionalities

- __Create a football match__: Allows users to create new match entries with details like 
home team, away team, date, and time. 
- __Get all matches__: Retrieves a list of all the scheduled or completed matches. 
- __Get a match by ID__: Retrieves a specific match based on its unique identifier

### Technical Requirements

- TypeScript
- RESTful API using NestJS
- Dependency injection
- Strong data validation (class-validator or similar solutions)
- Error handling
- Unit tests using Jest

### Deliverables

- A well-structured and documented NestJS project implementing the functionalities 
mentioned above. 
- Unit tests covering the core functionalities of the API.

## Define environment variables

```bash
# Create environment variables file (then define them)
$ cp .env.example .env
```

## Start services with docker-compose

In this case the environment variable `DB_HOST` must be `database`

```bash
# Create and start container, add -d flag to do it in background
$ docker-compose -f docker-compose.prod.yml up --build

# Stop and remove container
$ docker-compose -f docker-compose.prod.yml down
```

With this everything is ready to consume the API

## Other commands

### Compile and run the project

If you compile and run the API this way you will need to modify the `DB_HOST` environment variable to `localhost` or `127.0.0.1`, also comment out the `api` service from `docker-compose.prod.yml` and remove the container if you have created and run it before.

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

### Run tests

There are no `e2e tests` at the moment

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage 
$ pnpm run test:cov
```

## API definition
Base path for API v1: `/api/v1`

Endpoints:
- `POST:/matches` --> Create a match
- `GET:/matches` --> Get all matches
- `GET:/matches/:id` --> Get a specific match
- `POST:/matches/search` --> Search matches based on different options
- `PATCH:/matches/:id` --> Update a match
- `DELETE:/matches/:id` --> Soft delete a match

### Match entity
- `homeTeam`: string (mandatory and at least 3 characters)
- `awayTeam`: string (mandatory and at least 3 characters)
- `dateTime`: Date (mandatory and in ISO 8601 format, for example `2024-11-17T20:00:00.000Z`)

### Postman collection
- [v1.0](/docs/postman_collection_v1_0.json)

### Postman environment
- [v1.0](/docs/development.postman_environment_v1_0.json)

## Stay in touch

- Author - [Braian Gonzales](https://braiangonzales.vercel.app/)
- Email - [braian.gonzales77@gmail.com](mailto:braian.gonzales77@gmail.com)
- LinkedIn - [in/braiangonzales/](https://www.linkedin.com/in/braiangonzales/)
