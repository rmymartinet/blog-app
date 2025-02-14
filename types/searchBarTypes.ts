import { PostProps } from "./blogTypes";

export interface SearchBarProps {
  filteredPosts: PostProps[];
  hashtags: string[];
  setHashtags: (hastags: string[]) => void;
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
}
