export interface PostProps {
  id: number;
  title: string;
  userId?: number;
  body: string;
}

export interface BlogProps {
  loading: boolean;
  filteredPosts: PostProps[];
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
}

export interface BlogCardProps {
  post: PostProps;
}

export interface SearchBarProps {
  filteredPosts: PostProps[];
  hashtags: string[];
  setHashtags: (hastags: string[]) => void;
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
}
