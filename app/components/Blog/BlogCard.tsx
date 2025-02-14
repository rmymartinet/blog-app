import { BlogCardProps } from "@/types/blogTypes";
import { textSplitLines } from "@/utils/Animations/common/TextAnimation";
import Link from "next/link";
import React, { useLayoutEffect, useRef } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";

const BlogCard = ({ post }: BlogCardProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    textSplitLines(containerRef, 0.5);
  }, []);

  return (
    <div
      key={post.id}
      className="p-5 md:p-8 lg:p-10 rounded-xl border group border-primaryCardBorder hover:border-secondaryCardBorder transition-all duration-300 bg-background w-full h-full"
    >
      <div ref={containerRef} className="grid grid-rows-3 gap-4 h-full w-full">
        <Link href={`/post/${post.id}`}>
          <h2 className="text-2xl">{post.title}</h2>
        </Link>
        <p className="text-gray-400">{post.body.substring(0, 100)}...</p>
        <button className="flex items-center gap-1 justify-self-end">
          <Link href={`/post/${post.id}`} className="text-blue-400">
            Read more
          </Link>
          <MdKeyboardArrowRight className="text-lg text-blue-400 transform group-hover:translate-x-1 transition-transform duration-300" />
        </button>
      </div>
    </div>
  );
};

export default BlogCard;
