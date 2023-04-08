/* eslint-disable */

import type { NextPage } from "next";
import Link from "next/link";
import { Fragment, useEffect } from "react";
import { api } from "~/utils/api";
import { useSession } from "next-auth/react";
import { CampTypes } from "~/types/campground.types";
import SearchComponent from "~/components/searchComponent";

const Infinite: NextPage = () => {
  const { data: sessionData } = useSession();

  let skip = 0;
  const { fetchNextPage, data, isFetchingNextPage, hasNextPage, remove } =
    api.campground.testAll.useInfiniteQuery(
      {
        skip: skip,
      },
      {
        refetchOnWindowFocus: false,
        getNextPageParam: (lastPage: any) => {
          lastPage.skip = skip;
          if (lastPage.camp.length === 0) {
            return undefined;
          }
          return lastPage.skip;
        },
      }
    );
  useEffect(() => {
    remove();
    fetchNextPage();
  }, []);

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

      <div className="mt-4  w-full sm:flex sm:flex-wrap ">
        {data?.pages.map((group: { camp: CampTypes[] }, i: number) => (
          <Fragment key={i}>
            {group.camp.map((camp: CampTypes) => (
              <Link href={`/campgrounds/${camp.id}`} key={camp.id}>
                <div className="flex md:w-1/3" key={camp.id}>
                  <div className="m-2 flex w-full flex-col items-center justify-center duration-300 hover:scale-110 hover:bg-slate-400">
                    <img
                      src={camp.image}
                      alt="campground picture"
                      onError={({ currentTarget }) => {
                        currentTarget.onerror = null; // prevents looping
                        currentTarget.src =
                          "https://images.unsplash.com/photo-1487730116645-74489c95b41b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80";
                      }}
                      width="320"
                      className="-pt-2"
                    />
                    <div>
                      <p className="select-none pt-4 text-blue-600">
                        {camp.name}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </Fragment>
        ))}
      </div>
      <div>
        <button
          onClick={() => {
            skip = data?.pageParams.length ?? 0;
            return fetchNextPage();
          }}
          disabled={!hasNextPage || isFetchingNextPage}
          className="mb-4 h-8 w-64 rounded-md border duration-300 hover:bg-slate-300"
        >
          {isFetchingNextPage
            ? "Loading more..."
            : hasNextPage
            ? "Load More"
            : "Nothing more to load"}
        </button>
      </div>
    </div>
  );
};

export default Infinite; //MUST EXPORT SO THAT NEXT JS FINDS IT
