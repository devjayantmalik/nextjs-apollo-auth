import { ApolloClient, gql, NormalizedCacheObject } from "@apollo/client";
import { NextPage, NextPageContext } from "next";
import { redirect } from "next/dist/next-server/server/api-utils";
import React from "react";
import { withApollo } from "./withApollo";

interface WithAuthOptions {
  ssr?: boolean;
}

type IApolloGetInitalProps = {
  apolloClient: ApolloClient<NormalizedCacheObject>;
} & NextPageContext;

export const withAuth = ({ ssr }: WithAuthOptions) => <T extends object>(
  C: NextPage<T> | React.ComponentClass<T>
) => {
  class AuthComponent extends React.Component<T> {
    // add this method, this method gets called before rendering component.
    public static async getInitialProps(context: IApolloGetInitalProps) {
      // Execute the graphql query using apolloClient.
      const response = (await context.apolloClient.query({
        query: gql`{query Me{me: {id, fname, lname}}}`,
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

    render() {
      return <C {...this.props} />;
    }
  }

  return withApollo({ ssr })(AuthComponent);
};
