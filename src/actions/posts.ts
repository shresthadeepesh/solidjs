export const fetchPosts = async () => {
  const data = await fetch("https://jsonplaceholder.typicode.com/posts")
    .then((res) => res.json())
    .then((res) => res)
    .catch((err) => console.log(err));

  if (data && data.length === 0) {
    return [];
  }

  return data;
};
