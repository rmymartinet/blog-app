"use client";

import { BlogProps } from "@/types/blogTypes";
import { TitleTransition } from "@/utils/Animations/common/TitleAnimations";
import { useGSAP } from "@gsap/react";
import React, { useRef, useState, useCallback } from "react";
import { CiSearch } from "react-icons/ci";
import { IoClose } from "react-icons/io5";

const BlogHeader = ({
  loading,
  filteredPosts,
  searchTerm,
  setSearchTerm,
}: BlogProps) => {
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [errorMessages, setErrorMessages] = useState<string>("");
  const titleRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    if (!loading) {
      TitleTransition(titleRef, 0.5);
    }
  }, [loading]);

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const isHashtagInPosts =
        filteredPosts.some((post) =>
          post.title.toLowerCase().includes(searchTerm.toLowerCase())
        ) ||
        filteredPosts.some((post) =>
          post.body.toLowerCase().includes(searchTerm.toLowerCase())
        );

      const isHashtagAlreadyAdded = hashtags.includes(searchTerm);

      if (isHashtagAlreadyAdded) {
        setErrorMessages("Hashtag already exists");
        setSearchTerm("");
        return;
      } else if (!isHashtagInPosts) {
        setErrorMessages("No posts found with this hashtag");
        setSearchTerm("");
        return;
      }

      setErrorMessages("");
      setHashtags((prev) => [...prev, searchTerm]);
    },
    [filteredPosts, hashtags, searchTerm, setSearchTerm]
  );

  const handleRemoveHashtag = useCallback(
    (hashtag: string) => {
      const newHashtags = hashtags.filter((tag) => tag !== hashtag);
      setHashtags(newHashtags);
      setSearchTerm("");
    },
    [hashtags, setSearchTerm]
  );

  return (
    <header className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row gap-10 md:gap-0 justify-between w-full">
        <div className="flex flex-col gap-6">
          <div className="overflow-hidden pb-2 mb-8">
            <h1 ref={titleRef} className="text-7xl">
              Blog Posts
            </h1>
          </div>
        </div>
        <form
          onSubmit={handleSubmit}
          className={`${
            errorMessages && "animate-shake flex flex-col md:items-center"
          }`}
        >
          <div className="relative w-max mt-5">
            <input
              type="text"
              placeholder="Search for a post"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full rounded-lg p-2 pl-10 bg-backgroundCard border border-primaryCardBorder focus:outline-none focus:ring-0 focus:border-secondaryCardBorder ${
                errorMessages && "border border-red-500 animate-shake"
              }`}
              aria-label="Search for a post"
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <CiSearch />
            </div>
          </div>
          {errorMessages && (
            <p className="text-red-500 mt-4 break-words">{errorMessages}</p>
          )}
        </form>
      </div>
      <div className="flex gap-2 flex-wrap max-w-[100vw]">
        {hashtags.length > 0 && (
          <>
            {hashtags.map((hashtag, index) => (
              <Hashtag
                key={index}
                hashtag={hashtag}
                onRemove={handleRemoveHashtag}
                onClick={() => setSearchTerm(hashtag)}
              />
            ))}
          </>
        )}
      </div>
    </header>
  );
};

const Hashtag = ({
  hashtag,
  onRemove,
  onClick,
}: {
  hashtag: string;
  onRemove: (hashtag: string) => void;
  onClick: () => void;
}) => (
  <div className="border rounded-full flex gap-2 items-center py-1 px-2">
    <button
      onClick={() => onRemove(hashtag)}
      className="bg-white rounded-full text-black"
      aria-label={`Remove hashtag ${hashtag}`}
    >
      <IoClose />
    </button>
    <button key={hashtag} onClick={onClick} aria-label={`Search for ${hashtag}`}>
      #{hashtag}
    </button>
  </div>
);

export default React.memo(BlogHeader);