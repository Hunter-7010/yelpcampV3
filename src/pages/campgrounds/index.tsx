import type { NextPage } from "next";
import Link from "next/link";
import { api } from "~/utils/api";
import { useSession } from "next-auth/react";
import SearchComponent from "~/components/searchComponent";
const Campgrounds: NextPage = () => {
  const { data: sessionData } = useSession();

  const { data: campgroundData, isLoading } = api.campground.getAll.useQuery(
    undefined,
    {
      refetchOnWindowFocus: false,
    }
  );

  const campgrounds = campgroundData;

  return (
    <div className="flex flex-col items-center md:h-full">
      <div
        className="flex h-80 w-full select-none flex-col items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url("https://images.unsplash.com/photo-1530488562579-7c1dd2e6667b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80")`,
        }}
      >
        <div className="text-5xl text-white">Welcome to YelpCamp</div>
        <div className="mt-2 text-lg text-white ">
          View CampGround form all around the world!
        </div>
        {!sessionData ? (
          <div className="mt-2 text-lg font-bold text-white ">
            Sign in to Add a Campground
          </div>
        ) : null}
      </div>

      <SearchComponent />
      {!isLoading ? (
        <div className="mt-4 flex w-full flex-wrap justify-center gap-8 px-8 md:justify-start">
          {campgrounds?.map((camp) => (
            <Link
              className="mx-auto h-44"
              href={`/campgrounds/${camp.id}`}
              key={camp.id}
            >
              <div className="group relative block h-44 w-[320px] overflow-hidden rounded-xl">
                <div className="absolute inset-0 z-10 bg-black/25  transition group-hover:bg-black/[0.4]"></div>
                <img
                  alt="campground picture"
                  src={camp.image}
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null; // prevents looping
                    currentTarget.src =
                      "https://images.unsplash.com/photo-1487730116645-74489c95b41b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80";
                  }}
                  className="absolute inset-0 h-full w-full transition duration-700 group-hover:scale-105"
                />

                <div className="relative z-20 flex items-start justify-between p-4 sm:p-6 lg:p-8">
                  <div className="pt-14 text-white">
                    <h3 className="text-xl font-bold sm:text-2xl">
                      {camp.name}
                    </h3>

                    <p className="text-sm">{camp.address}</p>
                  </div>

                  <span className="inline-flex items-center gap-0.5 rounded-full bg-black px-2 py-1 text-xs font-semibold text-white">
                    {camp.review}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-yellow-300"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div
          role="status"
          className="flex h-[24rem] w-screen items-center justify-center"
        >
          <svg
            aria-hidden="true"
            className="mr-2 h-8 w-8 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      )}
    </div>
  );
};

export default Campgrounds; //MUST EXPORT SO THAT NEXT JS FINDS IT
