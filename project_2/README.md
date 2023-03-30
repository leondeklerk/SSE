# Green procurement requirements

This project is focussed on building a literary framework for green procurements requirements for software companies. In addition this repository contains a proof of concept implementation based on this framework. More details on the literary part of this project can be found in the paper in this repository. The rest of this README describes how to setup and run the software.

## Overview

The front-end is a Vue.js based project written in TypeScript. It is using the newer composition API and makes use of custom components. The styling is done with Sass and based on the Bulma CSS framework. Page navigation is done with Vue-Router and front-end cache is managed with Pinia. All API calls are made with the use of fetch.

The back-end is a Express/Node based server that is coupled with a MongoDB database via Mongoose together with Typegoose. The JWT based authentication flow uses Redis as a cache and is based on [this](https://github.com/wpcodevo/jwt_authentication_authorization_node/tree/Access_Token) repository. The database and redis server both run in a Docker environment.

## Run

The following section explains how to run each component.

### Back-end

First navigate to the `backend` sub folder

Make sure to define your `.env` file with the required environment variables. See the [sample .env](./backend/.env.sample) file for the required variables.

You can use [travistidwell.com](https://travistidwell.com/jsencrypt/demo/) to generate a development RSA keypair and you can use [Base64encode.org](https://www.base64encode.org/) to encode them to base64.

Start up the MongoDB database and Redis server with docker compose:

```bash
docker compose up -d
```

Install the server dependencies:

```bash
npm install
```

Seed the database:

> This will clear all current database values, use with caution!

```bash
npm run seed
```

Now start the server:

```bash
npm run start
```

### Front-end

First navigate to the `frontend` sub folder

Install the dependencies:

```bash
npm install
```

Make sure to define your `.env` file with the environment variables. See the [sample .env](./frontend/.env.sample) file for the required variables.

Run the project in development mode:

```bash
npm run dev
```

Navigate to `http://localhost:3000` in your browser to access the application.
