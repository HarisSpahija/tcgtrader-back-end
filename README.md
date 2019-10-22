# TCG-Trader

![GitHub contributors](https://img.shields.io/github/contributors/HarisSpahija/tcgtrader-back-end) ![HACKTOBERFEST](https://img.shields.io/badge/HACKTOBERFEST-GET%20STARTED-blueviolet) ![GitHub last commit](https://img.shields.io/github/last-commit/HarisSpahija/tcgtrader-back-end) ![GitHub](https://img.shields.io/github/license/HarisSpahija/tcgtrader-back-end) [![CircleCI](https://circleci.com/gh/HarisSpahija/tcgtrader-back-end/tree/master.svg?style=svg)](https://circleci.com/gh/HarisSpahija/tcgtrader-back-end/tree/master)

TCG Trader is a tool to keep track of the cards your group owns and suggests trades between users. This way players in local groups can share their card pool for trading, show what cards they are looking for and show what cards they offer.

### First timers!

Hi everyone and welcome to TCGTrader-back-end. I have created a couple of imcomplete GraphQL mutations and queries that still need some work. Hopefully you can help me out completing the tasks that are open!

This project runs on `Node` using `express`. Some things you need to install beforehand are:

Install Node: https://nodejs.org/en/ 

All packages can be installed using npm like so:

`npm install`

Copy `.env.example` into a new file at the root folder `.env` to change the desired port.
By default port will run at `8080` on:

`localhost:8080`

To run the graphql playground you can run:

`npm start`

Tadaa! Now you can play around in the playground here:

http://localhost:8080/

### Resolvers

```
parent = contains arguments supplied from parent resolver
arg = contains arguments supplied from query
ctx = context for contextual data such as login tokens
info = information about the operation sent to server`
```
