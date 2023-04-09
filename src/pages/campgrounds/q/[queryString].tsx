import type { NextPage } from "next";
import Link from "next/link";
import { ChangeEvent, useState } from "react";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import { CampTypes } from "~/types/campground.types";

import Header from "~/components/header";
import SearchComponent from "~/components/searchComponent";
import LoadingSpinner from "~/components/loadingSpinner";

const SearchCampground: NextPage = () => {
  const router = useRouter();
  const search = router.query.queryString as string;
  const [searchTerm, setSearchTerms] = useState("");
  const { data: campgrounds,isLoading } = api.searchCampground.getBySearchTerm.useQuery(
    { searchTerm: search },
    {
      refetchOnWindowFocus: false,
    }
  ) as { data: CampTypes[],isLoading: boolean};

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerms(e.currentTarget.value);
  };
  const onSearchHandler = (e: React.MouseEvent<HTMLElement> | null): void => {
    void router.push(`/campgrounds/q/${searchTerm.toLowerCase()}`);
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === "Enter") {
      onSearchHandler(null);
    }
  };
  if (campgrounds?.length === 0) {
    return (
      <div className="flex flex-col items-center md:h-full">
        <Header/>
        <SearchComponent/>
        <div className="flex h-12 w-full items-center justify-between bg-white shadow-lg">
          <div></div>
          <div className="mr-52 flex">
            <input
              type="text"
              name=""
              id=""
              className="border pl-2 shadow-sm"
              placeholder="Search Campground"
              onChange={onChangeHandler}
              onKeyDown={handleKeyDown}
            />
            <a
              className="flex w-8 cursor-pointer items-center justify-center bg-sky-400"
              onClick={onSearchHandler}
            >
              <svg
                className=""
                width="21"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {" "}
                <circle
                  cx="11.7669"
                  cy="11.7666"
                  r="8.98856"
                  stroke="currentColor"
                ></circle>{" "}
                <path
                  d="M18.0186 18.4851L21.5426 22"
                  stroke="currentColor"
                ></path>{" "}
              </svg>
            </a>
          </div>
        </div>
        <div>Could not find any</div>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center md:h-full">
      <Header/>
      <SearchComponent/>

      <div className="mt-4 flex w-full flex-wrap justify-center gap-8 px-8 md:justify-start">
        {!isLoading  ? (
          campgrounds.map((camp) => (
            <Link
            className="mx-auto h-44"
            href={`/campgrounds/${camp._id}`}
            key={camp._id}
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
          ))
        ) : (
          <LoadingSpinner/>
        )}
      </div>
    </div>
  );
};

export default SearchCampground;
