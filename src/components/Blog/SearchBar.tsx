import { SearchBarProps } from "@/types/searchBarTypes";
import { animateVerticalBlur } from "@/utils/Animations/BlogAnimation";
import { useGSAP } from "@gsap/react";
import React, { useCallback, useRef, useState } from "react";
import { CiSearch } from "react-icons/ci";

function SearchBar({
  filteredPosts,
  hashtags,
  setHashtags,
  searchTerm,
  setSearchTerm,
}: SearchBarProps) {
  const [errorMessages, setErrorMessages] = useState<string>("");
  const formRef = useRef<HTMLFormElement>(null);

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
      setHashtags([...hashtags, searchTerm]);
    },

    [filteredPosts, hashtags, searchTerm, setSearchTerm, setHashtags]
  );

  useGSAP(() => {
    animateVerticalBlur(formRef);
  }, []);

  return (
    <div className="overflow-hidden">
      <form
        ref={formRef}
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
  );
}

export default SearchBar;
