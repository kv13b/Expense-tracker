"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
const Header = () => {
  return (
    <div className="p-5 flex justify-between items-center border shadow-sm ">
      <Image src={"/logo.svg"} alt="logo" width={100} height={80} />

      <Link href={"/sign-in"}>
        <Button className="text-white bg-[color:var(--color-primary)] hover:bg-[color:var(--color-primary)]/90">
          Get Started
        </Button>
      </Link>
    </div>
  );
};
export default Header;
