import { useRouter } from "next/router";
import { useState } from "react";

import DropDown from "./dropDown";


const SearchComponent = () => {
    const router = useRouter();
    const [searchTerm, setSearchTerms] = useState("");

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
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
  return (
    <header
    aria-label="Page Header"
    className="w-full bg-gray-50 transition dark:bg-gray-800"
  >
    <div className="mx-auto max-w-screen-xl px-4 py-5 sm:px-6 lg:px-8">
      <div className="flex items-center justify-end gap-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <label className="sr-only" htmlFor="search">
              {" "}
              Search{" "}
            </label>

            <input
              className="h-10 w-full rounded-full border-none transition bg-white pl-4 pr-10 text-sm shadow-sm focus:ring-teal-500 dark:bg-gray-700 dark:ring-none dark:focus:ring-teal-500 sm:w-56"
              id="search"
              type="search"
              
              placeholder="Search Campground..."
              onChange={onChangeHandler}
              onKeyDown={handleKeyDown}
            />

            <button
              type="button"
              onClick={onSearchHandler}
              className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full bg-gray-50 p-2 text-gray-600 transition hover:text-gray-700 dark:bg-gray-600 dark:text-gray-200"
            >
              <span className="sr-only">Search</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>

        
          <DropDown/>
        </div>

        <span
          aria-hidden="true"
          className="block h-6 w-px rounded-full bg-gray-200"
        ></span>
      </div>
    </div>
  </header>
  )
}

export default SearchComponent