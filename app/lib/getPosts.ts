export const fetchPosts = async () => {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    if (!res.ok) throw new Error("Échec de la récupération des articles");
    const data = await res.json();
    return { data, error: null };
  } catch (error) {
    console.error("Error fetching posts:", error);
    return {
      data: null,
      error:
        "Erreur lors de la récupération des articles. Veuillez réessayer plus tard.",
    };
  }
};
