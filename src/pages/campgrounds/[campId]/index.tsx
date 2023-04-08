import type { NextPage } from "next";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import Link from "next/link";
import { useSession } from "next-auth/react";

import Star from "~/components/svgs/star";
import CommentForm from "~/components/commentForm";
import UserSvg from "~/components/svgs/user";
import { toast } from "react-hot-toast";

const Show: NextPage = () => {
  const { data: sessionData } = useSession();
  const router = useRouter();

  const param = router.query.campId as string;
  const { data: campground } = api.campground.getById.useQuery(
    {
      id: param ? param : "",
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  const ctx = api.useContext();
  const deleteCamp = api.campground.deleteCamp.useMutation({
    onSuccess: () => {
      void router.push("/campgrounds");
      return ctx.invalidate();
    },
  });
  const { mutate: deleteReview, isLoading: isSaving } =
    api.campground.deleteReview.useMutation({
      onSuccess: () => {
        return ctx.invalidate();
      },
    });
  const deleteHandler = () => {
    deleteCamp.mutate({ id: param });
  };

  const deleteReviewHandler = (reviewId: string): void => {
    deleteReview({ reviewId: reviewId });
  };


  return (
    <div className="">
      <section>
        <div className="relative mx-auto max-w-screen-xl px-4 py-8">
          <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-2">
            <div className="grid grid-cols-1 gap-4">
              <img
                alt="campground picture"
                src={campground?.image}
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null; // prevents looping
                  currentTarget.src =
                    "https://images.unsplash.com/photo-1487730116645-74489c95b41b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80";
                }}
                className="aspect-square w-full rounded-xl object-cover"
              />
            </div>

            <div className="sticky top-0">
              <strong className="rounded-full border border-blue-600 bg-gray-100 px-3 py-0.5 text-xs font-medium tracking-wide text-blue-600">
                {campground?.authorName}
              </strong>

              <div className="mt-8 flex justify-between">
                <div className="max-w-[35ch] space-y-2">
                  <h1 className="text-xl font-bold sm:text-2xl">
                    {campground?.name}
                  </h1>

                  <p className="text-sm">{campground?.address}</p>
                  <p className="text-xs opacity-50">
                    {campground?.createdAt.toDateString()}
                  </p>

                  <div className="-ml-0.5 flex">
                    {[...Array(campground?.review).keys()].map((i: number) => (
                      <Star textColor="text-yellow-400" key={i} />
                    ))}
                    {[...Array(5 - (campground?.review || 0)).keys()].map(
                      (i: number) => (
                        <Star textColor="text-gray-200" key={i} />
                      )
                    )}
                  </div>
                </div>

                <p className="text-lg font-bold">${campground?.price}/night</p>
              </div>

              <div className="mt-4">
                <div className="prose max-w-none">
                  <p>{campground?.description}</p>
                </div>

                <button className="mt-2 text-sm font-medium underline">
                  Read More
                </button>
              </div>
              {sessionData?.user.id == campground?.authorId && (
                <div className="mt-8 flex gap-4">
                  <button
                    type="button"
                    onClick={deleteHandler}
                    className="mb-2 mr-2 rounded-lg border border-red-700 px-5 py-2.5 text-center text-sm font-medium text-red-700 hover:bg-red-800 hover:text-white focus:outline-none focus:ring-4 focus:ring-red-300 dark:border-red-500 dark:text-red-500 dark:hover:bg-red-600 dark:hover:text-white dark:focus:ring-red-900"
                  >
                    Delete
                  </button>
                  <Link href={`/campgrounds/${param}/edit`}>
                    <button
                      type="button"
                      className="mb-2 mr-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Edit
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </div>
          <div className="mt-2">
            {/* <h2 className="text-center text-2xl">Reviews:</h2> */}
            {/* <form onSubmit={commentHandler}>
              <textarea
                className="w-full bg-gray-300 px-2 text-lg"
                ref={commentRef}
                disabled={!sessionData?.user ? true : false}
                placeholder={
                  !sessionData?.user ? "Please sign in to comment" : "Comment"
                }
              ></textarea>
              {sessionData?.user ? (
                <button className="w-24 rounded-2xl bg-sky-500">Comment</button>
              ) : null}
            </form> */}
            <CommentForm campId={param} />
            <ul className="space-y-4 p-2">
              {campground?.reviews
                .slice(0)
                .reverse()
                .map((review) => (
                  <li key={review.id}>
                    {" "}
                    <article>
                      <div className="mb-4 flex items-center space-x-4">
                        <UserSvg />

                        <div className="space-y-1 font-medium dark:text-white">
                          <p>
                            {review.username}
                            {/* <time
                              title="2014-08-16 19:00"
                              className="block text-sm text-gray-500 dark:text-gray-400"
                            >
                              Joined on August 2014
                            </time> */}
                          </p>
                        </div>
                      </div>
                      <div className="mb-1 flex items-center">
                        {[...Array(campground?.review).keys()].map(
                          (i: number) => (
                            <Star textColor="text-yellow-400" key={i} />
                          )
                        )}
                        {[...Array(5 - (campground?.review || 0)).keys()].map(
                          (i: number) => (
                            <Star textColor="text-gray-200" key={i} />
                          )
                        )}
                        {/* <h3 className="ml-2 text-sm font-semibold text-gray-900 dark:text-white">
                          Thinking to buy another one!
                        </h3> */}
                      </div>
                      <footer className="mb-5 text-sm text-gray-500 dark:text-gray-400">
                        <p>
                          Reviewed on{" "}
                          <time title="2017-03-03 19:00">
                            {review.createdAt.toDateString()}
                          </time>
                        </p>
                      </footer>
                      <p className="mb-2 text-gray-500 dark:text-gray-400">
                        {review.comment}
                      </p>

                      <a
                        href="#"
                        className="mb-4 block text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
                      >
                        Read more
                      </a>
                      <aside>
                        {review.userId == sessionData?.user?.id && (
                          <div className="mt-1 flex items-center space-x-3 divide-x divide-gray-200 dark:divide-gray-600">
                            <a
                              onClick={() => deleteReviewHandler(review.id)}
                              className="cursor-pointer rounded-lg border border-red-300 bg-white px-2 py-1.5 text-xs font-medium text-red-900 hover:bg-red-100 focus:outline-none focus:ring-4 focus:ring-red-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                            >
                              Delete
                            </a>
                            <a
                              href="#"
                              className="pl-4 text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
                            >
                              Edit
                            </a>
                          </div>
                        )}
                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                          19 people found this helpful
                        </p>
                      </aside>
                    </article>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </section>

      {/* {campground ? (
        <div className="flex flex-col items-center justify-center ">
          <img
            alt="campground picture"
            src={campground.image}
            onError={({ currentTarget }) => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src =
                "https://images.unsplash.com/photo-1487730116645-74489c95b41b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80";
            }}
            width="620"
            className="-pt-2 mt-12"
          />

          <p className="mt-2 text-3xl">{campground.name}</p>
          <p className="">{campground.price}$/Night</p>

          <p className="">Review:{campground.review}</p>
          <p className="">Address:{campground?.address}</p>
          <p className="">
            Created At: {campground.createdAt.toLocaleDateString()}
          </p>
          <p className="text-gray-400">Submitted By: {campground.authorName}</p>

          {campground.authorId == sessionData?.user?.id ? (
            <>
              <p className="text-gray-500"></p>
              <button
                className="h-8 w-32 rounded-2xl bg-red-600 duration-300 hover:scale-110"
                onClick={deleteHandler}
              >
                Delete
              </button>
              <Link href={`/campgrounds/${param}/edit`}>
                <div className="mt-2 flex h-10 w-60 items-center justify-center rounded-2xl bg-sky-500 duration-300 hover:scale-110">
                  Update CampGround
                </div>
              </Link>
            </>
          ) : null}

          <div className="mt-2 w-screen border">
            <h2 className="text-center text-2xl">Reviews:</h2>
            <form onSubmit={commentHandler}>
              <textarea
                className="w-full bg-gray-300 px-2 text-lg"
                ref={commentRef}
                disabled={!sessionData?.user ? true : false}
                placeholder={
                  !sessionData?.user ? "Please sign in to comment" : "Comment"
                }
              ></textarea>
              {sessionData?.user ? (
                <button className="w-24 rounded-2xl bg-sky-500">Comment</button>
              ) : null}
            </form>
            <ul className="p-2 ">
              {campground.reviews
                .slice(0)
                .reverse()
                .map((review) => (
                  <li
                    className="mt-2 flex h-20 items-center justify-between bg-white px-4"
                    key={review.id}
                  >
                    <div className="flex w-screen flex-col">
                      <p className="mb-2 text-blue-600">{review.username}</p>
                      <div className="w-1/2 overflow-auto">
                        {review.comment}
                      </div>
                    </div>

                    {review.userId == sessionData?.user?.id ? (
                      <div className="flex items-center justify-center">
                        <a
                          className="flex h-8 w-20 items-center justify-center rounded-2xl bg-red-600 text-red-900 duration-300 hover:scale-110 hover:cursor-pointer"
                          id={review.id}
                          onClick={deleteReviewHandler}
                        >
                          Delete
                        </a>
                      </div>
                    ) : null}
                  </li>
                ))}
            </ul>
          </div>
        </div>
      ) : (
        <div
          role="status"
          className="flex h-screen w-screen items-center justify-center"
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
      )} */}
    </div>
  );
};

export default Show;
