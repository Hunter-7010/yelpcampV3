import type { NextPage } from "next";
import Link from "next/link";
import { api } from "~/utils/api";
import SearchComponent from "~/components/searchComponent";
import Header from "~/components/header";
import LoadingSpinner from "~/components/loadingSpinner";
const Campgrounds: NextPage = () => {

  const { data: campgroundData, isLoading } = api.campground.getAll.useQuery(
    undefined,
    {
      refetchOnWindowFocus: false,
    }
  );

  const campgrounds = campgroundData;

  return (
    <div className="flex flex-col items-center md:h-full">
      <Header/>

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
       <LoadingSpinner/>
      )}
    </div>
  );
};

export default Campgrounds; //MUST EXPORT SO THAT NEXT JS FINDS IT
