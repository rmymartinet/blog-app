"use client";

import BackButtonAnimation from "@/utils/Animations/common/BackButtonAnimation";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Link from "next/link";
import { useRef } from "react";
import { FaArrowLeft } from "react-icons/fa6";

gsap.registerPlugin(useGSAP);

const BackButton = () => {
  const backButtonRef = useRef<HTMLAnchorElement>(null);

  useGSAP(() => {
    BackButtonAnimation(backButtonRef);
  }, []);

  return (
    <Link
      ref={backButtonRef}
      href="/"
      className="border rounded-full flex gap-2 items-center py-1 px-2 w-max group hover:bg-white hover:text-black transition-colors duration-300"
    >
      <FaArrowLeft className="transform group-hover:-translate-x-1 transition-transform duration-300" />
      <span>Back</span>
    </Link>
  );
};

export default BackButton;
