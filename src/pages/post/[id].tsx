import BackButton from "@/src/components/Backbutton";
import PostDetails from "@/src/components/Blog/PostDetails";
import { PostProps } from "@/types/blogTypes";
import { getStaticProps, getStaticPaths } from "@/src/lib/postData";

export { getStaticPaths, getStaticProps };
export default function PostPage({ post }: { post: PostProps }) {
  if (!post) {
    return (
      <div className="h-screen grid place-content-center">
        <p>Post not found</p>
      </div>
    );
  }

  return (
    <div className="mt-40 flex flex-col gap-20">
      <BackButton />
      <PostDetails post={post} />
    </div>
  );
}
