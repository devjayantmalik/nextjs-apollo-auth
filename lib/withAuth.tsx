import { NextPage } from "next";
import React from "react";
import { withApollo } from "./withApollo";

interface WithAuthOptions {
  ssr?: boolean;
}

export const withAuth = ({ ssr }: WithAuthOptions) => <T extends object>(
  C: NextPage<T> | React.ComponentClass<T>
) => {
  class AuthComponent extends React.Component<T> {
    render() {
      return <C {...this.props} />;
    }
  }

  return withApollo({ ssr })(AuthComponent);
};
