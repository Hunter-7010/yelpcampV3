import type { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useRef, useEffect, useState } from "react";
import { api } from "~/utils/api";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAutoAnimate } from "@formkit/auto-animate/react";

import Rating from "~/components/rating";

const NewCamp: NextPage = () => {
  const router = useRouter();
  const { status } = useSession();
  //animation
  const [animationParent] = useAutoAnimate<HTMLDivElement>();
  // const imageCloudUrl = env.PUBLIC_CLOUDINARY_URL
  const formRef = useRef<HTMLFormElement>(null);
  const [rating, setRating] = useState(3);
  useEffect(() => {
    if (status == "unauthenticated") {
      void router.push("/");
    }
  }, [status]);
  const campgroundFormSchema = z.object({
    name: z.string().min(1, "Cannot be empty"),
    address: z.string(),
    description: z.string(),
    price: z.number().positive().min(1, "Cannot be empty"),
    review: z.number().int().positive(),
    image: z.string(),
  });
  type campgroundFormSchemaType = z.infer<typeof campgroundFormSchema>;
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm<campgroundFormSchemaType>({
    resolver: zodResolver(campgroundFormSchema),
  });

  const ctx = api.useContext();
  const { mutateAsync } = api.campground.addCamp.useMutation({
    onSuccess: () => {
      void router.push("/campgrounds");
      return ctx.invalidate();
    },
  });

  const [imageSrc, setImageSrc] = useState<string | null>("");
  const [uploadData, setUploadData] = useState<string>();
  /**
   * handleOnChange
   * @description Triggers when the file input changes (ex: when a file is selected)
   */
  function handleOnChange(changeEvent: React.ChangeEvent<HTMLInputElement>) {
    const file = changeEvent.target.files![0];
    if (!file) {
      return;
    }

    const reader = new FileReader();

    reader.onload = function (onLoadEvent: ProgressEvent<FileReader>) {
      if (onLoadEvent.target) {
        const result = onLoadEvent.target.result;
        if (typeof result === "string") {
          setImageSrc(result);
          setUploadData(undefined);
        }
      }
    };

    reader.readAsDataURL(file);
  }

  /**
   * handleOnSubmit
   * @description Triggers when the main form is submitted
   */

  const formSubmitHandler: SubmitHandler<campgroundFormSchemaType> = (
    dataToSend
  ) => {
    const form = formRef.current!;
    const fileInput = Array.from(
      form.elements as unknown as HTMLInputElement[]
    ).find((el) => el.name === "file") as HTMLInputElement;

    const formData = new FormData();

    const file = Array.from(fileInput.files!)[0];
    formData.append("file", file!);

    formData.append("upload_preset", "my-uploads");

    const data = fetch(
      "https://api.cloudinary.com/v1_1/dddvtrxcz/image/upload",
      {
        method: "POST",
        body: formData,
      }
    )
      .then((r) => r.json())
      .then((data: { secure_url: string }) => {
        return {
          secure_url: data.secure_url,
        };
      });

    void toast.promise(
      data,
      {
        loading: "...Saving Image",
        success: "Image saved successfully!",
        error: "Cant upload image!",
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
    data
      .then((data) => {
        const payload = {
          ...dataToSend,
          image: data.secure_url,
          review: rating,
        };
        setImageSrc(data.secure_url);
        setUploadData(data.secure_url);

        void toast.promise(
          mutateAsync(payload),
          {
            loading: "...Saving Campground",
            success: "Campground saved successfully!",
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
      })
      .catch(() => {
        void toast.error("Something went wrong");
      });
  };
  return (
    <div className="">
      <section className="bg-white dark:bg-gray-900">
        <div
          ref={animationParent}
          className="mx-auto max-w-2xl px-4 py-8 lg:py-16"
        >
          {imageSrc && (
            <img
              src={imageSrc || ""}
              className="mx-auto mb-4 h-96"
              alt="user provided image"
            />
          )}
          <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
            Add a new Campground
          </h2>
          {/* eslint-disable-next-line */}
          <form ref={formRef} onSubmit={handleSubmit(formSubmitHandler)}>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
              <div className="sm:col-span-2">
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Campground Name
                </label>
                <input
                  type="text"
                  {...register("name")}
                  id="name"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-teal-600 focus:ring-teal-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-teal-500 dark:focus:ring-teal-500"
                  placeholder="Type Campground name"
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-red-600">
                    {" "}
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div className="w-full">
                <label
                  htmlFor="address"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Address
                </label>
                <input
                  type="text"
                  {...register("address")}
                  id="address"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-teal-600 focus:ring-teal-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-teal-500 dark:focus:ring-teal-500"
                  placeholder="Campground Address"
                />
                {errors.address && (
                  <p className="mt-1 text-xs text-red-600">
                    {" "}
                    {errors.address.message}
                  </p>
                )}
              </div>
              <div className="w-full">
                <label
                  htmlFor="price"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Price Per Night
                </label>
                <input
                  type="text"
                  {...register("price", {
                    valueAsNumber: true,
                  })}
                  id="price"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-teal-600 focus:ring-teal-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-teal-500 dark:focus:ring-teal-500"
                  placeholder="$2.9"
                />
                {errors.price && (
                  <p className="mt-1 text-xs text-red-600">
                    {" "}
                    {errors.price.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="review"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Rate
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
              <div className="group relative w-2/3">
                <label
                  htmlFor="item-weight"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Image
                </label>
                <input className="hidden" {...register("image")} />
                <label className=" flex h-[42px] items-center justify-center rounded-md border border-blue-700 bg-blue-500 px-6 text-lg text-blue-50 transition duration-300 group-hover:bg-blue-200 group-hover:text-blue-900">
                  Insert An Image
                </label>
                <input
                  type="file"
                  className="absolute inset-0 cursor-pointer opacity-0"
                  onChange={handleOnChange}
                  name="file"
                />
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="description"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  rows={8}
                  {...register("description")}
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-teal-500 focus:ring-teal-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-teal-500 dark:focus:ring-teal-500"
                  placeholder="Your description here"
                ></textarea>
              </div>
            </div>
            <button
              type="submit"
              disabled={isSubmitSuccessful}
              className={`mt-4 inline-flex items-center rounded-lg bg-teal-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-teal-800 focus:ring-4 focus:ring-teal-200 disabled:opacity-40 dark:focus:ring-teal-900 sm:mt-6 ${isSubmitSuccessful &&"cursor-wait"}`}
            >
              Add Campground
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default NewCamp;
