"use client";

import { PostProps } from "@/types/blogTypes";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";

export default function Home() {
  const [posts, setPosts] = useState<PostProps[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts");
      const data = await res.json();
      setPosts(data);
    };
    fetchPosts();
  }, []);

  return (
    <div>
      <h1>Blog Posts</h1>
      <ul className="grid md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <li key={post.id}>
            <div className="flex flex-col gap-4 border-2 border-red-400 h-full w-full">
              <Link href={`/post/${post.id}`}>
                <h2>{post.title}</h2>
              </Link>
              <p>{post.body.substring(0, 100)}</p>
              <button className="flex items-center gap-1">
                <Link href={`/post/${post.id}`} className="text-blue-400">
                  Read more
                </Link>
                <MdKeyboardArrowRight className="text-lg text-blue-400" />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
