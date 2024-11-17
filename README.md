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

## Project setup

```bash
# Install dependencies
$ pnpm install

# Create environment variables file (then define them)
$ cp .env.example .env
```

## Database
```bash
# Create and start container in the background
$ docker-compose up -d

# Stop and remove container
$ docker-compose down
```

## Compile and run the project

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Run tests

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

### Postman collection
- [v1.0](/docs/postman_collection_v1_0.json)

## Stay in touch

- Author - [Braian Gonzales](https://braiangonzales.vercel.app/)
- Email - [braian.gonzales77@gmail.com](mailto:braian.gonzales77@gmail.com)
- LinkedIn - [in/braiangonzales/](https://www.linkedin.com/in/braiangonzales/)
