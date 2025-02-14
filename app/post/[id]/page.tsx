import BackButton from "@/app/components/Backbutton";
import PostDetails from "@/app/components/Blog/PostDetails";
import React from "react";

export default async function PostId({ params }: { params: { id: string } }) {
  const { id } = await params;

  const post = fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  const postJson = await (await post).json();

  return (
    <div className="mt-40 flex flex-col gap-20">
      <BackButton />
      <PostDetails post={postJson} />
    </div>
  );
}
