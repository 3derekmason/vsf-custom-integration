# SDK Based Integration Boilerplate for VSF 2

From the project root, you can run the one of following commands, depending on your package manager:

```bash
yarn dev
```

or

```bash
npm run dev
```

This will do the following:

- start the middleware server for the `playground/middleware` application.

## Requirements:

- NodeJS v16 or later,
- [Yarn](https://yarnpkg.com/).

## Repository structure

This repository contains a few necessary packages to help you get started building your new integration:

- `packages/middleware` - An express app that uses the `api-client` to create a server-to-server connection with service providers (e.g. commerce backend).
- `packages/api-client` - The service the middleware uses. It contains an `exampleEndpoint` that can be used as an example for the other API endpoints,
- `packages/sdk`- Think of the SDK Connector as a communication layer between the storefront and the middleware.

## Getting started

```bash
yarn
```

5. Build the packages,

```bash
yarn build
```

6. Test the packages,

```bash
yarn test
```
