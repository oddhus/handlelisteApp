# handlelisteApp
[![Build Status](https://dev.azure.com/oddhus/Dat251-shopping-cart/_apis/build/status/handlelisteApp?branchName=main)](https://dev.azure.com/oddhus/Dat251-shopping-cart/_build/latest?definitionId=8&branchName=main) ![Azure DevOps tests](https://img.shields.io/azure-devops/tests/oddhus/Dat251-shopping-cart/8) ![Azure DevOps coverage](https://img.shields.io/azure-devops/coverage/oddhus/Dat251-shopping-cart/8?style=plastic)

## Setup

### Requirements: 

1. [.NET](https://dotnet.microsoft.com/learn/aspnet)
2. [Nodejs](https://nodejs.org/en/)'

To run the Cypress tests, set the necessary enviornment variables specified in [plugin/index.js](https://github.com/oddhus/handlelisteApp/blob/main/handlelisteApp/client-app/cypress/plugins/index.js). Or just comment these out and set a username and passowrd that exists in your database.

## Running the application

Navigate to the [handlelisteApp](https://github.com/oddhus/handlelisteApp/tree/main/handlelisteApp) folder and run the following command:
```bash
dotnet run
```

### Running the frontend isolated
Navigate to the [client-app folder](https://github.com/oddhus/handlelisteApp/tree/main/handlelisteApp/client-app) and use the command:
```bash
npm run start
```

### Frontend tests:
```bash
npm run test
```

### Cypress
```bash
npm run cypress 
npm run cy:testh
npm run cy:run
npx cypress run 
```
* note: The full application needs to be running before running the cypress tests.
* You can add your own [options](https://docs.cypress.io/guides/guides/command-line#How-to-run-commands) to the command ```npm run cy:run ```
