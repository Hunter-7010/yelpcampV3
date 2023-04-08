import { Toaster } from "react-hot-toast";

import NavBar from "../navbar";
import Head from "next/head";
import Footer from "../footer";
type LayoutProps = {
  children: React.ReactNode; // 👈️ type children
};

const LayOut = (props: LayoutProps) => {
  return (
    <main className="font-serif text-gray-900 dark:bg-gray-800 dark:text-white">
      <Toaster />
      <Head>
        <title>YelpCamp</title>
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta
          name="description"
          content="YelpCamp is Colt Steel's Famous project (re-written in Next.js)"
          key="desc"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <NavBar />
      <div className="">{props.children ? props.children : null}</div>
      <Footer />
    </main>
  );
};
export default LayOut;
