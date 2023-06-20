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

Let's look at how we can get the "products" from our Medusa store and use them from the Storefront.

Inside `/sdk/packages/api-client` there is an endpoint we named **getProducts**:

```ts
export const getProducts: Endpoints['getProducts'] = async (
  context,
  params
) => {
  console.log('getProducts has been called');
  const { data } = await context.client.get('/store/products');
  return { data: data };
};
```

In this case the `client` is configured as our Medusa backend, so we are simply calling the Medusa API endpoint at "/store/products".

If we look at this method in `/skd/packages/sdk/src/methods` we can see that the middleware is configured to call this endpoint via a 'POST' request:

```ts
export async function getProducts(props: TODO) {
  const { data } = await client.post<TODO>('getProducts', props);
  return data;
}
```

Without changing this setup, we will simply have to send a 'POST' request to this endpoint from our storefront.

The middleware server is set up on port `:8181`, so from our storfront this is the enpoint we will send our requests to. The default name for our middleware integration is 'boilerplate', so right now our storefront will actually make requests to `http://localhost:8181/boilerplate/<endpoint>`.

So in order to call this enpoint and fetch the products from the Storefront, we will use the 'getProducts' endpoint that we set up in the middleware.

```ts
const endpoint = 'http://localhost:8181/boilerplate/getProducts';

const fetchProducts = async () => {
  await fetch(endpoint, { method: 'post' })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });
};
```
