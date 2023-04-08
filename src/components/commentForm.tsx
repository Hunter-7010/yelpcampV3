import { useRef } from "react";
import { api } from "~/utils/api";
import { useSession, signIn } from "next-auth/react";
type Props = {
  campId: string;
};

const CommentForm = ({ campId }: Props) => {
  const { data: sessionData } = useSession();
  const ctx = api.useContext();
  const commentRef = useRef<HTMLTextAreaElement>(null);
  const { mutate: insertReview } = api.campground.insertReview.useMutation({
    onSuccess: () => {
      return ctx.invalidate();
    },
  });

  const commentHandler = (e: React.SyntheticEvent): void => {
    e.preventDefault();
    const reviewData = {
      campId: campId,
      comment: commentRef.current?.value || "",
      description: "",
      review: 3,
    };
    insertReview(reviewData);
    if (commentRef.current) {
      commentRef.current.value = "";
    }
  };
  return (
    <form onSubmit={commentHandler}>
      <div className="mb-4 w-full rounded-lg border border-gray-200 bg-gray-50 dark:border-gray-600 dark:bg-gray-700">
        <div className="rounded-t-lg bg-white px-4 py-2 dark:bg-gray-800">
          <label htmlFor="comment" className="sr-only">
            Your comment
          </label>
          <textarea
            id="comment"
            rows={4}
            ref={commentRef}
            disabled={!sessionData?.user ? true : false}
            placeholder={
              !sessionData?.user
                ? "Please Sign in to make a comment"
                : "Write a comment..."
            }
            className="w-full border-0 bg-white px-0 text-sm text-gray-900 focus:outline-none focus:ring-0 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
          ></textarea>
        </div>
        <div className="flex items-center justify-between border-t px-3 py-2 dark:border-gray-600">
          {sessionData?.user ? (
            <button
              type="submit"
              className="inline-flex items-center rounded-lg bg-blue-700 px-4 py-2.5 text-center text-xs font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900"
            >
              Post comment
            </button>
          ) : (
            <button
              type="button"
              onClick={() => void signIn("google")}
              className="mb-2 mr-2 rounded-lg border border-blue-700 px-5 py-2.5 text-center text-sm font-medium text-blue-700 transition duration-300 hover:bg-blue-800 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300 dark:border-blue-500 dark:text-blue-500 dark:hover:bg-blue-500 dark:hover:text-white dark:focus:ring-blue-800"
            >
              SignIn
            </button>
          )}
          <p className="ml-auto text-xs text-gray-500 dark:text-gray-400">
            Remember, contributions to this topic should follow our{" "}
            <a
              href="#"
              className="text-blue-600 hover:underline dark:text-blue-500"
            >
              Community Guidelines
            </a>
            .
          </p>
        </div>
      </div>
    </form>
  );
};

export default CommentForm;
