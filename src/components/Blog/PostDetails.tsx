"use client";

import { PostProps } from "@/types/blogTypes";
import { textSplitLines } from "@/utils/Animations/common/TextAnimation";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

const PostDetails = ({ post }: { post: PostProps }) => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const postInfosRef = useRef<HTMLDivElement>(null);
  const postTextRef = useRef<HTMLParagraphElement>(null);

  useGSAP(() => {
    if (titleRef.current && postInfosRef.current && postTextRef.current) {
      textSplitLines(titleRef, 0.5);
      textSplitLines(postInfosRef, 0.5);
      textSplitLines(postTextRef, 0.5);
    }
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <h1 ref={titleRef} className="text-xl md:text-3xl">
        {post.title}
      </h1>
      <div ref={postInfosRef} className="flex flex-col gap-2">
        <span>Post id: {post.id}</span>
        <span>Author: {post.userId}</span>
      </div>
      <p ref={postTextRef}>{post.body}</p>
    </div>
  );
};

export default PostDetails;
