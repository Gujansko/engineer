# Football Matches Fullstack Application

## This repository contains the fullstack application for fetching football matches.

## Table of Contents

[Project Structure](#structure)

[How to run](#run)

[Configuration](#configuration)

### Structure

- **config** - Contains configuration files for various services and environments

- **front** - Contains the frontend of the application written using *Next.js*

- **server** - Contains the backend logic written using *Express.js*

- **models** - Contains the models used in both front and server

- **.env** - Environment variables file

### Run

- Run the frontend solution
  - Enter the `./front` directory and run **npm install** in console
  - Run command **npm run dev**
- Run the backend solution
  - Enter the `./server` directory and run **npm install** in console
  - Run command **npm run dev**

### Configuration

Configuration can be changed using two files:

- **.env** *not provided by default*
  - SERVER_PORT - port for server (local development/deployment): *3001*
  - SERVER_ADDRESS - server address (local development/deployment): *http://localhost:3001*
  - SCRAPE_BASE_URL - url to the site from which the matches are fetched: *https://www.football-data.co.uk/*
  - CACHE_DURATION_SECONDS - duration of caching applied on each endpoint of the server: *1800*
- **config.ts** *provided by default*
  - fetchedFields - default fields to be fetched for the matches if no fields are specified
  - resultFields - fields that count as result fields
  - predictFields - fields required to add match to predictions
  - countryScrapeUrls - base urls for each country that is available to fetch matches from
