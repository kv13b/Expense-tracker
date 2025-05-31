import Image from "next/image";
import Link from "next/link";

export default function Login() {
  return (
    <div className="flex h-screen">
      {/* Left side with image */}
      <div className="hidden md:flex w-1/2 items-center justify-center bg-gray-100">
        <Image
          src="https://developer.huawei.com/Enexport/sites/default/images/new-content/AppGallery-Connect/auth-service/authFuncStandard.jpg"
          alt="Login Illustration"
          width={600}
          height={600}
          className="object-contain rounded-lg"
        />
      </div>

      {/* Right side: Login Form */}
      <div className="lg:p-36 md:p-52 sm:p-20 p-8 w-full lg:w-1/2">
        <h1 className="text-2xl font-semibold mb-4">Login</h1>
        <form action="#" method="POST">
          {/* Username Input */}
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-600">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              autoComplete="off"
            />
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-600">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              autoComplete="off"
            />
          </div>
          {/* Login Button */}
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"
          >
            Login
          </button>
        </form>

        {/* Sign Up */}
        <div className="mt-6 text-blue-500 text-center">
          <Link href="/signin" className="hover:underline">
            Sign up Here
          </Link>
        </div>
      </div>
    </div>
  );
}
