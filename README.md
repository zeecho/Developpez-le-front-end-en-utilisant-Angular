# OlympicGames

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.13.

Don't forget to install your node_modules before starting (`npm install`).

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Architecture of the project

The architecture includes (in addition to the default angular architecture) the following:

- `components` folder: contains every reusable components
- `pages` folder: contains components used for routing
- `core` folder: contains the business logic (`services` and `models` folders)

The data are in the olympic.json file.

## What you get

This project consists of basically two pages: 
- the home page: it shows a pie chart with a number of medals per country, on which you can click to get more details
- the country page: it shows how many medals were obtained for a specific country in the Olympics in which they took part.
