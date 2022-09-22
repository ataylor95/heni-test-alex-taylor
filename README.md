# HENI FE Test

## Getting started

### Dependencies

Main technologies : React, Material UI, Apollo, Jest, React Testing Library

- Clone the project
- Run `yarn install` at its root

### Running the project

- Run `yarn dev` to run the project locally

### Running unit tests

- Run `yarn test`

## Instructions

The purpose of this test is to show a list of ships using SpaceX GraphQL API : https://api.spacex.land/graphql/ Every feature/components implemented in this test should be unit tested. There is an example of how the unit tests should be written at HENI in `components/Card/index.spec.tsx`. UX, code quality, accessibility will be taken in account when reviewing the test.

- Complete the HomePage component by showing the ships returned when using the query implemented in `api/ship/queries/getShips.ts`. The results should be loaded using an infinite scroll.
- Create a simple details page showing the details about a boat. This page should be accessible by clicking a Learn More button in the ships cards shown on the home page.
- Set up basic Open Graph tags for both the home page and the details page.
- BONUS : There is a hook in `hooks/useLocalStorage/index.ts` which should not be useful for the previous questions. Please write unit tests for this hook.

## What would you improve in this test ?

### Any technologies you would add to improve the project/code quality ?

Prettier would have been nice to enforce some standards. Similarly, I think this should be run on commit with something like Husky to enforce the standards.

### About your own implementation ?

I deliberately chose to not get the ship information on the SS, because I think showing a loading screen whilst the query is tirgger is better UX.
Missing a number of tests but did some core ones to show my approach. Some tests were not fully implemented, but I added some skips and left comments.
