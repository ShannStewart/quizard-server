Live coding practice interview question
=======================================

## Overview

This is a FullStack Todo Application, the client is based on [Todo MVC](http://todomvc.com/)

- Stack:
  - Client: Basic jQuery selectors, event-handlers, DOM manipulation and AJAX
  - Web Server: Node and Express with PostgreSQL 
  - Database: Locally hosted PostgreSQL 
  - Tests: Supertest, Chai

## The "Rules"

You should attempt to complete this challenge without looking at any other resources such as googling, stack-overflow, documentation or course materials. However, you may look at any of the files in the project including the schema in the `models.js` file and the integration tests in `test/server.test.js` and you may ask the interviewer clarifying questions at any point.

### 3 Lifelines

- If you get stuck, you have 3 lifelines (like "Who Wants to Be a Millionaire")
  - 1) Online documentation - browse Express, Mongoose, Chai, Chai-Http docs
  - 2) Interview Hint - Ask the interviewer for a hint
  - 3) Google search - one time google search including stack-overflow and docs

## Setup
- Clone this repository to your local machine
- Install the dependencies for the project
- Ensure your PostgreSQL server is running
- Create a User for this exercise (or you may use the same User from your previous interview)
- Create a database for the exercise with your user as the owner (or you may use the same database from your previous interview)
- Rename the `example.env` file to `.env` and update the following fields with your database credentials:
  ```
   MIGRATION_DB_NAME=
   MIGRATION_DB_USER=
   MIGRATION_DB_PASS=
   DB_URL="postgresql://USERNAME@localhost/DATABASE_NAME"
  ```
- Run the command `npm run migrate -- 1` to create the database tables
- run the command `npm t`
- You should see output from 10 integration tests, some will be failing.

## Exercise
1. Add the PATCH endpoint to this application.
1. Add the DELETE endpoint to this application.

You have completed the task when all the unit tests pass and the client application works without any errors.
