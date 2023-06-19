import React from "react";

function NoteListes() {
  return (
    <div className="bg-gray-200 w-screen h-screen ">
      <div className="">
        <div className=" m-auto grid grid-cols-3 p-4 gap-2 place-items-center">
          <article className="rounded-xl bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 p-0.5 shadow-xl transition hover:shadow-sm w-1/2">
            <div className="rounded-[10px] bg-white p-4 !pt-20 sm:p-6">
              <time
                datetime="2022-10-10"
                className="block text-xs text-gray-500"
              >
                10th Oct 2022
              </time>

              <a href="#">
                <h3 className="mt-0.5 text-lg font-medium text-gray-900">
                  How to center an element using JavaScript and jQuery
                </h3>
              </a>

              <div className="mt-4 flex flex-wrap gap-1">
                <span className="whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5 text-xs text-purple-600">
                  Snippet
                </span>

                <span className="whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5 text-xs text-purple-600">
                  JavaScript
                </span>
              </div>
            </div>
          </article>
          <article className="rounded-xl bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 p-0.5 shadow-xl transition hover:shadow-sm w-1/2">
            <div className="rounded-[10px] bg-white p-4 !pt-20 sm:p-6">
              <time
                datetime="2022-10-10"
                className="block text-xs text-gray-500"
              >
                10th Oct 2022
              </time>

              <a href="#">
                <h3 className="mt-0.5 text-lg font-medium text-gray-900">
                  How to center an element using JavaScript and jQuery
                </h3>
              </a>

              <div className="mt-4 flex flex-wrap gap-1">
                <span className="whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5 text-xs text-purple-600">
                  Snippet
                </span>

                <span className="whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5 text-xs text-purple-600">
                  JavaScript
                </span>
              </div>
            </div>
          </article>{" "}
          <article className="rounded-xl bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 p-0.5 shadow-xl transition hover:shadow-sm w-1/2">
            <div className="rounded-[10px] bg-white p-4 !pt-20 sm:p-6">
              <time
                datetime="2022-10-10"
                className="block text-xs text-gray-500"
              >
                10th Oct 2022
              </time>

              <a href="#">
                <h3 className="mt-0.5 text-lg font-medium text-gray-900">
                  How to center an element using JavaScript and jQuery
                </h3>
              </a>

              <div className="mt-4 flex flex-wrap gap-1">
                <span className="whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5 text-xs text-purple-600">
                  Snippet
                </span>

                <span className="whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5 text-xs text-purple-600">
                  JavaScript
                </span>
              </div>
            </div>
          </article>{" "}
          <article className="rounded-xl bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 p-0.5 shadow-xl transition hover:shadow-sm w-1/2">
            <div className="rounded-[10px] bg-white p-4 !pt-20 sm:p-6">
              <time
                datetime="2022-10-10"
                className="block text-xs text-gray-500"
              >
                10th Oct 2022
              </time>

              <a href="#">
                <h3 className="mt-0.5 text-lg font-medium text-gray-900">
                  How to center an element using JavaScript and jQuery
                </h3>
              </a>

              <div className="mt-4 flex flex-wrap gap-1">
                <span className="whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5 text-xs text-purple-600">
                  Snippet
                </span>

                <span className="whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5 text-xs text-purple-600">
                  JavaScript
                </span>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}

export default NoteListes;