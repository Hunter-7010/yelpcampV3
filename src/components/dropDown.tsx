import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useRouter } from "next/router";
const DropDown: React.FC = () => {
  const router = useRouter();

  return (
    <div className="relative">
      <Menu>
        <Menu.Button className="block shrink-0 rounded-full bg-white p-2.5 text-gray-600 shadow-sm hover:text-gray-700 dark:bg-gray-600 dark:text-gray-200">
          <span className="sr-only">Sort</span>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
            />
          </svg>
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-10 mt-2 w-56 rounded-md border border-gray-100 bg-white shadow-lg dark:border-gray-800 dark:bg-gray-900">
            <Menu.Item>
              {() => (
                <div className="p-2">
                  <a
                    className={
                      "block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-300 cursor-pointer"
                    }
                    onClick={() => {
                      void router.push("/campgrounds/sort/createdAt");
                    }}
                  >
                    By Creation date
                  </a>
                </div>
              )}
            </Menu.Item>
            <Menu.Item>
              {() => (
                <div className="p-2">
                  <a
                    className={
                      "block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-300 cursor-pointer"
                    }
                    onClick={() => {
                      void router.push("/campgrounds/sort/price");
                    }}
                  >
                    By Price
                  </a>
                </div>
              )}
            </Menu.Item>
            <Menu.Item>
              {() => (
                <div className="p-2">
                  <a
                    className={
                      "block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-300 cursor-pointer"
                    }
                    onClick={() => {
                      void router.push("/campgrounds/sort/review");
                    }}
                  >
                    By Review
                  </a>
                </div>
              )}
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default DropDown;
