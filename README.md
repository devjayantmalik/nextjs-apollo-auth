# Setup Graphql NextJS app with authentication

## Overview

In this article, we will setup a NextJS app with Graphql and will also enable authentication in our app. To integrate apollo provider and authentication, we will use <abbr title="Higher Order Components">HOCs</abbr>.

Here is how we are going to do it:

1.  Generate a NextJS app.
2.  Setup NextJS app to use typescript.
3.  Project cleanup
4.  Setup Apollo and Graphql.
5.  Setup `next-apollo` and create withApollo <abbr title="Higher Order Component">HOC</abbr>
6.  Create a `withAuth` <abbr title="Higher Order Component">HOC</abbr>

## Generate NextJS Project

The first step is to generate a new blank NextJS project. We will be `create-next-app` cli to generate a new project for us.

To generate a new project named auth, execute the below command:

`npx create-next-app auth`

The above code will download latest create-next-app npm package from npm repositories and will generate a new project using the downloaded cli.

## Setup Typescript

Now we need to setup typescript in our project, It is really easy, and two step process. Go ahead and change the extension of your of your `.js` files to `.tsx` files, in your `pages/` directory.

Here is the old project structure.

```txt
.
├── package.json
├── pages
│   ├── api
│   │   └── hello.js
│   ├── _app.js
│   └── index.js
├── public
│   ├── favicon.ico
│   └── vercel.svg
├── README.md
├── styles
│   ├── globals.css
│   └── Home.module.css
└── yarn.lock

4 directories, 10 files
```

You will also have _node_modules_ folder, but it omitted here.

Here is the new project structure with file names renamed:

```txt
.
├── package.json
├── pages
│   ├── api
│   │   └── hello.js
│   ├── _app.js
│   └── index.js
├── public
│   ├── favicon.ico
│   └── vercel.svg
├── README.md
├── styles
│   ├── globals.css
│   └── Home.module.css
└── yarn.lock

4 directories, 10 files
```

So, we have successfully completed our first step of the process, the next step would be to install typescript as dependency in your project and you will be done.

Before installing typescript in our project let's execute the command `yarn dev` inside our project. This commands starts the project in development mode.

So, executing the above command yields us following output:

```bash
    yarn run v1.23.0-20210103.1434
    $ next dev
    ready - started server on 0.0.0.0:3000, url: http://localhost:3000
    It looks like you're trying to use TypeScript but do not have the required package(s)installed.

    Please install typescript, @types/react, and @types/node by running:

            yarn add --dev typescript @types/react @types/node

    If you are not trying to use TypeScript, please remove the tsconfig.json file fromyour package root (and any TypeScript files in your pages directory).

    error Command failed with exit code 1.
    info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.

```

The error is expected, and tells us exactly what we need to do next. The error message provides us instructions, on exactly how we need to install typescript. Just copy and execute the below command.

`yarn add --dev typescript @types/react @types/node`

Executing the above command will download the typescript dependency and install in in your project. The command also installs types for react and nodejs.

The typescript setup step is complete. You can now execute `yarn dev` to start your application. NextJS will automatically detect typescript in your project and generate `tsconfig.json` file for you.

## Project cleanup

Before proceeding further let's clean our project a little bit. Follow the below steps to clean our project a little bit.

1.  Delete `api` folder and all its files from `pages` directory.
2.  Delete `vercel.svg` file from `public` directory.
3.  Delete `Home.module.css` file from `styles` directory.
4.  Replace contents of `index.tsx` file inside `pages` directory, with the ones provided below.

### Delete Stuff

Here is the project structure before deleting files from project.

```txt
.
├── next-env.d.ts
├── package.json
├── pages
│   ├── api
│   │   └── hello.tsx
│   ├── _app.tsx
│   └── index.tsx
├── public
│   ├── favicon.ico
│   └── vercel.svg
├── README.md
├── styles
│   ├── globals.css
│   └── Home.module.css
├── tsconfig.json
└── yarn.lock

4 directories, 12 files
```

And here is the project structure after deleting files:

```txt
.
├── next-env.d.ts
├── package.json
├── pages
│   ├── _app.tsx
│   └── index.tsx
├── public
│   └── favicon.ico
├── README.md
├── styles
│   └── globals.css
├── tsconfig.json
└── yarn.lock

3 directories, 9 files
```

That was really easy project refactor, we did it because, it removed unused files, we don't need them in our project.

### Content Replacement

Now, it's time to replace contents of `index.tsx` file with the contents as below. Go ahead and do the refactor.

```tsx
// pages/index.tsx
import { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>Jai Hind!</h1>
        <p>You will be able to see this page, if you e logged in.</p>
      </main>
    </div>
  );
};

export default Home;
```

## Setup apollo and graphql

To proceed further, let's install apollo graphql client, in your project. You can [visit apollographql.com](https://www.apollographql.com/docs/react/get-started/) for installation instructions.

Here are quick commands to install apollo client:

`yarn add @apollo/client graphql`

The above commands will install graphql and apollo client in our project.

In next step, we will setup next-graphql and create a component.

## Setup next-apollo and withApollo HOC

Now, it's time to setup `next-apollo`. We can install it using the below command:

`yarn add next-apollo`

The above command will install next-apollo in your project, which will provide us a hoc.

Go ahead and create a `lib` directory in your project. Here is the project structure after creating the lib directory with two blank files.

```txt
.
├── next-env.d.ts
├── package.json
├── lib
│   ├── withApollo.ts
│   └── withAuth.tsx
├── pages
│   ├── _app.tsx
│   └── index.tsx
├── public
│   └── favicon.ico
├── README.md
├── styles
│   └── globals.css
├── tsconfig.json
└── yarn.lock

4 directories, 11 files
```

Here are the contents of `withApollo.ts` file with explanation.

