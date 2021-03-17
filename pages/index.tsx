import { NextPage } from "next";
import { withApollo } from "../lib/withApollo";
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
        <p>You will be able to see this page, if you are logged in.</p>
      </main>
    </div>
  );
};

export default withApollo({ ssr: true })(Home);
