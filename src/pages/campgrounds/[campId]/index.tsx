import type { NextPage } from "next";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import Link from "next/link";
import { useSession } from "next-auth/react";

import Star from "~/components/svgs/star";
import CommentForm from "~/components/commentForm";
import UserSvg from "~/components/svgs/user";
import { toast } from "react-hot-toast";
import DeleteConfirmation from "~/components/deleteConfirmation";
import DeleteConfirmationReview from "~/components/deleteConfirmationReview";
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
  const { mutateAsync: deleteCamp } = api.campground.deleteCamp.useMutation({
    onSuccess: () => {
      void router.push("/campgrounds");
      return ctx.invalidate();
    },
  });
  const { mutateAsync: deleteReview, isLoading } =
    api.campground.deleteReview.useMutation({
      onSuccess: () => {
        return ctx.invalidate();
      },
    });
  const deleteHandler = () => {
    void toast.promise(
      deleteCamp({ id: param }),
      {
        loading: "...Deleting Campground...",
        success: "Campground Deleted successfully!",
        error: "Something went wrong!",
      },
      {
        style: {
          minWidth: "250px",
        },
        success: {
          duration: 1000,
        },
      }
    );
  };

  const deleteReviewHandler = (reviewId: string): void => {
    void toast.promise(
      deleteReview({ reviewId: reviewId }),
      {
        loading: "...Deleting Review...",
        success: "Review Deleted successfully!",
        error: "Something went wrong!",
      },
      {
        style: {
          minWidth: "250px",
        },
        success: {
          duration: 1000,
        },
      }
    );
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
                  <DeleteConfirmation deleteHandler={deleteHandler} />
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
                        {[...Array(review.review).keys()].map((i: number) => (
                          <Star textColor="text-yellow-400" key={i} />
                        ))}
                        {[...Array(5 - review.review).keys()].map(
                          (i: number) => (
                            <Star textColor="text-gray-200" key={i} />
                          )
                        )}
                        <h3 className="ml-2 text-sm font-semibold text-gray-900 dark:text-white">
                          {review.title}
                        </h3>
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
                        {review.description}
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
                            <DeleteConfirmationReview
                              deleteHandler={deleteReviewHandler}
                              reviewId={review.id}
                            />
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
    </div>
  );
};

export default Show;
