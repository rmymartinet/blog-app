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
