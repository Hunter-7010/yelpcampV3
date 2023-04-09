import { useEffect, useState } from "react";
import { api } from "~/utils/api";
import { useSession, signIn } from "next-auth/react";
import { toast } from "react-hot-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAutoAnimate } from "@formkit/auto-animate/react";

import Rating from "./rating";
type Props = {
  campId: string;
};

const CommentForm = ({ campId }: Props) => {
  const [rating, setRating] = useState(3);
  const { data: sessionData } = useSession();

  //animation
  const [animationParent] = useAutoAnimate<HTMLDivElement>();
  const ctx = api.useContext();

  const reviewFormSchema = z.object({
    campId: z.string(),
    title: z.string().min(1, "Cannot be empty"),
    description: z.string().optional(),
    review: z.number().int().positive(),
  });
  type reviewFormSchemaType = z.infer<typeof reviewFormSchema>;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<reviewFormSchemaType>({
    resolver: zodResolver(reviewFormSchema),
  });

  const { mutateAsync: insertReview } = api.campground.insertReview.useMutation(
    {
      onSuccess: () => {
        return ctx.invalidate();
      },
    }
  );

  useEffect(() => {
    reset();
    setRating(3);
  }, [isSubmitSuccessful]);

  const formSubmitHandler: SubmitHandler<reviewFormSchemaType> = (
    dataToSend
  ) => {
    const payLoad = { ...dataToSend, review: rating, campId: campId };

    void toast.promise(
      insertReview(payLoad),
      {
        loading: "...Adding Comment",
        success: "Comment added successfully!",
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
    // eslint-disable-next-line
    <form onSubmit={handleSubmit(formSubmitHandler)}>
      <div className="mb-4 w-full rounded-lg border border-gray-200 bg-gray-50 dark:border-gray-600 dark:bg-gray-700">
        <input type="hidden" defaultValue={campId} {...register("campId")} />

        <div className="w-1/2 p-2">
          <label
            htmlFor="base-input"
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            Rating
          </label>
          <input
            type="hidden"
            value={rating}
            {...register("review", {
              valueAsNumber: true,
            })}
          />
          <Rating rating={rating} setRating={setRating} />
        </div>
        <div ref={animationParent} className="mb-2 w-full lg:w-1/4 p-2">
          <label
            htmlFor="base-input"
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            Title
          </label>
          <input
            type="text"
            id="base-input"
            {...register("title")}
            className="block w-full rounded-lg border border-gray-300 bg-white p-2.5 text-sm text-gray-900 focus:border-teal-500 focus:ring-teal-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 dark:focus:border-teal-500 dark:focus:ring-teal-500"
          />
          {errors.title && (
            <p className="mt-1 text-xs text-red-600 dark:text-red-500">
              {" "}
              {errors.title.message}
            </p>
          )}
        </div>
        <div className="mb-2 p-2">
          <label
            htmlFor="description"
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            Your Comment
          </label>
          <textarea
            id="description"
            rows={4}
            {...register("description")}
            disabled={!sessionData?.user ? true : false}
            placeholder={
              !sessionData?.user
                ? "Please Sign in to make a comment"
                : "Write a comment..."
            }
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-teal-500 focus:ring-teal-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-teal-500 dark:focus:ring-teal-500"
          ></textarea>
        </div>

        <div className="flex items-center justify-between border-t px-3 py-2 dark:border-gray-600">
          {sessionData?.user ? (
            <button
              type="submit"
              disabled={isSubmitSuccessful}
              className="inline-flex items-center rounded-lg bg-blue-700 px-4 py-2.5 text-center text-xs font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-200 disabled:opacity-50 dark:focus:ring-blue-900"
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
          <p className="ml-5 sm:ml-auto text-xs text-gray-500 dark:text-gray-400">
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
