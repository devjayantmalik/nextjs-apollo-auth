import { NextPage } from "next";
import Head from "next/head";
import { withAuth } from "../lib/withAuth";

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

Home.getInitialProps = async (context) => {};

export default withAuth({ ssr: true })(Home);
