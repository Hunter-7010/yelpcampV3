import Link from "next/link";

import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";

import SideBar from "./sidebar";
import DarkMode from "./layout/darkMode";

const NavBar: React.FC = () => {
  const { data: sessionData } = useSession();
  const router = useRouter();

  return (
    <header
      aria-label="Site Header"
      className="bg-white transition dark:bg-gray-900"
    >
      <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
        <Link href="/">
          <div className="block text-teal-600 dark:text-teal-300">
            <span className="sr-only">Home</span>

            <svg
              className="h-10 w-10"
              fill="#0A9488"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 800 800"
            >
              <path
                d="M434.6 309.5l-38.3-77-32.6-61.9v-134c0-19.2-12.1-35.7-27.9-36.6C319-1 305 15.3 305 35.6v135L4.6 742c-3.4 6.5-4.8 13.8-4.6 20.9 0 .5-.1.9-.1 1.4C0 784 13.1 800 29.3 800h162.5c4.1 0 7.9-2.6 10-6.9l232.7-468.8c2.4-4.6 2.4-10.2.1-14.8zM668 778.4L482.6 406c-4.6-9.2-15.5-9.2-20.1 0L277.7 778.4c-4.7 9.5.9 21.6 10 21.6H658c9.1 0 14.8-12.1 10-21.6zm132-14.9c0-.7 0-1.4-.1-2.2 0-.5-.1-1-.1-1.4-.1-.7-.2-1.3-.3-2-.1-.5-.2-1-.3-1.6-.1-.6-.2-1.2-.4-1.8-.1-.6-.3-1.1-.4-1.7-.1-.5-.3-1-.5-1.5l-.6-1.8c-.2-.4-.3-.9-.5-1.3-.3-.6-.6-1.3-.8-1.9-.1-.2-.2-.5-.3-.7l-279-546.9V110c0-19.2-12.1-35.7-27.9-36.6C472 72.4 458 88.7 458 109v88.7c-3.8 4.6-4.5 11.8-1.7 17.4l287.7 578c2.1 4.3 5.9 6.9 10 6.9H770.7c.9 0 1.8-.1 2.7-.2.2 0 .3 0 .5-.1 1.7-.2 3.5-.7 5.2-1.3.2-.1.5-.2.7-.3.6-.2 1.2-.5 1.8-.8l.6-.3c.7-.4 1.5-.8 2.2-1.3.2-.2.5-.3.7-.5.3-.2.6-.4 1-.7.1-.1.3-.2.4-.3.5-.4.9-.7 1.4-1.1.4-.3.7-.6 1.1-1 .4-.3.7-.7 1-1.1.4-.4.8-.8 1.2-1.3.3-.3.5-.7.8-1l1.2-1.5c.2-.3.5-.7.7-1 .4-.5.7-1.1 1-1.7.2-.4.4-.9.7-1.3.3-.5.5-1 .8-1.6.2-.5.5-1.1.7-1.6.2-.5.4-.9.6-1.4.2-.6.4-1.3.6-1.9.1-.4.3-.9.4-1.3.2-.6.3-1.3.5-2 .1-.5.2-.9.3-1.4l.3-1.8c.1-.6.2-1.1.2-1.7.1-.5.1-1.1.1-1.6 0-.7.1-1.4.1-2.1v-.6c-.2-.1-.2-.4-.2-.7z"
                className="st0"
              ></path>
            </svg>
           
          </div>
        </Link>

        <div className="flex flex-1 items-center justify-end md:justify-between">
          <nav aria-label="Site Nav" className="hidden md:block">
            <ul className="flex items-center gap-6 text-sm">
              <li>
                <Link href="/campgrounds">
                  <div
                    className={`text-md transition hover:cursor-pointer hover:text-gray-500/75 dark:hover:text-white/75  ${
                      router.route === "/campgrounds"
                        ? "text-gray-800 hover:text-gray-800 dark:text-white"
                        : "text-gray-500 dark:text-gray-300"
                    }`}
                  >
                    Campgrounds
                  </div>
                </Link>
              </li>
              {sessionData?.user && (
                <li>
                  <Link href="/campgrounds/new">
                    <div
                      className={`text-md transition hover:cursor-pointer hover:text-gray-500/75 dark:hover:text-white/75  ${
                        router.route === "/campgrounds/new"
                          ? "text-gray-800 hover:text-gray-800 dark:text-white"
                          : "text-gray-500 dark:text-gray-300"
                      }`}
                    >
                      +Add Camp
                    </div>
                  </Link>
                </li>
              )}

              <li>
                <Link href="/campgrounds/infinite">
                  <div
                    className={`text-md transition hover:cursor-pointer hover:text-gray-500/75 dark:hover:text-white/75  ${
                      router.route === "/campgrounds/infinite"
                        ? "text-gray-800 hover:text-gray-800 dark:text-white"
                        : "text-gray-500 dark:text-gray-300"
                    }`}
                  >
                    All Campgrounds
                  </div>
                </Link>
              </li>
            </ul>
          </nav>

          <div className="flex items-center gap-4">
            <div className="sm:flex sm:gap-4">
              {sessionData?.user ? (
                <a
                  title="sign out"
                  className="cursor-pointer rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600 transition hover:text-teal-600/75 dark:bg-gray-800 dark:text-white dark:hover:text-white/75"
                  onClick={() => void signOut()}
                >
                  Sign out
                </a>
              ) : (
                <a
                  className="block cursor-pointer rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700 dark:hover:bg-teal-500"
                  title="sign in with Google"
                  onClick={() => void signIn("google")}
                >
                  Login
                </a>
              )}
            </div>
            <div className="hidden md:block">
              <DarkMode />
            </div>

            <SideBar>
              <div className="flex justify-center">
                <DarkMode />
              </div>
              <div>
                <Link href="/campgrounds">
                  <div
                    className={`flex cursor-pointer items-center space-x-5 truncate rounded-r-full py-4 pl-8 font-semibold  hover:text-white ${
                      router.route === "/campgrounds"
                        ? "bg-teal-500 text-white"
                        : "hover:bg-teal-300"
                    }`}
                  >
                    <p className="max-w-[190px] overflow-hidden truncate">
                      Campgrounds
                    </p>
                  </div>
                </Link>
                {sessionData?.user && (
                  <Link href="/campgrounds/new">
                    <div
                      className={`flex cursor-pointer items-center space-x-5 truncate rounded-r-full py-4 pl-8 font-semibold  hover:text-white ${
                        router.route === "/campgrounds/new"
                          ? "bg-teal-500 text-white"
                          : "hover:bg-teal-300"
                      }`}
                    >
                      <p className="max-w-[190px] overflow-hidden truncate">
                        +Add Camp
                      </p>
                    </div>
                  </Link>
                )}

                <Link href="/campgrounds/infinite">
                  <div
                    className={`flex cursor-pointer items-center space-x-5 truncate rounded-r-full py-4 pl-8 font-semibold  hover:text-white ${
                      router.route === "/campgrounds/infinite"
                        ? "bg-teal-500 text-white"
                        : "hover:bg-teal-300"
                    }`}
                  >
                    <p className="max-w-[190px] overflow-hidden truncate">
                      All Campgrounds
                    </p>
                  </div>
                </Link>
              </div>
            </SideBar>
          </div>
        </div>
      </div>
    </header>
  );
};
export default NavBar;
