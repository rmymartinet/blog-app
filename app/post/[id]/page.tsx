import BackButton from "@/app/components/Backbutton";
import PostDetails from "@/app/components/Blog/PostDetails";
import React from "react";
type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function PostId({ params }: PageProps) {
  const { id } = await params;

  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  const postJson = await res.json();

  return (
    <div className="mt-40 flex flex-col gap-20">
      <BackButton />
      <PostDetails post={postJson} />
    </div>
  );
}
