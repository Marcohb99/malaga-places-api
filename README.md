<p align="center">
  <img src="./src/Resources/pin-point-guitar.ico" width="120" alt="Malaga Places API Logo" />
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

<h1 align="center">Málaga Places API</h1>
<p align="center">API for Málaga interesting places</p>

## Description

This API is meant to be the source of information of [this web](https://circuito-salas-malaga.netlify.app/).

## Technologies

- Nest JS
- TypeORM
- Docker + docker compose
- Jest
- Postgres SQL
- Jenkins

## Project structure

This project utilizes Hexagonal Architecture with the following layers:

- Application: use cases that
  - Convert the infrastructure DTOs into Domain Entities
  - Call the necessary services: repos, necessary validators...
- Domain: contains
  - Entities: our business concepts
  - Repository interfaces that will be implemented by the infrastructure services
  - Value Objects: objects that are not entities but require for example some particular validation
- Infrastructure: contains
  - Repository implementations (TypeORM)
  - Entity Models for the ORM: representation of the entity that is coupled with infrastructure
  - NestJS Controllers
  - DTOs that represent the body of the requests

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run build
$ docker compose up # watch mode auto

# stop the containers
$ docker compose down
```

## Run tests

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```

## Deployment

There is a [Jenkinsfile](Jenkinsfile) meant to deploy this app in a VM in some point. TBD

## Stay in touch

- Author - Marco Hurtado
