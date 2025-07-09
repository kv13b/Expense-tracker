"use client";

import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="bg-white flex items-center flex-col">
      <div className="mx-auto w-screen max-w-screen-xl  sm:px-6 sm:py-24 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-prose text-center">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
            All your expenses ...,
            <strong className="text-indigo-600"> one simple view. </strong>
          </h1>

          <p className="mt-4 text-base text-pretty text-[color:var(--color-primary)] sm:text-lg/relaxed">
            Start creating your budget and save a load of Money
          </p>

          <div className="mt-4 flex justify-center gap-4 sm:mt-6">
            <Link
              className="inline-block rounded border border-indigo-600 bg-indigo-600 px-5 py-3 font-medium text-white shadow-sm transition-colors hover:bg-indigo-700"
              href={"/login"}
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
      <Image
        src={"/dashboard.jpg"}
        alt="dash"
        width={1000}
        height={700}
        className="-mt-9 rounded-xl border-1"
      />
    </section>
  );
};

export default Hero;
