import { SignIn } from "@clerk/nextjs";
import Image from "next/image"; // ✅ Correct
export default function Page() {
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

      {/* Right side with Clerk SignIn */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <SignIn />
        </div>
      </div>
    </div>
  );
}
