# Teamwork app
[![Build Status](https://travis-ci.com/hirwaf/teamwork.svg?branch=develop)](https://travis-ci.com/hirwaf/teamwork)
[![Coverage Status](https://coveralls.io/repos/github/hirwaf/teamwork/badge.svg?branch=develop)](https://coveralls.io/github/hirwaf/teamwork?branch=develop)
[![Maintainability](https://api.codeclimate.com/v1/badges/8aef95116e47f61d8121/maintainability)](https://codeclimate.com/github/hirwaf/teamwork/maintainability)

# Description
Teamwork is an internal social network for organizations’ employees. The goal of this application is to facilitate more interaction between colleagues and facilitate team bonding. 

# Setup
- You need to have `git`, `NodeJS` and `nmp` installed on your local environment.
- Clone the application with `git clone` command.
- `npm install` to install all the dependencies in local environment.
- `cp .env.example .env` to have env setup
- Add values in `.env` file

# Getting Started
Starting application run the following npm scripts
* `npm run migrate` for migrating tables.
* `npm start` for starting the server.

# Testing
When you need to test the application and view test coverage run:
* `npm test` for running the tests, and getting coverage summary.

# API
* POST `/api/v2/auth/signup` Creating account.
* POST `/api/v2/auth/signin` Sign in.

  **Require authentication**
  
* GET `/api/v2/feeds` Retrieve all articles posted
* GET `/api/v2/feeds/:tagId/tags` Retrieve articles by tag
* GET `/api/v2/articles/:articleId` Fetch single article by its ID
* GET `/api/v2/author/articles/:authorId` Fetch all articles by author ID
* POST `/api/v2/articles` Create new article
* POST `/api/v2/:articleId/comments` Add comment to an article
* PATCH `/api/v2/articles/:articleId` Update an article
* DELETE `/api/v2/articles/:articleId` Delete an article

# Heroku 
Access link :[Visit the link](https://teamworkadc.herokuapp.com/api/v2/).

# Swagger API Documentation
Access link :[Visit the link](https://teamworkadc.herokuapp.com/docs/v2).

# Github-page
GitHub page (gh-page) of this project accessed using this link [Teamwork](https://hirwaf.github.io/teamwork/UI).
