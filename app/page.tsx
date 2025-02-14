"use client";

import { PostProps } from "@/types/blogTypes";
import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Loader from "./components/Loader";
import BlogHeader from "./components/BlogHeader";
import BlogCard from "./components/BlogCard";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<PostProps[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRefs = useRef<HTMLDivElement>(null);
  const [filteredPosts, setFilteredPosts] = useState<PostProps[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState<string | null>(null);

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
    const fetchPosts = async () => {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/posts");
        if (!res.ok) throw new Error("Échec de la récupération des articles");
        const data = await res.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setError(
          "Erreur lors de la récupération des articles. Veuillez réessayer plus tard."
        );
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  useEffect(() => {
    setFilteredPosts(searchPostsByKeyword(searchTerm));
  }, [searchTerm, posts, searchPostsByKeyword]);

  useLayoutEffect(() => {
    if (
      cardRefs.current.length === 0 ||
      !cardRefs.current.every((ref) => ref !== null)
    )
      return;

    gsap.from(cardRefs.current, {
      opacity: 0,
      y: 100,
      duration: 1,
      ease: "power2.out",
      stagger: 0.1,
      scrollTrigger: {
        trigger: containerRefs.current,
        start: "top 90%",
        end: "bottom 10%",
      },
    });
  }, [filteredPosts]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <>
      <main className="flex flex-col gap-10 mt-40">
        <BlogHeader
          loading={loading}
          filteredPosts={filteredPosts}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
        <div
          ref={containerRefs}
          className="grid md:grid-cols-2 lg:grid-cols-2 gap-10"
        >
          {filteredPosts.map((post, index) => (
            <div
              key={post.id}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
            >
              <BlogCard post={post} />
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
