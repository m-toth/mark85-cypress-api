# Mark85 API Test Automation

API test automation project developed during the QAx course
**"Testing REST API with MongoDB and RabbitMQ in Cypress"**, taught by
Fernando Papito.

The project uses **Mark85**, a training application created specifically
for QA and test automation practice, designed to reproduce some of the
interactions and dependencies commonly found in real software
environments.

## About Mark85

Mark85 is a task management application where authenticated users can
create and manage personal tasks.

A task can contain a description and up to three tags. For example:

- Task: `Pay credit card bills`
- Tags: `Inter`, `Ourocard`, `Itau`

When a task is created, the application also prepares an email
notification for the registered user.

The training environment is composed of multiple application components
that run locally and interact with supporting services such as MongoDB
and RabbitMQ.

At a high level, the application flow can be represented as:

    User
      |
      v
    Web Application
      |
      v
    Backend API
      |
      +------> MongoDB
      |
      +------> RabbitMQ
                  |
                  v
             Mail Service
             ("Jaiminho")
                  |
                  v
             Email notification

The mail component is nicknamed **"Jaiminho"** in the course environment
and acts as a separate service that consumes messages published to
RabbitMQ and handles the email notification flow.

## About This Repository

This repository contains my **automated API tests** developed while
working with the Mark85 training environment.

The Mark85 application itself was created by Fernando Papito for
educational purposes. This repository represents my implementation of
the test automation exercises and scenarios developed during the course.

The tests interact with different layers of the environment rather than
only validating isolated HTTP responses.

They include:

- REST API validation
- Authentication scenarios
- Test data preparation
- MongoDB interaction
- RabbitMQ queue validation
- Positive and negative test scenarios
- CRUD operations
- Response payload validation

## Test Coverage

### Users

Scenarios include:

- Registering a new user
- Duplicate email validation
- Required field validation
- Invalid user data

### Authentication

Scenarios include:

- Successful authentication
- Invalid password
- Unknown email
- Invalid email format
- Authentication token validation

### Tasks

The API test suite covers the main task operations:

- Create a task (`POST`)
- Retrieve tasks (`GET`)
- Update a task (`PUT`)
- Delete a task (`DELETE`)
- Duplicate task validation
- Task not found scenarios

The automated tests validate not only HTTP status codes but also
response payloads and expected application behavior.

## RabbitMQ Validation

One of the application flows covered by the project involves asynchronous
communication.

When a task is created, the backend publishes a message to RabbitMQ.
The mail service consumes that message and uses it as part of the email
notification flow.

The test suite interacts with the RabbitMQ queue to validate that the
expected message was generated after the task creation operation.

This allows the test to validate part of the integration between the API
and the asynchronous messaging layer, rather than only checking the API
response.

## MongoDB Integration

MongoDB is also used during the automated tests for test data management.

Cypress Node tasks interact with the database to prepare or clean up the
environment before test execution, such as removing users or tasks that
could interfere with a scenario.

This helps keep the automated tests repeatable and reduces dependencies
between executions.

## Technologies

- Cypress
- JavaScript
- Node.js
- REST APIs
- MongoDB
- RabbitMQ
- Chai
- dotenv
- Allure Reports
- Docker-based training environment

## Project Structure

    cypress/
    ├── e2e/
    │   ├── sessions.cy.js
    │   ├── users.cy.js
    │   └── tasks/
    │       ├── delete.cy.js
    │       ├── get.cy.js
    │       ├── post.cy.js
    │       └── put.cy.js
    │
    ├── fixtures/
    │
    └── support/
        ├── commands/
        ├── e2e.js
        └── mongo.js

    cypress.config.js
    package.json

The `e2e` directory contains the automated API scenarios, while the
support layer contains reusable commands and integrations used by the
test suite.

## Environment Configuration

Environment-specific configuration is stored locally using environment
variables and is not committed to the repository.

Create a `.env` file based on `.env.example`:

    BASE_URL=<application-base-url>
    MONGO_URI=<mongodb-connection-string>
    AMQP_HOST=<rabbitmq-api-endpoint>
    AMQP_QUEUE=<queue-name>
    AMQP_TOKEN=<authentication-token>

The application under test and its supporting components were provided
as part of the course environment and run locally during the training
activities.

## Running the Tests

Install the project dependencies:

    npm install

Run the automated test suite:

    npm test

The local Mark85 training environment and its required supporting
services must be running before executing the tests.

## Learning Context

A relevant aspect of the training methodology was working with a
complete local application environment instead of isolated test
examples.

Throughout the course, the application could evolve as new features or
changes were introduced, requiring the automated tests to be reviewed
and adapted accordingly.

This approach provided practical experience with situations commonly
encountered in real test automation projects, where changes in the
application can affect existing regression suites and integrations.

## Author

**Marlon Toth**

QA and test automation study portfolio.
