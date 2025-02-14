"use client";

import { BlogProps } from "@/types/blogTypes";
import { textSplitLines } from "@/utils/Animations/common/TextAnimation";
import { useGSAP } from "@gsap/react";
import React, { useRef, useState, useCallback } from "react";
import Hashtag from "./HashTagFilter";
import SearchBar from "./SearchBar";

const BlogHeader = ({
  loading,
  filteredPosts,
  searchTerm,
  setSearchTerm,
}: BlogProps) => {
  const [hashtags, setHashtags] = useState<string[]>([]);
  const titleRef = useRef<HTMLHeadingElement>(null);

  const handleRemoveHashtag = useCallback(
    (hashtag: string) => {
      const newHashtags = hashtags.filter((tag) => tag !== hashtag);
      setHashtags(newHashtags);
      setSearchTerm("");
    },
    [hashtags, setSearchTerm]
  );

  useGSAP(() => {
    if (!loading) {
      textSplitLines(titleRef, 0.5, "4px");
    }
  }, [loading]);

  return (
    <header className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row gap-10 md:gap-0 justify-between w-full">
        <div className="flex flex-col gap-6 overflow-hidden mb-8">
          <h1 ref={titleRef} className="text-7xl">
            Blog Posts
          </h1>
        </div>
        <SearchBar
          filteredPosts={filteredPosts}
          hashtags={hashtags}
          setHashtags={setHashtags}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
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

export default React.memo(BlogHeader);