```tsx
import { withApollo as useApollo } from "next-apollo";
import { ApolloClient, InMemoryCache } from "@apollo/client";

const apolloClient = new ApolloClient({
  uri: "http://localhost:4100/graphql",
  credentials: "include",
  cache: new InMemoryCache(),
});

export const withApollo = useApollo(apolloClient);
```

The above code is divided in three blocks.

First block are imports from next-apollo and @apollo/client package.

Second block, creates a new apollo client, which is instance of ApolloClient class.

Third block exports the result of useApollo, passing apolloClient as an argument. The result returned is a <abbr title="Higher Order Component">HOC</abbr>

You can use the components using following syntax inside our `index.tsx` file. Here is the usage of withApollo.

```tsx
import { NextPage } from "next";

// Take note of import, it is imported from our lib folder.
import { withApollo } from "../lib/withApollo";
import Head from "next/head";

const Home: NextPage = () => {
  // Return JSX
  return <h1>JSX here</h1>;
};

// We wrap with the HOC.
export default withApollo({ ssr: true })(Home);
```

The above <abbr title="Higher Order Component">HOC</abbr> wrapping wraps the Home component, in ApolloProvider. Here are the points to keep in mind:

- You cannot use `getServerSideProps` when withApollo is used.
- You can declare `getInitialProps` when withApollo is used.
- We have access to apolloClient inside `getInitialProps` on the context object.

Here is the example of using `getInitialProps`

```tsx
import { NextPage } from "next";

// Take note of import, it is imported from our lib folder.
import { withApollo } from "../lib/withApollo";
import Head from "next/head";

const Home: NextPage = () => {
  // Return JSX
  return <h1>JSX here</h1>;
};

Home.getInitialProps = async (context) => {
  // context.apolloClient is available here.
  return { hi: true };
};

// We wrap with the HOC.
export default withApollo({ ssr: true })(Home);
```

## Creating withAuth HOC

Here are the contents of `withAuth.tsx` file.

```tsx
import { NextPage } from "next";
import React from "react";
import { withApollo } from "./withApollo";

interface WithAuthOptions {
  ssr?: boolean;
}

export const withAuth = ({ ssr }: WithAuthOptions) => (
  C: NextPage | React.ComponentClass
) => {
  class AuthComponent extends React.Component {
    render() {
      return;
    }
  }

  return withApollo({ ssr })(AuthComponent);
};
```

In the above code, we are not implementing any auth for now, but it is just the starting boilerplate for a higher order component. So Let's discuss what exactly the code does.

Here is how it would look in usage: `withAuth({ssr: true})(Home)`

- `withAuth` is a function that receives ssr as an argument.
- `withAuth` function returns a function as a result of invocation. The next function returned takes a react component as an argument.
- `withAuth` upon invocation after passing the component, returns a AuthComponent, which is created inside function body, this react component is wrapped in `withApollo` function call, just to make sure our auth component is wrapped inside `ApolloProvider` component prior to execution.
- The wrapping of `withAuth` component in `ApolloProvider` provides ability to use apolloClient inside `AuthComponent`, which can further be used to make graphql queries.

Now, we have a starting point hoc, let's wrap the `Home` component in withAuth and then implement the actual user credentials checking functionality inside `AuthComponent`.

Here is how the export statement would look like, for home page. Go ahead and change the export statement to match the following in `pages/index.tsx` file:

```tsx
import { withAuth } from "./lib/withAuth";
//... Other code remains same
export default withAuth({ ssr: true })(Home);
```

The above statement should do the work of wrapping the Home component, in apollo provider as well as rendering AuthComponent prior to home component.

Now, you can execute `yarn dev` and check if the app still works. And indeed it works!

Let's start implementing the `AuthComponent` class inside `withAuth` hoc, to handle the authentication logic for us. Go ahead and make necessary changes to your `lib/withAuth.tsx` file as required. Here is the code for `lib/withAuth.tsx` file with auth logic.

```tsx
import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import { NextPage, NextPageContext } from "next";
import React from "react";
import { withApollo } from "./withApollo";

interface WithAuthOptions {
  ssr?: boolean;
}

// Add this for intellisense, when using typescript.
type IApolloGetInitalProps = {
  apolloClient: ApolloClient;
} & NextPageContext;

export const withAuth = ({ ssr }: WithAuthOptions) => (
  C: NextPage | React.ComponentClass
) => {
  class AuthComponent extends React.Component {
    // add this method, this method gets called before rendering component.
    public static getInitialProps(context: IApolloGetInitalProps) {
      // We will implement this next.
    }

    render() {
      return;
    }
  }

  return withApollo({ ssr })(AuthComponent);
};
```

The sections required for addition are commented. Go ahead and add those methods, next we will implement getIntialProps method, so here is the code for `getIntialProps` method.

```tsx
class AuthComponent extends React.Component {
  // add this method, this method gets called before rendering component.
  public static async getInitialProps(context: IApolloGetInitalProps) {
    // Execute the graphql query using apolloClient.
    const response = (await context.apolloClient.query({
      query: gql`query Me{me: {id, fname, lname}}`,
      // Add this line to make sure the cookie from user browser is sent along with request.
      context: {
        headers: {
          cookie: context.req.headers.cookie,
        },
      },
    })) as any;
    if (!response.me) {
      // We don't have user logged in, so redirect user.
      return redirect(context.res as any, 302, "/signin");
    }
    // We have got our user, so return it.
    return { user: response.me };
  }
}
```

Now, you know, exactly how to make queries using apollo client and still implement <abbr title="Server Side Rendering">SSR</abbr>

For source code you can checkout the github repository at: [https://github.com/devjayantmalik/nextjs-apollo-auth](https://github.com/devjayantmalik/nextjs-apollo-auth).
