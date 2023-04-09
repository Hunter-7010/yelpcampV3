import type { NextPage } from "next";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";

const Home: NextPage = () => {
  const { data: sessionData } = useSession();
  return (
    <section className="relative min-h-screen bg-[url(/landing.webp)] bg-cover bg-center bg-no-repeat text-white">
      <div className="absolute inset-0 bg-gray-900/40 sm:bg-transparent sm:bg-gradient-to-r sm:from-gray-900/50 sm:to-gray-900/25"></div>
      <div className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8">
        <div className="max-w-xl text-center sm:text-left">
          <h1 className="flex flex-col justify-center text-3xl font-extrabold sm:text-5xl">
            <span className="-ml-2">Welcome to</span>
            <strong className="font-extrabold text-teal-400">YelpCamp</strong>
          </h1>

          <p className="mt-4 max-w-lg sm:text-xl sm:leading-relaxed">
            Valuable insights and recommendations for other campers.
          </p>

          <div className="mt-8 flex flex-wrap gap-4 text-center">
            <Link
              href="/campgrounds"
              className="block w-full rounded bg-teal-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-teal-700 focus:outline-none focus:ring active:bg-teal-500 sm:w-auto"
            >
              Get Started
            </Link>

            {sessionData?.user ? (
              <Link
                className="block w-full rounded bg-white px-12 py-3 text-sm font-medium text-teal-600 shadow hover:text-teal-400 focus:outline-none focus:ring active:text-teal-500 sm:w-auto"
                title="Add Campground"
                href="/campgrounds/new"
              >
                +Add Camp
              </Link>
            ) : (
              <a
                className="block w-full cursor-pointer rounded bg-white px-12 py-3 text-sm font-medium text-teal-600 shadow hover:text-teal-400 focus:outline-none focus:ring active:text-teal-500 sm:w-auto"
                title="sign in with Google"
                onClick={() => void signIn("google")}
              >
                Login
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home; //MUST EXPORT SO THAT NEXT JS FINDS IT
