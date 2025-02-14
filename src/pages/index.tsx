import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import Loader from "../components/Loader";
import { animateBlogCardOnScroll } from "@/utils/Animations/BlogAnimation";
import BlogHeader from "../components/Blog/BlogHeader";
import BlogCard from "../components/Blog/BlogCard";
import { PostProps } from "@/types/blogTypes";
import { getAllPostsStaticProps } from "@/src/lib/postData";
export { getAllPostsStaticProps as getStaticProps };

export default function HomePage({ posts }: { posts: PostProps[] }) {
  const [loading, setLoading] = useState(true);
  const [filteredPosts, setFilteredPosts] = useState<PostProps[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRefs = useRef<HTMLDivElement>(null);

  const searchPostsByKeyword = useCallback(
    (keyword: string) => {
      return posts.filter(
        (post) =>
          post.title.toLowerCase().includes(keyword.toLowerCase()) ||
          post.body.toLowerCase().includes(keyword.toLowerCase())
      );
    },
    [posts]
  );

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setFilteredPosts(posts);
      setLoading(false);
    }, 1000);
  }, [posts]);

  useEffect(() => {
    setFilteredPosts(searchPostsByKeyword(searchTerm));
  }, [searchTerm, posts, searchPostsByKeyword]);

  useLayoutEffect(() => {
    if (
      loading ||
      cardRefs.current.length === 0 ||
      !cardRefs.current.every((ref) => ref !== null)
    )
      return;

    if (cardRefs.current[0]?.dataset.animated) return;

    cardRefs.current.forEach((el) => {
      if (el) el.dataset.animated = "true";
    });

    animateBlogCardOnScroll(containerRefs, containerRefs);
  }, [filteredPosts, loading]);

  if (loading) {
    return <Loader />;
  }

  return (
    <main className="flex flex-col gap-10 mt-40">
      <BlogHeader
        loading={loading}
        filteredPosts={filteredPosts}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      {loading && <p>Loading...</p>}
      <div
        ref={containerRefs}
        className="grid md:grid-cols-2 lg:grid-cols-2 gap-10"
      >
        {filteredPosts.map((post, index) => (
          <div
            key={`${index}-${searchTerm}`}
            ref={(el) => {
              cardRefs.current[index] = el;
            }}
          >
            <BlogCard post={post} />
          </div>
        ))}
      </div>
    </main>
  );
}
