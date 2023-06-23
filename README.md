# Vue Storefront Custom Integration _(MedusaJS)_

## Overview

This app serves as a small monorepo that connects a middleware between the actual storefront and the e-commerce backend.

This repo is split into **three** separate directories that act as their own service:

- `/backend`

  - This is where the Medusa server lives. The middleware communicates with the api endpoints you set up here.

- `/sdk`

  - This is where you can define custom endpoints and logic that will act as a middleware between the storefront and the e-commerce backend.

  - `/packages` is where you can build out custom endpoints and logic

  - `/playground` is split into `/app` and `/middleware`

    - `/app` is basically a GUI you can use to view and test your created endpoints/methods. This is optional as we will only be communicating with `/middleware` from the storefront app.

    - Inside `/middleware` we configure the connection to `~/backend`, and also build out the actual middleware server

- `/storefront`

  - In this example we are using a basic Nuxt 3 app as our storefront. This is where you build out your actual store.

## Getting Started

Each of these repos will run as thier own process.

Assuming all dependencies have been installed:

1. In one terminal navigate into `/backend` and start the medusa server with:

```bash
    medusa develop
```

2. In a separate terminal, navigate into `/sdk` and start the middleware server with:

```bash
    npm run dev:middleware
```

\*\* This will start the middleware **only** which is what we want right now since the "playground" and our storefront are currently set to run on the same port...

3. Now in a final terminal we can navigate into `/storefront` and start the development server:

```bash
    npm run dev
```

Now that we have the entire system running, let's look at how to use everything together:

## Using Middleware

#### Creating an endpoint

This is the process for creating a new method/endpoint. We will be creating `doSomething` as an example.

Beginning in `~/sdk`:

1. First we will create the API endpoint with our method and logic.

`/skd/packages/api-client/src/api`

Create a new folder `doSomething` and inside make an `index.ts` file:

```ts
import { Endpoints } from '../../types';

export const doSomething: Endpoints['doSomething'] = async (
  context,
  params
) => {
  console.log('doSomething has been called');

  return { data: 'Hello from doSomething endpoint' };
};
```

and export this endpoint:

`/sdk/packages/api-client/src/api/index.ts`

```ts
export { doSomething } from './doSomething';
```

2. Now we need to add this endpoint where it's being imported from `/types`...

`/sdk/packages/api-client/src/types/api/endpoints.ts`

```ts
export interface Endpoints {
  // ...

  doSomething(context: MedusaIntegrationContext, params: TODO): Promise<TODO>;
}
```

3. Now add the method to the sdk:

`/sdk/packages/sdk/src/methods`

Create a new folder `doSomething`

`/sdk/packages/sdk/src/methods/doSomething/index.ts`

```ts
import { client } from '../../client';
import { TODO } from '../../types';

export async function doSomething(props: TODO) {
  const { data } = await client.post<TODO>('doSomething', props);
  return data;
}
```

And export the method:

`/sdk/packages/sdk/src/methods/index.ts`

```ts
// ...
export { doSomething } from './doSomething';
// ...
```

4. Build the sdk, from `~/sdk` run `npm run build` and restart the middleware server `npm run dev`

5. Now we should be able to use this method in the storefront

```ts
const { data } = await sdk.medusa.doSomething();
```
